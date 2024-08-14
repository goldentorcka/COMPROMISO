const { Sequelize } = require('sequelize');

// Configurar la conexión a la base de datos
const sequelize = new Sequelize('calgdocs', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false, // Puedes cambiar esto a true para ver las consultas SQL en la consola
});

module.exports = sequelize;
