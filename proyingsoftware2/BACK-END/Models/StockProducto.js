import { DataTypes } from "sequelize";
import sequelize from "../Database/database.js"; 

const StockProducto = sequelize.define('StockProducto', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, // Auto-incremental
    },
    cantidad: {
        type: DataTypes.INTEGER,
    },
    precio: {
        type: DataTypes.DOUBLE,
    }
});

export default StockProducto;
