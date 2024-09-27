// @ts-nocheck
const Usuario = require('../models/usuarioModel.js');
const logger = require('../../../../config/logger.js');

// Middleware para verificar si el usuario es Super Administrador
const isSuperAdmin = (req, res, next) => {
  const { Rol_Usuario } = req.user; // Suponiendo que req.user contiene los datos del usuario logueado
  if (Rol_Usuario !== 'Super Administrador') {
    return res.status(403).json({ message: 'Acceso denegado. Solo los Super Administradores pueden realizar esta acción.' });
  }
  next();
};

// Middleware para verificar permisos específicos
const checkPermissions = (action) => {
  return (req, res, next) => {
    const { permisos } = req.user; // Suponiendo que req.user contiene los permisos del usuario logueado
    if (!permisos || !permisos[action]) {
      return res.status(403).json({ message: 'No tienes permisos para realizar esta acción.' });
    }
    next();
  };
};

// Validación básica de datos del usuario
const validateUsuario = (data) => {
  const errors = [];
  if (!data.Nom_Usuario || !data.Usuario || !data.Correo_Usuario || !data.Contraseña_Usuario) {
    errors.push('Todos los campos son obligatorios.');
  }
  // Validar formato de correo
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (data.Correo_Usuario && !emailRegex.test(data.Correo_Usuario)) {
    errors.push('El formato del correo es inválido.');
  }
  return errors;
};

// Obtener todos los usuarios
const getUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.json({ success: true, usuarios });
  } catch (error) {
    logger.error(error.message, { stack: error.stack });
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
    res.json({ success: true, usuario });
  } catch (error) {
    logger.error(error.message, { stack: error.stack });
    res.status(500).json({ success: false, error: 'Error interno del servidor' });
  }
};

// Crear un nuevo usuario (Solo Super Administrador)
const crearUsuario = async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ success: false, message: 'No se proporcionaron datos' });
    }

    // Verificar que solo el Super Administrador pueda registrar usuarios
    if (req.user.Rol_Usuario !== 'Super Administrador') {
      return res.status(403).json({ success: false, message: 'Solo los Super Administradores pueden registrar usuarios.' });
    }

    const errors = validateUsuario(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ success: false, message: 'Errores de validación', errors });
    }

    const usuarioExistente = await Usuario.findOne({ where: { Usuario: req.body.Usuario } });
    if (usuarioExistente) {
      return res.status(409).json({ success: false, message: 'El nombre de usuario ya está en uso' });
    }

    // Permite asignar permisos a los usuarios durante su registro
    const usuario = await Usuario.create({
      ...req.body,
      permisos: req.body.permisos ? JSON.stringify(req.body.permisos) : null // Convierte a JSON si hay permisos
    });

    res.status(201).json({ success: true, usuario });
  } catch (error) {
    logger.error(error.message, { stack: error.stack });
    res.status(500).json({ success: false, error: 'Error interno del servidor' });
  }
};

// Actualizar un usuario (Solo Super Administrador)
const actualizarUsuario = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) return res.status(400).json({ success: false, message: 'ID inválido' });

  try {
    if (req.user.Rol_Usuario !== 'Super Administrador') {
      return res.status(403).json({ success: false, message: 'Solo los Super Administradores pueden actualizar usuarios.' });
    }

    const errors = validateUsuario(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ success: false, message: 'Errores de validación', errors });
    }

    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
    }

    // Actualiza los permisos si se proporciona
    const updatedData = {
      ...req.body,
      permisos: req.body.permisos ? JSON.stringify(req.body.permisos) : usuario.permisos // Mantiene los permisos existentes si no se proporcionan nuevos
    };

    await Usuario.update(updatedData, { where: { Id_Usuario: id } });
    const usuarioActualizado = await Usuario.findByPk(id);
    res.json({ success: true, usuario: usuarioActualizado });
  } catch (error) {
    logger.error(error.message, { stack: error.stack });
    res.status(500).json({ success: false, error: 'Error interno del servidor' });
  }
};

// Eliminar un usuario (Solo Super Administrador)
const eliminarUsuario = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) return res.status(400).json({ success: false, message: 'ID inválido' });

  try {
    if (req.user.Rol_Usuario !== 'Super Administrador') {
      return res.status(403).json({ success: false, message: 'Solo los Super Administradores pueden eliminar usuarios.' });
    }

    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
    }

    await Usuario.destroy({ where: { Id_Usuario: id } });
    res.status(204).json({ success: true, message: 'Usuario eliminado correctamente' });
  } catch (error) {
    logger.error(error.message, { stack: error.stack });
    res.status(500).json({ success: false, error: 'Error interno del servidor' });
  }
};

// Solicitar restablecimiento de contraseña
const resetPasswordRequest = async (req, res) => {
  try {
    const { Correo_Usuario } = req.body;
    const usuario = await Usuario.findOne({ where: { Correo_Usuario } });

    if (!usuario) {
      return res.status(404).json({ success: false, message: 'Correo no encontrado' });
    }

    // Aquí se podría implementar la lógica de envío de correo para restablecer la contraseña

    res.status(200).json({ success: true, message: 'Correo enviado para restablecer la contraseña' });
  } catch (error) {
    logger.error(error.message, { stack: error.stack });
    res.status(500).json({ success: false, error: 'Error interno del servidor' });
  }
};

module.exports = {
  getUsuarios,
  getUsuarioById,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
  resetPasswordRequest,
  isSuperAdmin, // Asegúrate de exportar este middleware si lo usas en las rutas
  checkPermissions // Asegúrate de exportar este middleware si lo usas en las rutas
};
