// @ts-nocheck
const Usuario = require('../models/usuarioModel.js');
const logger = require('../../../../config/logger.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Obtener todos los usuarios
const getUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    if (usuarios.length === 0) {
      return res.status(404).json({ message: 'No se encontraron usuarios' });
    }
    return res.json(usuarios);
  } catch (error) {
    logger.error(error.message, { stack: error.stack });
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Obtener un usuario por ID
const getUsuarioById = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    return res.json(usuario);
  } catch (error) {
    logger.error(error.message, { stack: error.stack });
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Crear un nuevo usuario
const createUsuario = async (req, res) => {
  try {
    const { password, ...rest } = req.body;

    // Hashea la contraseña antes de guardar el usuario
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { ...rest, password: hashedPassword };

    const usuario = await Usuario.create(newUser);
    return res.status(201).json(usuario);
  } catch (error) {
    logger.error(error.message, { stack: error.stack });
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Actualizar un usuario existente
const updateUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { password, ...rest } = req.body;

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      rest.password = hashedPassword;
    }

    const [updated] = await Usuario.update(rest, { where: { Id_Usuario: id } });

    if (!updated) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const updatedUsuario = await Usuario.findByPk(id);
    return res.json(updatedUsuario);
  } catch (error) {
    logger.error(error.message, { stack: error.stack });
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Eliminar un usuario
const deleteUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Usuario.destroy({ where: { Id_Usuario: id } });

    if (!deleted) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    return res.status(204).end();
  } catch (error) {
    logger.error(error.message, { stack: error.stack });
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Iniciar sesión
const loginUsuario = async (req, res) => {
  const { Cor_Usuario, password } = req.body;

  try {
    if (!Cor_Usuario || !password) {
      return res.status(400).json({ error: 'Faltan el correo electrónico o la contraseña' });
    }

    const usuario = await Usuario.findOne({ where: { Cor_Usuario } });

    if (!usuario) {
      return res.status(401).json({ error: 'Correo electrónico o contraseña incorrectos' });
    }

    const passwordMatch = await bcrypt.compare(password, usuario.password);
    
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Correo electrónico o contraseña incorrectos' });
    }

    const token = jwt.sign(
      { Id_Usuario: usuario.Id_Usuario, rol: usuario.rol },
      process.env.JWT_SECRET || 'secretKey',
      { expiresIn: '1h' }
    );

    await Usuario.update({ token }, { where: { Id_Usuario: usuario.Id_Usuario } });
    return res.status(200).json({
      message: 'Inicio de sesión exitoso',
      user: {
        Id_Usuario: usuario.Id_Usuario,
        Nom_Usuario: usuario.Nom_Usuario,
        Ape_Usuario: usuario.Ape_Usuario,
        Cor_Usuario: usuario.Cor_Usuario,
        rol: usuario.rol,
        token
      }
    });
  } catch (error) {
    logger.error(error.message, { stack: error.stack });
    return res.status(500).json({ error: 'Error en el servidor' });
  }
};

module.exports = {
  getUsuarios,
  getUsuarioById,
  createUsuario,
  updateUsuario,
  deleteUsuario,
  loginUsuario
};
