import React from 'react';
import { TextField, Box, Typography, Button } from '@mui/material';
import HeaderPrincipal from '../../COMPONENTES/Header_Principal';
import NavegacionMedicinas from '../../COMPONENTES/NavegacionMedicinas';
import FooterPrincipal from '../../COMPONENTES/Footer_Principal';
import { MapContainer, TileLayer, useMap,Popup, Marker } from 'react-leaflet'

const BoticasCercanas = () => {
  const mapContainerStyle = {
    width: '100%',
    height: '100%'
  };

  const center = {
    lat: -12.0464, // Coordenadas para centrar el mapa en Lima, Perú
    lng: -77.0428
  };

  const boticas = [
      {
        "Botica": "Botica Central",
        "Latitude": -12.052208,
        "Longitude": -76.939407
      },
      {
        "Botica": "Botica Sur",
        "Latitude": -12.062652,
        "Longitude": -76.954135
      },
      {
        "Botica": "Botica Norte",
        "Latitude": -12.062612,
        "Longitude": -76.952695
      },
  ]

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
          <MapContainer center={center} zoom={30} >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
            <Marker position={[boticas[0].Latitude, boticas[0].Longitude]}>
              <Popup>
                BOTICA CENTRAL
              </Popup>
            </Marker>
            <Marker position={[boticas[1].Latitude, boticas[1].Longitude]}>
              <Popup>
                BOTICA SUR
              </Popup>
            </Marker>
            <Marker position={[boticas[2].Latitude, boticas[2].Longitude]}>
              <Popup>
                BOTICA NORTE
              </Popup>
            </Marker>
          </MapContainer>
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
