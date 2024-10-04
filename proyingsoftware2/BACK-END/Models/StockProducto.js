import { DataTypes } from "sequelize";
import sequelize from "../Database/database.js"; 
import Botica from "./Botica.js";
import Producto from "./Producto.js";

const StockProducto = sequelize.define('StockProducto', {
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
    fecha_vencimiento: {
        type: DataTypes.STRING,
        allowNull: false,
    }
},{
    freezeTableName: true,
    timestamps: false
});;

export default StockProducto;
