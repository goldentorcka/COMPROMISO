const { DataTypes } = require('sequelize');
const sequelize = require('../../../../config/database.js');

const Usuario = sequelize.define('usuarios', {
  id_usuario: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  rol: {
    type: DataTypes.STRING(15),
    allowNull: false,
  },
  nombre_usuario: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
  usuario: {
    type: DataTypes.STRING(30),
    allowNull: false,
    unique: true,
  },
  contrasena: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(200),
    allowNull: false,
    unique: true,
  },
  estado: {
    type: DataTypes.ENUM('Activo', 'Inactivo'),
    allowNull: false,
    defaultValue: 'Activo',
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
  // Opción para definir los hooks si se necesitan
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
Usuario.sync();

module.exports = Usuario;
