import { DataTypes } from "sequelize";
import sequelize from "../Database/database.js"; 

const Marca = sequelize.define('Marca', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, // Auto-incremental
    },
    nombre: {
        type: DataTypes.STRING,
    }
});

export default Marca;
