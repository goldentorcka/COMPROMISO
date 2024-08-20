const express = require('express');
const {
  getResponsables,
  getResponsableById,
  createResponsable,
  updateResponsable,
  deleteResponsable,
} = require('../controllers/responsableController.js');
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
router.get('/', getResponsables);
router.get('/:id', getResponsableById);
router.post('/', createResponsable);
router.put('/:id', updateResponsable);
router.delete('/:id', deleteResponsable);

module.exports = router;
