// @ts-nocheck
const Usuario = require('../models/usuarioModel.js');
const logger = require('../../../../config/logger.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

import { emailRegistro } from "../../../../helpers/emailRegister.js";
import { emailOlvidePassword } from "../../../../helpers/emailOlvidePassword.js";



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
    const { password, Cor_Usuario, Nom_Usuario, ...rest } = req.body;

    // Hashea la contraseña antes de guardar el usuario
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { ...rest, password: hashedPassword };

    // Crear el usuario
    const usuario = await Usuario.create(newUser);

    // Generar un token para confirmación de cuenta (puedes usar el ID del usuario o algo generado)
    const token = jwt.sign(
      { Id_Usuario: usuario.Id_Usuario },
      process.env.JWT_SECRET || 'secretKey',
      { expiresIn: '1h' }
    );

    // Actualizar el usuario con el token
    await Usuario.update({ token }, { where: { Id_Usuario: usuario.Id_Usuario } });

    // Enviar el correo de confirmación de cuenta
    await emailRegistro({
      Cor_User: Cor_Usuario,
      Nom_User: Nom_Usuario,
      token
    });

    return res.status(201).json(usuario);
  } catch (error) {
    logger.error(error.message, { stack: error.stack });
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};


// Olvidé mi contraseña
const olvidePassword = async (req, res) => {
  const { Cor_Usuario } = req.body;

  try {
    const usuario = await Usuario.findOne({ where: { Cor_Usuario } });

    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Generar token de restablecimiento de contraseña
    const token = jwt.sign(
      { Id_Usuario: usuario.Id_Usuario },
      process.env.JWT_SECRET || 'secretKey',
      { expiresIn: '1h' }
    );

    // Actualizar el token en la base de datos
    await Usuario.update({ token }, { where: { Id_Usuario: usuario.Id_Usuario } });

    // Enviar el correo de restablecimiento de contraseña
    await emailOlvidePassword({
      Cor_User: Cor_Usuario,
      Nom_User: usuario.Nom_Usuario,
      token
    });

    return res.status(200).json({ message: 'Correo de recuperación enviado con éxito' });
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
  loginUsuario,
  olvidePassword
};
