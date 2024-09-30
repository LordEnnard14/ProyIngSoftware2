import express from "express";

const router = express.Router();

// Datos estáticos de ejemplo
const usuarios = [
    { id: 1, nombre: "Juan", apellido: "Pérez", correo: "juan.perez@mail.com", estado: "activo" },
    { id: 2, nombre: "María", apellido: "González", correo: "maria.gonzalez@mail.com", estado: "inactivo" },
    { id: 3, nombre: "Carlos", apellido: "Rodríguez", correo: "carlos.rodriguez@mail.com", estado: "activo" }
];

// Endpoint para obtener información de un usuario por su ID
router.get("/usuarios/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const usuario = usuarios.find(usuario => usuario.id === id);
    if (usuario) {
        res.json(usuario);
    } else {
        res.status(404).json("Usuario no encontrado");
    }
});

// Se obtiene a todos los usuarios
router.get("/usuarios", (req, res) => {
    res.json(usuarios);
});

export default router;

