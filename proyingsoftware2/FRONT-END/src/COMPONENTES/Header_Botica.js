import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'; // Agrega esta línea
import { styled } from '@mui/material/styles';
import Slide from '@mui/material/Slide';
import Grow from '@mui/material/Grow';

// Estilo para el título "DosisXtra"
const Titulo_Boton = styled(Button)(({ theme }) => ({
  color: '#000000',
  textTransform: 'none',
  fontWeight: 'bold',
  fontSize: '1.5rem',
  fontFamily: 'Arial, sans-serif',
  transition: 'color 0.3s ease, transform 0.2s ease',
  '&:hover': {
    color: '#2F4156',
    transform: 'scale(1.1)',
  },
}));

const Header_Botica = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login'); // Ajusta la ruta para cerrar sesión si es necesario
  };

  return (
    <Box>
      <Slide direction="down" in={true} mountOnEnter unmountOnExit>
        <AppBar position="static" sx={{ backgroundColor: '#FFFFFF' }} elevation={4}>
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Box>
              <Titulo_Boton  onClick={() => navigate('/')} >DosisXtra</Titulo_Boton>
            </Box>

            <Grow in={true} timeout={1000}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Modo Botica
              </Typography>
            </Grow>

            <Button
              variant="contained"
              sx={{ backgroundColor: '#567C8D', color: '#ffffff' }}
              onClick={handleLogout}
            >
              Cerrar Sesión
            </Button>
          </Toolbar>
        </AppBar>
      </Slide>
    </Box>
  );
};

export default Header_Botica;
