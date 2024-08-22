// @ts-nocheck
const jwt = require('jsonwebtoken');
const Usuario = require('../src/api/usuario/models/usuarioModel.js'); // Ajusta la ruta según tu estructura

const checkAuth = async (req, res, next) => {
  const { Cor_Usuario, password } = req.body;

  try {
    // Buscar usuario en la base de datos
    const usuario = await Usuario.findOne({ where: { Cor_Usuario } });

    if (!usuario || !usuario.comparePassword(password)) {
      return res.status(401).json({ msg: 'Credenciales inválidas' });
    }

    // Generar token JWT
    const token = jwt.sign(
      { id: usuario.id, isAdmin: usuario.isAdmin }, 
      process.env.JWT_SECRET, // Asegúrate de tener este secreto en tu .env
      { expiresIn: '1h' }
    );

    // Enviar token en la respuesta
    res.json({ token, isAdmin: usuario.isAdmin });

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error interno del servidor' });
  }
};

module.exports = checkAuth;
