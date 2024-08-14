const express = require('express');
const {
  getUnidades,
  getUnidadById,
  createUnidad,
  updateUnidad,
  deleteUnidad,
} = require('../controllers/unidadController.js');

const router = express.Router();

router.get('/', getUnidades);
router.get('/:id', getUnidadById);
router.post('/', createUnidad);
router.put('/:id', updateUnidad);
router.delete('/:id', deleteUnidad);

module.exports = router;
