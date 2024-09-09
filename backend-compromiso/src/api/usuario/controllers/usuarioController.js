// @ts-nocheck
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Usuario } = require('../models/usuarioModel.js');
const logger = require('../../../../config/logger.js');

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
    if (!usuario) {
      res.status(404).json({ message: 'Usuario no encontrado' });
    } else {
      res.json(usuario);
    }
  } catch (error) {
    logger.error(error.message, { stack: error.stack });
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Crear un nuevo usuario
const createUsuario = async (req, res) => {
  try {
    const { Nom_Usuario, Ape_Usuario, Cor_Usuario, password, rol } = req.body;

    // Validar campos requeridos
    if (!Nom_Usuario || !Ape_Usuario || !Cor_Usuario || !password || !rol) {
      return res.status(400).json({ error: 'Datos requeridos faltantes' });
    }

    // Validar longitud del nombre (por ejemplo, al menos 3 caracteres)
    if (Nom_Usuario.length < 3 || Ape_Usuario.length < 3) {
      return res.status(400).json({ error: 'Nombre o apellido demasiado corto' });
    }

    // Validar que el rol sea válido
    if (rol !== 'Administrador') {
      return res.status(400).json({ error: 'Rol inválido' });
    }

    // Crear el usuario
    const usuario = await Usuario.create({ Nom_Usuario, Ape_Usuario, Cor_Usuario, password, rol });
    return res.status(201).json(usuario);
  } catch (error) {
    logger.error(error.message, { stack: error.stack });
    if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ error: 'Error en el procesamiento de datos' });
    }
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Actualizar un usuario existente
const updateUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);

    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
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
const deleteUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);

    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

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

// Iniciar sesión de un usuario
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

    await usuario.update({ token });

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
