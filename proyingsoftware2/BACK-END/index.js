import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import productoRoutes from "./Controladores/Productos.js";
import usuarioRoutes from "./Controladores/Usuarios.js";
import ordenRoutes from "./Controladores/Ordenes.js";
import adminRoutes from "./Controladores/Admin.js";
import "./Models/Relaciones.js"
import sequelize from "./Database/database.js"; 
import carritoRoutes from "./Controladores/Carrito.js"
import ordenesRoutes from "./Controladores/Carrito.js"


const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(cors({ origin: "http://localhost:3000" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Verificación de conexión a la base de datos
async function verificacionConexion() {
    try {
        await sequelize.authenticate(); // Verifica la conexión
        console.log("Conexión satisfactoria con la BD");

        // Sincroniza el modelo Botica
        await sequelize.sync(); // Sincroniza todos los modelos
        console.log("Modelos sincronizados con la BD");
    } catch (error) {
        console.error("No se puede conectar a la BD", error);
    }
}

// Rutas de la API
app.use("/api/productos", productoRoutes);
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/ordenes", ordenRoutes);
app.use("/api/admin",adminRoutes);
app.use("/api/carrito", carritoRoutes);
app.use("/api/ordenes", ordenesRoutes);

app.listen(port, function () {
    console.log("Servidor escuchando en el puerto " + port);
    verificacionConexion(); 
});
