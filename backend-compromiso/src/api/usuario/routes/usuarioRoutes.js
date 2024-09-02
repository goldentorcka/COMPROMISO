// @ts-nocheck
const express = require('express');
const {
  getUsuarios,
  getUsuarioById,
  createUsuario,
  updateUsuario,
  deleteUsuario,
  loginUsuario
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
 *                 token:
 *                   type: string
 *                   description: Token de autenticación
 *       401:
 *         description: Credenciales inválidas
 *       500:
 *         description: Error interno del servidor
 */
router.post('/login', async (req, res) => {
  const { Cor_Usuario, password } = req.body;

  try {
    // Llamar al controlador de login para validar las credenciales
    const usuario = await loginUsuario(Cor_Usuario, password);

    if (usuario) {
      // Redirigir a la página del admin si las credenciales son correctas
      res.redirect('/admin');
    } else {
      // Enviar mensaje de error si las credenciales son incorrectas
      res.status(401).json({ error: 'Credenciales inválidas' });
    }
  } catch (err) {
    logger.error(`Error: ${err.message}, Ruta: ${req.method} ${req.originalUrl}, IP: ${req.ip}`);
    res.status(500).json({ error: 'Algo salió mal, intente de nuevo más tarde' });
  }
});

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

// Middleware de manejo de errores
router.use((err, req, res, next) => {
  if (err) {
    logger.error(`Error: ${err.message}, Ruta: ${req.method} ${req.originalUrl}, IP: ${req.ip}`);
    res.status(500).json({ error: 'Algo salió mal, intente de nuevo más tarde' });
  } else {
    next();
  }
});

module.exports = router;
