// Archivo: Controladores/Productos.js
import express from "express";
import {Producto, StockProducto, Marca, Botica} from "../models/Relaciones.js";
import { Op } from "sequelize";


const router = express.Router();


router.use('/images', express.static('Imgs'));


/*router.get('/productoAll', (req, res) => {
    res.json(productos);
});


router.get("/searchProduct", function (req, res) {
    const query = req.query.query.toLowerCase();
    const resultados = productos.filter(producto =>
        producto.name.toLowerCase().includes(query)
    );

    if (resultados.length > 0) {
        res.json(resultados);
    } else {
        res.status(404).send("No se encontraron productos que coincidan con la búsqueda.");
    }
});

router.get('/detalle/:id', function(req, res) {
    const id = req.params.id;     
    const producto = productos.find(p => p.id === id); 
    if (producto) {
        res.json(producto); 
    } else {
        res.status(404).json({ error: "Producto no encontrado" }); // 
    }
});*/

router.get('/productoAll', async (req, res) => {
    try {
        const result = await Producto.findAll({
            include: [
                {
                    model: Marca,                    
                    attributes: ['id', 'nombre'], 
                },
                {
                    model: StockProducto, 
                    include: {
                        model: Botica,                         
                        attributes: ['id', 'nombre', 'direccion'], 
                    }
                }
            ]
        });
        
        res.json(result); // Envío del resultado en formato JSON
    } catch (error) {
        console.error("Error al obtener los productos:", error);
        res.status(500).json({ error: "Error al obtener los productos" });
    }
});

router.get('/stockProductosAll', async (req, res) => {
    try {
      const stockProductos = await StockProducto.findAll({
        include: [
          {
            model: Producto,
            include: [
              {
                model: Marca,
                attributes: ['id', 'nombre'] 
              }
            ],
            attributes: ['id', 'nombre','presentacion', 'imageUrl'] 
          },
          {
            model: Botica,
            attributes: ['id', 'nombre', 'direccion'] 
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
              }
            ],
            attributes: ['id', 'nombre', 'presentacion', 'imageUrl', 'categoria', 'descripcion', 'caracteristicas']
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
  

router.get("/searchProduct", async (req, res) => {
    const query = req.query.query.toLowerCase(); // Obtiene la consulta y la convierte a minúsculas
    try {
        const resultados = await Producto.findAll({
            where: {
                nombre: {
                    [Op.iLike]: `%${query}%`, // Búsqueda insensible a mayúsculas/minúsculas por nombre del medicamento
                }
            },
            include: [
                {
                    model: Marca,
                    attributes: ['id', 'nombre'], // Incluye la marca
                },
                {
                    model: StockProducto,
                    include: {
                        model: Botica,
                        attributes: ['id', 'nombre', 'direccion'], // Incluye la botica
                    }
                }
            ]
        });

        if (resultados.length > 0) {
            res.json(resultados); // Devuelve los resultados encontrados
        } else {
            res.status(404).send("No se encontraron productos que coincidan con la búsqueda."); // Mensaje si no se encuentran productos
        }
    } catch (error) {
        console.error("Error al buscar productos:", error);
        res.status(500).send("Error al buscar productos."); // Manejo de errores
    }
});

router.get('/detalle/:id', async (req, res) => {
    const id = req.params.id; // Obtiene el ID del producto de los parámetros de la solicitud

    try {
        const producto = await Producto.findByPk(id, {
            include: [
                {
                    model: Marca,
                    attributes: ['id', 'nombre'], // Incluye la marca del producto
                },
                {
                    model: StockProducto,
                    include: {
                        model: Botica,
                        attributes: ['id', 'nombre', 'direccion'], // Incluye la botica
                    }
                }
            ]
        });

        if (producto) {
            res.json(producto); // Devuelve el producto encontrado
        } else {
            res.status(404).json({ error: "Producto no encontrado" }); // Mensaje si no se encuentra el producto
        }
    } catch (error) {
        console.error("Error al obtener el producto:", error);
        res.status(500).send("Error al obtener el producto."); // Manejo de errores
    }
});










export default router;
