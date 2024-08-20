const { DataTypes } = require('sequelize');
const sequelize = require('C:/COMPROMISO/backend-compromiso/config/database.js');

const Responsable = sequelize.define('Responsable', {
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
    defaultValue: 'No',
  },
}, {
  tableName: 'responsable',
  timestamps: true,
});

module.exports = Responsable;
