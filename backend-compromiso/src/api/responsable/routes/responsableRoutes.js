// @ts-nocheck
const express = require('express');
const {
  getResponsables,
  getResponsableById,
  createResponsable,
  updateResponsable,
  deleteResponsable,
} = require('../controllers/responsableController.js');
const logger = require('../../../../config/logger.js');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Responsables
 *   description: Operaciones relacionadas con responsables
 */

/**
 * @swagger
 * /api/responsables:
 *   get:
 *     summary: Obtiene todos los responsables
 *     tags: [Responsables]
 *     responses:
 *       200:
 *         description: Lista de responsables
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID del responsable
 *                   nombre:
 *                     type: string
 *                     description: Nombre del responsable
 *       500:
 *         description: Error interno del servidor
 */
router.get('/', getResponsables);

/**
 * @swagger
 * /api/responsables/{id}:
 *   get:
 *     summary: Obtiene un responsable por ID
 *     tags: [Responsables]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del responsable
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Responsable encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID del responsable
 *                 nombre:
 *                   type: string
 *                   description: Nombre del responsable
 *       404:
 *         description: Responsable no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/:id', getResponsableById);

/**
 * @swagger
 * /api/responsables:
 *   post:
 *     summary: Crea un nuevo responsable
 *     tags: [Responsables]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre del responsable
 *     responses:
 *       201:
 *         description: Responsable creado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID del nuevo responsable
 *                 nombre:
 *                   type: string
 *                   description: Nombre del nuevo responsable
 *       400:
 *         description: Solicitud inválida
 *       500:
 *         description: Error interno del servidor
 */
router.post('/', createResponsable);

/**
 * @swagger
 * /api/responsables/{id}:
 *   put:
 *     summary: Actualiza un responsable existente
 *     tags: [Responsables]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del responsable
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nuevo nombre del responsable
 *     responses:
 *       200:
 *         description: Responsable actualizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID del responsable
 *                 nombre:
 *                   type: string
 *                   description: Nombre actualizado del responsable
 *       400:
 *         description: Solicitud inválida
 *       404:
 *         description: Responsable no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.put('/:id', updateResponsable);

/**
 * @swagger
 * /api/responsables/{id}:
 *   delete:
 *     summary: Elimina un responsable por ID
 *     tags: [Responsables]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del responsable
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Responsable eliminado
 *       404:
 *         description: Responsable no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.delete('/:id', deleteResponsable);

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
