import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, IconButton, TextField, Grid, Divider } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import HeaderAdmin from '../../COMPONENTES/Header_Admin';

const CarritoCompras = () => {
  const [productos, setProductos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem('user'));
    const usuarioID = usuario?.id;

    if (usuarioID) {
      fetch(`http://localhost:4000/api/carrito/productos/${usuarioID}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Error al obtener los productos del carrito');
          }
          return response.json();
        })
        .then(data => {
          console.log('Productos en el carrito:', data);
          setProductos(data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    } else {
      alert('No se encontró información del usuario. Por favor, inicia sesión.');
    }
  }, []);
  
  const handleEliminarProducto = async (productoID) => {
    const usuario = JSON.parse(localStorage.getItem('user'));
    const usuarioID = usuario?.id;

    if (!usuarioID) {
      alert('No se encontró información del usuario. Por favor, inicia sesión.');
      return;
    }

    try {
      console.log(`Eliminando producto con ID ${productoID} para el usuario ${usuarioID}`);
      const response = await fetch(`http://localhost:4000/api/carrito/eliminarProducto/${usuarioID}/${productoID}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Actualizar el estado localmente sin necesidad de recargar la página
        setProductos(prevProductos => 
          prevProductos.filter(producto => producto.productoID !== productoID)
        );

        // Disparar el evento para actualizar otros componentes si es necesario
        const event = new Event('cartUpdated');
        window.dispatchEvent(event);
      } else {
        const errorData = await response.json();
        console.error('Error al eliminar el producto:', errorData.mensaje);
        alert('Error al eliminar el producto: ' + errorData.mensaje);
      }
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
      alert('Error al eliminar el producto. Intente nuevamente.');
    }
  };

  const handleCantidadChange = async (id, accion) => {
    const usuario = JSON.parse(localStorage.getItem('user'));
    const usuarioID = usuario?.id;

    if (!usuarioID) {
        alert('No se encontró información del usuario. Por favor, inicia sesión.');
        return;
    }

    try {
        const response = await fetch(`http://localhost:4000/api/carrito/actualizarCantidad/${usuarioID}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ accion })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error al actualizar la cantidad:', errorData.mensaje);
            alert('Error al actualizar la cantidad: ' + errorData.mensaje);
            return;
        }

        const data = await response.json();

        setProductos(prevProductos => 
            prevProductos.map(producto =>
                producto.productoID === id ? { ...producto, cantidad: data.nuevaCantidad } : producto
            )
        );

        const event = new Event('cartUpdated');
        window.dispatchEvent(event);
    } catch (error) {
        console.error('Error al actualizar la cantidad:', error);
        alert('Error al actualizar la cantidad. Intente nuevamente.');
    }
  };

  const calcularSubtotal = () => {
    return productos.reduce((total, producto) => {
      const precio = producto.precio || 0;
      const cantidad = producto.cantidad || 0;
      return total + (precio * cantidad);
    }, 0).toFixed(2);
  };

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <HeaderAdmin />

      <Box sx={{ flexGrow: 1, mx: 4, mt: 4 }}>
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
                        <img
                          src={producto.imagen || 'https://via.placeholder.com/100'}
                          alt={producto.nombre || 'Nombre no disponible'}
                          style={{ width: '100px', height: '100px' }}
                        />
                      </TableCell>
                      <TableCell>{producto.nombre || 'Nombre no disponible'}</TableCell>
                      <TableCell>S/ {(producto.precio || 0).toFixed(2)}</TableCell>

                      <TableCell>
                        <IconButton onClick={() => handleCantidadChange(producto.productoID, 'decrementar')}>
                          <RemoveIcon />
                        </IconButton>
                        <TextField
                          type="number"
                          value={producto.cantidad || 1}
                          inputProps={{ min: 1 }}
                          sx={{ width: '60px', textAlign: 'center' }}
                          readOnly
                        />
                        <IconButton onClick={() => handleCantidadChange(producto.productoID, 'incrementar')}>
                          <AddIcon />
                        </IconButton>
                      </TableCell>

                      <TableCell>
                        S/ {((producto.precio || 0) * (producto.cantidad || 1)).toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleEliminarProducto(producto.productoID)}>
                          <DeleteIcon color="error" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

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

              <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={() => navigate('/PaginaPago')}>
                Proceder al Pago
              </Button>
              <Button variant="outlined" color="secondary" fullWidth sx={{ mt: 2 }} onClick={() => navigate('/')}>
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
