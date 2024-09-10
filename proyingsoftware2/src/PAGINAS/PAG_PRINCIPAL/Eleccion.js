import React from 'react';
import { Box, Grid, Button, Typography } from '@mui/material';
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';
import StorefrontIcon from '@mui/icons-material/Storefront';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import HeaderPrincipal from '../../COMPONENTES/Header_Principal';
import { useNavigate } from 'react-router-dom';

const Eleccion = () => {
  const navigate = useNavigate();

  return (
    <>
      <HeaderPrincipal/>
      <Box sx={{ 
        position: 'relative', // Para la capa semi-transparente
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh', 
        backgroundImage: 'TENEMOS QUE DEFINIR UN FONDO PIOLA', 
        backgroundSize: 'cover', 
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        backgroundColor: '#F5EFEB', 
        textAlign: 'center'
      }}>
        {/* Capa superpuesta más transparente */}
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.1)', // Transparencia de agua (20%)
          zIndex: 1, // Asegura que cubra la imagen
        }} />

        {/* Contenido */}
        <Box sx={{ zIndex: 2 }}>
          <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
            ¿En qué le podemos ayudar?
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            <Grid item>
              <Button 
                sx={{ 
                  width: 200, 
                  height: 200, 
                  borderRadius: '10px', 
                  backgroundColor: '#C4D2E7',
                  '&:hover': {
                    backgroundColor: '#486f99',
                  },
                }}
                onClick={() => navigate('/BusquedaMedicina')} 
              >
                <Box>
                  <LocalPharmacyIcon sx={{ fontSize: 50, color: '#ffffff' }} />
                  <Typography variant="h6" sx={{ mt: 2, color: '#000000' }}>
                    Buscar Medicinas
                  </Typography>
                </Box>
              </Button>
            </Grid>
            <Grid item>
              <Button 
                sx={{ 
                  width: 200, 
                  height: 200, 
                  borderRadius: '10px', 
                  backgroundColor: '#A6BDDC',
                  '&:hover': {
                    backgroundColor: '#486f99',
                  },
                }}
                onClick={() => navigate('/BoticasCercanas')}
              >
                <Box>
                  <StorefrontIcon sx={{ fontSize: 50, color: '#ffffff' }} />
                  <Typography variant="h6" sx={{ mt: 2, color: '#000000' }}>
                    Boticas Cercanas
                  </Typography>
                </Box>
              </Button>
            </Grid>
            <Grid item>
              <Button 
                sx={{ 
                  width: 200, 
                  height: 200, 
                  borderRadius: '10px', 
                  backgroundColor: '#88A7D0',
                  '&:hover': {
                    backgroundColor: '#486f99',
                  },
                }}
              >
                <Box>
                  <HealthAndSafetyIcon sx={{ fontSize: 50, color: '#ffffff' }} />
                  <Typography variant="h6" sx={{ mt: 2, color: '#000000' }}>
                    Asistencia Médica
                  </Typography>
                </Box>
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
      
    </>
  );
};

export default Eleccion;
