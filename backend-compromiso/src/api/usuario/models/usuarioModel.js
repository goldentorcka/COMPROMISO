// @ts-nocheck
const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../../../../config/database.js');

const Usuario = sequelize.define('usuario', {
  Id_Usuario: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  Nom_Usuario: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Ape_Usuario: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Cod_Usuario: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Cor_Usuario: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Nde_Usuario: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Fec_Usuario: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  estado: {
    type: DataTypes.ENUM('Sí', 'No'),
    allowNull: false,
  },
  rol: {
    type: DataTypes.ENUM('Administrador'),
    allowNull: false,
  },
  token: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
});

module.exports = Usuario;
