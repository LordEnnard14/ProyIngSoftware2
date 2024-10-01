import express from "express";
import Usuario from "../Models/Usuario.js"; 

const router = express.Router();


// Endpoint para obtener a todos los usuarios registrados 
router.get("/usuarios", async (req, res) => {
    try {
        // Obtener todos los usuarios en la base de datos
        const usuarios = await Usuario.findAll();
        res.json(usuarios);  // Aqui se envian a todos los usuarios como respuesta
    } catch (error) { //Por si existe un error
        console.error("Error al obtener usuarios:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

// Obtener un usuario específico a partir de su ID
router.get("/usuarios/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const usuario = await Usuario.findByPk(id);
        
        if (usuario) {
            res.json(usuario); 
        } else {
            res.status(404).json({ mensaje: "Usuario no encontrado" });
        }
    } catch (error) {
        console.error("Error al buscar el usuario por ID:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

//Este endpoint sirve para poder guardar a un usuario en la base de datos
//Esto se lleva cabo al registrarse a la página web
router.post('/usuarios', async (req, res) => {
    const {nombre, apellidoPaterno, apellidoMaterno, correo, telefono, password, dni, direcciones,
      direccion_activa_latitude, direccion_activa_longitude, estado} = req.body;
  
    try {
        //Se verifica si existen estos datos
      if (!nombre || !apellidoPaterno || !correo || !password || !dni) {
        return res.status(400).json("Por favor, complete los campos obligatorios");
      }
  
      // Creamos un nuevo usuario para guardarlo en la base de datos
      const nuevoUsuario = await Usuario.create({nombre, apellidoPaterno, apellidoMaterno, correo, telefono,
        password, dni, direcciones, direccion_activa_latitude, direccion_activa_longitude,
        estado: estado || true,
      });

      res.status(201).json(nuevoUsuario);
    } catch (error) {
      console.error('Error al crear el usuario:', error);
      res.status(500).json('Error al crear el usuario');
    }
  });

export default router;
