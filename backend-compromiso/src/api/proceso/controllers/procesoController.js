// @ts-nocheck
const Proceso = require('../models/procesoModel.js');
const { logger } = require('../../../../config/logger.js'); // Ruta del logger

// Validar campos obligatorios
const validateProceso = (proceso) => {
  const { nombre_proceso, estado, nombre_directorio_proceso } = proceso; // Cambiado a los nombres correctos
  let errors = [];

  if (!nombre_proceso) {
    errors.push("El campo 'nombre_proceso' es obligatorio.");
  }

  if (!['Activo', 'Inactivo'].includes(estado)) {
    errors.push("El estado debe ser 'Activo' o 'Inactivo'.");
  }

  // Validación de nombre_directorio_proceso si es necesario
  if (nombre_directorio_proceso && typeof nombre_directorio_proceso !== 'string') {
    errors.push("El campo 'nombre_directorio_proceso' debe ser una cadena de texto.");
  }

  return errors;
};

// Obtener todos los procesos
const getProcesos = async (req, res) => {
  try {
    const procesos = await Proceso.findAll();
    if (procesos.length === 0) {
      return res.status(404).json({ message: 'No se encontraron procesos' });
    }
    res.status(200).json(procesos);
  } catch (error) {
    logger.error(error.message, { stack: error.stack });
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};


// Obtener un Proceso por ID
const getProcesoById = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) return res.status(400).json({ message: 'ID inválido' });

  try {
    const proceso = await Proceso.findByPk(id);
    if (!proceso) {
      return res.status(404).json({ message: 'Proceso no encontrado' });
    }
    res.json(proceso);
  } catch (error) {
    logger.error(error.message, { stack: error.stack });
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Crear un nuevo Proceso
const createProceso = async (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: 'No se proporcionaron datos para crear el Proceso' });
  }

  const errors = validateProceso(req.body);
  if (errors.length > 0) {
    return res.status(400).json({ message: 'Errores de validación', errors });
  }

  try {
    const proceso = await Proceso.create(req.body);
    res.status(201).json(proceso);
  } catch (error) {
    logger.error(error.message, { stack: error.stack });
    res.status(500).json({ error: 'Error interno del servidor al crear el Proceso' });
  }
};

// Actualizar un Proceso existente
const updateProceso = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) return res.status(400).json({ message: 'ID inválido' });

  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: 'No se proporcionaron datos para actualizar el Proceso' });
  }

  const errors = validateProceso(req.body);
  if (errors.length > 0) {
    return res.status(400).json({ message: 'Errores de validación', errors });
  }

  try {
    const proceso = await Proceso.findByPk(id);
    if (!proceso) {
      return res.status(404).json({ message: 'Proceso no encontrado' });
    }

    await proceso.update(req.body);
    res.status(200).json(proceso);
  } catch (error) {
    logger.error(error.message, { stack: error.stack });
    res.status(500).json({ error: 'Error interno del servidor al actualizar el Proceso' });
  }
};

// Eliminar un Proceso por ID
const deleteProceso = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) return res.status(400).json({ message: 'ID inválido' });

  try {
    const proceso = await Proceso.findByPk(id);
    if (!proceso) {
      return res.status(404).json({ message: 'Proceso no encontrado' });
    }

    await proceso.destroy();
    res.status(204).end();
  } catch (error) {
    logger.error(error.message, { stack: error.stack });
    res.status(500).json({ error: 'Error interno del servidor al eliminar el Proceso' });
  }
};

// Exportar las funciones
module.exports = {
  getProcesos,
  getProcesoById,
  createProceso,
  updateProceso,
  deleteProceso,
};
