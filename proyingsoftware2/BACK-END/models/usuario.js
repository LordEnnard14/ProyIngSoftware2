const {Model, DataTypes} = require ('sequelize');
const sequelize = require('./index').sequelize;

const Usuario = sequelize.define('Usuario', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    apellidoPaterno: {
        type: DataTypes.STRING,
      },
    apellidoMaterno: {
        type: DataTypes.STRING,
      },
    password: { 
        type: DataTypes.STRING,
    },
    correo: {
        type: DataTypes.STRING,
    },
    telefono: {
      type: DataTypes.STRING,  
    },
    estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    dni: {
        type: DataTypes.STRING,
    },
    direcciones:{
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
        defaultValue: [],
        validate: {
            validarSize(value) {
                if(value.length > 3){
                    throw new Error("No puedes tener más de 3 direcciones")
                }
            }
        }
    },
    direccion_activa_latitude: {
        type: DataTypes.DOUBLE
    },
    direccion_activa_longitude:{
        type: DataTypes.DOUBLE
    }
    },
    {
      // Otras opciones del modelo
    },
);

module.exports = Usuario;