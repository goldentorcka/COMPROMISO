// @ts-nocheck
// Iniciar sesión
const loginUsuario = async (req, res) => {
    const { Cod_Usuario, password } = req.body;
  
    try {
      // Verificación básica de que se proporcionen los campos
      if (!Cod_Usuario || !password) {
        return res.status(400).json({ error: 'Faltan el código de usuario o la contraseña' });
      }
  
      // Buscar al usuario en la base de datos real
      const usuario = await Usuario.findOne({ where: { Cod_Usuario } });
  
      if (!usuario) {
        return res.status(401).json({ error: 'Código de usuario o contraseña incorrectos' });
      }
  
      // Comparar la contraseña proporcionada con la hasheada en la base de datos
      const passwordMatch = await bcrypt.compare(password, usuario.password);
      
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Código de usuario o contraseña incorrectos' });
      }
  
      // Generar un token JWT
      const token = jwt.sign(
        { Id_Usuario: usuario.Id_Usuario, rol: usuario.rol },
        process.env.JWT_SECRET || 'secretKey', // Usa la clave secreta del entorno o una por defecto
        { expiresIn: '1h' }
      );
  
      // Actualizar el token en la base de datos
      await Usuario.update({ token }, { where: { Id_Usuario: usuario.Id_Usuario } });
  
      // Si la autenticación es exitosa
      return res.status(200).json({
        message: 'Inicio de sesión exitoso',
        user: {
          Id_Usuario: usuario.Id_Usuario,
          Nom_Usuario: usuario.Nom_Usuario,
          Ape_Usuario: usuario.Ape_Usuario,
          Cor_Usuario: usuario.Cor_Usuario,
          rol: usuario.rol,
          token
        }
      });
    } catch (error) {
      logger.error(error.message, { stack: error.stack });
      res.status(500).json({ error: 'Error en el servidor' });
    }
  };