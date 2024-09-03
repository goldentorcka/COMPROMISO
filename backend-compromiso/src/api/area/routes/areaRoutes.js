// @ts-nocheck
const express = require('express');
const {
  getAreas,
  getAreaById,
  createArea,
  updateArea,
  deleteArea,
} = require('../controllers/areaController');
const logger = require('../../../../config/logger');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Áreas
 *   description: Operaciones relacionadas con áreas
 */

/**
 * @swagger
 * /api/areas:
 *   get:
 *     summary: Obtiene todas las áreas
 *     tags: [Áreas]
 *     responses:
 *       200:
 *         description: Lista de áreas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   Id_Area:
 *                     type: integer
 *                     description: ID del área
 *                   Nom_Area:
 *                     type: string
 *                     description: Nombre del área
 *                   estado:
 *                     type: string
 *                     enum: [Sí, No]
 *                     description: Estado del área
 *       500:
 *         description: Error interno del servidor
 */
router.get('/', getAreas);

/**
 * @swagger
 * /api/areas/{id}:
 *   get:
 *     summary: Obtiene un área por ID
 *     tags: [Áreas]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del área
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Área encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Id_Area:
 *                   type: integer
 *                   description: ID del área
 *                 Nom_Area:
 *                   type: string
 *                   description: Nombre del área
 *                 estado:
 *                   type: string
 *                   enum: [Sí, No]
 *                   description: Estado del área
 *       404:
 *         description: Área no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.get('/:id', getAreaById);

/**
 * @swagger
 * /api/areas:
 *   post:
 *     summary: Crea una nueva área
 *     tags: [Áreas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Nom_Area:
 *                 type: string
 *                 description: Nombre del área
 *               estado:
 *                 type: string
 *                 enum: [Sí, No]
 *                 description: Estado del área
 *     responses:
 *       201:
 *         description: Área creada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Id_Area:
 *                   type: integer
 *                   description: ID de la nueva área
 *                 Nom_Area:
 *                   type: string
 *                   description: Nombre de la nueva área
 *                 estado:
 *                   type: string
 *                   enum: [Sí, No]
 *                   description: Estado de la nueva área
 *       400:
 *         description: Solicitud inválida
 *       500:
 *         description: Error interno del servidor
 */
router.post('/', createArea);

/**
 * @swagger
 * /api/areas/{id}:
 *   put:
 *     summary: Actualiza un área existente
 *     tags: [Áreas]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del área
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Nom_Area:
 *                 type: string
 *                 description: Nuevo nombre del área
 *               estado:
 *                 type: string
 *                 enum: [Sí, No]
 *                 description: Nuevo estado del área
 *     responses:
 *       200:
 *         description: Área actualizada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Id_Area:
 *                   type: integer
 *                   description: ID del área
 *                 Nom_Area:
 *                   type: string
 *                   description: Nombre actualizado del área
 *                 estado:
 *                   type: string
 *                   enum: [Sí, No]
 *                   description: Estado actualizado del área
 *       400:
 *         description: Solicitud inválida
 *       404:
 *         description: Área no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.put('/:id', updateArea);

/**
 * @swagger
 * /api/areas/{id}:
 *   delete:
 *     summary: Elimina un área por ID
 *     tags: [Áreas]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del área
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Área eliminada
 *       404:
 *         description: Área no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.delete('/:id', deleteArea);

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
