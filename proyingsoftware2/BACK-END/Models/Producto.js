import { DataTypes } from "sequelize";
import sequelize from "../Database/database.js"; 

const Producto = sequelize.define('Producto', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, // Auto-incremental
    },
    nombre: {
        type: DataTypes.STRING,
    },
    nRegistroSanitario: {
        type: DataTypes.STRING,
    },
    presentacion: {
        type: DataTypes.STRING,
    },
    categoria: {
        type: DataTypes.ARRAY(DataTypes.STRING),
    },
    descripcion: {
        type: DataTypes.STRING,
    },
    caracteristicas: {
        type: DataTypes.STRING,
    },
    estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    imageUrl: {
        type: DataTypes.STRING
    }
});

export default Producto;
