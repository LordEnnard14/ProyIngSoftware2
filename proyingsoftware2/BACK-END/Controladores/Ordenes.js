import express from "express";
import Orden from "../Models/Orden.js"; 

const router = express.Router();

router.get("/ordenes", async (req, res) => {
    try {
        const ordenes = await Orden.findAll();
        res.json(ordenes);  
    } catch (error) {
        console.error("Error al obtener órdenes:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

router.get("/ordenes/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const orden = await Orden.findByPk(id);
        if (orden) {
            res.json(orden);  
        } else {
            res.status(404).json({ mensaje: "Orden no encontrada" });
        }
    } catch (error) {
        console.error("Error al obtener la orden:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

export default router;
