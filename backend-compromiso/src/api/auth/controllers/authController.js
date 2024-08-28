// @ts-nocheck
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Usuario = require('../../../api/usuario/models/usuarioModel.js');

const loginUsuario = async (req, res) => {
  const { Cor_Usuario, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ where: { Cor_Usuario } });

    if (!usuario || !await bcrypt.compare(password, usuario.password)) {
      return res.status(401).json({ msg: 'Credenciales inválidas' });
    }

    const token = jwt.sign(
      { id: usuario.Id_Usuario, rol: usuario.rol },
      process.env.JWT_SECRET, // Usa la clave secreta del entorno
      { expiresIn: '1h' }
    );

    res.json({ token, rol: usuario.rol });

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error interno del servidor' });
  }
};

module.exports = {
  loginUsuario
};
