// @ts-nocheck
const { DataTypes } = require('sequelize');
const sequelize = require('../../../../config/database.js');

const Procedimiento = sequelize.define('procedimiento', {
  id_procedimiento: {
    type: DataTypes.BIGINT(20),
    primaryKey: true,
    autoIncrement: true,
    field: 'id_procedimiento' // Nombre de la columna en la base de datos
  },
  nombre_procedimiento: {
    type: DataTypes.STRING(300),
    allowNull: false,
    field: 'nombre_procedimiento' // Nombre de la columna en la base de datos
  },
  id_proceso: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'id_proceso' // Nombre de la columna en la base de datos
  },
  nombre_directorio_procedimiento: {
    type: DataTypes.STRING(300),
    allowNull: true, // Cambiar a false si es obligatorio
    field: 'nombre_directorio_procedimiento' // Nombre de la columna en la base de datos
  },
  estado: {
    type: DataTypes.ENUM('Activo', 'Inactivo'),
    allowNull: false,
    field: 'estado' // Nombre de la columna en la base de datos
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    field: 'createdAt' // Nombre de la columna en la base de datos
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    field: 'updatedAt' // Nombre de la columna en la base de datos
  }
}, {
  tableName: 'procedimiento', // Nombre de la tabla en singular y en minúsculas
  timestamps: true // Sequelize manejará automáticamente createdAt y updatedAt
});

module.exports = Procedimiento;
