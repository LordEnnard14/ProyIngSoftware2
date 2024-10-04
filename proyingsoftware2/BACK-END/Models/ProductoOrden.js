import { DataTypes } from "sequelize";
import sequelize from "../Database/database.js"; 
import Producto from "./Producto.js";
import Orden from "./Orden.js";

const ProductoOrden = sequelize.define('ProductoOrden',{
    
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, 
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    precio: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
},{
    freezeTableName: true,
    timestamps: false
});;

export default ProductoOrden;