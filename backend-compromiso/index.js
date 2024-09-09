// @ts-nocheck
const express = require('express');
require('dotenv').config();
const { DATABASE_CLIENT, DATABASE_HOST, DATABASE_PORT, DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD } = process.env;
const cors = require('cors');
const sequelize = require('./config/database.js');
const logger = require('./config/logger.js');

// Importa los routers
const responsablesRouter = require('./src/api/responsable/routes/responsableRoutes.js');
const procesosRouter = require('./src/api/proceso/routes/Routesproceso.js');
const procedimientosRouter = require('./src/api/procedimiento/routes/procedimientoRoutes.js');
const areasRouter = require('./src/api/area/routes/areaRoutes.js');
const unidadesRouter = require('./src/api/unidad/routes/unidadRoutes.js');
const formatosRouter = require('./src/api/formato/routes/formatoRoutes.js');
const usuariosRouter = require('./src/api/usuario/routes/usuarioRoutes.js');
// Nota: La ruta de autenticación ha sido eliminada

// // Importa Swagger
const { swaggerDocs, swaggerSetup } = require('./swagger.js');

const app = express();
const port = process.env.PORT || 3001; 

// Configura CORS
const allowedOrigins = ['http://localhost:5173', 'http://localhost:3000'];
app.use(cors({
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Origen no permitido por CORS'));
    }
  },
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type, Authorization',
}));

app.use(express.json());

// Ruta para la raíz del servidor
app.get('/', (req, res) => {
  res.send('Bienvenido al API de Compromiso!');
});



app.use('/api-docs', swaggerDocs, swaggerSetup);


// Rutas de la API
app.use('/api/responsables', responsablesRouter);
app.use('/api/procesos', procesosRouter);
app.use('/api/procedimientos', procedimientosRouter);
app.use('/api/areas', areasRouter);
app.use('/api/unidades', unidadesRouter);
app.use('/api/formatos', formatosRouter);
app.use('/api/usuarios', usuariosRouter);

// Manejo de errores 404 (ruta no encontrada)
app.use((req, res, next) => {
  res.status(404).send('Ruta no encontrada');
});

// Manejo de errores generales
app.use((err, req, res, next) => {
  logger.error(`Error: ${err.message}, Ruta: ${req.originalUrl}`, { metadata: err });
  res.status(500).send('Error interno del servidor');
});

// Conexión a la base de datos y arranque del servidor
sequelize.sync()
  .then(() => {
    console.log('Conexión exitosa a la base de datos');
    app.listen(port, () => {
      console.log(`Servidor corriendo en http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.error('Error al conectar con la base de datos:', err);
  });

