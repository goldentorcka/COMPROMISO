const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/database.js'); // Ajusta la ruta si es necesario

const Proceso = sequelize.define('Proceso', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  nombre_proceso: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE(6),
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE(6),
    defaultValue: DataTypes.NOW,
  },
  published_at: {
    type: DataTypes.DATE(6),
  },
  created_by_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  updated_by_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
}, {
  tableName: 'procesos',
  timestamps: false,
});

module.exports = Proceso;
