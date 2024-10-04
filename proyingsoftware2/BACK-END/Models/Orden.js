import { DataTypes } from "sequelize";
import sequelize from "../Database/database.js"; 
import Usuario from "./Usuario.js";
import Botica from "./Botica.js";
import ProductoOrden from "./ProductoOrden.js";

const Orden = sequelize.define('Orden',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    estado: {
        type: DataTypes.STRING,
        defaultValue: "Pendiente"
    },
    direccionEnvio: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    subtotal: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    costoEnvio: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    impuestos: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    total: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    }
}, {
    freezeTableName: true,
    timestamps: false
});;

export default Orden;