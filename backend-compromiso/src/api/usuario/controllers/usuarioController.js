// @ts-nocheck
const Usuario = require('../models/usuarioModel.js');  // Ruta del modelo de usuario
const logger = require('../../../../config/logger.js');  // Ruta del logger

// Validar campos obligatorios
const validateUsuario = (usuario) => {
  const { Rol_Usuario, Nom_Usuario, Usuario, Correo_Usuario, Contraseña_Usuario } = usuario;
  let errors = [];

  if (!Rol_Usuario) errors.push("El campo 'Rol_Usuario' es obligatorio.");
  if (!Nom_Usuario) errors.push("El campo 'Nom_Usuario' es obligatorio.");
  if (!Usuario) errors.push("El campo 'Usuario' es obligatorio.");
  if (!Correo_Usuario) errors.push("El campo 'Correo_Usuario' es obligatorio.");
  if (!Contraseña_Usuario) errors.push("El campo 'Contraseña_Usuario' es obligatorio.");
  
  return errors;
};

// Obtener todos los usuarios
const getUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.status(usuarios.length === 0 ? 404 : 200).json(usuarios.length === 0 ? { message: 'No se encontraron usuarios' } : usuarios);
  } catch (error) {
    logger.error(error.message, { stack: error.stack });
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Obtener un usuario por ID
const getUsuarioById = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) return res.status(400).json({ message: 'ID inválido' });

  try {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json(usuario);
  } catch (error) {
    logger.error(error.message, { stack: error.stack });
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Crear un nuevo usuario
const crearUsuario = async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: 'No se proporcionaron datos' });
    }
    
    const errors = validateUsuario(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ message: 'Errores de validación', errors });
    }

    const usuarioExistente = await Usuario.findOne({ where: { Usuario: req.body.Usuario } });
    if (usuarioExistente) {
      return res.status(409).json({ message: 'El nombre de usuario ya está en uso' });
    }

    const usuario = await Usuario.create(req.body);
    res.status(201).json(usuario);
  } catch (error) {
    logger.error(error.message, { stack: error.stack });
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Actualizar un usuario existente
const actualizarUsuario = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) return res.status(400).json({ message: 'ID inválido' });

  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: 'No se proporcionaron datos para actualizar' });
    }

    const errors = validateUsuario(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ message: 'Errores de validación', errors });
    }

    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    await Usuario.update(req.body, { where: { Id_Usuario: id } });
    const usuarioActualizado = await Usuario.findByPk(id);
    res.json(usuarioActualizado);
  } catch (error) {
    logger.error(error.message, { stack: error.stack });
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Eliminar un usuario por ID
const eliminarUsuario = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) return res.status(400).json({ message: 'ID inválido' });

  try {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    await Usuario.destroy({ where: { Id_Usuario: id } });
    res.status(204).end();
  } catch (error) {
    logger.error(error.message, { stack: error.stack });
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};


// Configura el transporte de Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail', // Cambia esto según tu servicio de correo
  auth: {
    user: process.env.EMAIL_USER, // Tu correo
    pass: process.env.EMAIL_PASS, // Tu contraseña
  },
});

// Solicitar restablecimiento de contraseña
const resetPasswordRequest = async (req, res) => {
  const { correo } = req.body;

  try {
    const usuario = await Usuario.findOne({ where: { Correo_Usuario: correo } });
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    // Generar un token
    const token = jwt.sign({ id: usuario.Id_Usuario }, process.env.JWT_SECRET, { expiresIn: '1h' });
    // Crear enlace para restablecimiento de contraseña
    const link = `http://tu_dominio.com/restablecer-contraseña/${token}`;
    // Enviar el correo
    await transporter.sendMail({
      to: correo,
      subject: 'Restablecimiento de Contraseña',
      html: `<p>Para restablecer tu contraseña, haz clic en el siguiente enlace:</p><a href="${link}">${link}</a>`,
    });
    res.status(200).json({ message: 'Se ha enviado un enlace para restablecer la contraseña a tu correo' });
  } catch (error) {
    logger.error(error.message, { stack: error.stack });
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Exportar las funciones
module.exports = {
  getUsuarios,
  getUsuarioById,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
  resetPasswordRequest
};
