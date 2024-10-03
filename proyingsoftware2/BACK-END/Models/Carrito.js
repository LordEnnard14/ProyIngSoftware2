import { DataTypes } from "sequelize";
import sequelize from "../Database/database.js"; 


const Carrito = sequelize.define('Carrito', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, 
    },
   
    
});

export default Carrito;