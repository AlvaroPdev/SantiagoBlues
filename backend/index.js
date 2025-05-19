const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { db } = require('./db');
const { enviarCorreoContacto } = require('./mailer');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Función para normalizar el texto
const normalizarTexto = (texto) => {
  return texto.toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Elimina acentos
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '') // Elimina puntuación
    .trim();
};

// Función para verificar si el mensaje contiene alguna palabra clave
const contienePalabraClave = (mensaje, palabras) => {
  const mensajeNormalizado = normalizarTexto(mensaje);
  return palabras.some(palabra => mensajeNormalizado.includes(normalizarTexto(palabra)));
};

// Función para determinar si una interacción es relevante
const esInteraccionRelevante = (mensaje, respuesta) => {
  const mensajeNormalizado = normalizarTexto(mensaje);
  const palabrasRelevantes = [
    'precio', 'costo', 'valor', 'tarifa',
    'servicio', 'servicios',
    'agendar', 'cita', 'reunion',
    'contacto', 'contactar',
    'tiempo', 'duracion', 'plazo'
  ];
  
  return palabrasRelevantes.some(palabra => mensajeNormalizado.includes(palabra)) ||
         respuesta.includes('botón "Agendar"');
};

// 📬 Ruta para formulario de contacto
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

// 💬 Ruta del chatbot con lógica de respuesta + registro
app.post('/chatbot', async (req, res) => {
  try {
    const { mensaje } = req.body;
    if (!mensaje) {
      return res.status(400).json({ mensaje: 'El mensaje es requerido' });
    }

    let respuesta = 'Lo siento, no entendí tu pregunta. ¿Podrías reformularla?';
    let mostrarBoton = false;

    // Palabras clave para precios
    const palabrasPrecio = [
      'precio', 'precios', 'cuanto', 'cuánto', 'costo', 'costos', 
      'tarifa', 'tarifas', 'valor', 'valores', 'pagar', 'pago', 
      'cuesta', 'cuestan', 'vale', 'valen', 'cobran', 'cobro'
    ];

    // Palabras clave para ubicación
    const palabrasUbicacion = [
      'ubicacion', 'ubicación', 'donde', 'dónde', 'direccion', 
      'dirección', 'oficina', 'oficinas', 'local', 'locales', 
      'sucursal', 'sucursales', 'lugar', 'lugares', 'direccion',
      'dirección', 'sede', 'sedes', 'estan', 'están', 'encuentran'
    ];

    // Palabras clave para agendar
    const palabrasAgendar = [
      'agendar', 'cita', 'citas', 'reunion', 'reunión', 'llamada', 
      'llamadas', 'videollamada', 'videollamadas', 'meet', 'meeting', 
      'consulta', 'consultas', 'asesoria', 'asesoría', 'agenda',
      'programar', 'programación', 'programacion'
    ];

    // Palabras clave para contacto
    const palabrasContacto = [
      'contacto', 'contactar', 'hablar', 'comunicar', 'escribir', 
      'email', 'correo', 'mensaje', 'mensajes', 'whatsapp', 'telefono', 
      'teléfono', 'llamar', 'comunicarse', 'escribirnos', 'contactarnos'
    ];

    // Palabras clave para servicios
    const palabrasServicios = [
      'servicio', 'servicios', 'ofreces', 'ofrecen', 'haces', 
      'hacen', 'trabajas', 'trabajan', 'desarrollas', 'desarrollan', 
      'diseñas', 'diseñan', 'hacen', 'realizan', 'ofrecen', 'brindan'
    ];

    // Palabras clave para tiempo
    const palabrasTiempo = [
      'tiempo', 'tiempos', 'duracion', 'duración', 'cuando', 'cuándo', 
      'plazo', 'plazos', 'dias', 'días', 'semanas', 'meses', 'rapido', 
      'rápido', 'lento', 'inmediato', 'demora', 'tardan', 'tarda'
    ];

    // Palabras clave para saludos
    const palabrasSaludo = [
      'hola', 'buenas', 'buenos dias', 'buenos días', 'buenas tardes', 
      'buenas noches', 'saludos', 'que tal', 'qué tal', 'buen dia',
      'buen día', 'buena tarde', 'buena noche'
    ];

    // Palabras clave para persona/horarios
    const palabrasPersonaHorario = [
      'quien', 'quién', 'persona', 'atendera', 'atenderá', 'atender', 
      'horario', 'horarios', 'dias', 'días', 'laboral', 'laborales',
      'disponibilidad', 'disponible', 'cuando', 'cuándo', 'hora', 'horas'
    ];

    // Palabras clave para experiencia y metodología
    const palabrasExperiencia = [
      'experiencia', 'años', 'proyectos', 'clientes', 'trabajos', 'portafolio',
      'metodologia', 'metodología', 'proceso', 'como', 'cómo', 'funciona',
      'garantia', 'garantía', 'seguridad', 'confianza', 'referencias'
    ];

    // Verificar si el mensaje contiene alguna palabra clave
    if (contienePalabraClave(mensaje, palabrasPrecio)) {
      respuesta = 'Los precios varían según las necesidades específicas de cada proyecto. Para conocer el valor exacto de tu proyecto, ve al botón "Agendar" en el inicio de nuestra web y agenda una videollamada. En la llamada podremos evaluar tus necesidades y darte un presupuesto personalizado.';
    } 
    else if (contienePalabraClave(mensaje, palabrasUbicacion)) {
      respuesta = 'Estamos ubicados en Santiago, Chile. Trabajamos principalmente de forma remota para ofrecer un mejor servicio y precios más accesibles.';
    } 
    else if (contienePalabraClave(mensaje, palabrasAgendar)) {
      respuesta = 'Ve al botón "Agendar" que se encuentra en el inicio de nuestra web para agendar una cita. Allí podrás seleccionar el horario que mejor te acomode.';
    } 
    else if (contienePalabraClave(mensaje, palabrasContacto)) {
      respuesta = 'Puedes contactarnos directamente por:\n📧 Email: santiagoblues@gmail.com\n📱 Teléfono: +56 9 1234 5678\n\nO si prefieres, usa el botón "Agendar" para programar una llamada.';
    }
    else if (contienePalabraClave(mensaje, palabrasServicios)) {
      respuesta = 'Ofrecemos varios servicios:\n' +
                 '1. Diseño y desarrollo de sitios web\n' +
                 '2. Gestión mensual de sitios web\n' +
                 '3. Publicidad digital (Google Ads y Meta Ads)\n' +
                 '4. Auditoría SEO\n\n' +
                 'Para más información, ve al botón "Agendar" en el inicio de nuestra web.';
    }
    else if (contienePalabraClave(mensaje, palabrasTiempo)) {
      respuesta = 'Los tiempos varían según el servicio:\n' +
                 '- Sitios web: 2-4 semanas\n' +
                 '- Gestión mensual: Inicio inmediato\n' +
                 '- Publicidad digital: 1-2 semanas para configuración\n' +
                 '- Auditoría SEO: 1 semana\n\n' +
                 'Para consultar disponibilidad, ve al botón "Agendar" en el inicio de nuestra web.';
    }
    else if (contienePalabraClave(mensaje, palabrasPersonaHorario)) {
      respuesta = 'Te atenderá NN, nuestro especialista en desarrollo web y marketing digital. Horario de atención: Lunes a Viernes 9:00 AM - 18:00 PM';
    }
    else if (contienePalabraClave(mensaje, palabrasExperiencia)) {
      respuesta = 'Contamos con más de 5 años de experiencia en desarrollo web y marketing digital. Nuestra metodología incluye:\n\n' +
                 '1. Análisis inicial de necesidades\n' +
                 '2. Propuesta personalizada\n' +
                 '3. Desarrollo iterativo\n' +
                 '4. Pruebas y optimización\n' +
                 '5. Soporte continuo\n\n' +
                 'Ofrecemos garantía en todos nuestros servicios y trabajamos con contratos claros para tu tranquilidad.';
    }
    else if (contienePalabraClave(mensaje, palabrasSaludo)) {
      respuesta = '¡Hola! 👋 Soy el asistente de SantiagoBlues. ¿En qué puedo ayudarte hoy?';
    }

    try {
      // Guardar en base de datos solo si es una interacción relevante
      if (esInteraccionRelevante(mensaje, respuesta)) {
        await db.execute(
          'INSERT INTO interacciones (mensaje_usuario, respuesta_bot) VALUES (?, ?)',
          [mensaje, respuesta]
        );
      }
    } catch (dbError) {
      console.error('Error al guardar en la base de datos:', dbError);
      // Continuamos aunque falle la base de datos
    }

    res.status(200).json({ respuesta });

  } catch (err) {
    console.error('Error en /chatbot:', err);
    res.status(500).json({ mensaje: 'Ocurrió un error en el chatbot.' });
  }
});

// 🧾 Ruta para consultar citas (si las mantienes por algún motivo adicional)
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

// 🚀 Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
