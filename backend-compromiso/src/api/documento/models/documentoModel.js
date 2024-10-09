// @ts-nocheck
const { DataTypes } = require('sequelize');
const sequelize = require('C:/COMPROMISO/backend-compromiso/config/database.js');
const Responsable = require('../../responsable/models/responsibleModel.js');
const Procedimiento = require('../../procedimiento/models/procedimientoModel.js');

const Documento = sequelize.define('documentos', {
  id_documento: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  id_procedimiento: {
    type: DataTypes.BIGINT,
    references: {
      model: Procedimiento,
      key: 'id_procedimiento',
    },
  },
  nombre_documento: {
    type: DataTypes.STRING(300),
    allowNull: false,
  },
  nombre_documento_magnetico: {
    type: DataTypes.STRING(300),
    allowNull: false,
  },
  nombre_documento_visualizacion: {
    type: DataTypes.STRING(300),
    allowNull: false,
  },
  tipo_documento: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  codigo: {
    type: DataTypes.STRING(500),
    allowNull: false,
  },
  version: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  fecha_elaboracion: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  id_responsable: {
    type: DataTypes.BIGINT,
    references: {
      model: Responsable,
      key: 'id_responsable',
    },
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

// Relación con la tabla `Responsable`
Responsable.hasMany(Documento, { foreignKey: 'id_responsable' });
Documento.belongsTo(Responsable, { foreignKey: 'id_responsable' });

// Relación con la tabla `Procedimiento`
Procedimiento.hasMany(Documento, { foreignKey: 'id_procedimiento' });
Documento.belongsTo(Procedimiento, { foreignKey: 'id_procedimiento' });

module.exports = Documento;
