import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import HeaderAdmin from '../../COMPONENTES/Header_Admin'; // Asegúrate de importar el Header correcto
import BarraHorizontal from '../../COMPONENTES/BarraHorizontalAdmin'; // Barra de navegación creada previamente
import ContenidoDashboard from '../ADMINISTRADOR/ContenidoDashboard';
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
        <ContenidoDashboard/>
      </Box>
    </div>
  );
};

export default Dashboard;
