import React from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';
import HeaderAdmin from '../../COMPONENTES/Header_Admin';
import BarraHorizontalAdmin from '../../COMPONENTES/BarraHorizontalAdmin';
import { useNavigate } from 'react-router-dom';

const ListaProductos = () => {
  const navigate = useNavigate();

  // Datos simulados, puedes sustituirlos con datos de tu base de datos
  const productos = [
    { id: 1, nombre: 'Producto A', precio: 'S/ 50.00', fechaRegistro: '10/09/2023', stock: 100, estado: 'Disponible' },
    { id: 2, nombre: 'Producto B', precio: 'S/ 30.00', fechaRegistro: '12/09/2023', stock: 50, estado: 'No disponible' },
    { id: 3, nombre: 'Producto C', precio: 'S/ 45.00', fechaRegistro: '15/09/2023', stock: 20, estado: 'Disponible' },
    { id: 4, nombre: 'Producto D', precio: 'S/ 25.00', fechaRegistro: '18/09/2023', stock: 0, estado: 'No disponible' },
  ];

  return (
    
    <div>
      <HeaderAdmin />
      <BarraHorizontalAdmin />

      <Box sx={{ mt: 4, mx: 4 }}>
        {/* Caja de "Productos" similar a la de "Usuarios Registrados" */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#D6E9FE', // Azul claro
            padding: '10px 20px',
            borderRadius: '8px',
            mb: 4,
          }}
        >
          <Typography variant="h6">Productos</Typography>
          <Button onClick={() => navigate('/AgregarProducto')}  > Agregar Producto </Button>

        </Box>

        {/* Tabla de productos */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Precio</TableCell>
                <TableCell>Fecha de Registro</TableCell>
                <TableCell>Stock</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productos.map((producto) => (
                <TableRow key={producto.id}>
                  <TableCell>{producto.id}</TableCell>
                  <TableCell>{producto.nombre}</TableCell>
                  <TableCell>{producto.precio}</TableCell>
                  <TableCell>{producto.fechaRegistro}</TableCell>
                  <TableCell>{producto.stock}</TableCell>
                  <TableCell>{producto.estado}</TableCell>
                  <TableCell>
                    <Button size="small" sx={{ mr: 1 }} color="primary">Ver</Button>
                    {producto.estado === 'Disponible' ? (
                      <Button size="small" color="secondary">Desactivar</Button>
                    ) : (
                      <Button size="small" color="primary">Activar</Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
};

export default ListaProductos;
