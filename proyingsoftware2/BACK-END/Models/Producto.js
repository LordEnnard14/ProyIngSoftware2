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
        allowNull: false,
    },
    presentacion: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    categoria: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    caracteristicas: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
    },
    imageUrl: {
        type: DataTypes.STRING
        ,allowNull: false,
    }
},{
    freezeTableName: true,
    timestamps: false
});;

export default Producto;
