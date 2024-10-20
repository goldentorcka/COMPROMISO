const Usuario = requiere('../../usuario/models/usuarioModel.js';)
const { generarJWT } = requiere('../../../../helpers/generarJWT.js';)
const { generarToken } = requiere('../../../../helpers/generarTOKEN.js';)
const { emailRegistro } = requiere('../../../../helpers/emailRegister.js';)
const { emailOlvidePassword } = requiere('../../../../helpers/emailOlvidePassword.js';)
const bcrypt requiere('bcrypt';)
const logger requiere('../../../../config/logger.js';)

// Autenticar usuario
export const autenticar = async (req, res) => {
  const { Cor_Usuario, password } = req.body;
  try {
    const usuario = await Usuario.findOne({
      where: { Cor_Usuario: Cor_Usuario },
    });

    if (!usuario) {
      return res.status(404).json({ msg: "El usuario no existe o contraseña no válida!" });
    }

    if (!usuario.Confirmado) {
      return res.status(403).json({ msg: "Tu cuenta no está confirmada!" });
    }

    const passwordValido = await bcrypt.compare(password, usuario.password);
    if (passwordValido) {
      const token = generarJWT(usuario.Id_Usuario);
      res.json({
        Id_Usuario: usuario.Id_Usuario,
        Nom_Usuario: usuario.Nom_Usuario,
        Cor_Usuario: usuario.Cor_Usuario,
        token
      });
    } else {
      return res.status(403).json({ msg: "La contraseña es incorrecta!" });
    }
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ msg: "Error en la autenticación." });
  }
};

// Crear cuenta de usuario
export const CreateAccount = async (req, res) => {
  const { Cor_Usuario, Nom_Usuario, Id_Usuario, password } = req.body;

  try {
    const existeCorreo = await Usuario.findOne({
      where: { Cor_Usuario: Cor_Usuario },
    });

    if (existeCorreo) {
      return res.status(400).json({ msg: "El correo electrónico ya está en uso!" });
    }

    const existeUser = await Usuario.findOne({
      where: { Id_Usuario: Id_Usuario },
    });

    if (existeUser) {
      return res.status(400).json({ msg: "El documento ya está registrado!" });
    }

    // Encriptar la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await Usuario.create({
      ...req.body,
      password: hashedPassword,
      token: generarToken(),
      Confirmado: false,
    });

    // Enviar email de confirmación
    emailRegistro({
      Cor_Usuario,
      Nom_Usuario,
      token: newUser.token,
    });

    res.json({ msg: "Usuario creado correctamente. Revisa tu correo para confirmar tu cuenta." });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ msg: "Error al crear la cuenta." });
  }
};

// Confirmar cuenta de usuario
export const confirmar = async (req, res) => {
  const { token } = req.params;
  try {
    const usuarioConfirmar = await Usuario.findOne({ where: { token } });

    if (!usuarioConfirmar) {
      return res.status(404).json({ msg: "Token no válido" });
    }

    usuarioConfirmar.token = null;
    usuarioConfirmar.Confirmado = true;
    await usuarioConfirmar.save();

    res.json({ msg: "Cuenta confirmada correctamente" });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ msg: "Error al confirmar la cuenta." });
  }
};

// Olvidé contraseña
export const olvidePassword = async (req, res) => {
  const { Cor_Usuario } = req.body;
  try {
    const usuario = await Usuario.findOne({ where: { Cor_Usuario } });

    if (!usuario) {
      return res.status(404).json({ msg: "El usuario no existe" });
    }

    usuario.token = generarToken();
    await usuario.save();

    // Enviar email con instrucciones para restablecer contraseña
    emailOlvidePassword({
      Cor_Usuario,
      Nom_Usuario: usuario.Nom_Usuario,
      token: usuario.token,
    });

    res.json({ msg: "Hemos enviado un correo con las instrucciones!" });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ msg: "Error al enviar el correo." });
  }
};

// Restablecer contraseña
export const nuevoPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const usuario = await Usuario.findOne({ where: { token } });

    if (!usuario) {
      return res.status(404).json({ msg: "Token no válido" });
    }

    const salt = await bcrypt.genSalt(10);
    usuario.password = await bcrypt.hash(password, salt);
    usuario.token = null;

    await usuario.save();
    res.json({ msg: "Contraseña cambiada correctamente" });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ msg: "Error al cambiar la contraseña." });
  }
};

// Verificar token
export const comprobarToken = async (req, res) => {
  const { token } = req.params;
  const usuario = await Usuario.findOne({ where: { token } });

  if (usuario) {
    res.json({ msg: "Token válido y usuario existe" });
  } else {
    return res.status(404).json({ msg: "Token no válido" });
  }
};
