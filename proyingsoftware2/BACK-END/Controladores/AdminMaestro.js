import express from 'express';
import {AdminMaestro, Admin, Botica, Usuario} from "../models/Relaciones.js";

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

  router.get('/estadisticasSuperAdmin', async (req, res) => {
    try {
      // Contar la cantidad de usuarios
      const totalUsuarios = await Usuario.count();
  
      // Contar la cantidad de boticas
      const totalBoticas = await Botica.count();
  
      // Contar la cantidad de administradores
      const totalAdmins = await Admin.count();
  
      // Responder con los datos
      res.json({
        usuarios: totalUsuarios,
        boticas: totalBoticas,
        administradores: totalAdmins,
      });
    } catch (error) {
      console.error('Error al obtener estadísticas:', error);
      res.status(500).json({ message: 'Error en el servidor.' });
    }
  });

  router.get('/obtenerAdminsMaestros', async (req, res) => {
    try {
      // Obtener todos los administradores maestros de la base de datos
      const adminsMaestros = await AdminMaestro.findAll();
  
      // Verificar si hay registros en la base de datos
      if (!adminsMaestros.length) {
        return res.status(404).json({ message: 'No se encontraron administradores maestros.' });
      }
  
      // Responder con la lista de administradores
      return res.json(adminsMaestros);
    } catch (error) {
      console.error('Error al obtener administradores maestros:', error);
      return res.status(500).json({ message: 'Error en el servidor. Inténtalo nuevamente más tarde.' });
    }
  });

 



export default router;
