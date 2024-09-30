import React, { useState, useEffect } from 'react';
import { Container, Grid, Box, Typography, Button, Link } from '@mui/material';
import Header1 from '../../COMPONENTES/Header_Principal';
import CantidadProducto from '../BUSCAR_MEDICINAS/DETALLES/Cantidad';
import { useNavigate, useParams } from 'react-router-dom';

const DetalleProducto = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [loading, setLoading] = useState(true); // Estado de carga

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true); // Inicia el estado de carga
      try {
        const response = await fetch(`http://localhost:4000/api/productos/detalle/${id}`);
        if (!response.ok) {
          throw new Error('Error al obtener los datos del producto');
        }
        const producto = await response.json();
        // Asegúrate de actualizar imageUrl con la ruta completa del servidor si no lo has hecho ya
        setProduct({ ...producto, imageUrl: `http://localhost:4000/api/productos${producto.image}` });
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false); // Finaliza el estado de carga
      }
    }
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      cartItems.push({ ...product, cantidad });
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      // Notificar a otros componentes
      const event = new Event('cartUpdated');
      window.dispatchEvent(event);
    }
  };

  const aumentarCantidad = () => setCantidad(cantidad + 1);
  const disminuirCantidad = () => cantidad > 1 && setCantidad(cantidad - 1);

  if (loading) {
    return <div>Loading...</div>; // Muestra "Loading..." si está cargando
  }

  if (!product) {
    return <div>No se encontró el producto.</div>; // Muestra mensaje si no hay producto
  }

  return (
    <>
      <Header1 />
      <Container maxWidth="md">
        <Box my={4}>
          <Typography variant="h4">{product.name}</Typography>
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
                src={product.imageUrl} // Asegúrate de usar imageUrl
                alt={product.name}
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  objectFit: 'contain',
                  display: 'block',
                }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/path/to/default-image.png'; // Ruta de la imagen por defecto
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
                <Typography variant="h4" color="black" fontWeight="bold">S/{product.precio?.toFixed(2)}</Typography>
                <Button variant="contained" style={{ marginTop: 8, backgroundColor: '#4a6a7d', color: '#ffffff' }} onClick={handleAddToCart}>
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
            {product.description}
          </Typography>
        </Box>

        <Box mt={4} mb={4} bgcolor="grey.300" p={2} borderRadius={3}>
          <Typography variant="h6">Características del Producto:</Typography>
          <ul>
            {product.caracteristicas?.map((feature, index) => (
              <li key={index}>
                <Typography variant="body1">{feature}</Typography>
              </li>
            ))}
          </ul>
        </Box>
      </Container>
    </>
  );
};

export default DetalleProducto;
