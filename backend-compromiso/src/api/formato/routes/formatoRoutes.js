// @ts-nocheck
const express = require('express');
const {
  getFormatos,
  getFormatoById,
  createFormato,
  updateFormato,
  deleteFormato,
} = require('../controllers/formatoController.js');
const logger = require('../../../../config/logger.js');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Formatos
 *   description: Operaciones relacionadas con formatos
 */

/**
 * @swagger
 * /api/formatos:
 *   get:
 *     summary: Obtiene todos los formatos
 *     tags: [Formatos]
 *     responses:
 *       200:
 *         description: Lista de formatos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID del formato
 *                   nombre_documento:
 *                     type: string
 *                     description: Nombre del documento
 *                   tipo_documento:
 *                     type: string
 *                     description: Tipo de documento
 *                   codigo:
 *                     type: string
 *                     description: Código del formato
 *                   version:
 *                     type: string
 *                     description: Versión del formato
 *       500:
 *         description: Error interno del servidor
 */
router.get('/', getFormatos);

/**
 * @swagger
 * /api/formatos/{id}:
 *   get:
 *     summary: Obtiene un formato por ID
 *     tags: [Formatos]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del formato
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Formato encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID del formato
 *                 nombre_documento:
 *                   type: string
 *                   description: Nombre del documento
 *                 tipo_documento:
 *                   type: string
 *                   description: Tipo de documento
 *                 codigo:
 *                   type: string
 *                   description: Código del formato
 *                 version:
 *                   type: string
 *                   description: Versión del formato
 *       404:
 *         description: Formato no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/:id', getFormatoById);

/**
 * @swagger
 * /api/formatos:
 *   post:
 *     summary: Crea un nuevo formato
 *     tags: [Formatos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre_documento:
 *                 type: string
 *                 description: Nombre del documento
 *               tipo_documento:
 *                 type: string
 *                 description: Tipo de documento
 *               codigo:
 *                 type: string
 *                 description: Código del formato
 *               version:
 *                 type: string
 *                 description: Versión del formato
 *     responses:
 *       201:
 *         description: Formato creado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID del nuevo formato
 *                 nombre_documento:
 *                   type: string
 *                   description: Nombre del documento
 *                 tipo_documento:
 *                   type: string
 *                   description: Tipo de documento
 *                 codigo:
 *                   type: string
 *                   description: Código del formato
 *                 version:
 *                   type: string
 *                   description: Versión del formato
 *       400:
 *         description: Solicitud inválida
 *       500:
 *         description: Error interno del servidor
 */
router.post('/', createFormato);

/**
 * @swagger
 * /api/formatos/{id}:
 *   put:
 *     summary: Actualiza un formato existente
 *     tags: [Formatos]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del formato
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre_documento:
 *                 type: string
 *                 description: Nuevo nombre del documento
 *               tipo_documento:
 *                 type: string
 *                 description: Nuevo tipo de documento
 *               codigo:
 *                 type: string
 *                 description: Nuevo código del formato
 *               version:
 *                 type: string
 *                 description: Nueva versión del formato
 *     responses:
 *       200:
 *         description: Formato actualizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID del formato
 *                 nombre_documento:
 *                   type: string
 *                   description: Nombre del documento
 *                 tipo_documento:
 *                   type: string
 *                   description: Tipo de documento
 *                 codigo:
 *                   type: string
 *                   description: Código del formato
 *                 version:
 *                   type: string
 *                   description: Versión del formato
 *       400:
 *         description: Solicitud inválida
 *       404:
 *         description: Formato no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.put('/:id', updateFormato);

/**
 * @swagger
 * /api/formatos/{id}:
 *   delete:
 *     summary: Elimina un formato por ID
 *     tags: [Formatos]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del formato
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Formato eliminado
 *       404:
 *         description: Formato no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.delete('/:id', deleteFormato);

// Middleware para capturar errores
router.use((err, req, res, next) => {
  if (err) {
    logger.error(`Error: ${err.message}, Ruta: ${req.originalUrl}`);
    res.status(500).json({ error: 'Algo salió mal, intente de nuevo más tarde' });
  } else {
    next();
  }
});

module.exports = router;
