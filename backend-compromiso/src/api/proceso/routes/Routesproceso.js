// @ts-nocheck
const express = require('express');
const {
  getProcesos,
  getProcesoById,
  createProceso,
  updateProceso,
  deleteProceso,
} = require('../controllers/procesoController.js');
const logger = require('../../../../config/logger.js');
const router = express.Router();

// Middleware para validar que el ID sea un número entero
const validateId = (req, res, next) => {
  const { id } = req.params;
  if (!Number.isInteger(Number(id))) {
    return res.status(400).json({ message: 'El ID debe ser un número entero válido.' });
  }
  next();
};

// Obtener todos los procesos
router.get('/', getProcesos);

// Obtener un proceso por ID (con validación de ID)
router.get('/:id', validateId, getProcesoById);

// Crear un nuevo proceso
router.post('/', createProceso);

// Actualizar un proceso existente (con validación de ID)
router.put('/:id', validateId, updateProceso);

// Eliminar un proceso por ID (con validación de ID)
router.delete('/:id', validateId, deleteProceso);

module.exports = router;
