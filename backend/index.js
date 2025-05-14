const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { db } = require('./db');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Formato de fecha compatible con MySQL
function formatDateToMySQL(datetime) {
  return new Date(datetime).toISOString().slice(0, 19).replace('T', ' ');
}

app.post('/agendar', async (req, res) => {
  try {
    const { nombre, correo, fechaInicio, fechaFin } = req.body;

    // Convertir fechas al formato correcto
    const inicio = formatDateToMySQL(fechaInicio);
    const fin = formatDateToMySQL(fechaFin);

    // Validación: no permitir citas en el pasado
    if (new Date(inicio) < new Date()) {
      return res.status(400).json({ mensaje: 'No puedes agendar una cita en el pasado.' });
    }

    // Validación: máximo 1 cita por día por correo
    const [citasDelDia] = await db.execute(`
      SELECT COUNT(*) AS total FROM citas 
      WHERE correo = ? AND DATE(fecha_inicio) = CURDATE()
    `, [correo]);

    if (citasDelDia[0].total >= 1) {
      return res.status(400).json({ mensaje: 'Ya tienes una cita agendada para hoy.' });
    }

    // Validación: evitar solapamiento de horarios
    const [solapadas] = await db.execute(`
      SELECT * FROM citas 
      WHERE (? < fecha_fin AND ? > fecha_inicio)
    `, [inicio, fin]);

    if (solapadas.length > 0) {
      return res.status(400).json({ mensaje: 'Ese horario ya está ocupado. Intenta con otro.' });
    }

    // Crear evento (Meet ficticio por ahora)
    const evento = await crearEvento({ nombre, correo, fechaInicio: inicio, fechaFin: fin });

    // Guardar cita
    await db.execute(`
      INSERT INTO citas (nombre, correo, fecha_inicio, fecha_fin, enlace_meet)
      VALUES (?, ?, ?, ?, ?)
    `, [nombre, correo, inicio, fin, evento.hangoutLink]);

    res.json({
      mensaje: 'Cita agendada correctamente',
      meetLink: evento.hangoutLink
    });

  } catch (err) {
    console.error('ERROR EN BACKEND:', err);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

app.get('/citas', async (req, res) => {
    try {
      const [citas] = await db.execute(`
        SELECT id, nombre, correo, fecha_inicio, fecha_fin, enlace_meet, creado_en
        FROM citas
        ORDER BY fecha_inicio DESC
      `);
      res.json(citas);
    } catch (err) {
      console.error('Error al obtener citas:', err);
      res.status(500).json({ mensaje: 'Error al obtener citas' });
    }
  });


  const { enviarCorreoContacto } = require('./mailer');

  app.post('/contacto', async (req, res) => {
    try {
      const { nombre, empresa, web, email, telefono, mensaje } = req.body;
  
      await enviarCorreoContacto({ nombre, empresa, web, email, telefono, mensaje });
  
      res.status(200).json({ mensaje: 'Mensaje enviado correctamente.' });
    } catch (err) {
      console.error('Error al enviar contacto:', err);
      res.status(500).json({ mensaje: 'Error al enviar el mensaje.' });
    }
  });
  