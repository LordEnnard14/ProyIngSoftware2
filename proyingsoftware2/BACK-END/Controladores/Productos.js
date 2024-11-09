// Archivo: Controladores/Productos.js
import express from "express";
import {Producto, Marca, Botica, ProductoDetalle} from "../models/Relaciones.js";
import { Op } from "sequelize";
const router = express.Router();


router.post('/newProductos', async (req, res) => {
  try {
    const productoExistente = await Producto.findOne( {where: {
      nombre: req.body.nombre,
      nRegistroSanitario: req.body.registroSanitario,
    } })
    if(productoExistente !== null){
      return res.status(409).send({
        Mensaje: 'Producto existente',
        Producto: productoExistente
      });
    }else {

      const productoNuevo = await Producto.create({
        nombre: req.body.nombre,
        presentacion: req.body.presentacion,
        nRegistroSanitario: req.body.registroSanitario,
        categoria: req.body.categorias,
        marcaID: req.body.marcaID,
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
router.get('/ProductosTodos', async (req,res)=>{
  const productos = await Producto.findAll()
  res.send(productos)
})

router.get('/ProductosAll', async (req, res) => {
  try {
    const productosDetalles = await ProductoDetalle.findAll({
      include: [
        {
          model: Producto, 
          attributes: ['id', 'nombre'], 
          include: [
            {
              model: Marca, 
              attributes: ['nombre'], 
            }
          ]
        },
        {
          model: Botica, 
          attributes: ['nombre', 'direccion'], 
        }
      ],
      order: [['id', 'ASC']] 
    });

    return res.status(200).send({ ProductosDetalles: JSON.parse(JSON.stringify(productosDetalles)) });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

router.get('/BusquedaAgrega', async(req,res)=>{
  const nombre = req.query.nombre
  const marca = req.query.marca
  const producto = await Producto.findAll({
    include:{
      model: Marca,
      where:{nombre :{[Op.iLike]: `%${marca}%`}},
      attributes:['nombre']
    },
    where:{
      nombre: {[Op.iLike]: `%${nombre}%`}
    },
  })
  return res.send(JSON.parse(JSON.stringify(producto)))

})

router.get('/ProductosAllBotica/:id', async (req, res) => { //Todos los productos de una botica
  try {
    const productosDetalles = await ProductoDetalle.findAll({
      where:{
        boticaID : req.params.id
      },
      include: [
        {
          model: Producto, 
          attributes: ['id', 'nombre'], 
          include: [
            {
              model: Marca, 
              attributes: ['nombre'], 
            }
          ]
        },
        {
          model: Botica, 
          attributes: ['nombre', 'direccion'], 
        }
      ],
      order: [['id', 'ASC']] 
    });

    return res.status(200).send({ ProductosDetalles: JSON.parse(JSON.stringify(productosDetalles)) });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});


router.get('/stockProductosAll', async (req, res) => {
  const { categoria } = req.query;

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
            attributes: ['id', 'nombre','presentacion', 'imageUrl'],
            where: categoria ? { categoria: { [Op.contains]: [categoria] } } : {},
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
      const stockProducto = await ProductoDetalle.findByPk(id, { // Usamos findByPk para buscar por la clave primaria
        include: [
          {
            model: Producto,
            include: [
              {
                model: Marca,
                attributes: ['id', 'nombre']
              },
              
            ],
            attributes: ['id', 'nombre', 'presentacion', 'categoria', 'nRegistroSanitario','fechaRegistro']
          },
          {
            model: Botica,
            attributes: ['id', 'nombre', 'direccion']
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
