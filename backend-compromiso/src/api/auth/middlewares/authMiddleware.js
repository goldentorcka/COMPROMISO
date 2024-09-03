const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../../../../config/jwtConfig.js');

function authenticateJWT(req, res, next) {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.sendStatus(401); // No autorizado
  }

  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) {
      return res.sendStatus(403); // Prohibido
    }

    req.user = user;
    next();
  });
}

module.exports = authenticateJWT;
