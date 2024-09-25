import React from 'react';
import { Box, Typography, TextField } from '@mui/material';
import Header_Botica from '../../COMPONENTES/Header_Botica';
import BarraHorizontalBotica from '../../COMPONENTES/BarraHorizontalBotica';
import ContenidoDashboardBotica from './ContenidoDashboardBotica';

const DashboardBotica = () => {
  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header fijo */}
      <Header_Botica />
      <Box sx={{ mb: 2 }}> {/* Aumenté el margen inferior a 4 */}
        <BarraHorizontalBotica />
      </Box>
      

      {/* Cuerpo del dashboard ajustado al tamaño de la ventana */}
      <Box sx={{ flexGrow: 1, mx: 4, overflow: 'auto' }}>
        
      <Box
  sx={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',  // Centra el contenido principal
    backgroundColor: '#D6E9FE',
    padding: '10px 20px',
    borderRadius: '8px',
    mb: 4,
    height: '50px',
    position: 'relative'  // Permite posicionar el input de fecha de manera absoluta
  }}
>
  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
    Dashboard
  </Typography>

  <Box
    sx={{
      position: 'absolute',
      right: '20px'  // Alinea el input de fecha a la derecha
    }}
  >
    <TextField
      type="date"
      sx={{
        maxWidth: '150px',
      }}
      InputLabelProps={{
        shrink: true,
      }}
    />
  </Box>
</Box>
        {/* Cuerpo del dashboard */}
        <ContenidoDashboardBotica />
      </Box>
    </Box>
  );
};

export default DashboardBotica;
