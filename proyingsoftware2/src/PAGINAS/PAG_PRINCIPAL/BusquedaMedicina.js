import React from 'react';
import { Box, Grid, Paper } from '@mui/material';
import Header1 from '../../COMPONENTES/Header_Principal';
import NavegacionMedicinas from '../../COMPONENTES/NavegacionMedicinas';
import Footer from '../../COMPONENTES/Footer_Principal';

const BusquedaMedicina = () => {
  return (
    <div>
      <Header1 />
      <NavegacionMedicinas />
      <Box sx={{ flexGrow: 1, padding: 4 }}>
        <Grid container spacing={3} justifyContent="center">
          {[...Array(6)].map((_, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper
                sx={{
                  height: 150,
                  backgroundColor: '#C4D2E7', 
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                elevation={3}
              >
                {/* Aquí se pueden agregar las fotos de los medicamentos en el futuro */}
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
