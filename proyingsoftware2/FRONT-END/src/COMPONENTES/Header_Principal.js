import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Slide from '@mui/material/Slide';
import Grow from '@mui/material/Grow';
import Typography from '@mui/material/Typography';
import BarraBusqueda from './Barra_Busqueda';

const Barra = styled('div')(({ theme }) => ({
  flexGrow: 1,
}));

const Titulo_Boton = styled(Button)(({ theme }) => ({
  color: '#000000',
  textTransform: 'none',
  fontWeight: 'bold',
  fontSize: '1.25rem',
  fontFamily: 'Arial, sans-serif',
  transition: 'color 0.3s ease, transform 0.2s ease',
  '&:hover': {
    color: '#2F4156',
    transform: 'scale(1.1)',
  },
}));

const Navegar = styled(Button)(({ theme }) => ({
  color: '#000000',
  textTransform: 'none',
  marginLeft: theme.spacing(2),
  fontFamily: 'Arial, sans-serif',
  transition: 'color 0.3s ease, transform 0.2s ease',
  '&:hover': {
    color: '#2F4156',
    transform: 'scale(1.1)',
  },
}));

const Header1 = () => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setLoggedIn(true);
      setUserName(`${user.nombres} ${user.apellidos}`);
    } else {
      setLoggedIn(false);
      setUserName('');
    }

    // Actualiza el conteo de elementos del carrito
    const updateCartCount = () => {
      const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      setCartItemCount(cartItems.length);
    };

    updateCartCount(); // Inicializar el conteo

    // Escuchar el evento personalizado
    window.addEventListener('cartUpdated', updateCartCount);

    // Limpiar el listener cuando el componente se desmonta
    return () => window.removeEventListener('cartUpdated', updateCartCount);
  }, [loggedIn]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setLoggedIn(false);
    setUserName('');
    navigate('/InicioSesion');
  };

  const handleNavigate = (path, section) => {
    navigate(path);
    if (section) {
      setTimeout(() => {
        document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
      }, 0);
    }
  };

  return (
    <Barra>
      <Slide direction="down" in={true} mountOnEnter unmountOnExit>
        <AppBar position="static" sx={{ backgroundColor: '#FFFFFF' }} elevation={4}>
          <Toolbar>
            <Grow in={true} timeout={500}>
              <Titulo_Boton onClick={() => handleNavigate('/')}>
                DosisXtra
              </Titulo_Boton>
            </Grow>
            <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', mx: 2 }}>
              <BarraBusqueda />
            </Box>
            
            <IconButton onClick={() => handleNavigate('/CarritoCompras')} sx={{ color: '#2F4156' }}>
              <ShoppingCartIcon />
              {cartItemCount > 0 && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    backgroundColor: '#FF0000',
                    color: '#FFFFFF',
                    borderRadius: '50%',
                    width: '20px',
                    height: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                  }}
                >
                  {cartItemCount}
                </Box>
              )}
            </IconButton>

            <Grow in={true} timeout={1300}>
              <Navegar onClick={() => handleNavigate('/ayuda')}>
                Ayuda
              </Navegar>
            </Grow>

            {loggedIn ? (
              <>
                <Typography sx={{ marginLeft: 2, color: '#000000' }}>
                  {userName}
                </Typography>
                <Button
                  variant="contained"
                  sx={{ marginLeft: 2, backgroundColor: '#567C8D', color: '#ffffff' }}
                  onClick={handleLogout}
                >
                  Cerrar Sesión
                </Button>
              </>
            ) : (
              <Grow in={true} timeout={1500}>
                <Button
                  variant="contained"
                  sx={{ marginLeft: 2, backgroundColor: '#567C8D', color: '#ffffff' }}
                  onClick={() => navigate('/InicioSesion')}
                >
                  Iniciar Sesión
                </Button>
              </Grow>
            )}
          </Toolbar>
        </AppBar>
      </Slide>
    </Barra>
  );
};

export default Header1;
