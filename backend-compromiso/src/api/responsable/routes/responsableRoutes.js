const express = require('express');
const {
  getResponsables,
  getResponsableById,
  createResponsable,
  updateResponsable,
  deleteResponsable,
} = require('../controllers/responsableController.js');

const router = express.Router();

router.get('/', getResponsables);
router.get('/:id', getResponsableById);
router.post('/', createResponsable);
router.put('/:id', updateResponsable);
router.delete('/:id', deleteResponsable);

module.exports = router;
