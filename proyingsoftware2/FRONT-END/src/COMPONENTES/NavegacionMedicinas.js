import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

const NavegacionMedicinas = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static" sx={{ backgroundColor: '#EBF3FF', height: '30px' }}>
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', marginBottom: '30px' }}>
          <Button sx={{color: '#223D53', mx: 2 }} onClick={() => navigate('/BusquedaMedicina')}>
            <Typography variant="button"><b>Medicamentos</b></Typography>
          </Button>
          <Button sx={{color: '#223D53', mx: 2 }} onClick={() => navigate('/BusquedaMedicina?categoria=adulto_mayor')}>
            <Typography variant="button"><b>Adulto Mayor</b></Typography>
          </Button>
          <Button sx={{color: '#223D53', mx: 2 }} onClick={() => navigate('/BusquedaMedicina?categoria=infantil')}>
            <Typography variant="button"><b>Infantil</b></Typography>
          </Button>
          <Button sx={{color: '#223D53', mx: 2 }} onClick={() => navigate('/BusquedaMedicina?categoria=vitaminas')}>
            <Typography variant="button"><b>Vitaminas y Suplementos</b></Typography>
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavegacionMedicinas;
