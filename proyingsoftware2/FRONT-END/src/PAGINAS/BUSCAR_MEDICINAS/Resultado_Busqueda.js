import React from 'react';
import { useLocation, Link } from 'react-router-dom'; // Importa Link para navegación
import { Box, Grid, Paper, Typography, Button } from '@mui/material';
import Header1 from '../../COMPONENTES/Header_Principal';
import NavegacionMedicinas from '../../COMPONENTES/NavegacionMedicinas';
import productos from '../BUSCAR_MEDICINAS/productosData';

const ResultadoBusqueda = () => {
  const location = useLocation();
  const { query } = location.state || { query: '' }; // Recibe el término de búsqueda desde el state

  // Filtrar productos basado en el término de búsqueda
  const filteredProducts = productos.filter((producto) =>
    producto.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <Header1 />
      <NavegacionMedicinas />
      <Box sx={{ flexGrow: 1, padding: 4 }}>
        {/* Mostrar un mensaje si no hay resultados */}
        {filteredProducts.length === 0 ? (
          <Typography variant="h5">No se encontraron productos para "{query}".</Typography>
        ) : (
          <Grid container spacing={3} justifyContent="center">
            {filteredProducts.map((producto) => (
              <Grid item xs={12} sm={6} md={3} key={producto.id}>
                <Link 
                  to={`/detalles/${producto.id}`} 
                  style={{ textDecoration: 'none' }} // Elimina el subrayado del enlace
                >
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
  S/. {producto.precio.toFixed(2)} {/* Asegúrate de que la propiedad se llame 'precio' */}
</Typography>


                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ borderRadius: '20px', backgroundColor: '#4a6a7d' }}
                    >
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
