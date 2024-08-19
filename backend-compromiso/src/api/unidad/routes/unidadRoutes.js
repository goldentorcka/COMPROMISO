const express = require('express');
const {
  getUnidades,
  getUnidadById,
  createUnidad,
  updateUnidad,
  deleteUnidad,
} = require('../controllers/unidadController.js');

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

router.get('/', getUnidades);
router.get('/:id', getUnidadById);
router.post('/', createUnidad);
router.put('/:id', updateUnidad);
router.delete('/:id', deleteUnidad);

module.exports = router;
