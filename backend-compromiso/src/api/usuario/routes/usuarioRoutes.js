// @ts-nocheck
const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController.js');  // Importa el controlador

// Middleware para validar que el ID sea un número entero
const validateId = (req, res, next) => {
  const { id } = req.params;
  if (!Number.isInteger(Number(id))) {
    return res.status(400).json({ message: 'El ID debe ser un número entero válido.' });
  }
  next();
};

// Obtener todos los usuarios
router.get('/', usuarioController.getUsuarios);

// Obtener un usuario por ID (con validación de ID)
router.get('/:id', validateId, usuarioController.getUsuarioById);

// Crear un nuevo usuario
router.post('/', usuarioController.crearUsuario);

// Actualizar un usuario existente (con validación de ID)
router.put('/:id', validateId, usuarioController.actualizarUsuario);

// Eliminar un usuario por ID (con validación de ID)
router.delete('/:id', validateId, usuarioController.eliminarUsuario);

// Ayudar a los usuarios a restablecer contraseña
router.post('/reset-password', usuarioController.resetPasswordRequest);

module.exports = router;
