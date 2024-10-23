import express from "express";
import { Producto, ProductoDetalle, Marca, Botica } from "../Models/Relaciones.js";
import { Op } from "sequelize";

const router = express.Router();

export default router;