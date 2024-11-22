import express from 'express';
import AdminMaestro from '../Models/AdminMaestro.js';

const router = express.Router();

router.post('/iniciarSesionSuperAdmin', async (req, res) => {
    const { correo, password } = req.body;
  
    try {
      // Verificar si el correo corresponde al superAdmin en la base de datos
      const superAdmin = await AdminMaestro.findOne({ where: { correo: 'admin@admin.com' } });
  
      // Si no se encuentra el superAdmin
      if (!superAdmin) {
        return res.status(401).json({ message: 'El super administrador no existe.' });
      }
  
      // Comparar la contraseña
      if (superAdmin.password !== password) {
        return res.status(401).json({ message: 'Credenciales inválidas. Contraseña incorrecta.' });
      }
  
      // Responder con los datos del superAdmin
      return res.json({
        message: 'Inicio de sesión exitoso como Super Administrador',
        admin: {
          id: superAdmin.id,
          nombre: superAdmin.nombre,
          apellidoPaterno: superAdmin.apellidoPaterno,
          esSuperAdmin: true,
        },
      });
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
      return res.status(500).json({ message: 'Error en el servidor. Inténtalo nuevamente más tarde.' });
    }
  });



export default router;
