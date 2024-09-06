// @ts-nocheck
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Usuario } = require('../models/usuarioModel.js');
const logger = require('../../../../config/logger.js');

// Controlador para el inicio de sesión de un usuario
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
  loginUsuario
};
