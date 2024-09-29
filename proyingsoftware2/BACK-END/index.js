import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { sequelize } from "./Database/database.js";
import productoRoutes from "./Controladores/Productos.js";

const app = express(); 
const port = process.env.PORT || 4000;

app.use(
    cors({ origin: "http://localhost:3000" })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// async function verificacionConexion() {
//     try {
//         await sequelize.authenticate();
//         console.log("Conexion satisfactoria con la BD");
//         await sequelize.sync();
//     } catch (error) {
//         // Comentar o eliminar la línea de error
//         // console.error("No se puede conectar a la BD", error);
//     }
// }

app.use("/api/productos", productoRoutes);

app.listen(port, function () {
    console.log("Servidor escuchando en el puerto " + port);
    // verificacionConexion();
});
