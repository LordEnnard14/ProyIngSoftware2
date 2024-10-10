import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
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

const Header_Admin = () => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  const handleLogout = () => {
    localStorage.removeItem('user');
    console.log("Usuario eliminado del localStorage");
    setLoggedIn(false);
    setUserName('');
    navigate('/InicioSesion');
  };


  // Recupera el nombre del usuario de localStorage
  const usuarioNombre = localStorage.getItem('usuarioNombre');

  return (
    <Box>
      <Slide direction="down" in={true} mountOnEnter unmountOnExit>
        <AppBar position="static" sx={{ backgroundColor: '#FFFFFF' }} elevation={4}>
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Box>
              <Titulo_Boton onClick={() => navigate('/BusquedaMedicina')}>
                DosisXtra
              </Titulo_Boton>
            </Box>

            <Grow in={true} timeout={1000}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                {usuarioNombre ? `Bienvenido, ${usuarioNombre}` : 'Modo administrador'}
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

export default Header_Admin;
