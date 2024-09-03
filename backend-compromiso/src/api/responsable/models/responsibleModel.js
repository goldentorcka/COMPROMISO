// @ts-nocheck
const { DataTypes } = require('sequelize');
const sequelize = require('C:/COMPROMISO/backend-compromiso/config/database.js');

const Responsable = sequelize.define('responsable', {
  Id_Responsable: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  Nom_Responsable: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  estado: {
    type: DataTypes.ENUM('Sí', 'No'),
    allowNull: false,
  },
}, {
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
});

module.exports = Responsable;
