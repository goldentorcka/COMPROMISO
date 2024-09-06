// @ts-nocheck
const nodemailer = require('nodemailer');

const emailRegistro = async ({ Cor_User, Nom_User, token }) => {
  const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com', // Configura el host del servicio de email
    port: 465, // El puerto que utiliza el servidor SMTP (depende de tu proveedor)
    secure: true, // true para el puerto 465, false para otros puertos
    auth: {
      user: process.env.EMAIL_USER, // Tu correo electrónico (usa variables de entorno)
      pass: process.env.EMAIL_PASS, // Tu contraseña de la cuenta
    },
  });

  // Contenido del email
  const mailOptions = {
    from: 'Nombre del Proyecto <tuemail@gmail.com>',
    to: Cor_User,
    subject: 'Confirma tu cuenta en [Nombre del Proyecto]',
    html: `
      <p>Hola, ${Nom_User},</p>
      <p>Gracias por registrarte en nuestro sitio web. Por favor, confirma tu cuenta haciendo clic en el siguiente enlace:</p>
      <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Confirmar Cuenta</a>
      <p>Si no solicitaste esta cuenta, puedes ignorar este mensaje.</p>
    `,
  };

  try {
    await transport.sendMail(mailOptions);
    console.log('Correo de confirmación enviado con éxito');
  } catch (error) {
    console.log('Error al enviar el correo:', error);
  }
};

module.exports = emailRegistro;
