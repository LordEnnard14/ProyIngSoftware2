import express from "express";
import { sequelize } from "./Database/database.js";
import Usuario from "../Models/Usuario.js";

const app = express();

app.get("/usuarios", async function (req, res) {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
  });

/* SIRVE PARA BUSCAR UN USUARIO POR SU NOMBRE */
app.get("/usuarios/:busqueda", async function (req, res) {
    const query = req.params.busqueda.toLowerCase();
    try {
      const usuarios = await Usuario.findAll({
        where: {
          [Op.or]: [
            {
              nombre: {
                [Op.iLike]: `%${query}%`,
              },
            },
            {
              apellido: {
                [Op.iLike]: `%${query}%`,
              },
            },
            {
              correo: {
                [Op.iLike]: `%${query}%`,
              },
            },
          ],
        },
      });
      if (usuarios.length > 0) {
        res.json(usuarios);
      } else {
        res
          .status(404)
          .send("No se encontraron usuarios que coincidan con la búsqueda.");
      }
    } catch (error) {
      console.error("Error al buscar usuarios:", error);
      res.status(500).send("Error interno del servidor");
    }
  });

  /* ESTO SIRVE PARA CAMBIAR ESTADO A UN USUARIO PERO USANDO EL PUT*/
app.put("/usuarios/cambioEstado/:id", async function (req, res) {
    const { id } = req.params;
    try {
      const usuario = await Usuario.findByPk(id);
      if (usuario) {
        const nuevoEstado = usuario.estado === "Activo" ? "Inactivo" : "Activo";
        await usuario.update({ estado: nuevoEstado });
        res.json({
          mensaje: `Usuario actualizado a estado: ${nuevoEstado}`,
          usuario,
        });
      } else {
        res.status(404).send("Usuario no encontrado");
      }
    } catch (error) {
      console.error("Ocurrió un error al cambiar el estado del usuario:", error);
      res.status(500).send("Ocurrió un error al cambiar el estado del usuario");
    }
  });