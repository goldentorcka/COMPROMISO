// @ts-nocheck
const { DataTypes } = require('sequelize');
const sequelize = require('C:/COMPROMISO/backend-compromiso/config/database.js');
const Responsable = require('../../responsable/models/responsibleModel.js');
const Procedimiento = require('../../procedimiento/models/procedimientoModel.js');

const Documento = sequelize.define('documentos', {
  Id_Documento: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  Cod_Documento: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: /^[a-zA-Z0-9-_]+$/i // Permite solo letras, números, guiones y guiones bajos
    }
  },
  Fec_Elaboracion_Documento: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  Ver_Documento: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  estado: {
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
  Nom_Documento: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: /^[a-zA-Z0-9\s]+$/ // Permite solo letras, números y espacios
    }
  },
  Nom_Documento_Magnetico: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: /^[a-zA-Z0-9\s]+$/ // Permite solo letras, números y espacios
    }
  },
  Id_Procedimiento: {
    type: DataTypes.INTEGER,
    references: {
      model: Procedimiento,
      key: 'Id_Procedimiento',
    },
  },
}, {
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
});

// Relación con la tabla `Responsable`
Responsable.hasMany(Documento, { foreignKey: 'Id_Responsable' });
Documento.belongsTo(Responsable, { foreignKey: 'Id_Responsable' });

// Relación con la tabla `Procedimiento`
Procedimiento.hasMany(Documento, { foreignKey: 'Id_Procedimiento' });
Documento.belongsTo(Procedimiento, { foreignKey: 'Id_Procedimiento' });

module.exports = Documento;
