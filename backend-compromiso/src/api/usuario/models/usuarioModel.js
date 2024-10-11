// @ts-nocheck
const { DataTypes } = require('sequelize');
const sequelize = require('../../../../config/database.js');

const Usuario = sequelize.define('usuarios', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  reset_token: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  reset_token_expiry: {
    type: DataTypes.TIME, // Cambiado a TIME
    allowNull: true,
  },
  estado: {
    type: DataTypes.ENUM('Activo', 'Inactivo'),
    allowNull: false,
    defaultValue: 'Activo',
  },
}, {
  freezeTableName: true, // Evita que Sequelize pluralice el nombre de la tabla
  timestamps: true, // Agrega automáticamente createdAt y updatedAt
  hooks: {
    beforeUpdate: (usuario) => {
      usuario.updatedAt = new Date();
    },
    beforeCreate: (usuario) => {
      usuario.createdAt = new Date();
    },
  },
});

// Sincronizar el modelo con la base de datos (opcional, solo si es necesario)
// Usuario.sync();

module.exports = Usuario;
