const documentoService = require('../services/documento.js');

exports.create = async (req, res) => {
  try {
    const documento = await documentoService.create(req.body);
    res.status(201).json(documento);
  } catch (error) {
    logger.error(`Error creando documento: ${error.message}`);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

exports.getAll = async (req, res) => {
  try {
    const documentos = await documentoService.findAll();
    res.json(documentos);
  } catch (error) {
    logger.error(`Error obteniendo documentos: ${error.message}`);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

exports.getById = async (req, res) => {
  try {
    const documento = await documentoService.findById(req.params.id);
    res.json(documento);
  } catch (error) {
    logger.error(`Error obteniendo documento por ID: ${error.message}`);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

exports.update = async (req, res) => {
  try {
    const updatedDocumento = await documentoService.update(req.params.id, req.body);
    res.json(updatedDocumento);
  } catch (error) {
    logger.error(`Error actualizando documento: ${error.message}`);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

exports.delete = async (req, res) => {
  try {
    await documentoService.delete(req.params.id);
    res.status(204).send();
  } catch (error) {
    logger.error(`Error eliminando documento: ${error.message}`);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
