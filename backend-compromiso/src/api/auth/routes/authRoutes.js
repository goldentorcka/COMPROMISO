const express = require('express');
const { login } = require('../controllers/authController');
const router = express.Router();

// Ruta de inicio de sesión
router.post('/login', login);

module.exports = router;
