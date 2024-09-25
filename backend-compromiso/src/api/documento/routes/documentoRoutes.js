// @ts-nocheck
const express = require('express');
const {
  getDocumentos,
  getDocumentoById,
  createDocumento,
  updateDocumento,
  deleteDocumento,
} = require('../controllers/documentoController.js');
const router = express.Router();

// Ruta para obtener todos los documentos
router.get('/', getDocumentos);

// Ruta para obtener un documento por ID
router.get('/:id', getDocumentoById);

// Ruta para crear un nuevo documento
router.post('/', createDocumento);

// Ruta para actualizar un documento existente por ID
router.put('/:id', updateDocumento);

// Ruta para eliminar un documento por ID
router.delete('/:id', deleteDocumento);

// Middleware para manejar errores generales
router.use((err, req, res, next) => {
  if (err) {
    logger.error(`Error: ${err.message}, Ruta: ${req.originalUrl}`);
    res.status(500).json({ error: 'Algo salió mal, intente de nuevo más tarde' });
  } else {
    next();
  }
});

module.exports = router;
