// @ts-nocheck
const express = require('express');
const {
  getProcedimientos,
  getProcedimientoById,
  createProcedimiento,
  updateProcedimiento,
  deleteProcedimiento,
} = require('../controllers/procedimientoController.js');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Procedimientos
 *   description: Operaciones relacionadas con procedimientos
 */

/**
 * @swagger
 * /api/procedimientos:
 *   get:
 *     summary: Obtiene todos los procedimientos
 *     tags: [Procedimientos]
 *     responses:
 *       200:
 *         description: Lista de procedimientos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID del procedimiento
 *                   nombre_procedimiento:
 *                     type: string
 *                     description: Nombre del procedimiento
 *                   descripcion:
 *                     type: string
 *                     description: Descripción del procedimiento
 *                   id_proceso:
 *                     type: integer
 *                     description: ID del proceso al que pertenece el procedimiento
 *       500:
 *         description: Error interno del servidor
 */
router.get('/', getProcedimientos);

/**
 * @swagger
 * /api/procedimientos/{id}:
 *   get:
 *     summary: Obtiene un procedimiento por ID
 *     tags: [Procedimientos]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del procedimiento
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Procedimiento encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID del procedimiento
 *                 nombre_procedimiento:
 *                   type: string
 *                   description: Nombre del procedimiento
 *                 descripcion:
 *                   type: string
 *                   description: Descripción del procedimiento
 *                 id_proceso:
 *                   type: integer
 *                   description: ID del proceso al que pertenece el procedimiento
 *       404:
 *         description: Procedimiento no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/:id', getProcedimientoById);

/**
 * @swagger
 * /api/procedimientos:
 *   post:
 *     summary: Crea un nuevo procedimiento
 *     tags: [Procedimientos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre_procedimiento:
 *                 type: string
 *                 description: Nombre del procedimiento
 *               descripcion:
 *                 type: string
 *                 description: Descripción del procedimiento
 *               id_proceso:
 *                 type: integer
 *                 description: ID del proceso al que pertenece el procedimiento
 *     responses:
 *       201:
 *         description: Procedimiento creado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID del nuevo procedimiento
 *                 nombre_procedimiento:
 *                   type: string
 *                   description: Nombre del procedimiento
 *                 descripcion:
 *                   type: string
 *                   description: Descripción del procedimiento
 *                 id_proceso:
 *                   type: integer
 *                   description: ID del proceso al que pertenece el procedimiento
 *       400:
 *         description: Solicitud inválida
 *       500:
 *         description: Error interno del servidor
 */
router.post('/', createProcedimiento);

/**
 * @swagger
 * /api/procedimientos/{id}:
 *   put:
 *     summary: Actualiza un procedimiento existente
 *     tags: [Procedimientos]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del procedimiento
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre_procedimiento:
 *                 type: string
 *                 description: Nuevo nombre del procedimiento
 *               descripcion:
 *                 type: string
 *                 description: Nueva descripción del procedimiento
 *               id_proceso:
 *                 type: integer
 *                 description: Nuevo ID del proceso al que pertenece el procedimiento
 *     responses:
 *       200:
 *         description: Procedimiento actualizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID del procedimiento
 *                 nombre_procedimiento:
 *                   type: string
 *                   description: Nombre del procedimiento
 *                 descripcion:
 *                   type: string
 *                   description: Descripción del procedimiento
 *                 id_proceso:
 *                   type: integer
 *                   description: ID del proceso al que pertenece el procedimiento
 *       400:
 *         description: Solicitud inválida
 *       404:
 *         description: Procedimiento no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.put('/:id', updateProcedimiento);

/**
 * @swagger
 * /api/procedimientos/{id}:
 *   delete:
 *     summary: Elimina un procedimiento por ID
 *     tags: [Procedimientos]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del procedimiento
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Procedimiento eliminado
 *       404:
 *         description: Procedimiento no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.delete('/:id', deleteProcedimiento);

module.exports = router;
