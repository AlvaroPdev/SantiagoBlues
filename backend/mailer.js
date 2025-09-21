const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: 'smtp.zoho.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.CORREO_ORIGEN,
    pass: process.env.CORREO_PASSWORD
  }
});

async function enviarCorreoContacto({ nombre, empresa, web, email, telefono, mensaje }) {
  const mailOptions = {
    from: `"Formulario de Contacto" <${process.env.CORREO_ORIGEN}>`,
    to: process.env.CORREO_DESTINO,
    subject: '📨 Nuevo mensaje de contacto',
    html: `
      <h3>📞 Nuevo formulario recibido</h3>
      <p><strong>Nombre:</strong> ${nombre}</p>
      <p><strong>Empresa:</strong> ${empresa}</p>
      <p><strong>Sitio Web:</strong> ${web}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Teléfono:</strong> ${telefono}</p>
      <p><strong>Mensaje:</strong><br/>${mensaje}</p>
    `
  };

  await transporter.sendMail(mailOptions);
}

module.exports = {
  enviarCorreoContacto
};
