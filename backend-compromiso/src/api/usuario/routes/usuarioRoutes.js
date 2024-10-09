// @ts-nocheck
const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController.js'); // Importa el controlador

// Obtener todos los usuarios
router.get('/', usuarioController.getUsuarios);

// Obtener un usuario por ID (con validación de ID)
router.get('/:id', usuarioController.getUsuarioById);

// Crear un nuevo usuario (Solo Super Administrador)
router.post('/', usuarioController.isSuperAdmin, usuarioController.crearUsuario);

// Actualizar un usuario existente (con validación de ID y solo Super Administrador)
router.put('/:id', usuarioController.isSuperAdmin, usuarioController.actualizarUsuario);

// Eliminar un usuario por ID (con validación de ID y solo Super Administrador)
router.delete('/:id', usuarioController.isSuperAdmin, usuarioController.eliminarUsuario);

// Solicitar restablecimiento de contraseña
router.post('/reset-password', usuarioController.resetPasswordRequest);

module.exports = router;
