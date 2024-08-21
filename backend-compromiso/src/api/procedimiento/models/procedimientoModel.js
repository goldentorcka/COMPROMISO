// @ts-nocheck
const { DataTypes } = require('sequelize');
const sequelize = require('C:/COMPROMISO/backend-compromiso/config/database.js');
const Proceso = require('../../proceso/models/procesoModel');

const Procedimiento = sequelize.define('Procedimiento', {
  Id_Procedimiento: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  Nom_Procedimiento: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Id_Proceso: {
    type: DataTypes.INTEGER,
    references: {
      model: Proceso,
      key: 'Id_Proceso',
    },
  },
  estado: {
    type: DataTypes.ENUM('Sí', 'No'),
    allowNull: false,
    defaultValue: 'No',
  },
}, {
  tableName: 'procedimiento',
  timestamps: true,
});

module.exports = Procedimiento;
