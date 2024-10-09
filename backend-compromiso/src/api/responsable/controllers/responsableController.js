// @ts-nocheck
const Responsable = require('../models/responsibleModel.js'); // Asegúrate de que la ruta sea correcta
const { logger } = require('../../../../config/logger.js'); // Ruta del logger

// Validar campos obligatorios
const validateResponsable = (responsable) => {
  const { nombre_responsable, estado } = responsable; // Actualizado a 'nombre_responsable'
  let errors = [];

  if (!nombre_responsable || nombre_responsable.trim() === "") 
    errors.push("El campo 'nombre_responsable' es obligatorio y no debe estar vacío.");
  
  if (!estado || estado.trim() === "") 
    errors.push("El campo 'estado' es obligatorio y no debe estar vacío.");
  
  return errors;
};

// Obtener todos los responsables
const getResponsables = async (req, res) => {
  try {
    const responsables = await Responsable.findAll();
    if (responsables.length === 0) {
      return res.status(404).json({ message: 'No se encontraron responsables' });
    }
    res.status(200).json(responsables);
  } catch (error) {
    logger.error(error.message, { stack: error.stack });
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Obtener un responsable por ID
const getResponsableById = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) return res.status(400).json({ message: 'ID inválido' });

  try {
    const responsable = await Responsable.findByPk(id);
    if (!responsable) {
      return res.status(404).json({ message: 'Responsable no encontrado' });
    }
    res.status(200).json(responsable);
  } catch (error) {
    logger.error(error.message, { stack: error.stack });
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Crear un nuevo responsable
const createResponsable = async (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: 'No se proporcionaron datos para crear el responsable' });
  }

  const errors = validateResponsable(req.body);
  if (errors.length > 0) {
    return res.status(400).json({ message: 'Errores de validación', errors });
  }

  try {
    const responsable = await Responsable.create(req.body);
    res.status(201).json(responsable);
  } catch (error) {
    logger.error(error.message, { stack: error.stack });
    res.status(500).json({ error: 'Error interno del servidor al crear el responsable' });
  }
};

// Actualizar un responsable existente
const updateResponsable = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) return res.status(400).json({ message: 'ID inválido' });

  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: 'No se proporcionaron datos para actualizar el responsable' });
  }

  const errors = validateResponsable(req.body);
  if (errors.length > 0) {
    return res.status(400).json({ message: 'Errores de validación', errors });
  }

  try {
    const responsable = await Responsable.findByPk(id);
    if (!responsable) {
      return res.status(404).json({ message: 'Responsable no encontrado' });
    }

    await responsable.update(req.body);
    res.status(200).json(responsable);
  } catch (error) {
    logger.error(error.message, { stack: error.stack });
    res.status(500).json({ error: 'Error interno del servidor al actualizar el responsable' });
  }
};

// Eliminar un responsable por ID
const deleteResponsable = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) return res.status(400).json({ message: 'ID inválido' });

  try {
    const responsable = await Responsable.findByPk(id);
    if (!responsable) {
      return res.status(404).json({ message: 'Responsable no encontrado' });
    }

    await responsable.destroy();
    res.status(204).end(); // Sin contenido
  } catch (error) {
    logger.error(error.message, { stack: error.stack });
    res.status(500).json({ error: 'Error interno del servidor al eliminar el responsable' });
  }
};

// Exportar las funciones
module.exports = {
  getResponsables,
  getResponsableById,
  createResponsable,
  updateResponsable,
  deleteResponsable
};
