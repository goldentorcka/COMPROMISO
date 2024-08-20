const express = require('express');
const {
  getProcedimientos,
  getProcedimientoById,
  createProcedimiento,
  updateProcedimiento,
  deleteProcedimiento,
} = require('../controllers/procedimientoController.js');

const router = express.Router();

router.get('/', getProcedimientos);
router.get('/:id', getProcedimientoById);
router.post('/', createProcedimiento);
router.put('/:id', updateProcedimiento);
router.delete('/:id', deleteProcedimiento);

module.exports = router;
