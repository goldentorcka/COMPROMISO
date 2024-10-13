// @ts-nocheck
const express = require('express');
const {
  getUnidades,
  getUnidadById,
  createUnidad,
  updateUnidad,
  deleteUnidad,
} = require('../controllers/unidadController.js');
const logger = require('../../../../config/logger.js');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Unidades
 *   description: Operaciones relacionadas con unidades
 */

/**
 * @swagger
 * /api/unidades:
 *   get:
 *     summary: Obtiene todas las unidades
 *     tags: [Unidades]
 *     responses:
 *       200:
 *         description: Lista de unidades
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID de la unidad
 *                   nombre_unidad:
 *                     type: string
 *                     description: Nombre de la unidad
 *                   descripcion:
 *                     type: string
 *                     description: Descripción de la unidad
 *       500:
 *         description: Error interno del servidor
 */
router.get('/', getUnidades);

/**
 * @swagger
 * /api/unidades/{id}:
 *   get:
 *     summary: Obtiene una unidad por ID
 *     tags: [Unidades]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la unidad
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Unidad encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID de la unidad
 *                 nombre_unidad:
 *                   type: string
 *                   description: Nombre de la unidad
 *                 descripcion:
 *                   type: string
 *                   description: Descripción de la unidad
 *       404:
 *         description: Unidad no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.get('/:id', getUnidadById);

/**
 * @swagger
 * /api/unidades:
 *   post:
 *     summary: Crea una nueva unidad
 *     tags: [Unidades]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre_unidad:
 *                 type: string
 *                 description: Nombre de la unidad
 *               descripcion:
 *                 type: string
 *                 description: Descripción de la unidad
 *     responses:
 *       201:
 *         description: Unidad creada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID de la nueva unidad
 *                 nombre_unidad:
 *                   type: string
 *                   description: Nombre de la unidad
 *                 descripcion:
 *                   type: string
 *                   description: Descripción de la unidad
 *       400:
 *         description: Solicitud inválida
 *       500:
 *         description: Error interno del servidor
 */
router.post('/', createUnidad);

/**
 * @swagger
 * /api/unidades/{id}:
 *   put:
 *     summary: Actualiza una unidad existente
 *     tags: [Unidades]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la unidad
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre_unidad:
 *                 type: string
 *                 description: Nuevo nombre de la unidad
 *               descripcion:
 *                 type: string
 *                 description: Nueva descripción de la unidad
 *     responses:
 *       200:
 *         description: Unidad actualizada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID de la unidad
 *                 nombre_unidad:
 *                   type: string
 *                   description: Nombre de la unidad
 *                 descripcion:
 *                   type: string
 *                   description: Descripción de la unidad
 *       400:
 *         description: Solicitud inválida
 *       404:
 *         description: Unidad no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.put('/:id', updateUnidad);

/**
 * @swagger
 * /api/unidades/{id}:
 *   delete:
 *     summary: Elimina una unidad por ID
 *     tags: [Unidades]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la unidad
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Unidad eliminada
 *       404:
 *         description: Unidad no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.delete('/:id', deleteUnidad);

module.exports = router;
