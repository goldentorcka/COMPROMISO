// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Se asume que el secreto se guarda en una variable de entorno
const SECRET_KEY = process.env.JWT_SECRET || '231232341';

function checkAuth(req, res, next) {
  // Obtén el token de los encabezados Authorization
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    // Extrae el token del encabezado
    const token = authHeader.split(' ')[1];

    // Verifica el token
    jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) {
        return res.status(403).json({ error: 'Token inválido' });
      }

      // Guarda la información del usuario en el request
      req.user = user;
      next(); // Continua a la siguiente función middleware o ruta
    });
  } else {
    res.status(401).json({ error: 'No autorizado' });
  }
}

module.exports = checkAuth;
