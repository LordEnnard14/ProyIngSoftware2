import productoRoutes from "./Controladores/Productos.js";
import usuarioRoutes from "./Controladores/Usuarios.js";
import ordenRoutes from "./Controladores/Ordenes.js";
import adminRoutes from "./Controladores/Admin.js";
import stockRoutes from "./Controladores/StockProductos.js"; 
import carritoRoutes from "./Controladores/Carrito.js"
import ordenesRoutes from "./Controladores/Carrito.js"



export default function(app){
    app.use("/api/productos", productoRoutes);
    app.use("/api/usuarios", usuarioRoutes);
    app.use("/api/ordenes", ordenRoutes);
    app.use("/api/admin",adminRoutes);
    app.use("/api/stock",stockRoutes);
    app.use("/api/carrito", carritoRoutes);
    app.use("/api/ordenes", ordenesRoutes);    
    
}