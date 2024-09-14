import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';
import { Producto } from './Producto';
export const StockProducto = sequelize.define('StockProducto', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    cantidad: {
        type = DataTypes.INTEGER
    },
    precio: {
        type = DataTypes.FLOAT
    },
    productoId: {
        type: DataTypes.INTEGER,
        references: {
          model: Producto,
          key: 'id'
        }
      }
}, {
    freezeTableName: true,
    timestamps: false
});
