// @ts-nocheck
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../../../../config/jwtConfig.js');
const Usuario = require('../../../api/usuario/models/usuarioModel.js');
const bcrypt = require('bcrypt');

async function login(req, res) {
  const { Nom_Usuario, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ where: { Nom_Usuario } });

    if (usuario && await bcrypt.compare(password, usuario.password)) {
      const user = { id: usuario.Id_Usuario, Nom_Usuario: usuario.Nom_Usuario };
      const token = jwt.sign(user, jwtSecret, { expiresIn: '1h' });
      res.json({ token });
    } else {
      res.status(401).json({ message: 'Credenciales incorrectas' });
    }
  } catch (error) {
    console.error('Error al autenticar el usuario:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
}

module.exports = { login };
