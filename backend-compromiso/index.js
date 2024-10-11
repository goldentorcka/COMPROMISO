// @ts-nocheck
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const sequelize = require('./config/database.js');
const { logger } = require('./config/logger.js');
const usuariosRouter = require('./src/api/usuario/routes/usuarioRoutes.js');
// const checkAuth = require('./middlewares/authMiddleware.js');
const { body, validationResult } = require('express-validator'); // Importa express-validator

// Importa los routers
const responsablesRouter = require('./src/api/responsable/routes/responsableRoutes.js');
const procesosRouter = require('./src/api/proceso/routes/Routesproceso.js');
const procedimientosRouter = require('./src/api/procedimiento/routes/procedimientoRoutes.js');
const documentosRouter = require('./src/api/documento/routes/documentoRoutes.js');
const asistenteRouter = require('./src/api/asistente/routes/asistenteRoutes.js');
const permisosRouter = require('./src/api/permiso/routes/permisoRoutes'); // Importa las rutas de permisos

const app = express();
const port = process.env.PORT || 3001;  // Usa el puerto del archivo .env

// Configura Rate Limiting
const apiLimiter = rateLimit({
  windowMs: 3 * 60 * 1000,  // 3 minutos
  max: 1000,
  message: 'Demasiadas solicitudes de esta IP, por favor intente de nuevo después de 3 minutos.',
});
app.use('/api/', apiLimiter);

// Configura CORS
const allowedOrigins = ['http://localhost:5173', 'http://localhost:3000'];
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

// Aplica el middleware de autenticación
// app.use(checkAuth);

// Rutas de la API
app.use('/api/auth', usuariosRouter);
app.use('/api/responsables', responsablesRouter);
app.use('/api/procesos', procesosRouter);
app.use('/api/procedimientos', procedimientosRouter);
app.use('/api/documentos', documentosRouter);
app.use('/api/asistente', asistenteRouter);
app.use('/api/permisos', permisosRouter); // Usa las rutas de permisos

// Manejo de errores 404
app.use((req, res) => {
  res.status(404).send('Ruta no encontrada');
});

// Manejo de errores generales
app.use((err, req, res, next) => {
  logger.error(`Error: ${err.message}, Ruta: ${req.originalUrl}`, { metadata: err });
  res.status(500).json({ message: 'Error interno del servidor', error: err.message });
});

// Conexión a la base de datos y arranque del servidor
sequelize.authenticate()
  .then(() => {
    console.log('Conexión exitosa a la base de datos');
    app.listen(port, () => {
      console.log(`Servidor corriendo en http://localhost:${port}`);
    });
  })
  .catch(err => {
    logger.error(`Error al conectar con la base de datos: ${err.message}`);
    process.exit(1);  // Sale si no puede conectarse a la base de datos
  });
