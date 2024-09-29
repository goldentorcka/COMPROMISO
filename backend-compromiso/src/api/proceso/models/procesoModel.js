// @ts-nocheck
const { DataTypes } = require('sequelize');
const sequelize = require('../../../../config/database.js');

const Proceso = sequelize.define('procesos', {
  Id_Proceso: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  Nom_Proceso: {
    type: DataTypes.STRING(300),
    allowNull: false,
    validate: {
      notEmpty: { msg: "El nombre del proceso no puede estar vacío." },
      isAlpha: { msg: "El nombre del proceso solo puede contener letras." },
      noSpecialChars(value) {
        const regex = /^[a-zA-Z\s]*$/;
        if (!regex.test(value)) {
          throw new Error("El nombre del proceso no puede contener números, puntos, comas o caracteres especiales.");
        }
      },
    },
  },
  Tip_Proceso: {
    type: DataTypes.ENUM('Proceso de Innovacion', 'Proceso de Valor', 'Proceso de Apoyo'),
    allowNull: false,
  },
  estado: {
    type: DataTypes.ENUM('Activo', 'Inactivo'),
    allowNull: false,
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
}, {
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
});

module.exports = Proceso;
