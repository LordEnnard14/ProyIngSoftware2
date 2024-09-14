import React from 'react';
import { TextField, Box, Typography, Button } from '@mui/material';
import HeaderPrincipal from '../../COMPONENTES/Header_Principal';
import NavegacionMedicinas from '../../COMPONENTES/NavegacionMedicinas';
import FooterPrincipal from '../../COMPONENTES/Footer_Principal';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const BoticasCercanas = () => {
  const mapContainerStyle = {
    width: '100%',
    height: '100%'
  };

  const center = {
    lat: -12.0464, // Coordenadas para centrar el mapa en Lima, Perú
    lng: -77.0428
  };

  return (
    <div>
      <HeaderPrincipal />
      <NavegacionMedicinas />
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Boticas cercanas
        </Typography>
        
        <TextField
          label="Buscar dirección aquí"
          variant="outlined"
          sx={{ mb: 4, borderRadius: 50, width: '60%' }} 
        />

        <Box
          sx={{
            backgroundColor: '#D6E9FE',
            width: '80%',
            height: '500px',
            borderRadius: '8px',
            mb: 4,
            overflow: 'hidden' // Esto es para asegurarse de que el mapa no se desborde
          }}
        >
          <LoadScript googleMapsApiKey="TU_API_KEY_AQUI">
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={center}
              zoom={14} // Nivel de zoom para mostrar los detalles
            >
              {/* Puedes añadir marcadores aquí */}
              <Marker position={center} />
            </GoogleMap>
          </LoadScript>
        </Box>

        <Button
          variant="contained"
          sx={{ backgroundColor: '#567C8D', color: '#fff', borderRadius: 50, mb: 8 }} 
        >
          Buscar boticas cercanas
        </Button>
      </Box>
      <FooterPrincipal />
    </div>
  );
};

export default BoticasCercanas;
