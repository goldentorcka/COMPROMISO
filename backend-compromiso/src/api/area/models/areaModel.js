// @ts-nocheck
const { DataTypes } = require('sequelize');
const sequelize = require('C:/COMPROMISO/backend-compromiso/config/database.js');

const Area = sequelize.define('area', {
  Id_Area: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  Nom_Area: {
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

module.exports = Area;