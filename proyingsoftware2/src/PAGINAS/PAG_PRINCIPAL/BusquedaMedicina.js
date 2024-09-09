import React from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import Header1 from '../../COMPONENTES/Header_Principal';
import NavegacionMedicinas from '../../COMPONENTES/NavegacionMedicinas';
import Footer from '../../COMPONENTES/Footer_Principal';
import productos from  './productosData'; 

const BusquedaMedicina = () => {
  return (
    <div>
      <Header1 />
      <NavegacionMedicinas />
      <Box sx={{ flexGrow: 1, padding: 4 }}>
        <Grid container spacing={3} justifyContent="center">
          {productos.map((producto, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper
                sx={{
                  height: 300, // Ajusta la altura según tus necesidades
                  backgroundColor: '#C4D2E7',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: 2,
                }}
                elevation={3}
              >
                <img 
                  src={producto.image} 
                  alt={producto.name} 
                  style={{ maxHeight: '150px', maxWidth: '100%', objectFit: 'cover' }} 
                />
                <Typography variant="h6" component="div" sx={{ mt: 2 }}>
                  {producto.name}
                </Typography>
                <Typography variant="body2" component="div" sx={{ mt: 1 }}>
                  {producto.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Footer />
    </div>
  );
};

export default BusquedaMedicina;
