import React from 'react';
import { Box, Grid, Button, Typography } from '@mui/material';
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';
import StorefrontIcon from '@mui/icons-material/Storefront';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import HeaderPrincipal from '../../COMPONENTES/Header_Principal';
import { useNavigate } from 'react-router-dom';
import Footer from '../../COMPONENTES/Footer_Principal';

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import './EleccionCSS.css'

const Eleccion = () => {
  const navigate = useNavigate();

  const responsiveWall = {
    General: {
      breakpoint: { max: 4000, min: 1024 },
      items: 1,
      slidesToSlide: 1 
    }
  };


  return (
    <>
      <HeaderPrincipal/>
      <Carousel responsive={responsiveWall} infinite={true} autoPlay={true} autoPlaySpeed={3000} showDots={true} draggable={false}>
      <div className="Wall">
          <img src={'https://images-1.eucerin.com/~/media/eucerin%20relaunch%20media/eucerin/local/latam/2024/especiales/proteccion-solar-que-va-contigo/cambios-cl/banner_sun_face_range_hero-desktop.gif'}/>
      </div>
      <div className="Wall">
          <img src={'https://www.farmaciasdirect.es/cdn/shop/files/x430dzE1KwJLUus6TvUb0I2sNfJbneqqCFKCRe2P_9d7c5838-283a-4cb6-9ddf-2f7a5a43baec.jpg?v=1725884791&width=1500'}/>
      </div>
      <div className="Wall">
          <img src={'https://www.cerave.pe/-/media/project/loreal/brand-sites/cerave/shared/ciulad/mx-ciulad-landing-banner-lg.jpg?rev=-1'}/>
      </div>
      <div className="Wall">
          <img src={'https://storage.googleapis.com/twg-content/images/cabeceragoogle2.width-1200.jpg'}/>
      </div>
      <div className="Wall">
          <img src={'https://www.marvimundo.com/media/wysiwyg/Banner_Nivea_1.1.jpg'}/>
      </div>

      </Carousel>
      <Box sx={{ 
        position: 'relative', // Para la capa semi-transparente
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '80vh', 
        backgroundColor: '#F5EFEB', 
        textAlign: 'center',
        backgroundColor: '#FDFAF8',
        marginBottom: '50px',
        marginTop:'20px'
      }}>

        {/* Contenido */}
        <Box sx={{ zIndex: 2}}>
          <Typography variant="h4" gutterBottom sx={{ mb: 4, fontSize: '28px', fontWeight: 'bold', color: '#223D53' }}>
            ¿En qué le podemos ayudar?
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            
            
            
            <Grid item>
              <Button className='medicinasbton'
                onClick={() => navigate('/BusquedaMedicina')}>
                <Box>
                  <LocalPharmacyIcon sx={{ fontSize: 70, color: '#ffffff' }} />
                  <Typography variant="h6" sx={{ mt: 2, color: 'white', fontWeight: 'bold' }}>
                    Buscar Medicinas
                  </Typography>
                </Box>
              </Button>
            </Grid>


            
            <Grid item>
            <Button className='boticasbton'
                onClick={() => navigate('/BoticasCercanas')}>
                <Box>
                  <StorefrontIcon sx={{ fontSize: 70, color: '#ffffff' }} />
                  <Typography variant="h6" sx={{ mt: 2, color: 'white', fontWeight: 'bold' }}>
                    Boticas Cercanas
                  </Typography>
                </Box>
              </Button>
            </Grid>
            
            
            
            <Grid item>
            <Button className='consultasbton'
              >
                <Box>
                  <HealthAndSafetyIcon sx={{ fontSize: 70, color: '#ffffff' }} />
                  <Typography variant="h6" sx={{ mt: 2, color: 'white', fontWeight: 'bold' }}>
                    Asistencia Médica
                  </Typography>
                </Box>
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
                
    <Footer/>
    </>
  );
};

export default Eleccion;
