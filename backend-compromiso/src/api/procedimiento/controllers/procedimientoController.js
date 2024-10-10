const Procedimiento = require('../models/procedimientoModel.js');
const { logger } = require('../../../../config/logger.js');

// Validar campos obligatorios
const validateProcedimiento = (procedimiento) => {
  const { nombre_procedimiento, id_proceso, estado } = procedimiento;
  let errors = [];

  if (!nombre_procedimiento || nombre_procedimiento.trim() === "") {
    errors.push("El campo 'nombre_procedimiento' es obligatorio y no debe estar vacío.");
  }
  
  if (!id_proceso || isNaN(id_proceso)) {
    errors.push("El campo 'id_proceso' es obligatorio y debe ser un número válido.");
  }

  if (!estado || estado.trim() === "") {
    errors.push("El campo 'estado' es obligatorio y no debe estar vacío.");
  }

  return errors;
};

// Obtener todos los procedimientos
const getProcedimientos = async (req, res) => {
  try {
    const procedimientos = await Procedimiento.findAll();
    if (procedimientos.length === 0) {
      return res.status(404).json({ message: 'No se encontraron procedimientos' });
    }
    res.status(200).json(procedimientos);
  } catch (error) {
    logger.error(error.message, { stack: error.stack });
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Obtener un procedimiento por ID
const getProcedimientoById = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).json({ message: 'ID inválido' });
  }

  try {
    const procedimiento = await Procedimiento.findByPk(id);
    if (!procedimiento) {
      return res.status(404).json({ message: 'Procedimiento no encontrado' });
    }
    res.status(200).json(procedimiento);
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
  if (isNaN(id)) {
    return res.status(400).json({ message: 'ID inválido' });
  }

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
    res.status(200).json(procedimiento);
  } catch (error) {
    logger.error(error.message, { stack: error.stack });
    res.status(500).json({ error: 'Error interno del servidor al actualizar el procedimiento' });
  }
};

// Eliminar un procedimiento por ID
const deleteProcedimiento = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).json({ message: 'ID inválido' });
  }

  try {
    const procedimiento = await Procedimiento.findByPk(id);
    if (!procedimiento) {
      return res.status(404).json({ message: 'Procedimiento no encontrado' });
    }

    await procedimiento.destroy();
    res.status(204).end(); // Sin contenido
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
