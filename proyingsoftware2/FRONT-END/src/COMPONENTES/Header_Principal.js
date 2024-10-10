import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
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
    const usuarioID = user?.id;

    if (user) {
      setLoggedIn(true);
      setUserName(`${user.nombre} ${user.apellidoPaterno}`);
    } else {
      setLoggedIn(false);
      setUserName('');
    }

    const updateCartCount = async () => {
      if (!usuarioID) {
        console.error('Usuario no encontrado');
        setCartItemCount(0); // O cualquier valor por defecto que desees
        return;
      }

      try {
        const response = await fetch(`http://localhost:4000/api/carrito/cantidadProductos/${usuarioID}`);

        if (!response.ok) {
          throw new Error('Error al obtener la cantidad de productos');
        }

        const data = await response.json(); // Obtener el cuerpo de la respuesta
        console.log('Cantidad de productos:', data.totalProductos); // Verificar qué se devuelve

        setCartItemCount(data.totalProductos); // Asegúrate de que este campo exista
      } catch (error) {
        console.error('Error al actualizar el conteo del carrito:', error);
        setCartItemCount(0); // O cualquier valor por defecto que desees
      }
    };

    updateCartCount(); // Inicializa el conteo

    // Escuchar el evento personalizado
    window.addEventListener('cartUpdated', updateCartCount);

    // Verificar cambios en el localStorage (para pruebas)
    const storageChangeHandler = () => {
      const updatedUser = JSON.parse(localStorage.getItem('user'));
      if (updatedUser) {
        setLoggedIn(true);
        setUserName(`${updatedUser.nombre} ${updatedUser.apellidoPaterno}`);
      } else {
        setLoggedIn(false);
        setUserName('');
      }
      updateCartCount();
    };

    window.addEventListener('storage', storageChangeHandler);

    return () => {
      window.removeEventListener('cartUpdated', updateCartCount);
      window.removeEventListener('storage', storageChangeHandler);
    };
  }, []);








  const handleLogout = () => {
    localStorage.removeItem('user');
    console.log("Usuario eliminado del localStorage");
    setLoggedIn(false);
    setUserName('');
    navigate('/InicioSesion');
  };
















  

  const handleNavigate = (path, section) => {
    navigate(path);
    if (section) {
      document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
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
                <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: 2 }}>
                  <Typography sx={{ color: '#000000', marginRight: 1 }}>
                    {userName}
                  </Typography>
                  <IconButton onClick={() => console.log('Abrir perfil')} sx={{ color: '#000000' }}>
                    <AccountCircleIcon />
                  </IconButton>
                </Box>
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
