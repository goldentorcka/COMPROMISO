const { createLogger, format, transports } = require('winston');

// Configuración del logger
const logger = createLogger({
  level: 'error', // Solo registrar errores
  format: format.combine(
    format.timestamp(),
    format.json()
  ),
  transports: [
    // Registrar en la consola
    new transports.Console({
      format: format.simple()
    }),
    // Registrar en un archivo
    new transports.File({ filename: 'error.log', level: 'error' })
  ],
});

module.exports = logger;
