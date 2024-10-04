import { DataTypes } from "sequelize";
import sequelize from "../Database/database.js"; 
import Usuario from "./Usuario.js";
import ProductoCarrito from "./ProductoCarrito.js";

const Carrito = sequelize.define('Carrito', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, 
    },
   
    
}, {
    freezeTableName: true,
    timestamps: false
});;

export default Carrito;