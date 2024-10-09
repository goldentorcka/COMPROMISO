// @ts-nocheck
const express = require('express');
const {
  getResponsables,
  getResponsableById,
  createResponsable,
  updateResponsable,
  deleteResponsable,
} = require('../controllers/responsableController.js');
const { logger } = require('../../../../config/logger.js');
const router = express.Router();

// Obtiene todos los responsables
router.get('/', getResponsables);

// Obtiene un responsable por ID
router.get('/:id', getResponsableById);

// Crea un nuevo responsable
router.post('/', createResponsable);

// Actualiza un responsable existente
router.put('/:id', updateResponsable);

// Elimina un responsable por ID
router.delete('/:id', deleteResponsable);

// Middleware para capturar errores
router.use((err, req, res, next) => {
  if (err) {
    logger.error(`Error: ${err.message}, Ruta: ${req.originalUrl}`);
    res.status(500).json({ error: 'Algo salió mal, intente de nuevo más tarde' });
  } else {
    next();
  }
});

module.exports = router;
