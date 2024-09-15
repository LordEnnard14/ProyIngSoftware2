import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';
import { Producto } from './Producto.js';
import { Carrito } from './Carrito.js';

export const ProductoCarrito = sequelize.define('ProductoCarrito', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    carritoId: {
        type: DataTypes.INTEGER,
        references: {
            model: Carrito, 
            key: 'id'
        }
    },
    productoId: {
        type: DataTypes.INTEGER,
        references: {
            model: Producto, 
            key: 'id'
        }
    },
    cantidad: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    },
    precio: {
        type: DataTypes.FLOAT
    }
}, {
    freezeTableName: true,
    timestamps: false
});
