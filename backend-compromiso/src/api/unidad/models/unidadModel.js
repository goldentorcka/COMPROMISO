// @ts-nocheck
const { DataTypes } = require('sequelize');
const sequelize = require('C:/COMPROMISO/backend-compromiso/config/database.js'); // Ajusta la ruta a tu configuración de base de datos

const Area = require('../../area/models/areaModel.js');

const Unidad = sequelize.define('unidad', {
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
    references: {
      model: Area,
      key: 'Id_Area',
    },
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

Area.hasMany(Unidad, { foreignKey: 'Id_Area' });
Unidad.belongsTo(Area, { foreignKey: 'Id_Area' });

module.exports = Unidad;
