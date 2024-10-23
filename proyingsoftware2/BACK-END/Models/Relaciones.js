import Admin from "./Admin.js";
import Botica from "./Botica.js";
import Carrito from "./Carrito.js";
import Marca from "./Marca.js";
import Orden from "./Orden.js";
import Producto from "./Producto.js";
import ProductoDetalle from "./ProductoDetalle.js";
import ProductoCarrito from "./ProductoCarrito.js";
import ProductoOrden from "./ProductoOrden.js";
import Usuario from "./Usuario.js";

Admin.belongsTo(Botica,{ foreignKey: 'boticaID' });
Botica.hasMany(ProductoDetalle, {foreignKey: 'boticaID'});
Botica.hasOne(Admin,{ foreignKey: 'boticaID' });
Carrito.belongsTo(Usuario, {foreignKey: 'usuarioID'});
Carrito.hasMany(ProductoCarrito, {foreignKey: 'carritoID'});
Marca.hasMany(Producto, {foreignKey: 'marcaID'});
Orden.belongsTo(Usuario, {foreignKey: 'usuarioID'});
Orden.hasMany(ProductoOrden, {foreignKey: 'ordenID'});
Producto.belongsTo(Marca, {foreignKey: 'marcaID', onDelete: 'CASCADE'});
Producto.hasMany(ProductoDetalle,{foreignKey: 'productoID'});
Producto.hasMany(ProductoCarrito,{foreignKey: 'productoID'});
Producto.hasMany(ProductoOrden,{foreignKey: 'productoID'});
ProductoCarrito.belongsTo(Producto, {foreignKey: 'productoID'});
ProductoCarrito.belongsTo(Carrito, {foreignKey: 'carritoID'});
ProductoOrden.belongsTo(Producto, {foreignKey: 'productoID'});
ProductoOrden.belongsTo(Orden, {foreignKey: 'ordenID'});
ProductoDetalle.belongsTo(Producto, {foreignKey: 'productoID'});
ProductoDetalle.belongsTo(Botica, {foreignKey: 'boticaID'});
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
    ProductoDetalle,
    Usuario
  };