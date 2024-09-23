// @ts-nocheck
const Asistente = require('../models/asistenteModel');
const axios = require('axios');

// Controlador que maneja la lógica de respuestas del asistente
exports.hacerPregunta = async (req, res) => {
  const { pregunta } = req.body;

  try {
    // Procesa la pregunta
    console.log('Procesando pregunta...');
    
    // Realiza una búsqueda básica en una API de información gratuita (ej: Wikipedia)
    const response = await axios.get(`https://es.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(pregunta)}`);
    const respuesta = response.data.extract;

    // Almacena la pregunta y respuesta en la base de datos
    await Asistente.create({ pregunta, respuesta });

    res.status(200).json({
      mensaje: 'Procesando respuesta...',
      respuesta,
      fuente: response.data.content_urls.desktop.page // URL de la fuente
    });
  } catch (error) {
    res.status(500).json({
      mensaje: 'Hubo un error procesando la pregunta.',
      error: error.message
    });
  }
};
