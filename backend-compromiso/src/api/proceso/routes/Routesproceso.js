// @ts-nocheck
const express = require('express');
const {
  getProcesos,
  getProcesoById,
  createProceso,
  updateProceso,
  deleteProceso,
} = require('../controllers/procesoController.js');
const logger = require('../../../../config/logger.js');
const router = express.Router();

// Obtener todos los procesos
router.get('/', getProcesos);

// Obtener un proceso por ID (con validación de ID)
router.get('/:id', getProcesoById);

// Crear un nuevo proceso
router.post('/', createProceso);

// Actualizar un proceso existente (con validación de ID)
router.put('/:id', updateProceso);

// Eliminar un proceso por ID (con validación de ID)
router.delete('/:id', deleteProceso);

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
