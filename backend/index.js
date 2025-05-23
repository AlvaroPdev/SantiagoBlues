const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { db } = require('./db');
const { enviarCorreoContacto } = require('./mailer');
const compression = require('compression');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const formLimiter = require('./middleware/formLimiter');
require('dotenv').config();

const app = express();

// Ruta de prueba simple
app.get('/test', (req, res) => {
  res.json({
    status: 'success',
    message: 'Ruta de prueba funcionando',
    config: {
      helmet: 'Activo',
      rateLimit: 'Activo',
      cors: 'Activo'
    }
  });
});

// Configuración de seguridad y rendimiento
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      connectSrc: ["'self'", "http://localhost:3000", "https://assets.calendly.com", "https://m.stripe.network"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
      fontSrc: ["'self'", "https:", "data:"],
      frameSrc: ["'self'", "https://calendly.com"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: []
    }
  },
  crossOriginEmbedderPolicy: false,
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

app.use(compression());
app.use(cors({
  origin: ['http://localhost:4200', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(bodyParser.json());

// Configuración de rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100 // límite de 100 peticiones por ventana
});
app.use(limiter);

// Cache en memoria para respuestas frecuentes
const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos

// Función para normalizar el texto
const normalizarTexto = (texto) => {
  return texto.toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '')
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

// Middleware para manejo de errores
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ mensaje: 'Error interno del servidor' });
};

// 📬 Ruta para formulario de contacto
app.post('/contacto', formLimiter, async (req, res, next) => {
  try {
    const { nombre, empresa, web, email, telefono, mensaje } = req.body;
    
    // Validación básica
    if (!nombre || !email || !mensaje) {
      return res.status(400).json({ 
        status: 'error',
        message: 'Por favor completa todos los campos requeridos.' 
      });
    }

    // Validación de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        status: 'error',
        message: 'Por favor ingresa un email válido.' 
      });
    }

    await enviarCorreoContacto({ nombre, empresa, web, email, telefono, mensaje });
    res.status(200).json({ 
      status: 'success',
      message: 'Mensaje enviado correctamente.' 
    });
  } catch (err) {
    next(err);
  }
});

// 💬 Ruta del chatbot con lógica de respuesta + registro
app.post('/chatbot', async (req, res, next) => {
  try {
    const { mensaje } = req.body;
    if (!mensaje) {
      return res.status(400).json({ mensaje: 'El mensaje es requerido' });
    }

    // Verificar caché
    const cacheKey = `chatbot:${mensaje}`;
    const cachedResponse = cache.get(cacheKey);
    if (cachedResponse && Date.now() - cachedResponse.timestamp < CACHE_DURATION) {
      return res.json(cachedResponse.data);
    }

    let respuesta = 'Lo siento, no entendí tu pregunta. ¿Podrías reformularla?';
    let mostrarBoton = false;

    // Palabras clave predefinidas
    const palabrasClave = {
      precio: [
        'precio', 'precios', 'cuanto', 'cuánto', 'costo', 'costos', 
        'tarifa', 'tarifas', 'valor', 'valores', 'pagar', 'pago', 
        'cuesta', 'cuestan', 'vale', 'valen', 'cobran', 'cobro'
      ],
      ubicacion: [
        'ubicacion', 'ubicación', 'donde', 'dónde', 'direccion', 
        'dirección', 'oficina', 'oficinas', 'local', 'locales', 
        'sucursal', 'sucursales', 'lugar', 'lugares', 'direccion',
        'dirección', 'sede', 'sedes', 'estan', 'están', 'encuentran'
      ],
      agendar: [
        'agendar', 'cita', 'citas', 'reunion', 'reunión', 'llamada', 
        'llamadas', 'videollamada', 'videollamadas', 'meet', 'meeting', 
        'consulta', 'consultas', 'asesoria', 'asesoría', 'agenda',
        'programar', 'programación', 'programacion'
      ],
      contacto: [
        'contacto', 'contactar', 'hablar', 'comunicar', 'escribir', 
        'email', 'correo', 'mensaje', 'mensajes', 'whatsapp', 'telefono', 
        'teléfono', 'llamar', 'comunicarse', 'escribirnos', 'contactarnos'
      ],
      servicios: [
        'servicio', 'servicios', 'ofreces', 'ofrecen', 'haces', 
        'hacen', 'trabajas', 'trabajan', 'desarrollas', 'desarrollan', 
        'diseñas', 'diseñan', 'hacen', 'realizan', 'ofrecen', 'brindan'
      ],
      tiempo: [
        'tiempo', 'tiempos', 'duracion', 'duración', 'cuando', 'cuándo', 
        'plazo', 'plazos', 'dias', 'días', 'semanas', 'meses', 'rapido', 
        'rápido', 'lento', 'inmediato', 'demora', 'tardan', 'tarda'
      ],
      saludo: [
        'hola', 'buenas', 'buenos dias', 'buenos días', 'buenas tardes', 
        'buenas noches', 'saludos', 'que tal', 'qué tal', 'buen dia',
        'buen día', 'buena tarde', 'buena noche'
      ],
      personaHorario: [
        'quien', 'quién', 'persona', 'atendera', 'atenderá', 'atender', 
        'horario', 'horarios', 'dias', 'días', 'laboral', 'laborales',
        'disponibilidad', 'disponible', 'cuando', 'cuándo', 'hora', 'horas'
      ],
      experiencia: [
        'experiencia', 'años', 'proyectos', 'clientes', 'trabajos', 'portafolio',
        'metodologia', 'metodología', 'proceso', 'como', 'cómo', 'funciona',
        'garantia', 'garantía', 'seguridad', 'confianza', 'referencias'
      ]
    };

    // Respuestas predefinidas
    const respuestas = {
      precio: 'Los precios varían según las necesidades específicas de cada proyecto. Para conocer el valor exacto de tu proyecto, ve al botón "Agendar" en el inicio de nuestra web y agenda una videollamada. En la llamada podremos evaluar tus necesidades y darte un presupuesto personalizado.',
      ubicacion: 'Estamos ubicados en Santiago, Chile. Trabajamos principalmente de forma remota para ofrecer un mejor servicio y precios más accesibles.',
      agendar: 'Ve al botón "Agendar" que se encuentra en el inicio de nuestra web para agendar una cita. Allí podrás seleccionar el horario que mejor te acomode.',
      contacto: 'Puedes contactarnos directamente por:\n📧 Email: santiagoblues@gmail.com\n📱 Teléfono: +56 9 1234 5678\n\nO si prefieres, usa el botón "Agendar" para programar una llamada.',
      servicios: 'Ofrecemos varios servicios:\n1. Diseño y desarrollo de sitios web\n2. Gestión mensual de sitios web\n3. Publicidad digital (Google Ads y Meta Ads)\n4. Auditoría SEO\n\nPara más información, ve al botón "Agendar" en el inicio de nuestra web.',
      tiempo: 'Los tiempos varían según el servicio:\n- Sitios web: 2-4 semanas\n- Gestión mensual: Inicio inmediato\n- Publicidad digital: 1-2 semanas para configuración\n- Auditoría SEO: 1 semana\n\nPara consultar disponibilidad, ve al botón "Agendar" en el inicio de nuestra web.',
      personaHorario: 'Te atenderá NN, nuestro especialista en desarrollo web y marketing digital. Horario de atención: Lunes a Viernes 9:00 AM - 18:00 PM',
      experiencia: 'Contamos con más de 5 años de experiencia en desarrollo web y marketing digital. Nuestra metodología incluye:\n\n1. Análisis inicial de necesidades\n2. Propuesta personalizada\n3. Desarrollo iterativo\n4. Pruebas y optimización\n5. Soporte continuo\n\nOfrecemos garantía en todos nuestros servicios y trabajamos con contratos claros para tu tranquilidad.',
      saludo: '¡Hola! 👋 Soy el asistente de SantiagoBlues. ¿En qué puedo ayudarte hoy?'
    };

    // Buscar coincidencias
    for (const [tipo, palabras] of Object.entries(palabrasClave)) {
      if (contienePalabraClave(mensaje, palabras)) {
        respuesta = respuestas[tipo];
        break;
      }
    }

    // Guardar en caché
    cache.set(cacheKey, {
      data: { respuesta },
      timestamp: Date.now()
    });

    // Guardar en base de datos solo si es relevante
    if (esInteraccionRelevante(mensaje, respuesta)) {
      try {
        await db.execute(
          'INSERT INTO interacciones (mensaje_usuario, respuesta_bot) VALUES (?, ?)',
          [mensaje, respuesta]
        );
      } catch (dbError) {
        console.error('Error al guardar en la base de datos:', dbError);
      }
    }

    res.status(200).json({ respuesta });

  } catch (err) {
    next(err);
  }
});

// 🧾 Ruta para consultar citas con caché
app.get('/citas', async (req, res, next) => {
  try {
    const cacheKey = 'citas';
    const cachedCitas = cache.get(cacheKey);
    
    if (cachedCitas && Date.now() - cachedCitas.timestamp < CACHE_DURATION) {
      return res.json(cachedCitas.data);
    }

    const [citas] = await db.execute(`
      SELECT id, nombre, correo, fecha_inicio, fecha_fin, enlace_meet, creado_en
      FROM citas
      ORDER BY fecha_inicio DESC
    `);

    cache.set(cacheKey, {
      data: citas,
      timestamp: Date.now()
    });

    res.json(citas);
  } catch (err) {
    next(err);
  }
});

// 🚀 Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
