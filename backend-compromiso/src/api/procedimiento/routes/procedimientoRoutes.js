// @ts-nocheck
const express = require('express');
const {
  getProcedimientos,
  getProcedimientoById,
  createProcedimiento,
  updateProcedimiento,
  deleteProcedimiento,
} = require('../controllers/procedimientoController.js');
const router = express.Router();

/**
 * Obtiene todos los procedimientos
 */
router.get('/', getProcedimientos);

/**
 * Obtiene un procedimiento por ID
 * @param {number} id - ID del procedimiento
 */
router.get('/:id', getProcedimientoById);

/**
 * Crea un nuevo procedimiento
 */
router.post('/', createProcedimiento);

/**
 * Actualiza un procedimiento existente
 * @param {number} id - ID del procedimiento
 */
router.put('/:id', updateProcedimiento);

/**
 * Elimina un procedimiento por ID
 * @param {number} id - ID del procedimiento
 */
router.delete('/:id', deleteProcedimiento);

module.exports = router;
