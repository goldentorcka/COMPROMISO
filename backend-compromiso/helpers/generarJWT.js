const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const generarJWT = (Id_User) => {
  return jwt.sign({ Id_User: Id_User }, process.env.JWT_SECRET, {
    expiresIn: '4h',
  });
};

module.exports = generarJWT;
