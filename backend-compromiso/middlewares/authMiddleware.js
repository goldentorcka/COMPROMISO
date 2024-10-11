// @ts-nocheck
const jwt = require('jsonwebtoken');
const sequelize = require('../config/database.js');

const authenticateToken = (req, res, next) => {
  // Obtén el token del encabezado Authorization
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Separa 'Bearer' del token

  // Si no hay token, devuelve un error 401 (No autorizado)
  if (token == null) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  // Verifica el token con la clave secreta
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido o expirado' });
    }

    // Si el token es válido, se añade el usuario a la request
    req.user = user;
    next(); // Procede a la siguiente función del middleware
  });
};

const isAdmin = async (req, res, next) => {
  try {
    const [usuarios] = await sequelize.query('SELECT role FROM usuarios WHERE id = ?', {
      replacements: [req.user.id],
      type: sequelize.QueryTypes.SELECT
    });

    if (usuarios.length > 0 && usuarios[0].role === 'administrador') {
      next();
    } else {
      res.status(403).json({ message: 'Acceso denegado. Se requiere rol de administrador.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al verificar el rol de usuario' });
  }
};

const rateLimiter = (req, res, next) => {
  // Implementación básica de rate limiting
  if (!req.ip) {
    return next();
  }

  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutos
  const maxRequests = 1000; // máximo número de solicitudes por ventana

  if (!global.rateLimit) {
    global.rateLimit = {};
  }

  if (!global.rateLimit[req.ip]) {
    global.rateLimit[req.ip] = {
      requests: 1,
      nextWindow: now + windowMs
    };
  } else if (now > global.rateLimit[req.ip].nextWindow) {
    global.rateLimit[req.ip] = {
      requests: 1,
      nextWindow: now + windowMs
    };
  } else {
    global.rateLimit[req.ip].requests++;
    if (global.rateLimit[req.ip].requests > maxRequests) {
      return res.status(429).json({ message: 'Demasiadas solicitudes, por favor intente más tarde.' });
    }
  }

  next();
};

// Exporta las funciones con module.exports
module.exports = {
  authenticateToken,
  isAdmin,
  rateLimiter
};
