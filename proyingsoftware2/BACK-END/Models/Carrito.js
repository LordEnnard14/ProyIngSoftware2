import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';
import { Usuario } from './Usuario';
export const Carrito = sequelize.define('Carrito', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    usuarioId: {
        type: DataTypes.INTEGER,
        references: {
          model: Usuario,
          key: 'id'
        }
      }
}, {
    freezeTableName: true,
    timestamps: false
});
