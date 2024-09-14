import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';
import { Presentacion } from './Presentacion.js';
import { Marca } from './Marca.js';
export const Producto = sequelize.define('Producto', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING
    },
    descripcion: {
        type: DataTypes.STRING
    },
    caracteristicas: {
        type: DataTypes.STRING
    },
    categoria: {
        type: DataTypes.STRING
    },
    estado: {
        type: DataTypes.STRING
    },
    fechaRegistro: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    presentacionId: {
        type: DataTypes.INTEGER,
        references: {
          model: Presentacion,
          key: 'id'
        }
      },
    marcaId: {
        type: DataTypes.INTEGER,
        references: {
          model: Marca,
          key: 'id'
        }
      }

}, {
    freezeTableName: true,
    timestamps: false
});
