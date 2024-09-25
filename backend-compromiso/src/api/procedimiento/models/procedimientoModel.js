// @ts-nocheck
const { DataTypes } = require('sequelize');
const sequelize = require('C:/COMPROMISO/backend-compromiso/config/database.js');
const Proceso = require('../../proceso/models/procesoModel');

const Procedimiento = sequelize.define('procedimientos', {
  Id_Procedimiento: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  Nom_Procedimiento: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: /^[A-Za-zñÑáéíóúÁÉÍÓÚ\s]+$/i, // Solo letras y espacios
    },
  },
  Id_Proceso: {
    type: DataTypes.INTEGER,
    references: {
      model: Proceso,
      key: 'Id_Proceso',
    },
    allowNull: false,
  },
  estado: {
    type: DataTypes.ENUM('Activo', 'Inactivo'),
    allowNull: false,
  },
}, {
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
});

// Definición de las relaciones
Proceso.hasMany(Procedimiento, { foreignKey: 'Id_Proceso' });
Procedimiento.belongsTo(Proceso, { foreignKey: 'Id_Proceso' });

module.exports = Procedimiento;
