const { DataTypes } = require('sequelize');
const sequelize = require('C:/COMPROMISO/backend-compromiso/config/database.js');

const Area = sequelize.define('Area', {
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
    defaultValue: 'No',
  },
}, {
  tableName: 'area',
  timestamps: true,
});

module.exports = Area;
