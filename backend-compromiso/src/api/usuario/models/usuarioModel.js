// @ts-nocheck
const { DataTypes } = require('sequelize');
const sequelize = require('../../../../config/database.js');

const Usuario = sequelize.define('Usuario', {
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
    validate: {
      isEmail: true, // Valida que el correo sea una dirección válida
    },
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
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  resetPasswordToken: {
    type: DataTypes.STRING,
  },
  resetPasswordExpires: {
    type: DataTypes.DATE,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'usuarios',
  timestamps: true,
});

module.exports = Usuario;
