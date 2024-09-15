import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';
export const Presentacion = sequelize.define('Presentacion', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombrePresentacion: {
        type: DataTypes.STRING
    },
    descripcion: {
        type: DataTypes.STRING
    }
}, {
    freezeTableName: true,
    timestamps: false
});
