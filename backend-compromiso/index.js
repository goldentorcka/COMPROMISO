const express = require('express');
require('dotenv').config();
const cors = require('cors'); // Importa el paquete CORS
const sequelize = require('./config/database.js');
const logger = require('./config/logger.js');

// Importa tus routers y middleware
const responsablesRouter = require('./src/api/responsable/routes/responsableRoutes.js');
const procesosRouter = require('./src/api/proceso/routes/Routesproceso.js');
const procedimientosRouter = require('./src/api/procedimiento/routes/procedimientoRoutes.js');
const areasRouter = require('./src/api/area/routes/areaRoutes.js');
const unidadesRouter = require('./src/api/unidad/routes/unidadRoutes.js');
const formatosRouter = require('./src/api/formato/routes/formatoRoutes.js');
const usuariosRouter = require('./src/api/usuario/routes/usuarioRoutes.js');
const authRouter = require('./src/api/auth/routes/authRoutes.js');
const authenticateJWT = require('./src/api/auth/middlewares/authMiddleware.js');

const app = express();
const port = process.env.PORT || 3000;

// Configura CORS
app.use(cors({
  origin: 'http://localhost:3000', // Cambia esto a la URL de tu frontend
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type',
}));

app.use(express.json());

// Ruta para la raíz del servidor
app.get('/', (req, res) => {
  res.send('Bienvenido al API de Compromiso!');
});

// Rutas de autenticación
app.use('/api/auth', authRouter);

// Rutas protegidas
app.use('/api/responsables', authenticateJWT, responsablesRouter);
app.use('/api/procesos', authenticateJWT, procesosRouter);
app.use('/api/procedimientos', authenticateJWT, procedimientosRouter);
app.use('/api/areas', authenticateJWT, areasRouter);
app.use('/api/unidades', authenticateJWT, unidadesRouter);
app.use('/api/formatos', authenticateJWT, formatosRouter);
app.use('/api/usuarios', authenticateJWT, usuariosRouter);

// Manejo de errores
app.use((err, req, res, next) => {
  logger.error(err.message, { metadata: err });
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
