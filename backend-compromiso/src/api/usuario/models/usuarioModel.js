// @ts-nocheck
// models/usuarioModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Configuración de la base de datos

const Usuario = sequelize.define('Usuario', {
  Id_Usuario: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  Nom_Usuario: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  Ape_Usuario: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  Cod_Usuario: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  Cor_Usuario: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  Nde_Usuario: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  Fec_Usuario: {
    type: DataTypes.DATE,
    allowNull: true
  },
  estado: {
    type: DataTypes.ENUM('Sí', 'No'),
    defaultValue: 'Sí'
  },
  createdAt: {
    type: DataTypes.TIMESTAMP,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.TIMESTAMP,
    defaultValue: DataTypes.NOW,
    onUpdate: DataTypes.NOW
  },
  rol: {
    type: DataTypes.ENUM('Administrador'),
    defaultValue: 'Administrador'
  },
  token: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false
  }
}, {
  tableName: 'usuario',
  timestamps: true
});

module.exports = Usuario;
