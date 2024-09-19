// @ts-nocheck
const { createLogger, format, transports } = require('winston');
const path = require('path');

// Configuración del logger
const logger = createLogger({
  level: 'error', // Solo registrar errores
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }), // Agregar la pila de errores
    format.json()
  ),
  transports: [
    // Registrar en la consola
    new transports.Console({
      format: format.combine(
        format.colorize(), // Agregar colores a la consola
        format.simple()
      )
    }),
    // Registrar en un archivo dentro de una carpeta específica
    new transports.File({ 
      filename: path.join(__dirname, '../logs/error.log'), // Guardar en la carpeta "logs" en la raíz del proyecto
      level: 'error' 
    })
  ],
});

// Agregar función para capturar errores y registrarlos
const logError = (error, req, res, next) => {
  const errorData = {
    message: error.message,
    stack: error.stack,
    url: req.url,
    method: req.method,
    headers: req.headers,
    body: req.body
  };

  logger.error(errorData);

  // Devolver la respuesta de error
  res.status(500).json({ message: 'Error interno del servidor' });
};

module.exports = { logger, logError };
