// @ts-nocheck
const jwt = require('jsonwebtoken'); // Para generar el token JWT
const bcrypt = require('bcrypt'); // Para comparar las contraseñas hasheadas
const express = require('express')
const router = express.Router();

// Simulando una base de datos de usuarios
const users = [
    { 
        Id_Usuario: 1, 
        Nom_Usuario: 'Marlon', 
        Ape_Usuario: 'Cumbe', 
        Cod_Usuario: 'MC123', 
        Cor_Usuario: 'marlon@example.com', 
        Nde_Usuario: '1234567890', 
        Fec_Usuario: '1990-01-01', 
        estado: 'Sí', 
        createdAt: '2024-08-22 10:00:00', 
        updatedAt: '2024-08-22 10:00:00', 
        rol: 'Administrador', 
        token: '', 
        password: '$2b$10$9aG7P0H2IqR57d.xdfHIQeuEpYqjlQwJJYmbtS6Ym2yQhQm57JrOG' // Contraseña hasheada: '1234'
    },
    // Otros usuarios...
];

// Función para manejar el inicio de sesión
router.post('/login', async (req, res) => {
    const { Cod_Usuario, password } = req.body;

    // Verificación básica de que se proporcionen los campos
    if (!Cod_Usuario || !password) {
        return res.status(400).json({ error: 'Faltan el código de usuario o la contraseña' });
    }

    // Buscar al usuario en la "base de datos"
    const user = users.find(u => u.Cod_Usuario === Cod_Usuario);

    if (!user) {
        // Si no se encuentra el usuario
        return res.status(401).json({ error: 'Código de usuario o contraseña incorrectos' });
    }

    // Comparar la contraseña proporcionada con la hasheada en la base de datos
    const passwordMatch = await bcrypt.compare(password, user.password);
    
    if (!passwordMatch) {
        // Si la contraseña es incorrecta
        return res.status(401).json({ error: 'Código de usuario o contraseña incorrectos' });
    }

    // Generar un token JWT
    const token = jwt.sign(
        { Id_Usuario: user.Id_Usuario, rol: user.rol },
        'secretKey', // Cambia esto a una clave secreta segura
        { expiresIn: '1h' }
    );

    // Actualizar el token en la "base de datos"
    user.token = token;

    // Si la autenticación es exitosa
    return res.status(200).json({ 
        message: 'Inicio de sesión exitoso', 
        user: {
            Id_Usuario: user.Id_Usuario,
            Nom_Usuario: user.Nom_Usuario,
            Ape_Usuario: user.Ape_Usuario,
            Cor_Usuario: user.Cor_Usuario,
            rol: user.rol,
            token: user.token
        } 
    });
});

module.exports = router;
