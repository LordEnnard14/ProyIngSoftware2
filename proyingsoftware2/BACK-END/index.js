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
    },
    direcciones:{
        type: DataTypes.ARRAY(DataTypes.STRING)
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

const Producto = sequelize.define( 'Producto', {
    nombre: {
        type: DataTypes.STRING,
    },
    nRegistroSanitario:{
        type: DataTypes.STRING,  
    },
    presentacion: {
        type: DataTypes.STRING,
    },
    categoria: {
        type: DataTypes.ARRAY(DataTypes.STRING),
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
const Marca = sequelize.define('Marca',{
    nombre:{
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
    },
    direccion_latitude: {
        type:DataTypes.DOUBLE
    },
    direccion_longitude: {
        type:DataTypes.DOUBLE
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


Usuario.hasOne(Carrito);
Carrito.belongsTo(Usuario);
Usuario.hasMany(Orden);
Orden.belongsTo(Usuario);
Marca.hasMany(Producto);
Producto.belongsTo(Marca);
Producto.hasMany(StockProducto);
StockProducto.belongsTo(Producto);
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
Botica.hasMany(Admin);
Admin.belongsTo(Botica);


//Usuarios API
app.post('/usuarios', async (req, res) => { 
    // crea un usario en la db usando la data del body del req
    const createdUser = await Usuario.create({
        nombre: req.body.nombre,
        apellidoPaterno: req.body.apellidoPaterno,
        apellidoMaterno: req.body.apellidoMaterno,
        correo: req.body.correo,
        estado: req.body.estado,
        telefono: req.body.telefono,
        password: req.body.password,
        dni: req.body.dni
    });
    const carrito = await Carrito.create({
        id: createdUser.id,
        UsuarioId: createdUser.id
    })
    res.send(createdUser.toJSON());  
})

app.get('/usuariosAll', async(req,res)=>{
    const usuarios = await Usuario.findAll();
    result = {usuarios: JSON.parse(JSON.stringify(usuarios))};
    res.send(result);
})

app.get('/usuariosId', async (req, res) => { 
    const result = await Usuario.findByPk(req.body.id);
    res.send(result.toJSON());  
})

app.post('/signUp', async (req,res)=>{
    const createdUser = await Usuario.create({
        nombre: req.body.nombre,
        apellidoPaterno: req.body.apellidoPaterno,
        apellidoMaterno: req.body.apellidoMaterno,
        password: req.body.password,
        correo: req.body.correo,
        direccionId: req.body.direccionId,
        telefono: req.body.telefono,
        dni: req.body.dni,
        estado: req.body.estado
        
    });
    
    const carrito = await Carrito.create({
        id: createdUser.id,
        UsuarioId: createdUser.id
    })

    
    res.send(createdUser.toJSON());   

})

app.get('/login', async(req,res)=>{
    const usuarioExistente = await Usuario.findOne({ where:{
        correo: req.body.correo,
        password: req.body.password
    }})
    if (usuarioExistente===null){
        res.status(404)
        res.send(null)
    }else{
    res.status(200)
    res.send(usuarioExistente.toJSON());
    }

})
//Admin
app.post('/newAdmin', async (req,res)=>{
    const adminNuevo = await Admin.create({
        nombre: req.body.nombre,
        apellidoPaterno: req.body.apellidoPaterno,
        apellidoMaterno: req.body.apellidoMaterno,
        dni: req.body.dni
    })
    res.send(adminNuevo.toJSON());
})
//Boticas
app.post('/newBotica', async (req,res)=>{
    const boticaNueva = await Botica.create({
        ruc: req.body.ruc,
        nombre: req.body.nombre,
        direccionId: req.body.direccionId,
        horarioAbre: req.body.horarioAbre,
        horarioCierre: req.body.horarioCierre,
        adminId: req.body.adminId,

    })
    console.log(result)
    res.send(boticaNueva.toJSON());
})


//Marcas
app.post('/newMarca', async (req, res) => { 
    const marcaNueva = await Marca.create({
        nombre: req.body.nombre,
    })
    res.send(marcaNueva.toJSON());
})

//Productos
//revisar caracteristicas necesarias para crear
app.post('/newProducto', async (req, res) => {
    const productoExistente = await Producto.findOne( {where: {
        nombre: req.body.nombre,
        nRegistroSanitario: req.body.rs,

    } })
    if (productoExistente == null){
        const productoNuevo = await Producto.create({
            nombre: req.body.nombre,
            nRegistroSanitario: req.body.rs,
            MarcaId: req.body.marcaId,
            descripcion: req.body.descripcion,
            caracteristicas: req.body.caracteristicas,
            estado: req.body.estado,
        })
        if(req.body.categorias && req.body.categorias.length > 0){
            const categoriasEncontradas = await Categoria.findAll({where: {
                id: {
                    [Op.in]: req.body.categorias
                },
            },
        });
            for(let i =0; i < categoriasEncontradas.length; i++){
                await productoNuevo.addCategoria(categoriasEncontradas[i])
            }
            console.log(categoriasEncontradas)
        }
        const result = await Producto.findOne({
            where: {nombre: req.body.nombre},
            include: Categoria,
        })
        res.send(result.toJSON());
    } else {
        res.send("ERROR");
    }

})

//Stock
app.post('/newStock', async (req, res)=>{
    const stockNuevo = await StockProducto.create({
        BoticaID: req.body.BoticaID,
        ProductoId: req.body.ProductoId,
        cantidad: req.body.cantidad,
        precio: req.body.precio

    })
    res.send(stockNuevo.toJSON());
})


//Carrito
//api para añadir productos al carrito a la db
app.post('/carrito', async (req, res) => { 

    const stock = await StockProducto.findByPk(req.body.productoId);
    const productoEnCarrito = await ProductoCarrito.findOne( {where: {
        ProductoId: req.body.productoId,
        CarritoId: req.body.carritoId
    }})
    if (productoEnCarrito === null){

        const productoAñadido = await ProductoCarrito.create({
            
            CarritoId: req.body.carritoId,
            ProductoId: req.body.productoId,
            cantidad: req.body.cantidad,
            precio: stock.precio

        })
        res.send(productoAñadido.toJSON());
    
    } else{

    productoEnCarrito.cantidad =  productoEnCarrito.cantidad + req.body.cantidad;
    await productoEnCarrito.save();
    res.send(productoEnCarrito.toJSON());
    }
});

// Mostrar todos los productos en el carrito
app.get('/carrito', async(req,res)=>{
    const carrito = await Carrito.findByPk(req.body.id);
    const productos = await ProductoCarrito.findAll({
        where: {CarritoId: req.body.id}
    })
    console.log(productos)
    const result = {
        id: carrito.id,
        productos: JSON.parse(JSON.stringify(productos))

    }
    res.send(result);
})
//Actualizar el carrito, disminuir/aumentar cantidad o eliminar producto si llega a cero
app.put('/carrito', async(req,res)=>{
    const producto = await ProductoCarrito.findOne( {where: {
        CarritoId: req.body.id,
        ProductoId: req.body.productoId, 
    }})
    console.log(producto)
    if(req.body.operacion == "aumentar"){
        producto.cantidad = producto.cantidad + 1
    } else {
        producto.cantidad = producto.cantidad - 1
    }

    await producto.save();

    if (producto.cantidad == 0){
        await producto.destroy();
        res.send('Eliminado');
    } else {
        res.send(producto.toJSON());
    }
})



//Crea la orden, obtener todos los productos del carrito, crear productoOrden por cada item del carrito, 
//actualizar (eliminar productos del) carrito, y actualizar el stock del producto
app.post('/completarOrden',async(req,res)=>{
    const productos = await ProductoCarrito.findAll({
        where: {CarritoId: req.body.carritoId,
                guardado: false
        }
    })
    
    if (productos.length == 0){
        res.send("no hay productos en el carrito")
    } else{

    const precios = productos.map(((item)=>item.precio * item.cantidad ))

    const subtotal = precios.reduce((total,precio) => total + precio, 0)

    const orden = await Orden.create({
        UsuarioId: req.body.carritoId,
        direccionEnvio: req.body.direccionId,
        subtotal: subtotal,
        costoEnvio: subtotal*0.05,
        impuestos: subtotal * 0.18,
        total: subtotal*1.23
    });
    
    const list_producto = []

    productos.forEach( async (producto)=>{
        const productoOrden = await ProductoOrden.create({
            OrdenId: orden.id,
            ProductoId: producto.ProductoId,
            cantidad: producto.cantidad,
            precio: producto.precio
        })

        const stock = await StockProducto.findOne({
            where: { id: producto.ProductoId} //realizar cambio unir con botica
        })
        
        stock.cantidad = stock.cantidad - producto.cantidad
        list_producto.push(productoOrden);

        await producto.destroy()

    })
        const result = {
            orden: orden,
            productos: JSON.parse(JSON.stringify(list_producto))
        }

        res.send(result);
    }

})



app.get('/productoAll', async (req,res)=>{
    const result = await Producto.findAll();
    console.log(result)
    res.send(JSON.parse(JSON.stringify(result)));
})

app.get('/productoStockAll', async (req,res)=>{
    const result = await StockProducto.findAll();
    console.log(result)
    res.send(JSON.parse(JSON.stringify(result)));
})

app.get('/stockProducto', async (req,res)=>{
    const result = await StockProducto.findAll();
    console.log(result)
    res.send(JSON.parse(JSON.stringify(result)));
})

app.get('/ordenAll', async (req,res)=>{
    const orden = await Orden.findAll({where:{UsuarioId: req.body.id}})
    res.send(JSON.parse(JSON.stringify(orden)));
})


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