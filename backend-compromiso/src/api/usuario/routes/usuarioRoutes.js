// @ts-nocheck
const express = require('express');
const {
  getUsuarios,
  getUsuarioById,
  createUsuario,
  updateUsuario,
  deleteUsuario,
  loginUsuario,
  olvidePassword
} = require('../controllers/usuarioController.js');
const logger = require('../../../../config/logger.js');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: Operaciones relacionadas con usuarios
 */

/**
 * @swagger
 * /api/usuarios/login:
 *   post:
 *     summary: Inicia sesión de un usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Cor_Usuario:
 *                 type: string
 *                 description: Correo electrónico del usuario
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de éxito
 *                 user:
 *                   type: object
 *                   properties:
 *                     Id_Usuario:
 *                       type: integer
 *                       description: ID del usuario
 *                     Nom_Usuario:
 *                       type: string
 *                       description: Nombre del usuario
 *                     Cor_Usuario:
 *                       type: string
 *                       description: Correo electrónico del usuario
 *                     rol:
 *                       type: string
 *                       description: Rol del usuario
 *                     token:
 *                       type: string
 *                       description: Token de autenticación
 *       401:
 *         description: Credenciales inválidas
 *       500:
 *         description: Error interno del servidor
 */
router.post('/login', loginUsuario);
/**
 * @swagger
 * /api/usuarios:
 *   get:
 *     summary: Obtiene todos los usuarios
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   Id_Usuario:
 *                     type: integer
 *                     description: ID del usuario
 *                   Nom_Usuario:
 *                     type: string
 *                     description: Nombre del usuario
 *                   Cor_Usuario:
 *                     type: string
 *                     description: Correo electrónico del usuario
 *       500:
 *         description: Error interno del servidor
 */
router.get('/', getUsuarios);

/**
 * @swagger
 * /api/usuarios/{id}:
 *   get:
 *     summary: Obtiene un usuario por ID
 *     tags: [Usuarios]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Id_Usuario:
 *                   type: integer
 *                   description: ID del usuario
 *                 Nom_Usuario:
 *                   type: string
 *                   description: Nombre del usuario
 *                 Cor_Usuario:
 *                   type: string
 *                   description: Correo electrónico del usuario
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/:id', getUsuarioById);

/**
 * @swagger
 * /api/usuarios:
 *   post:
 *     summary: Crea un nuevo usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Nom_Usuario:
 *                 type: string
 *                 description: Nombre del usuario
 *               Cor_Usuario:
 *                 type: string
 *                 description: Correo electrónico del usuario
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario
 *     responses:
 *       201:
 *         description: Usuario creado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Id_Usuario:
 *                   type: integer
 *                   description: ID del nuevo usuario
 *                 Nom_Usuario:
 *                   type: string
 *                   description: Nombre del nuevo usuario
 *                 Cor_Usuario:
 *                   type: string
 *                   description: Correo electrónico del nuevo usuario
 *       400:
 *         description: Solicitud inválida
 *       500:
 *         description: Error interno del servidor
 */
router.post('/', createUsuario);

/**
 * @swagger
 * /api/usuarios/{id}:
 *   put:
 *     summary: Actualiza un usuario existente
 *     tags: [Usuarios]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Nom_Usuario:
 *                 type: string
 *                 description: Nuevo nombre del usuario
 *               Cor_Usuario:
 *                 type: string
 *                 description: Nuevo correo electrónico del usuario
 *               password:
 *                 type: string
 *                 description: Nueva contraseña del usuario
 *     responses:
 *       200:
 *         description: Usuario actualizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Id_Usuario:
 *                   type: integer
 *                   description: ID del usuario
 *                 Nom_Usuario:
 *                   type: string
 *                   description: Nombre actualizado del usuario
 *                 Cor_Usuario:
 *                   type: string
 *                   description: Correo electrónico actualizado del usuario
 *       400:
 *         description: Solicitud inválida
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.put('/:id', updateUsuario);

/**
 * @swagger
 * /api/usuarios/{id}:
 *   delete:
 *     summary: Elimina un usuario por ID
 *     tags: [Usuarios]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Usuario eliminado
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.delete('/:id', deleteUsuario);

// Middleware de manejo de errores (opcional)
// router.use((err, req, res, next) => {
//   if (err) {
//     logger.error(`Error: ${err.message}, Ruta: ${req.method} ${req.originalUrl}, IP: ${req.ip}`);
//     res.status(500).json({ error: 'Algo salió mal, intente de nuevo más tarde' });
//   } else {
//     next();
//   }
// });

module.exports = router;
