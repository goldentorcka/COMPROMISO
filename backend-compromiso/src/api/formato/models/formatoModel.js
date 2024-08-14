// models/formato.js
const { DataTypes } = require('sequelize');
const sequelize = require('C:/COMPROMISO/backend-compromiso/config/database.js');

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
    type: DataTypes.ENUM('Sí', 'No'),
    allowNull: false,
    defaultValue: 'No',
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
    allowNull: false,
  },
  Id_Unidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'formato',
  timestamps: false,
});

module.exports = Formato;
