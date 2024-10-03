import { DataTypes } from "sequelize";
import sequelize from "../Database/database.js"; 

const ProductoOrden = sequelize.define('ProductoOrden',{
    
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

export default ProductoOrden;