import { DataTypes } from "sequelize";
import sequelize from "../Database/database.js"; 
import Producto from "./Producto.js";

const Marca = sequelize.define('Marca', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, 
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    }
},{
    freezeTableName: true,
    timestamps: false,
});;

export default Marca;
