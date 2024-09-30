import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
// import { sequelize } from "./Database/database.js";  // Comenta esta línea si no usarás Sequelize aún
import productoRoutes from "./Controladores/Productos.js";
import usuarioRoutes from "./Controladores/Usuarios.js";
//import ordenesRoutes from "./Controladores/Ordenes.js";

const app = express(); 
const port = process.env.PORT || 4000;

app.use(
    cors({ origin: "http://localhost:3000" })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Deshabilitar la verificación de conexión a la base de datos por ahora
// async function verificacionConexion() {
//     try {
//         await sequelize.authenticate();
//         console.log("Conexión satisfactoria con la BD");
//         await sequelize.sync();
//     } catch (error) {
//         console.error("No se puede conectar a la BD", error);
//     }
// }

app.use("/api/productos", productoRoutes);
app.use("/api", usuarioRoutes);
//app.use("/api", ordenesRoutes);

app.listen(port, function () {
    console.log("Servidor escuchando en el puerto " + port);
    // verificacionConexion();  // Comenta esta línea también
});
