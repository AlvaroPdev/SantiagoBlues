const rateLimit = require('express-rate-limit');

// Rate limiter específico para el formulario de contacto
const formLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hora
  max: 3, // máximo 3 intentos por hora
  message: {
    status: 'error',
    message: 'Has enviado demasiados mensajes. Por favor, intenta más tarde.'
  },
  standardHeaders: true,
  legacyHeaders: false,
  // Solo aplicar a la ruta de contacto
  skip: (req) => req.path !== '/contacto'
});

module.exports = formLimiter; 