import express from "express";

const router = express.Router();

// Datos estáticos de ejemplo con teléfono agregado
const usuarios = [
    { id: 1, nombre: "Juan", apellido: "Pérez", correo: "juan.perez@mail.com", telefono: "123-456-7890", estado: "activo" },
    { id: 2, nombre: "María", apellido: "González", correo: "maria.gonzalez@mail.com", telefono: "987-654-3210", estado: "inactivo" },
    { id: 3, nombre: "Carlos", apellido: "Rodríguez", correo: "carlos.rodriguez@mail.com", telefono: "555-666-7777", estado: "activo" }
];


router.get("/usuarios/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const usuario = usuarios.find(usuario => usuario.id === id);

    if (usuario) {
        res.json(usuario);
    } else {
        res.status(404).json("Usuario no encontrado");
    }
});


router.get("/usuarios", async (req, res) => {
    res.json(usuarios);
});

export default router;
