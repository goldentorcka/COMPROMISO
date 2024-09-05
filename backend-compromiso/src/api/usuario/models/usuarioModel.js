import  DataTypes  from "sequelize"; // Importa DataTypes desde Sequelize
import bcrypt from 'bcrypt'; // Para encriptar la contraseña
import {generarToken } from '../../../../helpers/generarTOKEN.js'; // Función para generar tokens
import sequelize from '../../../../config/database.js'; // Configuración de la base de datos


// Definimos el modelo Usuario
const Usuario = sequelize.define(
  'usuario',
  {
    Id_Usuario: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      field: 'Id_Usuario',
    },
    Nom_Usuario: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'Nom_Usuario',
    },
    Ape_Usuario: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'Ape_Usuario',
    },
    Cod_Usuario: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: 'Cod_Usuario',
    },
    Cor_Usuario: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true, // Asegura que el correo sea único
      field: 'Cor_Usuario',
    },
    Nde_Usuario: {
      type: DataTypes.STRING(20),
      allowNull: false,
      field: 'Nde_Usuario',
    },
    Fec_Usuario: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'Fec_Usuario',
    },
    estado: {
      type: DataTypes.ENUM('Sí', 'No'),
      allowNull: false,
      field: 'estado',
    },
    rol: {
      type: DataTypes.ENUM('Administrador', 'Usuario'),
      allowNull: false,
      field: 'rol',
    },
    token: {
      type: DataTypes.STRING(255),
      field: 'token',
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'password',
    },
  },
  {
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    hooks: {
      // Antes de guardar o actualizar el usuario, encriptamos la contraseña
      beforeSave: async (usuario) => {
        if (usuario.changed('password')) {
          const salt = await bcrypt.genSalt(10);
          usuario.password = await bcrypt.hash(usuario.password, salt);
        }
      },
      // Antes de crear un usuario, le generamos un token único
      beforeCreate: async (usuario) => {
        usuario.token = generarToken(); // Función que genera un token único
      },
    },
  }
);

// Método para verificar si la contraseña ingresada es correcta
Usuario.prototype.comprobarPassword = async function (passwordFormulario) {
  return await bcrypt.compare(passwordFormulario, this.password);
};

export default Usuario;
