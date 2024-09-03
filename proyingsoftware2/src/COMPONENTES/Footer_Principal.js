import React from 'react';
import { Box, Typography, Link, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';


const Conteiner = styled(Box)(({ theme }) => ({
  backgroundColor: '#C8D9E6', 
  padding: theme.spacing(4),
  display: 'flex',
  justifyContent: 'space-between',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
}));

const Columnas = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  margin: theme.spacing(2),
}));

const Titulo_Columnas = styled(Typography)(({ theme }) => ({
  fontFamily: 'Arial, sans-serif', 
  color: '#000000', 
}));

const Texto_Columnas = styled(Typography)(({ theme }) => ({
  fontFamily: 'Arial, sans-serif', 
  color: '#000000', 
}));

const Subrayado = styled(Link)(({ theme }) => ({
  fontFamily: 'Arial, sans-serif', 
  color: '#000000', 
  cursor: 'pointer',
  underline: 'hover',
  '&:hover': {
    color: '#000000', 
  },
}));

const Footer = () => {

  const navigate = useNavigate();

  const handleNavigate = (path, section) => {
    navigate(path);
    if (section) {
      setTimeout(() => {
        document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
      }, 0);
    }
  };

  return (
    <Conteiner>
      <Columnas>
        <Titulo_Columnas variant="h6" gutterBottom>
          DosisXtra
        </Titulo_Columnas>
        <Texto_Columnas variant="body2" gutterBottom>
          © 2010 – 2020
        </Texto_Columnas>
        <Subrayado href="#" underline="hover">
          Privacy - Terms
        </Subrayado> 
      </Columnas>
      <Columnas>
        <Titulo_Columnas variant="h6" gutterBottom>
          Cuenta
        </Titulo_Columnas>
        <Subrayado href="/iniciarsesion" underline="hover">
          Login
        </Subrayado>
        <Subrayado href="/registrar" underline="hover">
          Registro
        </Subrayado>
        <Subrayado href="/carritocompra" underline="hover">
          Carrito
        </Subrayado>
      </Columnas>
      <Columnas>
        <Titulo_Columnas variant="h6" gutterBottom>
          Productos
        </Titulo_Columnas>
        <Subrayado  underline="hover" onClick={() => handleNavigate('/', 'vendidos')}>
          Más Vendidos
        </Subrayado>
        <Subrayado  underline="hover" onClick={() => handleNavigate('/', 'nuevos')}>
          Nuevos
        </Subrayado>
        <Subrayado  underline="hover" onClick={() => handleNavigate('/', 'ofertas')}>
          Ofertas
        </Subrayado>
      </Columnas>
      <Columnas>
        <Titulo_Columnas variant="h6" gutterBottom>
          Ayuda
        </Titulo_Columnas>
        <Subrayado href="/acercadenosotros" underline="hover">
          Acerca de Nosotros
        </Subrayado>
        <Subrayado href="/politicaenvio" underline="hover">
          Política de Envío
        </Subrayado>
        <Subrayado href="/faq" underline="hover">
          FAQ
        </Subrayado>
      </Columnas>
      <Columnas>
        <Box display="flex" justifyContent="center">
          <IconButton href="https://www.facebook.com" color="inherit">
            <FacebookIcon />
          </IconButton>
          <IconButton href="https://www.instagram.com" color="inherit">
            <InstagramIcon />
          </IconButton>
          <IconButton href="https://twitter.com/home" color="inherit">
            <TwitterIcon />
          </IconButton>
          <IconButton href="https://www.youtube.com" color="inherit">
            <YouTubeIcon />
          </IconButton>
        </Box>
      </Columnas>
    </Conteiner>
  );
};

export default Footer;