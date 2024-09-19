// // @ts-nocheck
// const express = require('express');
// const {
//   crearUsuario,
//   actualizarUsuario,
//   eliminarUsuario,
//   loginUsuario,
//   olvidePassword,
//   resetPassword,
//   getUsuarios,
//   getUsuarioById
// } = require('../controllers/usuarioController');
// const logger = require('../../../../config/logger.js');

// const router = express.Router();

// /**
//  * @swagger
//  * tags:
//  *   name: Usuarios
//  *   description: Operaciones relacionadas con usuarios
//  */

// /**
//  * @swagger
//  * /api/usuarios/login:
//  *   post:
//  *     summary: Inicia sesión de un usuario
//  *     tags: [Usuarios]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               Cor_Usuario:
//  *                 type: string
//  *                 description: Correo electrónico del usuario
//  *               password:
//  *                 type: string
//  *                 description: Contraseña del usuario
//  *     responses:
//  *       200:
//  *         description: Inicio de sesión exitoso
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 token:
//  *                   type: string
//  *                   description: Token de autenticación
//  *       401:
//  *         description: Credenciales inválidas
//  *       500:
//  *         description: Error interno del servidor
//  */
// router.post('/login', loginUsuario);

// /**
//  * @swagger
//  * /api/usuarios/olvide-password:
//  *   post:
//  *     summary: Solicita un cambio de contraseña
//  *     tags: [Usuarios]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               Cor_Usuario:
//  *                 type: string
//  *                 description: Correo electrónico del usuario
//  *     responses:
//  *       200:
//  *         description: Solicitud de cambio de contraseña enviada
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 message:
//  *                   type: string
//  *                   description: Mensaje de éxito
//  *       404:
//  *         description: Correo electrónico no encontrado
//  *       500:
//  *         description: Error interno del servidor
//  */
// router.post('/olvide-password', olvidePassword);

// /**
//  * @swagger
//  * /api/usuarios/reset-password:
//  *   post:
//  *     summary: Restablece la contraseña del usuario usando el token de restablecimiento
//  *     tags: [Usuarios]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               token:
//  *                 type: string
//  *                 description: Token de restablecimiento de contraseña
//  *               password:
//  *                 type: string
//  *                 description: Nueva contraseña del usuario
//  *     responses:
//  *       200:
//  *         description: Contraseña actualizada correctamente
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 message:
//  *                   type: string
//  *                   description: Mensaje de éxito
//  *       400:
//  *         description: Token inválido o expirado
//  *       500:
//  *         description: Error interno del servidor
//  */
// router.post('/reset-password', resetPassword);

// /**
//  * @swagger
//  * /api/usuarios:
//  *   get:
//  *     summary: Obtiene todos los usuarios
//  *     tags: [Usuarios]
//  *     responses:
//  *       200:
//  *         description: Lista de usuarios
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: array
//  *               items:
//  *                 type: object
//  *                 properties:
//  *                   Id_Usuario:
//  *                     type: integer
//  *                     description: ID del usuario
//  *                   Nom_Usuario:
//  *                     type: string
//  *                     description: Nombre del usuario
//  *                   Cor_Usuario:
//  *                     type: string
//  *                     description: Correo electrónico del usuario
//  *       500:
//  *         description: Error interno del servidor
//  */
// router.get('/', getUsuarios);

// /**
//  * @swagger
//  * /api/usuarios/{id}:
//  *   get:
//  *     summary: Obtiene un usuario por ID
//  *     tags: [Usuarios]
//  *     parameters:
//  *       - name: id
//  *         in: path
//  *         required: true
//  *         description: ID del usuario
//  *         schema:
//  *           type: integer
//  *     responses:
//  *       200:
//  *         description: Usuario encontrado
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 Id_Usuario:
//  *                   type: integer
//  *                   description: ID del usuario
//  *                 Nom_Usuario:
//  *                   type: string
//  *                   description: Nombre del usuario
//  *                 Cor_Usuario:
//  *                   type: string
//  *                   description: Correo electrónico del usuario
//  *       404:
//  *         description: Usuario no encontrado
//  *       500:
//  *         description: Error interno del servidor
//  */
// router.get('/:id', getUsuarioById);

// /**
//  * @swagger
//  * /api/usuarios:
//  *   post:
//  *     summary: Crea un nuevo usuario
//  *     tags: [Usuarios]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               Nom_Usuario:
//  *                 type: string
//  *                 description: Nombre del usuario
//  *               Ape_Usuario:
//  *                 type: string
//  *                 description: Apellido del usuario
//  *               Cod_Usuario:
//  *                 type: string
//  *                 description: Código del usuario
//  *               Cor_Usuario:
//  *                 type: string
//  *                 description: Correo electrónico del usuario
//  *               Fec_Usuario:
//  *                 type: string
//  *                 format: date
//  *                 description: Fecha de nacimiento del usuario
//  *               estado:
//  *                 type: string
//  *                 description: Estado del usuario (Sí/No)
//  *               rol:
//  *                 type: string
//  *                 description: Rol del usuario
//  *               password:
//  *                 type: string
//  *                 description: Contraseña del usuario
//  *     responses:
//  *       201:
//  *         description: Usuario creado
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 Id_Usuario:
//  *                   type: integer
//  *                   description: ID del nuevo usuario
//  *                 Nom_Usuario:
//  *                   type: string
//  *                   description: Nombre del nuevo usuario
//  *                 Cor_Usuario:
//  *                   type: string
//  *                   description: Correo electrónico del nuevo usuario
//  *       400:
//  *         description: Solicitud inválida
//  *       500:
//  *         description: Error interno del servidor
//  */
// router.post('/', crearUsuario);

// /**
//  * @swagger
//  * /api/usuarios/{id}:
//  *   put:
//  *     summary: Actualiza un usuario existente
//  *     tags: [Usuarios]
//  *     parameters:
//  *       - name: id
//  *         in: path
//  *         required: true
//  *         description: ID del usuario
//  *         schema:
//  *           type: integer
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               Nom_Usuario:
//  *                 type: string
//  *                 description: Nuevo nombre del usuario
//  *               Ape_Usuario:
//  *                 type: string
//  *                 description: Nuevo apellido del usuario
//  *               Cod_Usuario:
//  *                 type: string
//  *                 description: Nuevo código del usuario
//  *               Cor_Usuario:
//  *                 type: string
//  *                 description: Nuevo correo electrónico del usuario
//  *               Fec_Usuario:
//  *                 type: string
//  *                 format: date
//  *                 description: Nueva fecha de nacimiento del usuario
//  *               estado:
//  *                 type: string
//  *                 description: Nuevo estado del usuario (Sí/No)
//  *               rol:
//  *                 type: string
//  *                 description: Nuevo rol del usuario
//  *               password:
//  *                 type: string
//  *                 description: Nueva contraseña del usuario
//  *     responses:
//  *       200:
//  *         description: Usuario actualizado
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 Id_Usuario:
//  *                   type: integer
//  *                   description: ID del usuario
//  *                 Nom_Usuario:
//  *                   type: string
//  *                   description: Nombre actualizado del usuario
//  *                 Cor_Usuario:
//  *                   type: string
//  *                   description: Correo electrónico actualizado del usuario
//  *       400:
//  *         description: Solicitud inválida
//  *       404:
//  *         description: Usuario no encontrado
//  *       500:
//  *         description: Error interno del servidor
//  */
// router.put('/:id', actualizarUsuario);

// /**
//  * @swagger
//  * /api/usuarios/{id}:
//  *   delete:
//  *     summary: Elimina un usuario por ID
//  *     tags: [Usuarios]
//  *     parameters:
//  *       - name: id
//  *         in: path
//  *         required: true
//  *         description: ID del usuario
//  *         schema:
//  *           type: integer
//  *     responses:
//  *       200:
//  *         description: Usuario eliminado
//  *       404:
//  *         description: Usuario no encontrado
//  *       500:
//  *         description: Error interno del servidor
//  */
// router.delete('/:id', eliminarUsuario);

// module.exports = router;
