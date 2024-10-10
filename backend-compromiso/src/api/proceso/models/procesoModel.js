// @ts-nocheck
const { DataTypes } = require('sequelize');
const sequelize = require('../../../../config/database.js');

const Proceso = sequelize.define('proceso', {
  id_proceso: {
    type: DataTypes.BIGINT(20), // Tamaño especificado
    primaryKey: true,
    autoIncrement: true,
    field: 'id_proceso' // Nombre de la columna en la base de datos
  },
  nombre_proceso: {
    type: DataTypes.STRING(300),
    allowNull: false,
    field: 'nombre_proceso' // Nombre de la columna en la base de datos
  },
  nombre_directorio_proceso: {
    type: DataTypes.STRING(300),
    allowNull: true,
    field: 'nombre_directorio_proceso' // Nombre de la columna en la base de datos
  },
  estado: {
    type: DataTypes.ENUM('Activo', 'Inactivo'),
    allowNull: false,
    field: 'estado' // Nombre de la columna en la base de datos
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'createdAt', // Nombre de la columna en la base de datos
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'updatedAt', // Nombre de la columna en la base de datos
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'proceso', // Nombre de la tabla en singular y en minúsculas
  timestamps: true // Sequelize manejará automáticamente createdAt y updatedAt
});

module.exports = Proceso;
