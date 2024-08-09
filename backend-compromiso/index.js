const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const winston = require('winston');

const app = express();
const port = 1337;

// Configuración de Winston
const logger = winston.createLogger({
  level: 'error',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'errors.log', level: 'error' })
  ],
});

// Configuración de Sequelize
const sequelize = new Sequelize('calgdocs', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

const Proceso = sequelize.define('Proceso', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  estado: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

app.use(express.json());

// Ruta para registrar un proceso
app.post('/api/procesos', async (req, res) => {
  try {
    const { nombre, estado } = req.body;
    const nuevoProceso = await Proceso.create({ nombre, estado });
    res.status(201).json(nuevoProceso);
  } catch (error) {
    logger.error('Error en la ruta /api/procesos', { metadata: error });
    res.status(500).send('Error al registrar el proceso');
  }
});

// Middleware para capturar errores
app.use((err, req, res, next) => {
  logger.error(err.message, { metadata: err });
  res.status(500).send('Algo salió mal');
});

sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
  });
});
