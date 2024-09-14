import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { sequelize } from "./Database/database.js";

app.use(
    cors({ origin: "http://localhost:3000",
    })
  );
  app.use( bodyParser.urlencoded({  extended: true,})
  );


app.use(express.json());
  async function verificacionConexion() {
    try {
      sequelize.authenticate();
      console.log("Conexion satisfactoria con la BD");
      await sequelize.sync();
    } catch (error) {
      console.error("No se puede conectar a la BD", error);
    }
  }

  app.listen(port, function () {
    console.log("Servidor escuchando en el puerto " + port);
    verificacionConexion();
  });