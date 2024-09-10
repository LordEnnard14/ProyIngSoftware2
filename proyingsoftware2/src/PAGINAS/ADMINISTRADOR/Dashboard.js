import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import HeaderAdmin from '../../COMPONENTES/Header_Admin'; // Asegúrate de importar el Header correcto
import BarraHorizontal from '../../COMPONENTES/BarraHorizontalAdmin'; // Barra de navegación creada previamente

const Dashboard = () => {
  return (
    <div>
      <HeaderAdmin />
      <BarraHorizontal />

      <Box sx={{ mt: 4, mx: 4 }}>
        
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center', // Centra el texto horizontalmente
            alignItems: 'center', // Centra el texto verticalmente
            backgroundColor: '#D6E9FE', // Fondo color celeste
            padding: '10px 20px',
            borderRadius: '8px',
            mb: 4,
            height: '50px' // Establece una altura fija si es necesario
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Dashboard
          </Typography>
        </Box>

        {/* Cuerpo del dashboard */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Paper
              elevation={4}
              sx={{
                backgroundColor: '#D6E9FE', // Color azul claro
                padding: 4,
                textAlign: 'center',
              }}
            >
              <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                69
              </Typography>
              <Typography variant="body1">Órdenes del día de hoy</Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper
              elevation={4}
              sx={{
                backgroundColor: '#D6E9FE', // Color azul claro
                padding: 4,
                textAlign: 'center',
              }}
            >
              <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                69
              </Typography>
              <Typography variant="body1">Usuarios nuevos</Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper
              elevation={4}
              sx={{
                backgroundColor: '#D6E9FE', // Color azul claro
                padding: 4,
                textAlign: 'center',
              }}
            >
              <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                69
              </Typography>
              <Typography variant="body1">Ingresos de hoy</Typography>
            </Paper>
          </Grid>
        </Grid>

      </Box>
    </div>
  );
};

export default Dashboard;
