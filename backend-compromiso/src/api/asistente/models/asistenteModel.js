// @ts-nocheck
const { DataTypes } = require('sequelize');
const sequelize = require('../../../../config/database');

const Asistente = sequelize.define('Asistente', {
  pregunta: {
    type: DataTypes.STRING,
    allowNull: false
  },
  respuesta: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  tableName: 'asistente',
  timestamps: true
});

module.exports = Asistente;
