// @ts-nocheck
const Proceso = require('../models/procesoModel.js');
const { logger } = require('../../../../config/logger.js');

// Validar campos obligatorios
const validateProceso = (proceso) => {
  const { Nom_Proceso, estado, Tip_Proceso } = proceso;
  let errors = [];

  // Validar que Nom_Proceso solo contenga letras y no caracteres especiales
  const regex = /^[a-zA-Z\s]*$/;
  if (!Nom_Proceso) {
    errors.push("El campo 'Nom_Proceso' es obligatorio.");
  } else if (!regex.test(Nom_Proceso)) {
    errors.push("El 'Nom_Proceso' solo puede contener letras, sin números o caracteres especiales.");
  }

  if (!['Activo', 'Inactivo'].includes(estado)) {
    errors.push("El estado debe ser 'Activo' o 'Inactivo'.");
  }

  if (!['Proceso de Innovacion', 'Proceso de Valor', 'Proceso de Apoyo'].includes(Tip_Proceso)) {
    errors.push("El tipo de proceso no es válido.");
  }

  return errors;
};

// Obtener todos los procesos
const getProcesos = async (req, res) => {
  try {
    const procesos = await Proceso.findAll();
    res.status(procesos.length === 0 ? 404 : 200).json(procesos.length === 0 ? { message: 'No se encontraron procesos' } : procesos);
  } catch (error) {
    logger.error(error.message, { stack: error.stack });
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Obtener un proceso por ID
const getProcesoById = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) return res.status(400).json({ message: 'ID inválido' });

  try {
    const proceso = await Proceso.findByPk(id);
    if (!proceso) return res.status(404).json({ message: 'Proceso no encontrado' });
    res.json(proceso);
  } catch (error) {
    logger.error(error.message, { stack: error.stack });
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Crear un nuevo proceso
const createProceso = async (req, res) => {
  const { Nom_Proceso, Tip_Proceso, estado } = req.body;

  // Validar que Nom_Proceso solo contenga letras
  if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(Nom_Proceso)) {
    return res.status(400).json({ message: 'El nombre del proceso solo puede contener letras.' });
  }

  try {
    const nuevoProceso = await Proceso.create({ Nom_Proceso, Tip_Proceso, estado });
    return res.status(201).json(nuevoProceso);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Actualizar un proceso existente
const updateProceso = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) return res.status(400).json({ message: 'ID inválido' });

  try {
    const proceso = await Proceso.findByPk(id);
    if (!proceso) return res.status(404).json({ message: 'Proceso no encontrado' });

    const errors = validateProceso(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ message: 'Errores de validación', errors });
    }

    await Proceso.update(req.body, { where: { Id_Proceso: id } });
    const updatedProceso = await Proceso.findByPk(id);
    res.json(updatedProceso);
  } catch (error) {
    logger.error(error.message, { stack: error.stack });
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Eliminar un proceso por ID
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
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};


module.exports = {
  getProcesos,
  getProcesoById,
  createProceso,
  updateProceso,
  deleteProceso,
};
