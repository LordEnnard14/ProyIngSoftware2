// Archivo: Controladores/Productos.js
import express, { Router } from "express";
import productos from "../Producto/Data/productosData.js";


const router = express.Router();


router.use('/images', express.static('Imgs'));


router.get('/productoAll', (req, res) => {
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
});




export default router;
