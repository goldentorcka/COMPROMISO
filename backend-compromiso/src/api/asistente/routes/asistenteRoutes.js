const express = require('express');
const router = express.Router();
const asistenteController = require('../controllers/asistenteController');

// Ruta para hacer preguntas
router.post('/preguntar', asistenteController.hacerPregunta);

module.exports = router;
