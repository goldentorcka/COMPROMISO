// @ts-nocheck
const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController.js');  // Ruta del controlador

// Obtener todos los usuarios
router.get('/', usuarioController.getUsuarios);

// Obtener un usuario por ID
router.get('/:id', usuarioController.getUsuarioById);

// Crear un nuevo usuario
router.post('/', usuarioController.crearUsuario);

// Actualizar un usuario existente
router.put('/:id', usuarioController.actualizarUsuario);

// Eliminar un usuario por ID
router.delete('/:id', usuarioController.eliminarUsuario);

module.exports = router;
