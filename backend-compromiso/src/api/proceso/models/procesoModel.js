// @ts-nocheck
const { DataTypes } = require('sequelize');
const sequelize = require('../../../../config/database.js');

const Proceso = sequelize.define('procesos', {
  id_proceso: {
    type: DataTypes.BIGINT, // Cambiado a BIGINT para coincidir con la base de datos
    autoIncrement: true,
    primaryKey: true,
  },
  nombre_proceso: {
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
  nombre_directorio_proceso: {
    type: DataTypes.STRING(300),
    allowNull: true, // Se puede permitir que sea nulo si no se especifica
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
