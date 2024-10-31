
import express from "express";
import {Orden, Marca, Botica, ProductoDetalle} from "../models/Relaciones.js";
import { Op } from "sequelize";



const router = express.Router();


router.get('/ingresosBotica/:boticaID/:fecha', async (req, res) => {
    const { boticaID, fecha } = req.params;
    console.log('Botica ID:', boticaID, 'Fecha:', fecha); // Añadir esta línea

    try {
        const ordenes = await Orden.findAll({
            where: {
                boticaID,
                fechaRegistro: {
                    [Op.between]: [`${fecha} 00:00:00`, `${fecha} 23:59:59`]
                }
            },
            attributes: ['total'],  
        });

        console.log('Órdenes encontradas:', ordenes); // Añadir esta línea

        if (ordenes.length === 0) {
            return res.status(404).json({ mensaje: 'No se encontraron órdenes para esta botica en la fecha especificada.' });
        }

        const cantidadOrdenes = ordenes.length;
        const ingresosTotales = ordenes.reduce((sum, orden) => sum + parseFloat(orden.total), 0);

        res.status(200).json({
            boticaID,
            fecha: fecha.trim(), 
            cantidadOrdenes,
            ingresosTotales: ingresosTotales.toFixed(2)
        });
    } catch (error) {
        console.error('Error al obtener los ingresos de la botica:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor', detalles: error.message });
    }
});



export default router;
