import React, { useState, useEffect } from 'react';
import { Container, Grid, Box, Typography, Button, Link } from '@mui/material';
import Header1 from '../../COMPONENTES/Header_Principal';
import CantidadProducto from '../BUSCAR_MEDICINAS/DETALLES/Cantidad.js';
import { useNavigate, useParams } from 'react-router-dom';
import Header_Botica from '../../COMPONENTES/Header_Botica.js';

const DetalleProducto = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [stockProducto, setStockProducto] = useState(null);
  const [cantidad, setCantidad] = useState(1);

  useEffect(() => {
    async function fetchStockProducto() {
      try {
        const response = await fetch(`http://localhost:4000/api/productos/stockProductos/${id}`);
        if (!response.ok) {
          throw new Error('Error al obtener los datos del stockProducto');
        }
        const producto = await response.json();
        setStockProducto(producto);
      } catch (error) {
        console.error('Error:', error);
      }
    }
    fetchStockProducto();
  }, [id]);

  const handleAddToCart = async () => {
    // Lógica para agregar al carrito
  };

  const aumentarCantidad = () => {
    if (cantidad < stockProducto.cantidad) {
      setCantidad(cantidad + 1);
    }
  };

  const disminuirCantidad = () => {
    if (cantidad > 1) {
      setCantidad(cantidad - 1);
    }
  };

  if (!stockProducto) {
    return <div>No se encontró el Producto que está buscando.</div>;
  }

  // Si el estado del producto es false, mostramos el mensaje de "Producto desactivado"
  if (stockProducto.estado === false) {
    return (
      <Container maxWidth="md">
        <Box my={4} textAlign="center">
          <Typography variant="h4">Producto desactivado</Typography>
          <Typography variant="body1" color="textSecondary">
            Este producto no está disponible actualmente.
          </Typography>
        </Box>
      </Container>
    );
  }

  const imagenUrl = `http://localhost:4000/api/productoDetalle/${stockProducto.imageUrl}`;
  
  const admin = JSON.parse(localStorage.getItem('admin'));

  return (
    <>
      {admin ? <Header_Botica /> : <Header1 />}
      <Container maxWidth="md">
        <Box my={4}>
          <Typography variant="h4">{stockProducto.Producto.nombre}</Typography>
          <Typography variant="body1" color="textSecondary">
            Marca: {stockProducto.Producto.Marca.nombre}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Vendido por: {stockProducto.Botica.nombre}
          </Typography>
        </Box>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box
              width="100%"
              height={300}
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{
                borderRadius: 5,
                overflow: 'hidden',
                backgroundColor: '#f0f0f0',
              }}
            >
              <img
                src={imagenUrl}
                alt={stockProducto.Producto.nombre}
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  objectFit: 'contain',
                  display: 'block',
                }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.style.display = 'none';
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <Box border={1} borderColor="black" borderRadius={8} p={2} textAlign="center">
                <Box borderBottom={1} borderColor="black" pb={1} mb={1}>
                  <Typography variant="h6">DISPONIBLE</Typography>
                </Box>
                <Typography variant="h4" color="black" fontWeight="bold">
                  S/. {stockProducto.precio?.toFixed(2)}
                </Typography>
                <Button
                  variant="contained"
                  style={{ marginTop: 8, backgroundColor: '#4a6a7d', color: '#ffffff' }}
                  onClick={handleAddToCart}
                  disabled={admin !== null} // Deshabilitar si admin no es null
                >
                  AÑADIR AL CARRITO
                </Button>
                <Box mt={2} />
                <CantidadProducto cantidad={cantidad} aumentar={aumentarCantidad} disminuir={disminuirCantidad} />
                <Typography variant="body2" mt={2}>
                  <Link href="#" color="inherit">
                    Ver métodos de envío disponibles
                  </Link>
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Box mt={4}>
          <Typography variant="h6">Descripción</Typography>
          <Typography variant="body1" paragraph>
            {stockProducto.descripcion}
          </Typography>
        </Box>

        <Box mt={4} mb={4} bgcolor="grey.300" p={2} borderRadius={3}>
          <Typography variant="h6">Características del Producto:</Typography>
          {stockProducto?.caracteristicas?.length > 0 ? (
            <ul>
              {stockProducto.caracteristicas.map((caracteristica, index) => (
                <li key={index}>
                  <Typography variant="body1">{caracteristica}</Typography>
                </li>
              ))}
            </ul>
          ) : (
            <Typography variant="body1">No hay características disponibles.</Typography>
          )}
        </Box>
      </Container>
    </>
  );
};

export default DetalleProducto;
