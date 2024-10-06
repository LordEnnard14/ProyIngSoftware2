import Admin from "./Admin.js";
import Botica from "./Botica.js";
import Carrito from "./Carrito.js";
import Marca from "./Marca.js";
import Orden from "./Orden.js";
import Producto from "./Producto.js";
import ProductoCarrito from "./ProductoCarrito.js";
import ProductoOrden from "./ProductoOrden.js";
import StockProducto from "./StockProducto.js";
import Usuario from "./Usuario.js";

Admin.belongsTo(Botica,{ foreignKey: 'boticaID' });
Botica.hasMany(StockProducto, {foreignKey: 'boticaID'});
Botica.hasOne(Admin,{ foreignKey: 'boticaID' });
Carrito.belongsTo(Usuario, {foreignKey: 'usuarioID'});
Carrito.hasMany(ProductoCarrito, {foreignKey: 'carritoID'});
Marca.hasMany(Producto, {foreignKey: 'marcaID'});
Orden.belongsTo(Usuario, {foreignKey: 'usuarioID'});
Orden.hasMany(ProductoOrden, {foreignKey: 'ordenID'});
Producto.belongsTo(Marca, {foreignKey: 'marcaID', onDelete: 'CASCADE'});
Producto.hasMany(StockProducto,{foreignKey: 'productoID'});
StockProducto.hasMany(ProductoCarrito,{foreignKey: 'stockProductoID'});
StockProducto.hasMany(ProductoOrden,{foreignKey: 'stockProductoID'});
ProductoCarrito.belongsTo(StockProducto, {foreignKey: 'stockProductoID'});
ProductoCarrito.belongsTo(Carrito, {foreignKey: 'carritoID'});
ProductoOrden.belongsTo(StockProducto, {foreignKey: 'stockProductoID'});
ProductoOrden.belongsTo(Orden, {foreignKey: 'ordenID'});
StockProducto.belongsTo(Producto, {foreignKey: 'productoID'});
StockProducto.belongsTo(Botica, {foreignKey: 'boticaID'});
Usuario.hasOne(Carrito, {foreignKey: 'usuarioID'});
Usuario.hasMany(Orden, {foreignKey: 'usuarioID'});

export {
    Admin,
    Botica,
    Carrito,
    Marca,
    Orden,
    Producto,
    ProductoCarrito,
    ProductoOrden,
    StockProducto,
    Usuario
  };