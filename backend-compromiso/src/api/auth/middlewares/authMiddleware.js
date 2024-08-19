const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../../../../config/jwtConfig');

function authenticateJWT(req, res, next) {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (!token) {
    console.log('Token no encontrado');
    return res.sendStatus(401); // No autorizado
  }

  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) {
      console.log('Error en la verificación del token:', err.message);
      return res.sendStatus(403); // Prohibido
    }

    req.user = user;
    next();
  });
}

module.exports = authenticateJWT;
