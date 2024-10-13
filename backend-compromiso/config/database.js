// @ts-nocheck
require('dotenv').config();
const { Sequelize } = require('sequelize');

// Declara sequelize fuera del bloque try-catch
let sequelize;

try {
  sequelize = new Sequelize(
    process.env.DATABASE_NAME,
    process.env.DATABASE_USERNAME,
    process.env.DATABASE_PASSWORD, // Usa una cadena vacía si DATABASE_PASSWORD no está definida
    {
      host: process.env.DATABASE_HOST,
      dialect: process.env.DATABASE_CLIENT,
      logging: false, 
    }
  );

  // Prueba la conexión
  sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
  }).catch(err => {
    console.error('Unable to connect to the database:', err);
  });
} catch (error) {
  console.error('Error in Sequelize configuration:', error);
}

// Exporta sequelize fuera del bloque try-catch
module.exports = sequelize;