const { Model, DataTypes } = require('sequelize');
const sequelize = require('C:/COMPROMISO/backend-compromiso/config/database.js');

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
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    Cor_Usuario: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    Nde_Usuario: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    Fec_Usuario: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    estado: {
      type: DataTypes.ENUM('Sí', 'No'),
      allowNull: false,
    },
    rol: {
      type: DataTypes.ENUM('Administrador'),
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Usuario',
    tableName: 'usuario',
    timestamps: true, // Para incluir createdAt y updatedAt
  }
);

module.exports = Usuario;
