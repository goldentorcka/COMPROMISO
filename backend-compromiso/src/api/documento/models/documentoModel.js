// @ts-nocheck
// models/formato.js
const { DataTypes } = require('sequelize');
const sequelize = require('C:/COMPROMISO/backend-compromiso/config/database.js');
const Responsable = require('../../responsable/models/responsibleModel.js');
const Procedimiento = require('../../procedimiento/models/procedimientoModel.js');
const Unidad = require('../../unidad/models/unidadModel.js');

const Formato = sequelize.define('Formato', {
  Id_Formato: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  Cod_Formato: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Fec_Actualizacion: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  Ver_Formato: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Est_Formato: {
    type: DataTypes.ENUM('Activo', 'Inactivo'),
    allowNull: false,
  },
  Id_Responsable: {
    type: DataTypes.INTEGER,
    references: {
      model: Responsable,
      key: 'Id_Responsable',
    },
  },
  Nom_Formato: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Nom_Magnetico: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Id_Procedimiento: {
    type: DataTypes.INTEGER,
    references: {
      model: Procedimiento,
      key: 'Id_Procedimiento',
    },
  },
  Id_Unidad: {
    type: DataTypes.INTEGER,
    references: {
      model: Unidad,
      key: 'Id_Unidad',
    },
  },
}, {
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
});

Responsable.hasMany(Formato, { foreignKey: 'Id_Responsable' });
Procedimiento.hasMany(Formato, { foreignKey: 'Id_Procedimiento' });
Unidad.hasMany(Formato, { foreignKey: 'Id_Unidad' });

Formato.belongsTo(Responsable, { foreignKey: 'Id_Responsable' });
Formato.belongsTo(Procedimiento, { foreignKey: 'Id_Procedimiento' });
Formato.belongsTo(Unidad, { foreignKey: 'Id_Unidad' });

module.exports = Formato;
