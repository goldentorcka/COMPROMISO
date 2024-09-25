// @ts-nocheck
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const fs = require('fs');
const https = require('https');
const sequelize = require('./config/database.js');
const logger = require('./config/logger.js');

// Importa los routers
const responsablesRouter = require('./src/api/responsable/routes/responsableRoutes.js');
const procesosRouter = require('./src/api/proceso/routes/Routesproceso.js');
const procedimientosRouter = require('./src/api/procedimiento/routes/procedimientoRoutes.js');
const documentosRouter = require('./src/api/documento/routes/documentoRoutes.js');
const usuariosRouter = require('./src/api/usuario/routes/usuarioRoutes.js');
const asistenteRouter = require('./src/api/asistente/routes/asistenteRoutes.js');

// Importa Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const app = express();
const port = process.env.PORT || 3001;  // Usa el puerto del archivo .env

// Configuración de Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Compromiso',
      version: '1.0.0',
      description: 'Documentación de la API de Compromiso con funcionalidades de gestión de usuarios, procesos, procedimientos, áreas, unidades, documentos y responsables.',
    },
    servers: [{ url: `https://localhost:${port}`, description: 'Servidor local' }],
  },
  apis: ['./src/api/**/*.js'],
};

const swaggerSpecs = swaggerJsdoc(swaggerOptions);

// Configura Rate Limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 minutos
  max: 100,
  message: 'Demasiadas solicitudes de esta IP, por favor intente de nuevo después de 15 minutos.',
});
app.use('/api/', apiLimiter);

// Configura CORS
const allowedOrigins = ['http://localhost:5173', 'http://localhost:3000', 'https://tu-dominio-de-produccion.com'];
app.use(cors({
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error(`Origen no permitido por CORS: ${origin}`));
    }
  },
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type, Authorization',
}));

// Usa helmet para mayor seguridad
app.use(helmet());
app.use(helmet.frameguard({ action: 'deny' }));

// Parseo de JSON
app.use(express.json());

// Ruta para la raíz del servidor
app.get('/', (req, res) => {
  res.send('Bienvenido al API de Compromiso!');
});

// Documentación de la API con Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Rutas de la API
app.use('/api/responsables', responsablesRouter);
app.use('/api/procesos', procesosRouter);
app.use('/api/procedimientos', procedimientosRouter);
app.use('/api/documentos', documentosRouter);
app.use('/api/usuarios', usuariosRouter);
app.use('/api/asistente', asistenteRouter);

// Manejo de errores 404
app.use((req, res) => {
  res.status(404).send('Ruta no encontrada');
});

// Manejo de errores generales
app.use((err, req, res, next) => {
  logger.error(`Error: ${err.message}, Ruta: ${req.originalUrl}`, { metadata: err });
  res.status(500).json({ message: 'Error interno del servidor', error: err.message });
});

// Lee los certificados SSL solo si estamos en producción
let server;
if (process.env.NODE_ENV === 'production') {
  const privateKey = fs.readFileSync('localhost-key.pem', 'utf8');
  const certificate = fs.readFileSync('localhost.pem', 'utf8');
  const credentials = { key: privateKey, cert: certificate };

  server = https.createServer(credentials, app);
} else {
  server = app;
}

// Conexión a la base de datos y arranque del servidor
sequelize.authenticate()
  .then(() => {
    console.log('Conexión exitosa a la base de datos');
    server.listen(port, () => {
      console.log(`Servidor corriendo en ${process.env.NODE_ENV === 'production' ? 'HTTPS' : 'HTTP'}://localhost:${port}`);
    });
  })
  .catch(err => {
    logger.error(`Error al conectar con la base de datos: ${err.message}`);
    process.exit(1);  // Sale si no puede conectarse a la base de datos
  });
