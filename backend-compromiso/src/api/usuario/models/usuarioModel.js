// @ts-nocheck
const { DataTypes } = require('sequelize');
const sequelize = require('../../../../config/database.js');

const Usuario = sequelize.define('Usuario', {
  Id_Usuario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'Id_Usuario'
  },
  Rol_Usuario: {
    type: DataTypes.ENUM('Administrador'),
    allowNull: false,
    field: 'Rol_Usuario'
  },
  Nom_Usuario: {
    type: DataTypes.STRING(255),
    allowNull: false,
    field: 'Nom_Usuario'
  },
  Usuario: {
    type: DataTypes.STRING(100),
    allowNull: false,
    field: 'Usuario'
  },
  Correo_Usuario: {
    type: DataTypes.STRING(255),
    allowNull: false,
    field: 'Correo_Usuario'
  },
  Contraseña_Usuario: {
    type: DataTypes.STRING(255),
    allowNull: false,
    field: 'Contraseña_Usuario'
  },
  estado: {
    type: DataTypes.ENUM('Activo', 'Inactivo'),
    allowNull: false,
    defaultValue: 'Activo', // Valor por defecto
    field: 'estado'
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'createdAt'
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'updatedAt'
  }
}, {
  tableName: 'usuarios',
  timestamps: true // Sequelize manejará createdAt y updatedAt automáticamente
});

module.exports = Usuario;
