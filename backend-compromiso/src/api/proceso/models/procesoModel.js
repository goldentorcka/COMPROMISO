const { DataTypes } = require('sequelize');
const sequelize = require('C:/COMPROMISO/backend-compromiso/config/database.js');

const Proceso = sequelize.define('Proceso', {
  Id_Proceso: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  Nom_Proceso: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Id_Responsable: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Responsable', // Usar el nombre del modelo en lugar de importar
      key: 'Id_Responsable',
    },
  },
  estado: {
    type: DataTypes.ENUM('Sí', 'No'),
    allowNull: false,
    defaultValue: 'No',
  },
}, {
  tableName: 'proceso',
  timestamps: true,
});

module.exports = Proceso;
