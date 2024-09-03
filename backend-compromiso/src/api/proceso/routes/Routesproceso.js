// @ts-nocheck
const express = require('express');
const {
  getProcesos,
  getProcesoById,
  createProceso,
  updateProceso,
  deleteProceso,
} = require('../controllers/procesoController.js');
const logger = require('../../../../config/logger.js');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Procesos
 *   description: Operaciones relacionadas con procesos
 */

/**
 * @swagger
 * /api/procesos:
 *   get:
 *     summary: Obtiene todos los procesos
 *     tags: [Procesos]
 *     responses:
 *       200:
 *         description: Lista de procesos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID del proceso
 *                   nombre_proceso:
 *                     type: string
 *                     description: Nombre del proceso
 *                   descripcion:
 *                     type: string
 *                     description: Descripción del proceso
 *       500:
 *         description: Error interno del servidor
 */
router.get('/', getProcesos);

/**
 * @swagger
 * /api/procesos/{id}:
 *   get:
 *     summary: Obtiene un proceso por ID
 *     tags: [Procesos]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del proceso
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Proceso encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID del proceso
 *                 nombre_proceso:
 *                   type: string
 *                   description: Nombre del proceso
 *                 descripcion:
 *                   type: string
 *                   description: Descripción del proceso
 *       404:
 *         description: Proceso no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/:id', getProcesoById);

/**
 * @swagger
 * /api/procesos:
 *   post:
 *     summary: Crea un nuevo proceso
 *     tags: [Procesos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre_proceso:
 *                 type: string
 *                 description: Nombre del proceso
 *               descripcion:
 *                 type: string
 *                 description: Descripción del proceso
 *     responses:
 *       201:
 *         description: Proceso creado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID del nuevo proceso
 *                 nombre_proceso:
 *                   type: string
 *                   description: Nombre del proceso
 *                 descripcion:
 *                   type: string
 *                   description: Descripción del proceso
 *       400:
 *         description: Solicitud inválida
 *       500:
 *         description: Error interno del servidor
 */
router.post('/', createProceso);

/**
 * @swagger
 * /api/procesos/{id}:
 *   put:
 *     summary: Actualiza un proceso existente
 *     tags: [Procesos]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del proceso
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre_proceso:
 *                 type: string
 *                 description: Nuevo nombre del proceso
 *               descripcion:
 *                 type: string
 *                 description: Nueva descripción del proceso
 *     responses:
 *       200:
 *         description: Proceso actualizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID del proceso
 *                 nombre_proceso:
 *                   type: string
 *                   description: Nombre del proceso
 *                 descripcion:
 *                   type: string
 *                   description: Descripción del proceso
 *       400:
 *         description: Solicitud inválida
 *       404:
 *         description: Proceso no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.put('/:id', updateProceso);

/**
 * @swagger
 * /api/procesos/{id}:
 *   delete:
 *     summary: Elimina un proceso por ID
 *     tags: [Procesos]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del proceso
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Proceso eliminado
 *       404:
 *         description: Proceso no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.delete('/:id', deleteProceso);

module.exports = router;
