// @ts-nocheck
const Usuario = require('../models/usuarioModel.js');  // Ruta del modelo de usuario
const logger = require('../../../../config/logger.js');  // Ruta del logger

// Obtener todos los usuarios
const getUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    if (usuarios.length === 0) {
      res.status(404).json({ message: 'No se encontraron usuarios' });
    } else {
      res.json(usuarios);
    }
  } catch (error) {
    logger.error(error.message, { stack: error.stack });
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Obtener un usuario por ID
const getUsuarioById = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (usuario) {
      res.json(usuario);
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    logger.error(error.message, { stack: error.stack });
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Crear un nuevo usuario
const crearUsuario = async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: 'Datos insuficientes para crear el usuario' });
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
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: 'Datos insuficientes para actualizar el usuario' });
    }
    const [updated] = await Usuario.update(req.body, {
      where: { Id_Usuario: req.params.id },
    });
    if (updated) {
      const updatedUsuario = await Usuario.findByPk(req.params.id);
      res.json(updatedUsuario);
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    logger.error(error.message, { stack: error.stack });
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Eliminar un usuario por ID
const eliminarUsuario = async (req, res) => {
  try {
    const deleted = await Usuario.destroy({
      where: { Id_Usuario: req.params.id },
    });
    if (deleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
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
};
