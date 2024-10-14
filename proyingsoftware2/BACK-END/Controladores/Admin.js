import express from "express";
import { Admin, Producto, StockProducto , Marca} from "../Models/Relaciones.js";


const router = express.Router();


router.post('/iniciarSesion', async (req, res) => {
    const { correo, password } = req.body;
  
    try {
      
      const admin = await Admin.findOne({ where: { correo: correo.toLowerCase() } });
  
      // Si no se encuentra el administrador
      if (!admin) {
        return res.status(401).json({ message: 'Credenciales inválidas. Administrador no encontrado.' });
      }
  
      // Compara la contraseña 
      if (admin.password !== password) {
        return res.status(401).json({ message: 'Credenciales inválidas. Contraseña incorrecta.' });
      }
  
      
      return res.json({
        message: 'Inicio de sesión exitoso',
        user: {
          id: admin.id,
          nombre: admin.nombre,
          apellidoPaterno: admin.apellidoPaterno,
        },
      });
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
      return res.status(500).json({ message: 'Error en el servidor. Inténtalo nuevamente más tarde.' });
    }
  });
  
  router.get('/boticaProductos/:boticaID', async (req, res) => {
    const { boticaID } = req.params;
    try {
        const productos = await Producto.findAll({
            where: { boticaID },
            include: [
                {
                    model: Marca,
                    attributes: ['id', 'nombre'],
                },
                {
                    model: StockProducto,
                    attributes: ['cantidad', 'precio'],
                }
            ]
        });
        res.json(productos);
    } catch (error) {
        console.error("Error al obtener los productos:", error);
        res.status(500).json({ error: "Error al obtener los productos" });
    }
});

  
  


export default router;
