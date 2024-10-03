import { DataTypes } from "sequelize";
import sequelize from "../Database/database.js"; 

const ProductoCarrito = sequelize.define('ProductoCarrito',{
    
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, 
    },
    cantidad: {
        type: DataTypes.INTEGER,
    },
    precio: {
        type: DataTypes.DOUBLE,
    },
});

export default ProductoCarrito;