// @ts-nocheck
const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../../../../config/database.js');

const Usuario = sequelize.define('usuarios', {
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
    type: DataTypes.STRING(255),
    allowNull: false
  },
  Cor_Usuario: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  Fec_Usuario: {
    type: DataTypes.DATE,
    allowNull: false
  },
  estado: {
    type: DataTypes.ENUM('Sí', 'No'),
    allowNull: false
  },
  rol: {
    type: DataTypes.ENUM('Administrador'),
    allowNull: false
  },
  token: {
    type: DataTypes.STRING(255)
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false
  }
}, {
  timestamps: true, // createdAt y updatedAt automáticos
  tableName: 'usuarios' // Asegura que coincida con el nombre de la tabla en la base de datos
});

module.exports = Usuario;


