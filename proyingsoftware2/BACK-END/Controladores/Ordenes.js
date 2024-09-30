import express from "express";

const router = express.Router();

const ordenes = [
    {
      id: 1,
      usuario: { nombre: 'Juan', apellido: 'Sanchez' },
      fechaOrden: '2024-02-11',
      total: 'S/125.00',
      correo: 'juan.sanchez@correo.com',
      estado: 'Entregado',
    },
    {
      id: 2,
      usuario: { nombre: 'Carlos', apellido: 'Perez' },
      fechaOrden: '2024-03-12',
      total: 'S/150.00',
      correo: 'carlos.perez@correo.com',
      estado: 'Pendiente',
    },
    {
      id: 3,
      usuario: { nombre: 'Maria', apellido: 'Garcia' },
      fechaOrden: '2024-04-13',
      total: 'S/200.00',
      correo: 'maria.garcia@correo.com',
      estado: 'Entregado',
    },
    {
      id: 4,
      usuario: { nombre: 'Luisa', apellido: 'Fernandez' },
      fechaOrden: '2024-05-20',
      total: 'S/180.00',
      correo: 'luisa.fernandez@correo.com',
      estado: 'Pendiente',
    },
  ];

  router.get("/ordenes", async (req, res) => {
    res.json(ordenes);
});


  router.get("/ordenes/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const orden = ordenes.find(orden => orden.id === id);

    if (orden) {
        res.json(orden);
    } else {
        res.status(404).json("Orden no encontrada");
    }
});
