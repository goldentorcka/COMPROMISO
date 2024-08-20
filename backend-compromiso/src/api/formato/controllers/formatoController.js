const Formato = require('../models/formatoModel.js');
const logger = require('../../../../config/logger.js');

const getFormatos = async (req, res) => {
  try {
    const formatos = await Formato.findAll();
    if (formatos.length === 0) {
      res.status(404).json({ message: 'No se encontraron formatos' });
    } else {
      res.json(formatos);
    }
  } catch (error) {
    logger.error(error.message, { stack: error.stack });
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const getFormatoById = async (req, res) => {
  try {
    const formato = await Formato.findByPk(req.params.id);
    if (formato) {
      res.json(formato);
    } else {
      res.status(404).json({ message: 'Formato no encontrado' });
    }
  } catch (error) {
    logger.error(error.message, { stack: error.stack });
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const createFormato = async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: 'Datos insuficientes para crear el formato' });
    }
    const formato = await Formato.create(req.body);
    res.status(201).json(formato);
  } catch (error) {
    logger.error(error.message, { stack: error.stack });
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const updateFormato = async (req, res) => {
  try {
    const [updated] = await Formato.update(req.body, {
      where: { Id_Formato: req.params.id },
    });
    if (updated) {
      const updatedFormato = await Formato.findByPk(req.params.id);
      res.json(updatedFormato);
    } else {
      res.status(404).json({ message: 'Formato no encontrado' });
    }
  } catch (error) {
    logger.error(error.message, { stack: error.stack });
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const deleteFormato = async (req, res) => {
  try {
    const deleted = await Formato.destroy({
      where: { Id_Formato: req.params.id },
    });
    if (deleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Formato no encontrado' });
    }
  } catch (error) {
    logger.error(error.message, { stack: error.stack });
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = {
  getFormatos,
  getFormatoById,
  createFormato,
  updateFormato,
  deleteFormato,
};
