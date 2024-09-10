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
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#E0E0E0',
            padding: '10px 20px',
            borderRadius: '8px',
            mb: 4,
          }}
        >
          <Typography variant="h6">Dashboard</Typography>
          <Typography variant="button">Cambiar Fecha o Periodo</Typography>
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
                68
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
                12
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
                S/ 13,500.00
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
