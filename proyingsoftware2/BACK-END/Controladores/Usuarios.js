import express from "express";
import Usuario from "../Models/Usuario.js"; 

const router = express.Router();

// Endpoint para obtener a todos los usuarios registrados 
router.get("/", async (req, res) => {
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
router.get("/:id", async (req, res) => {
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
router.post("/registrar", async (req, res) => {
  try {
      const {nombre, apellidoPaterno, apellidoMaterno, password, correo, telefono, dni} = req.body;
      const nuevoUsuario = await Usuario.create({
          nombre, apellidoPaterno, apellidoMaterno, password, correo, telefono, dni});

      res.status(201).json({
          mensaje: "Usuario registrado exitosamente",
          usuario: nuevoUsuario
      });

  } catch (error) {
      console.error("Error al registrar usuario:", error);
      res.status(500).json({
          error: "Error al registrar usuario. Por favor, intenta nuevamente.",
          detalles: error.message  // Añade el mensaje de error aquí
      });
  }
});


router.post('/iniciarSesion', async (req, res) => {
  const { correo, password } = req.body;
  // Verifica que se haya proporcionado el correo y la contraseña
  if (!correo || !password) {
    return res.status(400).json({ message: "Correo y contraseña son requeridos" });
  }
  try {
    // Buscar el usuario por correo
    const usuario = await Usuario.findOne({ where: { correo } });
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Comparar la contraseña proporcionada con la contraseña almacenada
    if (password !== usuario.password) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    // Si todo está correcto, devolver el detalle del usuario
    res.json({
      message: "Inicio de sesión exitoso",
      user: {
        id: usuario.id,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        correo: usuario.correo,
      },
    });
  } catch (error) {
    console.error("Error en el inicio de sesión:", error);
    res.status(500).json({ message: "Error en el inicio de sesión" });
  }
});



export default router;
