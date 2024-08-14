const Usuario = require('../../usuario/models/usuarioModel.js');

// Ejemplo de acceso a la propiedad 'password'
Usuario.findOne({ where: { Cod_Usuario: 'algunCodigo' } })
  .then(usuario => {
    if (usuario) {
      console.log(usuario.password);
    } else {
      console.log('Usuario no encontrado');
    }
  })
  .catch(error => {
    console.error('Error al buscar el usuario:', error);
  });