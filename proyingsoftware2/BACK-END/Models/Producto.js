import { DataTypes } from "sequelize";
import sequelize from "../Database/database.js"; 
import moment from 'moment-timezone';

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
    estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
    },
    nRegistroSanitario: {
        type: DataTypes.STRING,
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
    fechaRegistro: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: () => moment.tz('America/Lima').toDate // Hora de Lima, Perú
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
