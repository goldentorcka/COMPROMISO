// @ts-nocheck
const { DataTypes } = require('sequelize');
const sequelize = require('C:/COMPROMISO/backend-compromiso/config/database.js'); // Ajusta la ruta a tu configuración de base de datos

const Unidad = sequelize.define('Unidad', {
  Id_Unidad: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  Nom_Unidad: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Id_Area: {
    type: DataTypes.INTEGER,
    // Aquí puedes definir la referencia más tarde en una relación
    // referencia: { model: 'Area', key: 'Id_Area' } (si decides usarla aquí)
  },
  estado: {
    type: DataTypes.ENUM('Sí', 'No'),
    allowNull: false,
    defaultValue: 'No',
  },
}, {
  tableName: 'unidad',
  timestamps: true,
});

module.exports = Unidad;
