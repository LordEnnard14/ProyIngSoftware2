import express from "express";
import { Admin, Producto, StockProducto , Marca} from "../Models/Relaciones.js";


const router = express.Router();

// Ruta para iniciar sesión y generar el token JWT
router.post('/iniciarSesion', async (req, res) => {
    const { correo, password } = req.body;
  
    try {
      // Busca al administrador por su correo
      const admin = await Admin.findOne({ where: { correo: correo.toLowerCase() } });
  
      // Si no se encuentra el administrador
      if (!admin) {
        return res.status(401).json({ message: 'Credenciales inválidas. Administrador no encontrado.' });
      }
  
      // Compara la contraseña directamente
      if (admin.password !== password) {
        return res.status(401).json({ message: 'Credenciales inválidas. Contraseña incorrecta.' });
      }
  
      // Retorna los datos del admin (sin crear un token)
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
                    attributes: ['cantidad', 'precio', 'estado'],
                }
            ]
        });
        res.json(productos);
    } catch (error) {
        console.error("Error al obtener los productos:", error);
        res.status(500).json({ error: "Error al obtener los productos" });
    }
});

  
  
/*
// Ruta para obtener productos, filtrada por adminID, con autenticación JWT
router.get('/productos', authenticateToken, async (req, res) => {
  const adminID = req.user.adminID; // Obtenemos el adminID del token JWT

  try {
    // Consultar el stock de productos que pertenece al adminID
    const stockProductos = await StockProducto.findAll({
      where: { adminID }, // Filtrar por adminID del token
      include: [Producto], // Incluir los detalles del producto asociado
    });

    if (stockProductos.length === 0) {
      return res.status(404).json({ message: 'No se encontraron productos para este admin.' });
    }

    res.json(stockProductos);
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    res.status(500).json({ message: 'Error al obtener los productos' });
  }
});*/

export default router;
