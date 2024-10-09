// @ts-nocheck
const Usuario = require('../models/usuarioModel.js');
const { logger } = require('../../../../config/logger.js');

// Middleware para verificar si el usuario es Super Administrador
const isSuperAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Usuario no autenticado' });
  }

  const { rol } = req.user; // Cambiado de Rol_Usuario a rol
  if (rol !== 'Super Administrador') {
    return res.status(403).json({ message: 'Acceso denegado. Solo los Super Administradores pueden realizar esta acción.' });
  }
  next();
};

// Middleware para verificar permisos específicos
const checkPermissions = (action) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Usuario no autenticado' });
    }

    const { permisos } = req.user;
    if (!permisos || !permisos[action]) {
      return res.status(403).json({ message: 'No tienes permisos para realizar esta acción.' });
    }
    next();
  };
};

// Validación de datos de Usuario
const validateUsuario = (data) => {
  const errors = [];
  if (!data.nombre_usuario || !data.usuario || !data.contrasena || !data.email) {
    errors.push('Todos los campos son obligatorios.');
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (data.email && !emailRegex.test(data.email)) {
    errors.push('El formato del correo es inválido.');
  }
  return errors;
};

// Obtener todos los usuarios
const getUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    if (usuarios.length === 0) {
      return res.status(404).json({ success: false, message: 'No se encontraron usuarios' });
    }
    res.status(200).json({ success: true, usuarios });
  } catch (error) {
    logger.error('Error al obtener usuarios', { message: error.message, stack: error.stack });
    res.status(500).json({ success: false, error: 'Error interno del servidor' });
  }
};

// Obtener un usuario por ID
const getUsuarioById = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) return res.status(400).json({ success: false, message: 'ID inválido' });

  try {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
    }
    res.status(200).json({ success: true, usuario });
  } catch (error) {
    logger.error(`Error al obtener usuario con ID ${id}`, { message: error.message, stack: error.stack });
    res.status(500).json({ success: false, error: 'Error interno del servidor' });
  }
};

// Crear un nuevo usuario (Solo Super Administrador)
const crearUsuario = async (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ success: false, message: 'No se proporcionaron datos para crear el usuario' });
  }

  const errors = validateUsuario(req.body);
  if (errors.length > 0) {
    return res.status(400).json({ success: false, message: 'Errores de validación', errors });
  }

  try {
    const usuarioExistente = await Usuario.findOne({ where: { usuario: req.body.usuario } }); // Cambiado de Usuario a usuario
    if (usuarioExistente) {
      return res.status(409).json({ success: false, message: 'El nombre de usuario ya está en uso' });
    }

    const usuario = await Usuario.create(req.body);
    res.status(201).json({ success: true, usuario });
  } catch (error) {
    logger.error('Error al crear usuario', { message: error.message, stack: error.stack });
    res.status(500).json({ success: false, error: 'Error interno del servidor al crear el usuario' });
  }
};

// Actualizar un usuario (Solo Super Administrador)
const actualizarUsuario = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) return res.status(400).json({ success: false, message: 'ID inválido' });

  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ success: false, message: 'No se proporcionaron datos para actualizar el usuario' });
  }

  const errors = validateUsuario(req.body);
  if (errors.length > 0) {
    return res.status(400).json({ success: false, message: 'Errores de validación', errors });
  }

  try {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
    }

    await usuario.update(req.body);
    res.status(200).json({ success: true, usuario });
  } catch (error) {
    logger.error(`Error al actualizar usuario con ID ${id}`, { message: error.message, stack: error.stack });
    res.status(500).json({ success: false, error: 'Error interno del servidor al actualizar el usuario' });
  }
};

// Eliminar un usuario (Solo Super Administrador)
const eliminarUsuario = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) return res.status(400).json({ success: false, message: 'ID inválido' });

  try {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
    }

    await usuario.destroy();
    res.status(204).end();
  } catch (error) {
    logger.error(`Error al eliminar usuario con ID ${id}`, { message: error.message, stack: error.stack });
    res.status(500).json({ success: false, error: 'Error interno del servidor al eliminar el usuario' });
  }
};

// Solicitar restablecimiento de contraseña
const resetPasswordRequest = async (req, res) => {
  try {
    const { email } = req.body; // Cambiado de Correo_Usuario a email
    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario) {
      return res.status(404).json({ success: false, message: 'Correo no encontrado' });
    }

    // Implementar lógica de restablecimiento de contraseña aquí
    res.status(200).json({ success: true, message: 'Correo enviado para restablecer la contraseña' });
  } catch (error) {
    logger.error('Error al solicitar restablecimiento de contraseña', { message: error.message, stack: error.stack });
    res.status(500).json({ success: false, error: 'Error interno del servidor' });
  }
};

// Exportar funciones
module.exports = {
  getUsuarios,
  getUsuarioById,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
  resetPasswordRequest,
  isSuperAdmin,
  checkPermissions,
};
