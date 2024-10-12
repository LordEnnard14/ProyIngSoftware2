// Archivo: Controladores/Productos.js
import express from "express";
import {Producto, StockProducto, Marca, Botica} from "../models/Relaciones.js";
import { Op } from "sequelize";
import multer from 'multer';
import path from 'path';

const router = express.Router();


router.use('/images', express.static('Imgs'));

const storage = multer.diskStorage({
  destination: function(req,file,cb){
     cb(null, 'Imgs/');
  },
  filename: function(req,file,cb){
    cb(null,Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({storage: storage});

router.post('/newProducto', upload.single('imagen'), async (req, res) => {
  try {
    const productoExistente = await Producto.findOne( {where: {
      nombre: req.body.nombre,
      nRegistroSanitario: req.body.registroSanitario,
      boticaID: req.body.boticaID
    } })
    if(productoExistente !== null){
      return res.status(409).send({
        Mensaje: 'Producto existente',
        Producto: productoExistente
      });
    }else {

      const imagen = req.file;
      const imagenUrl= `/images/${imagen.filename}`;

      const productoNuevo = await Producto.create({
        nombre: req.body.nombre,
        presentacion: req.body.presentacion,
        nRegistroSanitario: req.body.registroSanitario,
        categoria: req.body.categorias,
        marcaID: req.body.marcaID,
        boticaID: req.body.boticaID,
        descripcion: req.body.descripcion,
        caracteristicas: req.body.caracteristicas,
        imageUrl: imagenUrl,
      })
      return res.status(201).send({
        Mensaje: 'Producto creado exitosamente',
        Producto: productoNuevo
      });
    }
  } catch (error){
    console.error("Error al crear producto", error);
    res.status(500).send('Error al crear producto');
  }  
})


router.get('/stockProductosAll', async (req, res) => {
  const { categoria } = req.query;

    try {
      const stockProductos = await StockProducto.findAll({
        include: [
          {
            model: Producto,
            where: categoria ? { categorias: { [Op.contains]: [categoria] } } : {},
            include: [
              {
                model: Marca,
                attributes: ['id', 'nombre'] 
              },
              {
                model: Botica,
                attributes: ['id', 'nombre', 'direccion'] 
              }
            ],
            attributes: ['id', 'nombre','presentacion', 'imageUrl'] 
          }
        ]
      });
  
      res.json(stockProductos); 
    } catch (error) {
      console.error("Error al obtener los stockproductos:", error);
      res.status(500).json({ error: "Error al obtener los stockproductos" });
    }
  });

  
  router.get('/stockProductos/:id', async (req, res) => {
    const { id } = req.params; // Obtenemos el id de los parámetros de la URL
    try {
      const stockProducto = await StockProducto.findByPk(id, { // Usamos findByPk para buscar por la clave primaria
        include: [
          {
            model: Producto,
            include: [
              {
                model: Marca,
                attributes: ['id', 'nombre']
              },
              {
                model: Botica,
                attributes: ['id', 'nombre', 'direccion']
              }
            ],
            attributes: ['id', 'nombre', 'presentacion', 'imageUrl', 'categoria', 'descripcion', 'caracteristicas']
          }
        ]
      });
  
      if (stockProducto) {
        res.json(stockProducto); // Devolvemos el producto si se encuentra
      } else {
        res.status(404).json({ error: 'StockProducto no encontrado' }); // Si no se encuentra, devolver 404
      }
    } catch (error) {
      console.error('Error al obtener el stockProducto:', error);
      res.status(500).json({ error: 'Error al obtener el stockProducto' });
    }
  });
  

  router.get('/searchStockProductos', async (req, res) => {
    const query = req.query.query ? req.query.query.toLowerCase() : ''; // Obtener el término de búsqueda y convertirlo a minúsculas
  
    try {
      const stockProductos = await StockProducto.findAll({
        include: [
          {
            model: Producto,
            include: [
              {
                model: Marca,
                attributes: ['id', 'nombre'] 
              },
              {
                model: Botica,
                attributes: ['id', 'nombre', 'direccion'] 
              }
            ],
            attributes: ['id', 'nombre', 'presentacion', 'imageUrl'],
            where: {
              nombre: {
                [Op.iLike]: `%${query}%` // Búsqueda insensible a mayúsculas/minúsculas por nombre del producto
              }
              
            }
            
          },
          
        ]
      });
  
      if (stockProductos.length > 0) {
        res.json(stockProductos); // Devolver los productos encontrados
      } else {
        res.status(404).json({ message: 'No se encontraron productos que coincidan con la búsqueda.' });
      }
    } catch (error) {
      console.error("Error al buscar stock de productos:", error);
      res.status(500).json({ error: "Error al buscar los stock de productos." });
    }
  });
  



export default router;
