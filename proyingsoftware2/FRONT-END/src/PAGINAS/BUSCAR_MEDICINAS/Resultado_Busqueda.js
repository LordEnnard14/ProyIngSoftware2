import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Box, Grid, Paper, Typography, Button } from '@mui/material';
import Header1 from '../../COMPONENTES/Header_Principal';
import NavegacionMedicinas from '../../COMPONENTES/NavegacionMedicinas';

const ResultadoBusqueda = () => {
  const location = useLocation();
  const { query } = location.state || { query: '' }; // Obtenemos el término de búsqueda
  const [filteredProducts, setFilteredProducts] = useState([]); // Productos filtrados
  const [error, setError] = useState(''); // Mensaje de error

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/productos/searchProduct?query=${query}`);
        if (!response.ok) {
          throw new Error('Error al obtener los datos del servidor');
        }
        const data = await response.json();
  
        // Asegúrate de que el API retorne los campos correctos
        console.log("Datos obtenidos:", data); // Para depurar
  
        const resultados = data.map((producto) => ({
          id: producto.id,
          name: producto.name,
          precio: producto.precio,
          image: `http://localhost:4000/api/productos${producto.image}`, // Construir la URL de la imagen
        }));
  
        setFilteredProducts(resultados);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
        setFilteredProducts([]);
      }
    };
  
    if (query) {
      fetchProductos();
    }
  }, [query]);
  

  return (
    <div>
      <Header1 />
      <NavegacionMedicinas />
      <Box sx={{ flexGrow: 1, padding: 4 }}>
        {/* Mostrar un mensaje si hay un error o si no hay resultados */}
        {error ? (
          <Typography variant="h5">{error}</Typography>
        ) : filteredProducts.length === 0 ? (
          <Typography variant="h5">No se encontraron productos para "{query}".</Typography>
        ) : (
          <Grid container spacing={3} justifyContent="center">
            {filteredProducts.map((producto) => (
              <Grid item xs={12} sm={6} md={3} key={producto.id}>
                <Link to={`/detalles/${producto.id}`} style={{ textDecoration: 'none' }}>
                  <Paper
                    sx={{
                      height: 240,
                      backgroundColor: '#ffffff',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-around',
                      alignItems: 'center',
                      padding: 1,
                      borderRadius: '16px',
                      boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.1)',
                    }}
                    elevation={3}
                  >
                    <img
                      src={producto.image}
                      alt={producto.name}
                      style={{
                        maxHeight: '100px',
                        width: 'auto',
                        objectFit: 'contain',
                      }}
                    />
                    <Typography variant="h6" component="div">
                      {producto.name}
                    </Typography>
                    <Typography variant="h6" component="div" sx={{ color: '#4CAF50', fontWeight: 'bold' }}>
                      S/. {producto.precio.toFixed(2)}
                    </Typography>
                    <Button variant="contained" color="primary" sx={{ borderRadius: '20px', backgroundColor: '#4a6a7d' }}>
                      Agregar al carrito
                    </Button>
                  </Paper>
                </Link>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </div>
  );
};

export default ResultadoBusqueda;
