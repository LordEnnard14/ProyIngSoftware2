import { DataTypes } from "sequelize";
import sequelize from "../Database/database.js"; 
import Botica from "./Botica.js";

const Admin = sequelize.define('Admin',{
       
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    apellidoPaterno:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    apellidoMaterno:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    dni:{
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    freezeTableName: true,
    timestamps: false
});;

export default Admin;