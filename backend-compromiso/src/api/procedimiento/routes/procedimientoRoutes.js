// @ts-nocheck
const express = require('express');
const {
  getProcedimientos,
  getProcedimientoById,
  createProcedimiento,
  updateProcedimiento,
  deleteProcedimiento,
} = require('../controllers/procedimientoController.js');
const logger = require('../../../../config/logger.js');
const router = express.Router();

/**
 * Obtiene todos los procedimientos
 */
router.get('/', getProcedimientos);

/**
 * Obtiene un procedimiento por ID
//  * @param {number} id - ID del procedimiento
 */
router.get('/:id', getProcedimientoById);

/**
 * Crea un nuevo procedimiento
 */
router.post('/', createProcedimiento);

/**
 * Actualiza un procedimiento existente
//  * @param {number} id - ID del procedimiento
 */
router.put('/:id', updateProcedimiento);

/**
 * Elimina un procedimiento por ID
//  * @param {number} id - ID del procedimiento
 */
router.delete('/:id', deleteProcedimiento);

// Middleware para capturar errores
router.use((err, req, res, next) => {
  if (err) {
    logger.error(`Error: ${err.message}, Ruta: ${req.originalUrl}`);
    res.status(500).json({ error: 'Algo salió mal, intente de nuevo más tarde' });
  } else {
    next();
  }
});

module.exports = router;
