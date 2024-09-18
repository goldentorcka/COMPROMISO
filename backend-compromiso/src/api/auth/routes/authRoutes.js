import express from 'express';
import { 
  createUsuario, 
  loginUsuario, 
  getUsuarioById, 
  olvidePassword,
  comprobarToken,
  nuevoPassword
} from '../controllers/authController.js'; // Controladores del usuario

import checkAuth from '../../../../middlewares/authMiddleware.js'; // Middleware para autenticación

const router = express.Router();

// Área Pública
router.post('/registro', createUsuario); // Ruta para registrar usuario
router.post('/login', loginUsuario);     // Ruta para iniciar sesión
router.post('/olvide-password', olvidePassword); // Ruta para solicitar recuperación de contraseña
router.route('/olvide-password/:token')  // Ruta para validar token y restablecer contraseña
  .get(comprobarToken)                    // Obtiene el token de recuperación de contraseña
  .post(nuevoPassword);                   // Envío del nuevo password

// Área Privada (requiere autenticación)
router.get('/perfil/:id', checkAuth, getUsuarioById); // Ruta para obtener perfil de usuario autenticado

export default router;
