// @ts-nocheck
const Documento = require('../models/documentoModel.js'); // Asegúrate de que la ruta sea correcta
const { logger } = require('../../../../config/logger.js'); // Ruta del logger

// Validar campos obligatorios
const validateDocumento = (documento) => {
  const { codigo, fecha_elaboracion, version, estado, nombre_documento, nombre_documento_magnetico, nombre_documento_visualizacion, id_procedimiento, id_responsable } = documento;
  let errors = [];

  if (!codigo || codigo.trim() === "") 
    errors.push("El campo 'codigo' es obligatorio.");
  
  if (!fecha_elaboracion || fecha_elaboracion.trim() === "") 
    errors.push("El campo 'fecha_elaboracion' es obligatorio.");
  
  if (!version || version.trim() === "") 
    errors.push("El campo 'version' es obligatorio.");
  
  if (!estado || estado.trim() === "") 
    errors.push("El campo 'estado' es obligatorio.");
  
  if (!nombre_documento || nombre_documento.trim() === "") 
    errors.push("El campo 'nombre_documento' es obligatorio.");
  
  if (!nombre_documento_magnetico || nombre_documento_magnetico.trim() === "") 
    errors.push("El campo 'nombre_documento_magnetico' es obligatorio.");
  
  if (!nombre_documento_visualizacion || nombre_documento_visualizacion.trim() === "")
    errors.push("El campo 'nombre_documento_visualizacion' es obligatorio.");
  
  if (!id_procedimiento) 
    errors.push("El campo 'id_procedimiento' es obligatorio.");
  
  if (!id_responsable) 
    errors.push("El campo 'id_responsable' es obligatorio.");

  return errors;
};

// Obtener todos los documentos
const getDocumentos = async (req, res) => {
  try {
    const documentos = await Documento.findAll();
    if (documentos.length === 0) {
      return res.status(404).json({ message: 'No se encontraron documentos' });
    }
    res.status(200).json(documentos);
  } catch (error) {
    logger.error(error.message, { stack: error.stack });
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Obtener un documento por ID
const getDocumentoById = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).json({ message: 'ID inválido' });
  }

  try {
    const documento = await Documento.findByPk(id);
    if (!documento) {
      return res.status(404).json({ message: 'Documento no encontrado' });
    }
    res.status(200).json(documento);
  } catch (error) {
    logger.error(error.message, { stack: error.stack });
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Crear un nuevo documento
const createDocumento = async (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: 'No se proporcionaron datos para crear el documento' });
  }

  const errors = validateDocumento(req.body);
  if (errors.length > 0) {
    return res.status(400).json({ message: 'Errores de validación', errors });
  }

  try {
    const documento = await Documento.create(req.body);
    res.status(201).json(documento);
  } catch (error) {
    logger.error(error.message, { stack: error.stack });
    res.status(500).json({ error: 'Error interno del servidor al crear el documento' });
  }
};

// Actualizar un documento existente
const updateDocumento = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).json({ message: 'ID inválido' });
  }

  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: 'No se proporcionaron datos para actualizar el documento' });
  }

  const errors = validateDocumento(req.body);
  if (errors.length > 0) {
    return res.status(400).json({ message: 'Errores de validación', errors });
  }

  try {
    const documento = await Documento.findByPk(id);
    if (!documento) {
      return res.status(404).json({ message: 'Documento no encontrado' });
    }

    await documento.update(req.body);
    res.status(200).json(documento);
  } catch (error) {
    logger.error(error.message, { stack: error.stack });
    res.status(500).json({ error: 'Error interno del servidor al actualizar el documento' });
  }
};


// Eliminar un documento por ID
const deleteDocumento = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) return res.status(400).json({ message: 'ID inválido' });

  try {
    const documento = await Documento.findByPk(id);
    if (!documento) {
      return res.status(404).json({ message: 'Documento no encontrado' });
    }

    await documento.destroy();
    res.status(204).end();
  } catch (error) {
    logger.error(error.message, { stack: error.stack });
    res.status(500).json({ error: 'Error interno del servidor al eliminar el documento' });
  }
};

// Exportar las funciones
module.exports = {
  getDocumentos,
  getDocumentoById,
  createDocumento,
  updateDocumento,
  deleteDocumento,
};
