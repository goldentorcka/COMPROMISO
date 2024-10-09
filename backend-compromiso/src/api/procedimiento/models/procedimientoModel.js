// @ts-nocheck
const { DataTypes } = require('sequelize');
const sequelize = require('../../../../config/database.js');

const Procedimiento = sequelize.define('procedimiento', {
  id_procedimiento: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre_procedimiento: {
    type: DataTypes.STRING(300),
    allowNull: false,
    validate: {
      notEmpty: { msg: "El nombre del procedimiento no puede estar vacío." },
      isAlpha: { msg: "El nombre del procedimiento solo puede contener letras." },
      noSpecialChars(value) {
        const regex = /^[a-zA-Z\s]*$/;
        if (!regex.test(value)) {
          throw new Error("El nombre del procedimiento no puede contener números, puntos, comas o caracteres especiales.");
        }
      },
    },
  },
  id_proceso: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  nombre_directorio_procedimiento: {
    type: DataTypes.STRING(300),
    allowNull: true, // Puedes cambiar a false si es obligatorio
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

module.exports = Procedimiento;
