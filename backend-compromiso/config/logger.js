  // @ts-nocheck
const { createLogger, format, transports } = require('winston');
const path = require('path');
const fs = require('fs');

// Verificar y crear la carpeta de logs si no existe
const logDirectory = path.join(__dirname, '../logs');
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory); // Crear la carpeta si no existe
}

// Configuración del logger
const logger = createLogger({
  level: 'error', // Solo registrar errores
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }), // Agregar la pila de errores
    format.json() // Formato JSON para facilidad de análisis
  ),
  transports: [
    // Registrar en la consola
    new transports.Console({
      format: format.combine(
        format.colorize(), // Agregar colores a la consola
        format.simple()
      )
    }),
    // Registrar en un archivo de logs
    new transports.File({ 
      filename: path.join(logDirectory, 'error.log'), // Guardar en la carpeta "logs"
      level: 'error' 
    })
  ],
});

// Middleware para capturar cualquier error en la aplicación
const logError = (error, req, res, next) => {
  const errorData = {
    message: error.message,
    stack: error.stack,
    url: req.url,
    method: req.method,
    headers: req.headers,
    body: req.body
  };

  logger.error(errorData); // Registrar error con todos los detalles

  // Devolver la respuesta de error
  res.status(500).json({ message: 'Error interno del servidor' });
};

// Capturar errores no manejados en la aplicación
process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', error);
  process.exit(1); // Salir después de registrar el error
});

module.exports = { logger, logError };
