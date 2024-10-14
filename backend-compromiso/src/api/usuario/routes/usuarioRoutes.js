// @ts-nocheck
const express = require('express');
const usuarioController = require('../controllers/usuarioController.js'); // Importa el controlador
const { rateLimiter } = require('../../../../middlewares/authMiddleware.js'); // Importa el middleware
const router = express.Router();

// Ruta para registrar un nuevo usuario
router.post('/register', rateLimiter, usuarioController.register);

// Ruta para iniciar sesión (login)
router.post('/login', rateLimiter, usuarioController.login);

// Ruta para solicitar restablecimiento de contraseña
router.post('/forgot-password', rateLimiter, usuarioController.forgotPassword);

// Ruta para restablecer la contraseña
router.post('/reset-password/:userId', rateLimiter, usuarioController.resetPassword);

router.get('/', rateLimiter, usuarioController.getUsuarios);
module.exports = router;
