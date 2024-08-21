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

// Middleware para capturar errores
router.use((err, req, res, next) => {
  if (err) {
    logger.error(`Error: ${err.message}, Ruta: ${req.originalUrl}`);
    res.status(500).json({ error: 'Algo salió mal, intente de nuevo más tarde' });
  } else {
    next();
  }
});

router.get('/', getProcesos);
router.get('/:id', getProcesoById);
router.post('/', createProceso);
router.put('/:id', updateProceso);
router.delete('/:id', deleteProceso);

module.exports = router;
