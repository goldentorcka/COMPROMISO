// backend-compromiso/src/api/documento/routes/documentoRoutes.js
const express = require('express');
const router = express.Router();
const documentoController = require('../controllers/documentoController.js');

// Crear un nuevo documento
router.post('/', documentoController.create);

// Obtener todos los documentos
router.get('/', documentoController.getAll);

// Obtener un documento por ID
router.get('/:id', documentoController.getById);

// Actualizar un documento por ID
router.put('/:id', documentoController.update);

// Eliminar un documento por ID
router.delete('/:id', documentoController.delete);

module.exports = router;
