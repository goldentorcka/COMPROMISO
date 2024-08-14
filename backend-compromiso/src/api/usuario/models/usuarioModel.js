const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../../../config/database.js');

// Definición del modelo Usuario
class Usuario extends Model {}

Usuario.init(
  {
    Id_Usuario: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Nom_Usuario: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    Ape_Usuario: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    Cod_Usuario: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    Cor_Usuario: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    Nde_Usuario: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    Fec_Usuario: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rol: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    estado: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: 'Activo',
    },
  },
  {
    sequelize,
    modelName: 'Usuario',
    tableName: 'usuarios',
    timestamps: true, // Para incluir createdAt y updatedAt
  }
);

module.exports = Usuario;
