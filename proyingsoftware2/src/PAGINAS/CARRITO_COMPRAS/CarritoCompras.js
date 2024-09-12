import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, IconButton, TextField, Grid, Divider } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import HeaderAdmin from '../../COMPONENTES/Header_Admin';


const CarritoCompras = () => {
  const [productos, setProductos] = useState([
    { id: 1, nombre: 'Producto A', precio: 50.00, cantidad: 2, imagen: 'https://via.placeholder.com/100' },
    { id: 2, nombre: 'Producto B', precio: 30.00, cantidad: 1, imagen: 'https://via.placeholder.com/100' },
    { id: 3, nombre: 'Producto C', precio: 45.00, cantidad: 3, imagen: 'https://via.placeholder.com/100' },
  ]);
  const navigate = useNavigate();
  const handleEliminarProducto = (id) => {
    setProductos(productos.filter(producto => producto.id !== id));
  };

  const handleCantidadChange = (id, nuevaCantidad) => {
    setProductos(productos.map(producto =>
      producto.id === id ? { ...producto, cantidad: nuevaCantidad } : producto
    ));
  };

  const calcularSubtotal = () => {
    return productos.reduce((total, producto) => total + producto.precio * producto.cantidad, 0).toFixed(2);
  };
  const handleNavigate = (path, section) => {
    navigate(path);
    if (section) {
      setTimeout(() => {
        document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
      }, 0);
    }
  };
  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <HeaderAdmin />

      <Box sx={{ flexGrow: 1, mx: 4, mt: 4 }}>
        {/* Título */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#D6E9FE',
            padding: '10px 20px',
            borderRadius: '8px',
            mb: 4,
          }}
        >
          <Typography variant="h6">Carrito de Compras</Typography>
        </Box>

        {/* Tabla de productos */}
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Imagen</TableCell>
                    <TableCell>Nombre del Producto</TableCell>
                    <TableCell>Precio</TableCell>
                    <TableCell>Cantidad</TableCell>
                    <TableCell>Subtotal</TableCell>
                    <TableCell>Eliminar</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {productos.map((producto) => (
                    <TableRow key={producto.id}>
                      <TableCell>
                        <img src={producto.imagen} alt={producto.nombre} style={{ width: '100px', height: '100px' }} />
                      </TableCell>
                      <TableCell>{producto.nombre}</TableCell>
                      <TableCell>S/ {producto.precio.toFixed(2)}</TableCell>
                      <TableCell>
                        <TextField
                          type="number"
                          value={producto.cantidad}
                          onChange={(e) => handleCantidadChange(producto.id, e.target.value)}
                          inputProps={{ min: 1 }}
                          sx={{ width: '60px' }}
                        />
                      </TableCell>
                      <TableCell>S/ {(producto.precio * producto.cantidad).toFixed(2)}</TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleEliminarProducto(producto.id)}>
                          <DeleteIcon color="error" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          {/* Resumen del carrito */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ padding: '20px' }}>
              <Typography variant="h6">Resumen del Pedido</Typography>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography>Subtotal:</Typography>
                <Typography>S/ {calcularSubtotal()}</Typography>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6">Total:</Typography>
                <Typography variant="h6">S/ {calcularSubtotal()}</Typography>
              </Box>

              <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={() => handleNavigate('/PaginaPago')}>
                Proceder al Pago
              </Button>
              <Button variant="outlined" color="secondary" fullWidth sx={{ mt: 2 }}>
                Seguir Comprando
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default CarritoCompras;
