// @ts-nocheck
// models/usuarioModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../../../../config/database.js'); // Configuración de la base de datos

const Usuario = sequelize.define('usuario', {
  Id_Usuario: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    field: 'Id_Usuario', // Asegúrate de que el nombre del campo coincida con el de la base de datos
  },
  Nom_Usuario: {
    type: DataTypes.STRING(255),
    allowNull: false,
    field: 'Nom_Usuario',
  },
  Ape_Usuario: {
    type: DataTypes.STRING(255),
    allowNull: false,
    field: 'Ape_Usuario',
  },
  Cod_Usuario: {
    type: DataTypes.STRING(50),
    allowNull: false,
    field: 'Cod_Usuario',
  },
  Cor_Usuario: {
    type: DataTypes.STRING(255),
    allowNull: false,
    field: 'Cor_Usuario',
  },
  Nde_Usuario: {
    type: DataTypes.STRING(20),
    allowNull: false,
    field: 'Nde_Usuario',
  },
  Fec_Usuario: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'Fec_Usuario',
  },
  estado: {
    type: DataTypes.ENUM('Sí', 'No'),
    allowNull: false,
    field: 'estado',
  },
  rol: {
    type: DataTypes.ENUM('Administrador'),
    allowNull: false,
    field: 'rol',
  },
  token: {
    type: DataTypes.STRING(255),
    field: 'token',
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
    field: 'password',
  },
}, {
  timestamps: true,
  createdAt: 'createdAt', // Asegúrate de que estos nombres coincidan con los nombres de tus campos
  updatedAt: 'updatedAt',
});

module.exports = Usuario;
