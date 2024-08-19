const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../../../../config/jwtConfig.js'); // Asegúrate de que este archivo tenga el mismo secreto que el middleware

function login(req, res) {
  const { Nom_Usuario, Pass_Usuario } = req.body;

  // Aquí deberías verificar las credenciales del usuario (esto es solo un ejemplo)
  if (Nom_Usuario === 'Marlon' && Pass_Usuario === 'marlon1234567') {
    // Usuario encontrado y autenticado

    // Datos que se incluirán en el token
    const user = { id: 2, Nom_Usuario: 'Marlon' };

    // Generación del token
    const token = jwt.sign(user, jwtSecret, { expiresIn: '1h' });

    // Envío del token al cliente
    res.json({ token });
  } else {
    // Autenticación fallida
    res.status(401).json({ message: 'Credenciales incorrectas' });
  }
}

module.exports = { login };