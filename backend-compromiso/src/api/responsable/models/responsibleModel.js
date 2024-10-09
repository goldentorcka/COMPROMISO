// @ts-nocheck
const { DataTypes } = require('sequelize');
const sequelize = require('../../../../config/database.js');

const Responsable = sequelize.define('responsable', {
  id_responsable: {
    type: DataTypes.BIGINT(20),
    primaryKey: true,
    autoIncrement: true,
    field: 'id_responsable' // Nombre de la columna en la base de datos
  },
  nombre_responsable: {
    type: DataTypes.STRING(500),
    allowNull: false,
    field: 'nombre_responsable' // Nombre de la columna en la base de datos
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
  tableName: 'responsable', // Nombre de la tabla en singular y en minúsculas
  timestamps: true // Sequelize manejará automáticamente createdAt y updatedAt
});

module.exports = Responsable;
