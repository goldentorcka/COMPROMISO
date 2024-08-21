// @ts-nocheck
const express = require('express');
const {
  getFormatos,
  getFormatoById,
  createFormato,
  updateFormato,
  deleteFormato,
} = require('../controllers/formatoController.js');
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

router.get('/', getFormatos);
router.get('/:id', getFormatoById);
router.post('/', createFormato);
router.put('/:id', updateFormato);
router.delete('/:id', deleteFormato);

module.exports = router;
