const express = require('express');
const {
  getFormatos,
  getFormatoById,
  createFormato,
  updateFormato,
  deleteFormato,
} = require('../controllers/formatoController.js');

const router = express.Router();

router.get('/', getFormatos);
router.get('/:id', getFormatoById);
router.post('/', createFormato);
router.put('/:id', updateFormato);
router.delete('/:id', deleteFormato);

module.exports = router;
