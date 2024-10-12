import express from "express";
import { Producto, StockProducto, Marca, Botica } from "../Models/Relaciones.js";
import { Op } from "sequelize";

const router = express.Router();

router.post('/newStock', async (req, res)=>{
    try{
        const stockExistente = await StockProducto.findOne({ where: {
                productoID: req.body.ProductoId
            }
        })
        if (stockExistente !== null){
            return res.status(409).send({
                Mensaje: 'Stock existente',
                Producto: stockExistente
            });
        }else{
            const stockNuevo = await StockProducto.create({
                productoID: req.body.ProductoId,
                cantidad: req.body.cantidad,
                precio: req.body.precio
        
            })
            res.status(201).send({
                mensaje: 'Stock creado exitosamente',
                stock: stockNuevo
            });
        }
    } catch (error){
        console.error("Error al crear stock", error);
        res.status(500).send('Error al crear stock');
    }


})

export default router;