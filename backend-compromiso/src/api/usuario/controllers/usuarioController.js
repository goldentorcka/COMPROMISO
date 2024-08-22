// @ts-nocheck
const Usuario = require('../models/usuarioModel.js');
const logger = require('../../../../config/logger.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); // Asegúrate de tener bcrypt instalado

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
const createUsuario = async (req, res) => {
  try {
    // Hashea la contraseña antes de guardar el usuario
    if (req.body.password) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      req.body.password = hashedPassword;
    }
    const usuario = await Usuario.create(req.body);
    res.status(201).json(usuario);
  } catch (error) {
    logger.error(error.message, { stack: error.stack });
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Actualizar un usuario existente
const updateUsuario = async (req, res) => {
  try {
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

// Eliminar un usuario
const deleteUsuario = async (req, res) => {
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

// // Iniciar sesión
// const loginUsuario = async (req, res) => {
//   const { Cod_Usuario, password } = req.body;

//   try {
//     // Verificación básica de que se proporcionen los campos
//     if (!Cod_Usuario || !password) {
//       return res.status(400).json({ error: 'Faltan el código de usuario o la contraseña' });
//     }

//     // Buscar al usuario en la base de datos real
//     const usuario = await Usuario.findOne({ where: { Cod_Usuario } });

//     if (!usuario) {
//       return res.status(401).json({ error: 'Código de usuario o contraseña incorrectos' });
//     }

//     // Comparar la contraseña proporcionada con la hasheada en la base de datos
//     const passwordMatch = await bcrypt.compare(password, usuario.password);
    
//     if (!passwordMatch) {
//       return res.status(401).json({ error: 'Código de usuario o contraseña incorrectos' });
//     }

//     // Generar un token JWT
//     const token = jwt.sign(
//       { Id_Usuario: usuario.Id_Usuario, rol: usuario.rol },
//       process.env.JWT_SECRET || 'secretKey', // Usa la clave secreta del entorno o una por defecto
//       { expiresIn: '1h' }
//     );

//     // Actualizar el token en la base de datos
//     await Usuario.update({ token }, { where: { Id_Usuario: usuario.Id_Usuario } });

//     // Si la autenticación es exitosa
//     return res.status(200).json({
//       message: 'Inicio de sesión exitoso',
//       user: {
//         Id_Usuario: usuario.Id_Usuario,
//         Nom_Usuario: usuario.Nom_Usuario,
//         Ape_Usuario: usuario.Ape_Usuario,
//         Cor_Usuario: usuario.Cor_Usuario,
//         rol: usuario.rol,
//         token
//       }
//     });
//   } catch (error) {
//     logger.error(error.message, { stack: error.stack });
//     res.status(500).json({ error: 'Error en el servidor' });
//   }
// };

module.exports = {
  getUsuarios,
  getUsuarioById,
  createUsuario,
  updateUsuario,
  deleteUsuario,
  // loginUsuario, // Exporta la función de inicio de sesión
};
