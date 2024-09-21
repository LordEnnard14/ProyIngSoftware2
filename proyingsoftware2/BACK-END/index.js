const { Sequelize, Op, Model, DataTypes, json } = require('sequelize');
const express = require('express');
const { Json } = require('sequelize/lib/utils');

const sequelize = new Sequelize({
    dialect: 'postgres',
    database: 'dosisxtra',
    user: 'postgres',
    password: 'pass',
    host: '127.0.0.1',
    port: 5432,
    ssl: false,
    clientMinMessages: 'notice',
  });

  const app = express()
  
  const port = 3000

  app.use(express.json())

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
    }
    },
    {
      // Otras opciones del modelo
    },
);

const Producto = sequelize.define( 'Producto', {
    nombre: {
        type: DataTypes.STRING,
    },
    nRegistroSanitario:{
        type: DataTypes.STRING,  
    },
    descripcion: {
        type: DataTypes.STRING,
    },
    caracteristicas: {
        type: DataTypes.STRING,
    },
    estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}
);

const Categoria = sequelize.define('Categoria',{
    nombre:{
        type: DataTypes.STRING,
    },
    descripcion:{
        type: DataTypes.STRING,
    }
});

const Marca = sequelize.define('Marca',{
    nombre:{
        type: DataTypes.STRING,
    }
});

const Presentacion = sequelize.define('Presentacion',{
    nombre: {
        type: DataTypes.STRING,
    },
    descrpicion: {
        type: DataTypes.STRING,
    }
});

const StockProducto = sequelize.define('StockProducto',{
    cantidad: {
        type: DataTypes.INTEGER,
    },
    precio: {
        type: DataTypes.DOUBLE,
    }
});

const ProductoCarrito = sequelize.define('ProductoCarrito',{
    cantidad: {
        type: DataTypes.INTEGER,
    },
    precio: {
        type: DataTypes.DOUBLE,
    },
});

const ProductoOrden = sequelize.define('ProductoOrden',{
    cantidad: {
        type: DataTypes.INTEGER,
    },
    precio: {
        type: DataTypes.DOUBLE,
    }
});

const Carrito = sequelize.define('Carrito',{
})

const Orden = sequelize.define('Orden',{
    estado: {
        type: DataTypes.STRING,
        defaultValue: "pendiente"
    },
    direccionEnvio: {
        type: DataTypes.STRING,
    },
    subtotal: {
        type: DataTypes.DOUBLE,
    },
    costoEnvio: {
        type: DataTypes.DOUBLE
    },
    impuestos: {
        type: DataTypes.DOUBLE,
    },
    total: {
        type: DataTypes.DOUBLE,
    }
});
const Botica = sequelize.define('Botica',{
    ruc: {
        type: DataTypes.STRING,
    },
    nombre: {
        type: DataTypes.STRING,
    },
    horarioAbre:{
        type: DataTypes.STRING,
    },
    horarioCierre: {
        type: DataTypes.STRING, 
    }
});

const Admin = sequelize.define('Admin',{
    nombre:{
        type: DataTypes.STRING,
    },
    apellidoPaterno:{
        type: DataTypes.STRING,
    },
    apellidoMaterno:{
        type: DataTypes.STRING,
    },
    dni:{
        type: DataTypes.STRING,
    },
});

const Direccion = sequelize.define('Direccion',{
    dir: {
        type: DataTypes.STRING,
    },
    latitude: {
        type: DataTypes.DOUBLE,
    },
    longitude: {
        type: DataTypes.DOUBLE,
    }
});

Usuario.hasOne(Carrito);
Carrito.belongsTo(Usuario);
Usuario.hasMany(Orden);
Orden.belongsTo(Usuario);
Producto.hasOne(StockProducto);
StockProducto.belongsTo(Producto);
Marca.hasMany(Producto);
Producto.belongsTo(Marca);
Presentacion.hasMany(Producto);
Producto.belongsTo(Presentacion);
Producto.hasMany(ProductoCarrito);
ProductoCarrito.belongsTo(Producto);
Producto.hasMany(ProductoOrden);
ProductoOrden.belongsTo(Producto);
Orden.hasMany(ProductoOrden);
ProductoOrden.belongsTo(Orden);
Carrito.hasMany(ProductoCarrito);
ProductoCarrito.belongsTo(Carrito);
Botica.hasMany(StockProducto);
StockProducto.belongsTo(Botica);
Botica.hasOne(Direccion);
Direccion.belongsTo(Botica);
Botica.hasMany(Admin);
Admin.belongsTo(Botica);
Categoria.belongsToMany(Producto, {through: 'CategoriaProductos'});
Producto.belongsToMany(Categoria,{through: 'CategoriaProductos'});
Direccion.belongsToMany(Usuario,{through: 'DireccionUsuarios'});
Usuario.belongsToMany(Direccion,{through:'DireccionUsuarios'});


app.listen(port, async () => {
    console.log(`Watches server listening on port ${port}`)

    try {
        // Conecta a la db usando la configuracion asignada previamente
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.log('Unable to connect to the database:', error);
    }

    // Sincroniza la db con el modelo que hemos creado, añadiendo nuevas columnas si es necesario.
    await sequelize.sync();
})