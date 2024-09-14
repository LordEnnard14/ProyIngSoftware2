import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';
import { Usuario } from './Usuario';
export const Orden = sequelize.define('Orden', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fechaOrden: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    subTotal: {
        type: DataTypes.FLOAT
    },
    impuestos: {
        type: DataTypes.FLOAT
    },
    total: {
        type: DataTypes.FLOAT
    },
    estado: {
        type: DataTypes.STRING
    },
    costoEnvio: {
        type: DataTypes.FLOAT
    },
    direccionEnvio: {
        type: DataTypes.STRING
    },usuarioId: {
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
