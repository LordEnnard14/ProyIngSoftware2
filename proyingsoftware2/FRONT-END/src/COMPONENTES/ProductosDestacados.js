import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, Card, CardContent, CardMedia, CircularProgress } from '@mui/material';

const ProductosDestacados = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/productos/ProductosAll');
        if (!response.ok) {
          throw new Error('Error al obtener los productos.');
        }
        const data = await response.json();
        setProductos(data.ProductosDetalles.slice(10, 15)); 
      } catch (error) {
        console.error('Error al obtener productos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (productos.length === 0) {
    return (
      <Box textAlign="center" mt={4}>
        <Typography variant="h6" color="textSecondary">
          No se encontraron productos disponibles.
        </Typography>
      </Box>
    );
  }

  return (
    <div style={{ width: '100%', margin: 'auto', textAlign: 'center' }}>
      <Typography variant="h5" gutterBottom>
        Porque nos preocupamos por usted
      </Typography>
      <Box
        sx={{
          mt: 4,
          p: 2,
          width: '90%',
          backgroundColor: 'blue',
          margin: 'auto',
          borderRadius: 2,
        }}
      >
        <Grid container spacing={2} justifyContent="center">
          {productos.map((producto) => (
            <Grid item key={producto.id}>
              <Card sx={{ width: 200, height: 300 }}>
                <CardMedia
                  component="img"
                  height="150"
                  image={`http://localhost:4000/api/productoDetalle/${producto.imageUrl}`}
                  alt={producto.Producto?.nombre}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/placeholder.png';
                  }}
                />
                <CardContent>
                  <Typography variant="body2" color="textSecondary">
                    Marca: {producto.Producto?.Marca?.nombre || 'Sin marca'}
                  </Typography>
                  <Typography variant="subtitle1" noWrap>
                    {producto.Producto?.nombre || 'Producto sin nombre'}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Botica: {producto.Botica?.nombre || 'Sin botica'}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
  
};

export default ProductosDestacados;


