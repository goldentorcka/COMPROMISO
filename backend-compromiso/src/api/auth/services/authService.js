// @ts-nocheck

const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../../../../config/jwtConfig');

function generateToken(user) {
  // Crear un payload para el token
  const payload = { username: user.username };

  // Firmar el token con la clave secreta
  return jwt.sign(payload, jwtSecret, { expiresIn: '1h' });
}

module.exports = { generateToken };
