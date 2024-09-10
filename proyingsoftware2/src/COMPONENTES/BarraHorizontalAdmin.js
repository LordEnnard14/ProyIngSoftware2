import React from 'react';
import { AppBar, Toolbar, Button, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const BotonNavegacion = styled(Button)(({ theme }) => ({
  color: '#fff',
  textTransform: 'none',
  fontWeight: 'bold',
  fontSize: '1rem',
  marginRight: theme.spacing(3),
  '&:hover': {
    backgroundColor: '#15489A',
  },
}));

const BarraHorizontalAdmin = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
      <AppBar position="static" sx={{ backgroundColor: '#4A90E2', borderRadius: '50px', maxWidth: '600px', width: '100%' }}>
        <Toolbar sx={{ justifyContent: 'center' }}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <BotonNavegacion>
              Dashboard
            </BotonNavegacion>
            <BotonNavegacion>
              Usuarios registrados
            </BotonNavegacion>
            <BotonNavegacion>
              Productos
            </BotonNavegacion>
            <BotonNavegacion>
              Órdenes
            </BotonNavegacion>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default BarraHorizontalAdmin;
