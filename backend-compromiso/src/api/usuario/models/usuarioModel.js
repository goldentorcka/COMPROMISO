// @ts-nocheck
const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize) => {
  const Usuario = sequelize.define('usuarios', {
    Id_Usuario: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    Nom_Usuario: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Ape_Usuario: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Cod_Usuario: {
      type: DataTypes.STRING
    },
    Cor_Usuario: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    Nde_Usuario: {
      type: DataTypes.STRING
    },
    Fec_Usuario: {
      type: DataTypes.DATE
    },
    estado: {
      type: DataTypes.ENUM('Sí', 'No'),
      defaultValue: 'Sí'
    },
    rol: {
      type: DataTypes.ENUM('Administrador'),
      defaultValue: 'Administrador'
    },
    token: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'usuarios',
    hooks: {
      beforeCreate: async (usuario) => {
        if (usuario.password) {
          const salt = await bcrypt.genSalt(10);
          usuario.password = await bcrypt.hash(usuario.password, salt);
        }
      }
    }
  });

  return Usuario;
};
