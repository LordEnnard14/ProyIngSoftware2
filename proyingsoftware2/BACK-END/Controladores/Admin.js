import express from "express";
import { Admin, Producto , Marca, ProductoDetalle,Botica} from "../Models/Relaciones.js";


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
        const productos = await ProductoDetalle.findAll({
            where: { boticaID },
            include: [
                {
                    model: Producto,
                    attributes: ['id','nombre', 'presentacion', 'categoria', 'nRegistroSanitario'],
                    include:[
                      {
                        model: Marca,
                        attributes: ['id', 'nombre'],
                      },
                    ]
                },
            ]
        });
        res.json(productos);
    } catch (error) {
        console.error("Error al obtener los productos:", error);
        res.status(500).json({ error: "Error al obtener los productos" });
    }
});

router.get('/administradores', async (req, res) => {
  const { boticaID } = req.query; 

  try {
      const whereClause = boticaID ? { boticaID: boticaID } : {}; // 

      const administradores = await Admin.findAll({
          where: whereClause,
          include: {
              model: Botica,
              attributes: ['nombre'],
              required: false
          }
      });

      if (administradores.length === 0) {
          return res.status(404).json({ mensaje: 'No se encontraron administradores' });
      }

      const resultado = administradores.map(admin => ({
          nombre: admin.nombre,
          apellidoPaterno: admin.apellidoPaterno,
          apellidoMaterno: admin.apellidoMaterno,
          botica: admin.Botica ? admin.Botica.nombre : 'Sin botica'
      }));

      res.status(200).json(resultado);
  } catch (error) {
      console.error('Error al obtener administradores:', error);
      res.status(500).json({ mensaje: 'Error al obtener administradores', error: error.message });
  }
});




router.post('/registrar', async (req, res) => {
  const { nombre, apellidoPaterno, apellidoMaterno, correo, password, dni, boticaID } = req.body;

  if (!boticaID) {
      return res.status(400).json({ message: "El ID de la botica es obligatorio" });
  }

  try {
      const nuevoAdmin = await Admin.create({
          nombre,
          apellidoPaterno,
          apellidoMaterno,
          correo,
          password,
          dni,
          boticaID,
      });

      res.status(201).json({ message: "Administrador registrado exitosamente", admin: nuevoAdmin });
  } catch (error) {
      console.error("Error al registrar el administrador:", error);
      res.status(500).json({ message: "Error al registrar el administrador", error: error.message });
  }
});



export default router;
