import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

const NavegacionMedicinas = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#EBF3FF', height: '30px' }}>
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', marginBottom: '30px' }}>
          <Button sx={{color: '#223D53', mx: 2 }}>
            <Typography variant="button"><b>Medicamentos</b></Typography>
          </Button>
          <Button sx={{ color: '#223D53', mx: 2 }}>
            <Typography variant="button"><b>Adulto Mayor</b></Typography>
          </Button>
          <Button sx={{ color: '#223D53', mx: 2 }}>
            <Typography variant="button"><b>Infantil</b></Typography>
          </Button>
          <Button sx={{ color: '#223D53', mx: 2 }}>
            <Typography variant="button"><b>Vitaminas y Suplementos</b></Typography>
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavegacionMedicinas;
