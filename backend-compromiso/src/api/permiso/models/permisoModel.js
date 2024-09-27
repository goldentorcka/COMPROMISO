// @ts-nocheck
// src/models/permiso.js
const { DataTypes } = require('sequelize');
const sequelize = require('../../../../config/database');

const Permiso = sequelize.define('Permiso', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'permisos', // Nombre de la tabla en la base de datos
  timestamps: false, // Desactiva las columnas createdAt y updatedAt
});

module.exports = Permiso;
