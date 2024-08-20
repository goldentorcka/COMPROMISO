require('dotenv').config();
const { Sequelize } = require('sequelize');

// Configurar la conexión a la base de datos usando variables de entorno
const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USERNAME,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    dialect: process.env.DATABASE_CLIENT,
    logging: false, 
  }
);

module.exports = sequelize;
