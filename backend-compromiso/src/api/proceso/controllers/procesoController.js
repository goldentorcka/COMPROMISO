// @ts-nocheck
const Proceso = require('../models/procesoModel.js');
const logger = require('../../../../config/logger.js');

const getProcesos = async (req, res) => {
  try {
    const procesos = await Proceso.findAll();
    if (procesos.length === 0) {
      res.status(404).json({ message: 'No se encontraron procesos' });
    } else {
      res.json(procesos);
    }
  } catch (error) {
    logger.error(error.message, { stack: error.stack });
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};



const getProcesoById = async (req, res) => {
  try {
    const proceso = await Proceso.findByPk(req.params.id);
    if (!proceso) {
      res.status(404).json({ message: 'Proceso no encontrado' });
    } else {
      res.json(proceso);
    }
  } catch (error) {
    logger.error(error.message, { stack: error.stack });
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};



const createProceso = async (req, res) => {
  try {
    const { nombre_proceso } = req.body;

    // Validar que el campo requerido esté presente
    if (!nombre_proceso) {
      return res.status(400).json({ error: 'Datos requeridos faltantes o inválidos' });
    }

    // Crear el proceso si la validación es correcta
    const proceso = await Proceso.create({ nombre_proceso });
    res.status(201).json(proceso);
  } catch (error) {
    logger.error(error.message, { stack: error.stack });
    
    // Manejo de errores con un mensaje genérico
    if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ error: 'Error en el procesamiento de datos' });
    }
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};




const updateProceso = async (req, res) => {
  try {
    const proceso = await Proceso.findByPk(req.params.id);

    if (!proceso) {
      return res.status(404).json({ message: 'Proceso no encontrado' });
    }

    const [updated] = await Proceso.update(req.body, {
      where: { Id_Proceso: req.params.id },
    });

    if (updated) {
      const updatedProceso = await Proceso.findByPk(req.params.id);
      res.json(updatedProceso);
    } else {
      res.status(404).json({ message: 'Proceso no encontrado' });
    }
  } catch (error) {
    logger.error(error.message, { stack: error.stack });
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};




const deleteProceso = async (req, res) => {
  try {
    const proceso = await Proceso.findByPk(req.params.id);

    if (!proceso) {
      return res.status(404).json({ message: 'Proceso no encontrado' });
    }

    const deleted = await Proceso.destroy({
      where: { Id_Proceso: req.params.id },
    });

    if (deleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Proceso no encontrado' });
    }
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
