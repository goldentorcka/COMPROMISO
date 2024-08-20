const { createLogger, format, transports } = require('winston');
const path = require('path');

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
    // Registrar en un archivo dentro de una carpeta específica
    new transports.File({ 
      filename: path.join('logs', 'error.log'), // Guardar en la carpeta "logs"
      level: 'error' 
    })
  ],
});

module.exports = logger;
