import React from 'react';
import { Box, Grid, Paper, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom'; // Importa el componente Link
import Header1 from '../../COMPONENTES/Header_Principal';
import NavegacionMedicinas from '../../COMPONENTES/NavegacionMedicinas';
import Footer from '../../COMPONENTES/Footer_Principal';
import productos from '../BUSCAR_MEDICINAS/productosData';

const BusquedaMedicina = () => {
  return (
    <div>
      <Header1 />
      <NavegacionMedicinas />
      <Box sx={{ flexGrow: 1, padding: 4 }}>
        <Grid container spacing={3} justifyContent="center">
          {productos.map((producto) => (
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
                    style={{ maxHeight: '100px', width: 'auto', objectFit: 'contain' }}
                  />
                  <Typography variant="h6" component="div">
                    {producto.name}
                  </Typography>
                  <Typography variant="h6" component="div" sx={{ color: '#4CAF50', fontWeight: 'bold' }}>
                    S/. {producto.price}
                  </Typography>
                  <Button variant="contained" color="primary" sx={{ borderRadius: '20px', backgroundColor: '#4a6a7d' }}>
                    VER MÁS
                  </Button>
                </Paper>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Footer />
    </div>
  );
};

export default BusquedaMedicina;
