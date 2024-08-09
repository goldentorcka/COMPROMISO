// backend-compromiso/src/api/documento/models/documentoModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/database.js'); // Ajusta la ruta si es necesario

const Documento = sequelize.define('Documento', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  tipo_documento: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  codigo: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  version: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  nombre_documento: {
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
  status: {
    type: DataTypes.ENUM('Activo', 'Inactivo'),
    defaultValue: 'Activo',
  },
}, {
  tableName: 'documentos',
  timestamps: false,
});

module.exports = Documento;
