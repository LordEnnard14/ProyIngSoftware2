import { DataTypes } from "sequelize";
import sequelize from "../Database/database.js"; 

const Botica = sequelize.define('Botica', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, // Auto-incremental
    },
    ruc: {
        type: DataTypes.STRING,
    },
    nombre: {
        type: DataTypes.STRING,
    },
    horarioAbre: {
        type: DataTypes.STRING,
    },
    horarioCierre: {
        type: DataTypes.STRING,
    },
    direccion: {
        type: DataTypes.STRING,
    },
    direccion_latitude: {
        type: DataTypes.DOUBLE,
    },
    direccion_longitude: {
        type: DataTypes.DOUBLE,
    }
});

export default Botica;
