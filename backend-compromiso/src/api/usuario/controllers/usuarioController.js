// @ts-nocheck
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const sequelize = require('../../../../config/database.js'); // Cambié pool a sequelize
const Usuario = require('../models/usuarioModel.js'); // Cambié el modelo a 'Usuario'

// Configurar el servicio de correo
// const transporter = nodemailer.createTransport({
//   service: 'Gmail', // Puedes cambiar esto al servicio que prefieras
//   auth: {
//     user: process.env.EMAIL_USER, // Asegúrate de tener esto configurado en tu .env
//     pass: process.env.EMAIL_PASS, // Configura esto en tu .env
//   },
// });
const transporter = nodemailer.createTransport({
  service: 'gmail', // o el servicio que estés utilizando
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});



// Función para registrar un nuevo usuario
const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Crear el nuevo usuario usando Sequelize
    const newUser = await Usuario.create({
      username,
      email,
      password: hashedPassword,
      reset_Token: null, // Valor por defecto
      reset_token_expiry: null // Valor por defecto
    });

    console.log("Usuario creado exitosamente con los datos ===", newUser);
    res.status(201).json({ message: 'Usuario registrado exitosamente', user: newUser });
  } catch (error) {
    console.error('Error en el registro:', error);
    res.status(500).json({ message: 'Error en el registro' });
  }
};

// Función para iniciar sesión
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Busca al usuario usando Sequelize
    const user = await Usuario.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user: { id: user.id, username: user.username }, message: "Bienvenido al Sistema de Formatos De Sena Empresa" });
  } catch (error) {
    console.error('Error en el inicio de sesión:', error);
    res.status(500).json({ message: 'Error en el inicio de sesión' });
  }
};


const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    // Busca al usuario por correo usando Sequelize
    const user = await Usuario.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Genera un token de restablecimiento (válido por 1 hora)
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Configurar el envío de correo
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Restablecer tu contraseña',
      html: `
        <p>Para restablecer tu contraseña, haz clic en el siguiente enlace:</p>
        <a href="${process.env.FRONTEND_URL}/reset-password/${user.id}?token=${token}" style="text-decoration:none;">Restablecer contraseña</a>
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error al enviar el correo:', error);
        return res.status(500).json({ message: 'Error al enviar el correo' });
      }

      console.log('Correo enviado:', info.response);
      res.json({ message: 'Correo de restablecimiento enviado. Por favor revisa tu correo.', token });
    });
  } catch (error) {
    console.error('Error en forgot password:', error);
    res.status(500).json({ message: 'Error al procesar la solicitud' });
  }
};


// Función para actualizar la contraseña
const resetPassword = async (req, res) => {
  const { userId } = req.params;
  const { password, token } = req.body;

  if (!token) {
    return res.status(400).json({ message: 'Token es necesario' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.id !== parseInt(userId)) {
      return res.status(403).json({ message: 'Token inválido o expirado' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userIdInt = parseInt(userId);

    const result = await Usuario.update(
      { password: hashedPassword },
      { where: { id: userIdInt } }
    );

    if (result[0] === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json({ message: 'Contraseña actualizada exitosamente' });
  } catch (error) {
    console.error('Error al restablecer la contraseña:', error);
    res.status(500).json({ message: 'Error al restablecer la contraseña' });
  }
};

// Función para obtener todos los usuarios
const getUsuarios = async (req, res) => {
  try {
    const users = await Usuario.findAll(); // Cambié Users a Usuario
    if (users.length === 0) {
      return res.status(404).json({ message: 'No se encontraron usuarios' });
    }
    res.status(200).json(users);
  } catch (error) {
    console.error('Error en getUsuarios:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Exportar las funciones usando module.exports
module.exports = {
  register,
  login,
  forgotPassword,
  resetPassword,
  getUsuarios
};
