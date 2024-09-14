import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';
export const Marca = sequelize.define('Marca', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombreMarca: {
        type: DataTypes.STRING
    }
}, {
    freezeTableName: true,
    timestamps: false
});
