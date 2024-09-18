// @ts-nocheck
const nodemailer = require('nodemailer');

const emailOlvidePassword = async ({ Cor_User, Nom_User, token }) => {
  const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com', // O el servicio de correo que uses
    port: 465, // Puerto SMTP
    secure: true, // true si usas el puerto 465, false para otros
    auth: {
      user: process.env.EMAIL_USER, // Correo electrónico para enviar
      pass: process.env.EMAIL_PASS, // Contraseña del correo electrónico
    },
  });

  // Contenido del email
  const mailOptions = {
    from: 'Nombre del Proyecto <tuemail@gmail.com>',
    to: Cor_User,
    subject: 'Restablece tu contraseña en [Nombre del Proyecto]',
    html: `
      <p>Hola, ${Nom_User},</p>
      <p>Has solicitado restablecer tu contraseña. Haz clic en el siguiente enlace para generar una nueva contraseña:</p>
      <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Restablecer contraseña</a>
      <p>Si no solicitaste este cambio, puedes ignorar este mensaje.</p>
    `,
  };

  try {
    await transport.sendMail(mailOptions);
    console.log('Correo de restablecimiento de contraseña enviado con éxito');
  } catch (error) {
    console.log('Error al enviar el correo:', error);
  }
};

module.exports = emailOlvidePassword;
