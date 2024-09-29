const Procedimiento = require('../models/procedimientoModel.js');
const { logger } = require('../../../../config/logger.js');

// Validar campos obligatorios
const validateProcedimiento = (procedimiento) => {
  const { Nom_Procedimiento, Id_Proceso, estado } = procedimiento;
  let errors = [];

  if (!Nom_Procedimiento) errors.push("El campo 'Nom_Procedimiento' es obligatorio.");
  if (!Id_Proceso) errors.push("El campo 'Id_Proceso' es obligatorio.");
  if (!estado) errors.push("El campo 'estado' es obligatorio.");

  return errors;
};

// Obtener todos los procedimientos
const getProcedimientos = async (req, res) => {
  try {
    const procedimientos = await Procedimiento.findAll();
    if (procedimientos.length === 0) {
      return res.status(404).json({ message: 'No se encontraron procedimientos' });
    }
    res.json(procedimientos);
  } catch (error) {
    logger.error(error.message, { stack: error.stack });
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Obtener un procedimiento por ID
const getProcedimientoById = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) return res.status(400).json({ message: 'ID inválido' });

  try {
    const procedimiento = await Procedimiento.findByPk(id);
    if (!procedimiento) {
      return res.status(404).json({ message: 'Procedimiento no encontrado' });
    }
    res.json(procedimiento);
  } catch (error) {
    logger.error(error.message, { stack: error.stack });
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Crear un nuevo procedimiento
const createProcedimiento = async (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: 'No se proporcionaron datos para crear el procedimiento' });
  }

  const errors = validateProcedimiento(req.body);
  if (errors.length > 0) {
    return res.status(400).json({ message: 'Errores de validación', errors });
  }

  try {
    const procedimiento = await Procedimiento.create(req.body);
    res.status(201).json(procedimiento);
  } catch (error) {
    logger.error(error.message, { stack: error.stack });
    res.status(500).json({ error: 'Error interno del servidor al crear el procedimiento' });
  }
};

// Actualizar un procedimiento existente
const updateProcedimiento = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) return res.status(400).json({ message: 'ID inválido' });

  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: 'No se proporcionaron datos para actualizar el procedimiento' });
  }

  const errors = validateProcedimiento(req.body);
  if (errors.length > 0) {
    return res.status(400).json({ message: 'Errores de validación', errors });
  }

  try {
    const procedimiento = await Procedimiento.findByPk(id);
    if (!procedimiento) {
      return res.status(404).json({ message: 'Procedimiento no encontrado' });
    }

    await procedimiento.update(req.body);
    res.json(procedimiento);
  } catch (error) {
    logger.error(error.message, { stack: error.stack });
    res.status(500).json({ error: 'Error interno del servidor al actualizar el procedimiento' });
  }
};

// Eliminar un procedimiento por ID
const deleteProcedimiento = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) return res.status(400).json({ message: 'ID inválido' });

  try {
    const procedimiento = await Procedimiento.findByPk(id);
    if (!procedimiento) {
      return res.status(404).json({ message: 'Procedimiento no encontrado' });
    }

    await procedimiento.destroy();
    res.status(204).end();
  } catch (error) {
    logger.error(error.message, { stack: error.stack });
    res.status(500).json({ error: 'Error interno del servidor al eliminar el procedimiento' });
  }
};

// Exportar las funciones
module.exports = {
  getProcedimientos,
  getProcedimientoById,
  createProcedimiento,
  updateProcedimiento,
  deleteProcedimiento
};
