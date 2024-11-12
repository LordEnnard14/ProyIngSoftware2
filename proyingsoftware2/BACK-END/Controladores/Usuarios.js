import express from "express";
import { Orden, ProductoOrden, Producto, Usuario } from "../Models/Relaciones.js"; 

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
      const { nombre, apellidoPaterno, apellidoMaterno, password, correo, telefono, dni } = req.body;

      // Validaciones de los campos
      if (!nombre) return res.status(400).json({ message: "El campo 'nombre' es requerido" });
      if (!correo) return res.status(400).json({ message: "El campo 'correo' es requerido" });
      if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(correo)) return res.status(400).json({ message: "Formato de correo inválido" });
      if (!telefono || telefono.length !== 9) return res.status(400).json({ message: "El campo 'telefono' debe tener 9 dígitos" });
      if (!dni || dni.length !== 8) return res.status(400).json({ message: "El campo 'dni' debe tener 8 dígitos" });

      const nuevoUsuario = await Usuario.create({
          nombre, apellidoPaterno, apellidoMaterno, password, correo, telefono, dni
      });

      res.status(201).json({
          mensaje: "Usuario registrado exitosamente",
          usuario: nuevoUsuario
      });

  } catch (error) {
      console.error("Error al registrar usuario:", error);
      res.status(500).json({
          error: "Error al registrar usuario. Por favor, intenta nuevamente.",
          detalles: error.message
      });
  }
});



router.post('/iniciarSesion', async (req, res) => {
  const { correo, password } = req.body;
  
  if (!correo || !password) {
    return res.status(400).json({ message: "Correo y contraseña son requeridos" });
  }

  try {

    const usuario = await Usuario.findOne({ where: { correo } });
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    if (password !== usuario.password) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    res.json({
      message: "Inicio de sesión exitoso",
      user: {
        id: usuario.id,
        nombre: usuario.nombre,
        apellidoPaterno: usuario.apellidoPaterno,
        apellidoMaterno: usuario.apellidoMaterno,
        correo: usuario.correo,
      },
    });
  } catch (error) {
    console.error("Error en el inicio de sesión:", error);
    res.status(500).json({ message: "Error en el inicio de sesión" });
  }
});


// Endpoint para consultar a la base de datos si existe un correo (se utiliza para poder establecer nueva contraseña)
router.get('/verificarCorreo/:correo', async (req, res) => {
  const { correo } = req.params; // Obtenemos el correo de los parámetros de la ruta

  try {
    const usuario = await Usuario.findOne({ where: { correo } }); // Verifica si el usuario existe

    if (usuario) {
      return res.status(200).json({ message: 'El correo existe' }); // Respuesta positiva si el usuario se encuentra
    } else {
      return res.status(404).json({ message: 'El correo no existe' }); // Respuesta negativa si no se encuentra
    }
  } catch (error) {
    console.error('Error al verificar el correo:', error);
    return res.status(500).json({ message: 'Ocurrió un error al verificar el correo.' });
  }
});


//Endpoint que nos va a permitir reestablecer una contraseña para un correo existente
router.put('/restablecerContrasena', async (req, res) => {
  const { correo, password } = req.body;
  try {
    const user = await Usuario.findOne({ where: { correo } });
    if (user) {
      // Actualiza la contraseña del usuario sin hash
      user.password = password; // Reemplaza la contraseña antigua con la nueva
      await user.save(); // Guarda los cambios
      
      return res.status(200).json({ message: 'Contraseña actualizada con éxito' });
    } else {
      return res.status(404).json({ message: 'Correo no encontrado' });
    }
  } catch (error) {
    console.error('Error al restablecer la contraseña:', error); // Log de error
    return res.status(500).json({ message: 'Error en el servidor' });
  }
});


router.post("/direcciones/:id", async (req, res) => {
  const { id } = req.params;
  const { nuevaDireccion } = req.body;

  try {
    if (!nuevaDireccion || nuevaDireccion.trim().length === 0) {
      return res.status(400).json({ error: "La dirección no puede estar vacía" });
    }

    const usuario = await Usuario.findByPk(id);

if (!usuario) {
  return res.status(404).json({ error: "Usuario no encontrado" });
}

const direcciones = usuario.direcciones || [];  // Asegúrate de que sea un array
if (direcciones.length >= 3) {
  return res.status(400).json({ error: "No puedes tener más de 3 direcciones" });
}

// Agregar la nueva dirección al array
direcciones.push(nuevaDireccion);

usuario.direcciones = direcciones;  // Asigna el array actualizado

await usuario.save();  // Guarda los cambios
res.json({ direcciones: usuario.direcciones });  // Devuelve las direcciones actualizadas

  } catch (error) {
    console.error("Error al agregar dirección:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});


/*
router.get('/:usuarioId/ordenes', async (req, res) => {
  try {
    const { usuarioId } = req.params;

    // Verificamos si el usuario existe
    const usuario = await Usuario.findByPk(usuarioId);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    // Buscamos todas las órdenes del usuario
    const ordenes = await Orden.findAll({
      where: {
        usuarioID: usuarioId // Aseguramos que las órdenes pertenezcan al usuario
      },
      include: {
        model: ProductoOrden,
        include: {
          model: Producto,
          attributes: ['nombre'] // Incluimos solo el nombre del producto
        }
      }
    });

    // Verificamos si el usuario tiene órdenes
    if (ordenes.length === 0) {
      return res.status(404).json({ message: 'Este usuario no tiene órdenes.' });
    }

    // Mapeamos las órdenes y productos
    const resultado = ordenes.map((orden) => ({
      ordenId: orden.id,
      productos: orden.ProductoOrdens.map((productoOrden) => ({
        nombreProducto: productoOrden.Producto.nombre,
        cantidad: productoOrden.cantidad,
        precio: productoOrden.precio,
      }))
    }));

    // Enviamos la respuesta con todas las órdenes y productos
    res.json({
      usuarioId,
      ordenes: resultado
    });

  } catch (error) {
    console.error('Error al obtener las órdenes del usuario:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
});
*/


export default router;
