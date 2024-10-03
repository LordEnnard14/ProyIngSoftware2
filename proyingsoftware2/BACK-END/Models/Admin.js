import { DataTypes } from "sequelize";
import sequelize from "../Database/database.js"; 

const Admin = sequelize.define('Admin',{
       
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre:{
        type: DataTypes.STRING,
    },
    apellidoPaterno:{
        type: DataTypes.STRING,
    },
    apellidoMaterno:{
        type: DataTypes.STRING,
    },
    dni:{
        type: DataTypes.STRING,
    },
});

export default Admin;