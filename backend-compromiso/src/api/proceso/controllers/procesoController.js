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
    if (proceso) {
      res.json(proceso);
    } else {
      res.status(404).json({ message: 'Proceso no encontrado' });
    }
  } catch (error) {
    logger.error(error.message, { stack: error.stack });
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const createProceso = async (req, res) => {
  try {
    const proceso = await Proceso.create(req.body);
    res.status(201).json(proceso);
  } catch (error) {
    logger.error(error.message, { stack: error.stack });
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const updateProceso = async (req, res) => {
  try {
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