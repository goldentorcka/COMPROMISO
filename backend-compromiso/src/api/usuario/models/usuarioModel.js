// @ts-nocheck
const { DataTypes } = require('sequelize');
const sequelize = require('../../../../config/database.js');

const Usuario = sequelize.define('Usuario', {
  Id_Usuario: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
  },
  Rol_Usuario: {
      type: DataTypes.ENUM('SuperAdministrador', 'Administrador'),
      allowNull: false,
  },
  Nom_Usuario: {
      type: DataTypes.STRING(255),
      allowNull: false,
  },
  Usuario: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
  },
  Correo_Usuario: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
  },
  Contraseña_Usuario: {
      type: DataTypes.STRING(255),
      allowNull: false,
  },
  permisos: {
      type: DataTypes.JSON,
      allowNull: true,
  },
  estado: {
      type: DataTypes.ENUM('Activo', 'Inactivo'),
      allowNull: false,
      defaultValue: 'Activo',
  },
  createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
  },
  updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
  },
});

module.exports = Usuario;
