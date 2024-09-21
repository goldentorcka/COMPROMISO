// @ts-nocheck
const { DataTypes } = require('sequelize');
const sequelize = require('../../../../config/database.js');

const Responsable = sequelize.define('Responsables', {
  Id_Responsable: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'Id_Responsable' // Asegúrate de usar el nombre de la columna en la base de datos
  },
  Nom_Responsable: {
    type: DataTypes.STRING(255),
    allowNull: false,
    field: 'Nom_Responsable' // Asegúrate de usar el nombre de la columna en la base de datos
  },
  estado: {
    type: DataTypes.ENUM('Sí', 'No'),
    allowNull: false
  }, 
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'createdAt' // Asegúrate de usar el nombre de la columna en la base de datos
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'updatedAt' // Asegúrate de usar el nombre de la columna en la base de datos
  }
}, {
  tableName: 'responsables', // Asegúrate de que el nombre de la tabla esté en minúsculas
  timestamps: true // Esto hará que Sequelize maneje los campos createdAt y updatedAt automáticamente
});

module.exports = Responsable;
