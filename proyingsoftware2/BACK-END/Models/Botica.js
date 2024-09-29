import { DataTypes } from 'sequelize';
import { sequelize } from '../Database/database.js';
export const Botica = sequelize.define('Botica', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ruc: {
        type: DataTypes.INTEGER
    },
    nombreBotica: {
        type: DataTypes.STRING
    },
    horarioAbre: {
        type: DataTypes.STRING
    },
    horarioCierra: {
        type: DataTypes.STRING
    }
}, {
    freezeTableName: true,
    timestamps: false
});
