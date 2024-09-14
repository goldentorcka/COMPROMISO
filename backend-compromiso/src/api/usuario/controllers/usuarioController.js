const Usuario = require('../models/usuario');
const logger = require('../config/logger'); // Asumiendo que el logger está en config/logger.js

// Validación de campos no vacíos y tipos de datos
const validarDatosUsuario = (data) => {
  const { Nom_Usuario, Ape_Usuario, Cod_Usuario, Cor_Usuario, Nde_Usuario, Fec_Usuario, estado, rol, token, password } = data;

  if (!Nom_Usuario || !Ape_Usuario || !Cod_Usuario || !Cor_Usuario || !Nde_Usuario || !Fec_Usuario || !estado || !rol || !password) {
    return { error: 'Todos los campos son obligatorios.' };
  }

  // Validar que el nombre y apellido sean solo texto
  const nombreRegex = /^[A-Za-z\s]+$/;
  if (!nombreRegex.test(Nom_Usuario)) {
    return { error: 'El nombre solo puede contener letras.' };
  }
  if (!nombreRegex.test(Ape_Usuario)) {
    return { error: 'El apellido solo puede contener letras.' };
  }

  // Validar que Cod_Usuario sea un valor numérico
  const codigoRegex = /^[0-9]+$/;
  if (!codigoRegex.test(Cod_Usuario)) {
    return { error: 'El código del usuario solo puede contener números.' };
  }

  // Validar el correo electrónico
  const correoRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (!correoRegex.test(Cor_Usuario)) {
    return { error: 'El correo electrónico no es válido.' };
  }

  // Validar que Nde_Usuario (número de documento) sea numérico
  if (!codigoRegex.test(Nde_Usuario)) {
    return { error: 'El número de documento solo puede contener números.' };
  }

  return null;
};

// Crear un nuevo usuario con validaciones
const crearUsuario = async (req, res) => {
  const { Nom_Usuario, Ape_Usuario, Cod_Usuario, Cor_Usuario, Nde_Usuario, Fec_Usuario, estado, rol, token, password } = req.body;

  // Validar los datos antes de proceder
  const validacionError = validarDatosUsuario(req.body);
  if (validacionError) {
    return res.status(400).json(validacionError);
  }

  try {
    const nuevoUsuario = await Usuario.create({
      Nom_Usuario,
      Ape_Usuario,
      Cod_Usuario,
      Cor_Usuario,
      Nde_Usuario,
      Fec_Usuario,
      estado,
      rol,
      token,
      password
    });
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    logger.error(error.message); // Captura solo el mensaje del error
    res.status(500).json({ error: 'Error al crear el usuario.' });
  }
};

// Actualizar un usuario con validaciones
const actualizarUsuario = async (req, res) => {
  const { id } = req.params;
  const { Nom_Usuario, Ape_Usuario, Cod_Usuario, Cor_Usuario, Nde_Usuario, Fec_Usuario, estado, rol, token, password } = req.body;

  // Validar los datos antes de proceder
  const validacionError = validarDatosUsuario(req.body);
  if (validacionError) {
    return res.status(400).json(validacionError);
  }

  try {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado.' });
    }

    usuario.Nom_Usuario = Nom_Usuario;
    usuario.Ape_Usuario = Ape_Usuario;
    usuario.Cod_Usuario = Cod_Usuario;
    usuario.Cor_Usuario = Cor_Usuario;
    usuario.Nde_Usuario = Nde_Usuario;
    usuario.Fec_Usuario = Fec_Usuario;
    usuario.estado = estado;
    usuario.rol = rol;
    usuario.token = token;
    usuario.password = password;

    await usuario.save();
    res.json(usuario);
  } catch (error) {
    logger.error(error.message); // Captura solo el mensaje del error
    res.status(500).json({ error: 'Error al actualizar el usuario.' });
  }
};

// Eliminar un usuario
const eliminarUsuario = async (req, res) => {
  const { id } = req.params;

  try {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado.' });
    }

    await usuario.destroy();
    res.json({ message: 'Usuario eliminado correctamente.' });
  } catch (error) {
    logger.error(error.message); // Captura solo el mensaje del error
    res.status(500).json({ error: 'Error al eliminar el usuario.' });
  }
};

module.exports = {
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario
};
