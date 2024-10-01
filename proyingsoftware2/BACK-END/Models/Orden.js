import { DataTypes } from "sequelize";
import sequelize from "../Database/database.js"; 

const Orden = sequelize.define('Orden',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    estado: {
        type: DataTypes.STRING,
        defaultValue: "pendiente"
    },
    direccionEnvio: {
        type: DataTypes.STRING,
    },
    subtotal: {
        type: DataTypes.DOUBLE,
    },
    costoEnvio: {
        type: DataTypes.DOUBLE
    },
    impuestos: {
        type: DataTypes.DOUBLE,
    },
    total: {
        type: DataTypes.DOUBLE,
    }
});

export default Orden;