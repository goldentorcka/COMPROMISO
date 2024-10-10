// @ts-nocheck
const { DataTypes } = require('sequelize');
const sequelize = require('../../../../config/database.js');
const Responsable = require('../../responsable/models/responsibleModel.js');
const Procedimiento = require('../../procedimiento/models/procedimientoModel.js');

const Documento = sequelize.define('documentos', {
  id_documento: {
    type: DataTypes.BIGINT(20),
    autoIncrement: true,
    primaryKey: true,
    field: 'id_documento' // Nombre de la columna en la base de datos
  },
  id_procedimiento: {
    type: DataTypes.BIGINT(20),
    references: {
      model: Procedimiento,
      key: 'id_procedimiento',
    },
    field: 'id_procedimiento' // Nombre de la columna en la base de datos
  },
  nombre_documento: {
    type: DataTypes.STRING(300),
    allowNull: false,
    field: 'nombre_documento' // Nombre de la columna en la base de datos
  },
  nombre_documento_magnetico: {
    type: DataTypes.STRING(300),
    allowNull: false,
    field: 'nombre_documento_magnetico', // Nombre de la columna en la base de datos
    comment: 'Ruta del archivo Excel' // Se usa para almacenar la ruta del archivo Excel subido
  },
  nombre_documento_visualizacion: {
    type: DataTypes.STRING(300),
    allowNull: false,
    field: 'nombre_documento_visualizacion', // Nombre de la columna en la base de datos
    comment: 'Nombre del archivo PDF generado' // Se usa para almacenar el nombre del archivo PDF generado
  },
  tipo_documento: {
    type: DataTypes.STRING(20),
    allowNull: false,
    field: 'tipo_documento' // Nombre de la columna en la base de datos
  },
  codigo: {
    type: DataTypes.STRING(500),
    allowNull: false,
    field: 'codigo' // Nombre de la columna en la base de datos
  },
  version: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'version' // Nombre de la columna en la base de datos
  },
  fecha_elaboracion: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'fecha_elaboracion' // Nombre de la columna en la base de datos
  },
  id_responsable: {
    type: DataTypes.BIGINT(20),
    references: {
      model: Responsable,
      key: 'id_responsable',
    },
    field: 'id_responsable' // Nombre de la columna en la base de datos
  },
  estado: {
    type: DataTypes.ENUM('Activo', 'Inactivo'),
    allowNull: false,
    field: 'estado' // Nombre de la columna en la base de datos
  },
}, {
  tableName: 'documentos', // Nombre de la tabla en plural y en minúsculas
  timestamps: true, // Sequelize manejará automáticamente createdAt y updatedAt
  createdAt: 'createdAt', // Nombre del campo para la fecha de creación
  updatedAt: 'updatedAt', // Nombre del campo para la fecha de actualización
});

// Relación con la tabla `Responsable`
Responsable.hasMany(Documento, { foreignKey: 'id_responsable' });
Documento.belongsTo(Responsable, { foreignKey: 'id_responsable' });

// Relación con la tabla `Procedimiento`
Procedimiento.hasMany(Documento, { foreignKey: 'id_procedimiento' });
Documento.belongsTo(Procedimiento, { foreignKey: 'id_procedimiento' });

module.exports = Documento;
