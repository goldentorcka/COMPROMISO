const procesoService = require('../services/proceso.js');
const logger = require('../../../utils/logger');

exports.create = async (req, res) => {
  try {
    const proceso = await procesoService.create(req.body);
    res.status(201).json(proceso);
  } catch (error) {
    logger.error(`Error creando proceso: ${error.message}`);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

exports.getAll = async (req, res) => {
  try {
    const procesos = await procesoService.findAll();
    res.json(procesos);
  } catch (error) {
    logger.error(`Error obteniendo procesos: ${error.message}`);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

exports.getById = async (req, res) => {
  try {
    const proceso = await procesoService.findById(req.params.id);
    res.json(proceso);
  } catch (error) {
    logger.error(`Error obteniendo proceso por ID: ${error.message}`);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

exports.update = async (req, res) => {
  try {
    const updatedProceso = await procesoService.update(req.params.id, req.body);
    res.json(updatedProceso);
  } catch (error) {
    logger.error(`Error actualizando proceso: ${error.message}`);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

exports.delete = async (req, res) => {
  try {
    await procesoService.delete(req.params.id);
    res.status(204).send();
  } catch (error) {
    logger.error(`Error eliminando proceso: ${error.message}`);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
