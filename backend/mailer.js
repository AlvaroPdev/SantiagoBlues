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

// 📧 Para citas agendadas
async function enviarCorreo({ nombre, correo, fechaInicio, fechaFin, enlace }) {
  const mailOptions = {
    from: `"Santiago Blues" <${process.env.CORREO_ORIGEN}>`,
    to: process.env.CORREO_DESTINO,
    subject: 'Nueva cita agendada',
    html: `
      <h3>📅 Nueva cita recibida</h3>
      <p><strong>Nombre:</strong> ${nombre}</p>
      <p><strong>Correo del cliente:</strong> ${correo}</p>
      <p><strong>Inicio:</strong> ${fechaInicio}</p>
      <p><strong>Fin:</strong> ${fechaFin}</p>
      <p><strong>Enlace Meet:</strong> <a href="${enlace}" target="_blank">${enlace}</a></p>
    `
  };

  await transporter.sendMail(mailOptions);
}

// 📩 Para formulario de contacto
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

// Exportar ambas funciones
module.exports = {
  enviarCorreo,
  enviarCorreoContacto
};
