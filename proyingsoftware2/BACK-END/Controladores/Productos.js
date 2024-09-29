import express from "express";
import productos from "../../FRONT-END/src/PAGINAS/BUSCAR_MEDICINAS/productosData.js";

const router = express.Router();

router.get('/productoAll', (req, res) => {
    res.json(productos); 
});

export default router;