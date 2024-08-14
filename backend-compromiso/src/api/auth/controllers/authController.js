const Usuario = require('../../usuario/models/usuarioModel.js');
const logger = require('../../../../config/logger.js');

const buscarUsuarioPorCodigo = async (req, res) => {
  try {
    const usuario = await Usuario.findOne({ where: { Cod_Usuario: req.params.codUsuario } });

    if (usuario) {
      res.status(200).json({ password: usuario.password });
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    logger.error(error.message, { stack: error.stack });
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = { buscarUsuarioPorCodigo };
