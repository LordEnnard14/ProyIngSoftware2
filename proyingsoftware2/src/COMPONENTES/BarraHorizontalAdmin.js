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
    <AppBar position="static" sx={{ backgroundColor: '#0057B7', borderRadius: '50px', mt: 2 }}>
      <Toolbar sx={{ justifyContent: 'center' }}>
        <Box>
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
  );
};

export default BarraHorizontalAdmin;
