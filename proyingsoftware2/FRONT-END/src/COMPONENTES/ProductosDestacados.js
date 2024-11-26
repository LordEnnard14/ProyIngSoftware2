import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, Card, CardContent, CardMedia, CircularProgress,  Button } from '@mui/material';
import { Link } from 'react-router-dom';

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
      
        setProductos(data.ProductosDetalles.slice(-5)); 
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
        Los últimos productos añadidos
      </Typography>
      <Box
        sx={{
          mt: 4,
          p: 2,
          width: '97%',
          margin: 'auto',
          borderRadius: 2
        }}
      >
        <Grid container spacing={2} justifyContent="center">
          {productos.map((producto) => (
            <Grid item key={producto.id}>
              <Card sx={{ width: 230, height: 360 }}>
                <CardMedia
                  component="img"
                  height="150px"
                  image={`http://localhost:4000/api/productoDetalle/${producto.imageUrl}`}
                  alt={producto.Producto?.nombre}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/placeholder.png';
                  }}
                />
                <CardContent>
                  <Typography style={{fontWeight: 'bold',color: '#888',marginBottom: '5px', marginTop: '0px'}} >
                    {producto.Producto?.Marca?.nombre || 'Sin marca'}
                  </Typography>
                  <Typography style={{fontWeight: 'bold', marginBottom: '5px', textAlign: 'left',fontSize: '16px', marginTop: '0px'}}>
                    {producto.Producto?.nombre || 'Producto sin nombre'}
                  </Typography>
                  <Typography style={{color: '#888',marginBottom: '10px', marginTop: '0px'}}>
                    {producto.Botica?.nombre || 'Sin botica'}
                  </Typography>
                  <Typography style={{color: '#4CAF50',fontWeight: 'bold',fontSize: '18px', marginBottom: '15px',}}>
                  S/.{producto.precio.toFixed(2)  || 'No hay precio'}
                  </Typography>
                  <Link
                to={`/detalles/${producto.id}`}
                style={{ textDecoration: 'none', display: 'block', textAlign: 'center' }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    borderRadius: '20px',
                    backgroundColor: '#5f9fbf',
                    width: '80%',
                    padding: '8px 16px',
                    margin: '0 auto',
                    '&:hover': {
                      backgroundColor: '#3b5968',
                    },
                  }}
                >
                  VER MÁS
                </Button>
              </Link>
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


