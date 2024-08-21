// @ts-nocheck
const express = require('express');
const { login } = require('../controllers/authController.js');

const router = express.Router();

// Ruta de inicio de sesión
router.post('/login', login);

module.exports = router;
