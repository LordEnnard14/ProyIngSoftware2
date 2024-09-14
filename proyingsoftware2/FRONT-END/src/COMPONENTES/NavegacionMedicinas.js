import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

const NavegacionMedicinas = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#4a6a7d' }}>
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
          <Button sx={{ color: '#ffffff', mx: 2 }}>
            <Typography variant="button">Medicamentos</Typography>
          </Button>
          <Button sx={{ color: '#ffffff', mx: 2 }}>
            <Typography variant="button">Adulto mayor</Typography>
          </Button>
          <Button sx={{ color: '#ffffff', mx: 2 }}>
            <Typography variant="button">Infantil</Typography>
          </Button>
          <Button sx={{ color: '#ffffff', mx: 2 }}>
            <Typography variant="button">Vitaminas y Suplementos</Typography>
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavegacionMedicinas;
