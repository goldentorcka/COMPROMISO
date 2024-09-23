// @ts-nocheck
const { DataTypes } = require('sequelize');
const sequelize = require('C:/COMPROMISO/backend-compromiso/config/database.js');
const Responsable = require('../../responsable/models/responsibleModel.js');

const Proceso = sequelize.define('proceso', {
  Id_Proceso: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  Nom_Proceso: {
    type: DataTypes.STRING(300), // Ajustado al tamaño especificado
    allowNull: false,
  },
  Tip_Proceso: {
    type: DataTypes.ENUM('Proceso de Innovacion', 'Proceso de Valor', 'Proceso de Apoyo'),
    allowNull: false,
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

Responsable.hasMany(Proceso, { foreignKey: 'Id_Responsable' });
Proceso.belongsTo(Responsable, { foreignKey: 'Id_Responsable' });

module.exports = Proceso;
