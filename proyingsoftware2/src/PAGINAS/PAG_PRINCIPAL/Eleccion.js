import React from 'react';
import { Box, Grid, Button, Typography } from '@mui/material';
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';
import StorefrontIcon from '@mui/icons-material/Storefront';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import FooterPrincipal from '../../COMPONENTES/Footer_Principal';
import HeaderPrincipal from '../../COMPONENTES/Header_Principal';
import { useNavigate } from 'react-router-dom';

const Eleccion = () => {
  const navigate = useNavigate();

  return (
    <>
    <HeaderPrincipal/>
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh', 
      backgroundImage: 'url("https://static.vecteezy.com/system/resources/previews/006/712/964/non_2x/abstract-health-medical-science-healthcare-icon-digital-technology-doctor-concept-modern-innovation-treatment-medicine-on-hi-tech-future-blue-background-for-wallpaper-template-web-design-vector.jpg")', 
      backgroundSize: 'cover', 
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center',
      backgroundColor: '#F5EFEB', 
      color: '#00000', 
      textAlign: 'center' 
    }}>
      <Box>
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
    <FooterPrincipal/>
    </>
  );
};

export default Eleccion;
