const express = require('express');
const {
  getAreas,
  getAreaById,
  createArea,
  updateArea,
  deleteArea,
} = require('../controllers/areaController.js');

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

router.get('/', getAreas);
router.get('/:id', getAreaById);
router.post('/', createArea);
router.put('/:id', updateArea);
router.delete('/:id', deleteArea);

module.exports = router;
