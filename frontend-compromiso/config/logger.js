// backend-compromiso/config/logger.js
const winston = require('winston');
const path = require('path');

// Configuración del logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
    new winston.transports.File({
      filename: path.join(__dirname, '..', 'logs', 'archivo.log'),
      level: 'info',
    }),
  ],
});

// Asegúrate de crear la carpeta 'logs' en la raíz de tu proyecto
// mkdir -p backend-compromiso/logs

module.exports = logger;
