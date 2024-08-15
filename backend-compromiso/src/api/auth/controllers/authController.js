const jwt = require('jsonwebtoken');
const Usuario = require('../../usuario/models/usuarioModel.js'); // Asegúrate de que la ruta sea correcta
const logger = require('../../../../config/logger.js');
const jwtConfig = require('../../../../config/jwtConfig.js');

const { jwtSecret, jwtExpiresIn } = jwtConfig;

const login = async (req, res) => {
  try {
    // Busca el usuario por Cod_Usuario
    const usuario = await Usuario.findOne({ where: { Cod_Usuario: req.body.Cod_Usuario } });

    if (usuario) {
      // Genera un token JWT
      const token = jwt.sign(
        { id: usuario.Id_Usuario, Cod_Usuario: usuario.Cod_Usuario }, 
        jwtSecret, 
        { expiresIn: jwtExpiresIn }
      );

      // Envía el token al cliente
      res.status(200).json({ token });
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    logger.error(error.message, { stack: error.stack });
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = { login };
