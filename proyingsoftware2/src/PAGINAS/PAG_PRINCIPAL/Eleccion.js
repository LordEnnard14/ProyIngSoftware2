import React from 'react';
import { Box, Grid, Button, Typography } from '@mui/material';
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';
import StorefrontIcon from '@mui/icons-material/Storefront';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';

const Eleccion = () => {
  return (
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh', 
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
  );
};

export default Eleccion;
