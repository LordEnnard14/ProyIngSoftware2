import React from 'react';
import { Box, Grid, Paper, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom'; // Importa el componente Link
import Header1 from '../../COMPONENTES/Header_Principal';
import NavegacionMedicinas from '../../COMPONENTES/NavegacionMedicinas';
import Footer from '../../COMPONENTES/Footer_Principal';
import productos from '../BUSCAR_MEDICINAS/productosData';

const BusquedaMedicina = () => {
  const StyleDivImg = {
    margin: 'auto',
    height: '200px',
    width: '250px',
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '20px',
  };

  const NombreSytle = {
    fontSize: '18px',
    color: 'rgb(1, 33, 61)',
    marginBottom: '10px',
  };

  return (
    <div>
      <Header1 />
      <NavegacionMedicinas />
      <Box sx={{ flexGrow: 1, padding: 4 }}>
        <Grid
          container
          spacing={3}
          justifyContent="flex-start"
          alignItems="flex-start"
          paddingRight={'10%'}
          paddingLeft={'10%'}
        >
          {productos.map((producto) => (
            <Grid item xs={12} sm={6} md={3} key={producto.id}>
              <Link
                to={`/detalles/${producto.id}`}
                style={{ textDecoration: 'none' }} // Elimina el subrayado del enlace
              >
                <Paper
                  sx={{
                    height: '350px',
                    width: '250px',
                    backgroundColor: 'white',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.1)',
                    alignItems: 'flex-start',
                    padding: '20px',
                  }}
                  elevation={3}
                >
                  <div style={StyleDivImg}>
                    <img
                      src={producto.image}
                      alt={producto.name}
                      style={{
                        height: 'auto',
                        maxWidth: '100%',
                        objectFit: 'contain',
                        backgroundColor: 'white',
                      }}
                    />
                  </div>
                  <Typography
                    variant="h6"
                    component="div"
                    style={NombreSytle}
                  >
                    {producto.name}
                  </Typography>

                  <Typography
                    variant="h6"
                    component="div"
                    sx={{
                      color: '#4CAF50',
                      fontWeight: 'bold',
                      marginBottom: '20px',
                      fontSize: '17px',
                    }}
                  >
                    S/. {producto.precio.toFixed(2)}
                  </Typography>

                  <Button
                    variant="contained"
                    color="primary"
                    sx={{
                      borderRadius: '20px',
                      backgroundColor: '#4a6a7d',
                      width: '100%',
                    }}
                  >
                    VER MÁS
                  </Button>
                </Paper>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Footer />
    </div>
  );
};

export default BusquedaMedicina;
