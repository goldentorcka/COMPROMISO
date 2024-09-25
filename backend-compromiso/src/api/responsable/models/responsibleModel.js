// @ts-nocheck
const { DataTypes } = require('sequelize');
const sequelize = require('../../../../config/database.js');

const Responsable = sequelize.define('responsables', {
  Id_Responsable: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'Id_Responsable' // Nombre de la columna en la base de datos
  },
  Nom_Responsable: {
    type: DataTypes.STRING(255),
    allowNull: false,
    field: 'Nom_Responsable' // Nombre de la columna en la base de datos
  },
  estado: {
    type: DataTypes.ENUM('Activo', 'Inactivo'),
    allowNull: false,
    field: 'estado' // Nombre de la columna en la base de datos
  }, 
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'createdAt' // Nombre de la columna en la base de datos
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'updatedAt' // Nombre de la columna en la base de datos
  }
}, {
  tableName: 'responsables', // Nombre de la tabla en minúsculas
  timestamps: true // Sequelize manejará los campos createdAt y updatedAt automáticamente
});

module.exports = Responsable;
