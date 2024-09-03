const Usuario = require('../../usuario/models/usuarioModel.js');
const logger = require('../../../../config/logger.js');

const buscarUsuarioPorCodigo = async (req, res) => {
  try {
    const usuario = await Usuario.findOne({ where: { Cod_Usuario: req.params.codUsuario } });

    if (usuario) {
      console.log(usuario.contraseña); // Ejemplo de acceso a la propiedad 'contraseña'
      res.status(200).json({ contraseña: usuario.contraseña });
    } else {
      console.log('Usuario no encontrado');
      res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
  } catch (error) {
    logger.error('Error al buscar el usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = { buscarUsuarioPorCodigo };
