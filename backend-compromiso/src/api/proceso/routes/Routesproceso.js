const express = require('express');
const {
  getProcesos,
  getProcesoById,
  createProceso,
  updateProceso,
  deleteProceso,
} = require('../controllers/procesoController.js');

const router = express.Router();

router.get('/', getProcesos);
router.get('/:id', getProcesoById);
router.post('/', createProceso);
router.put('/:id', updateProceso);
router.delete('/:id', deleteProceso);

module.exports = router;
