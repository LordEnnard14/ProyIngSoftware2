import React from 'react';
import { TextField, Grid, Button, Box, Typography, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Header2 from '../../COMPONENTES/Header_2'; 
import './IScss.css'
import Footer from '../../COMPONENTES/Footer_Principal';

const InicioSesion = () => {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault(); // Evita que la página se recargue
    
    const formData = new FormData(event.target); // Captura los datos del formulario
    const email = formData.get('email'); // Obtiene el valor del campo "email"
    const password = formData.get('password'); // Obtiene el valor del campo "password"
    
    const storedUser = JSON.parse(localStorage.getItem('user')); // Recupera los datos almacenados en localStorage
    
    // Verifica si el correo y la contraseña coinciden con los datos almacenados
    if (storedUser && storedUser.email === email && storedUser.password === password) {
      alert('Inicio de sesión exitoso');
      navigate('/BusquedaMedicina'); // Redirige a la página deseada
    } else {
      alert('Correo o contraseña incorrectos');
    }
  };

  return (
    <>
    <section id="BodyOne">
      <Header2/>
      <Box className="RectanguloBase">
        <form onSubmit={handleSubmit}>
          <div>
          <Typography variant="h5" gutterBottom align="center" sx={{ fontWeight: 'bold', color: 'white', marginBottom:'100px', fontSize:'30px'}}>
            Iniciar Sesión
          </Typography>
          </div>
          <Grid container spacing={2}>
            <Grid sx={{width:'100%'}}>
              <TextField
                name="email"  // Nombre del campo
                fullWidth
                label="Correo electrónico"
                variant="outlined"
                required
                InputProps={{ style: { borderRadius: 50, backgroundColor: 'white' } }}
                InputLabelProps={{
                  sx: {
                    '&.Mui-focused': {
                      top: '-20px',  // Mueve la etiqueta cuando está enfocada
                      fontSize: '1.4rem', // Cambia el tamaño cuando está enfocada
                      color: 'white'
                    }
                  }
                }}
              />
            </Grid> 
            <Grid sx={{marginTop: '50px', width:'100%', marginBottom: '5px'}}>
              <TextField
                name="password"  // Nombre del campo
                fullWidth
                label="Contraseña"
                variant="outlined"
                required
                type="password"
                InputProps={{ style: { borderRadius: 50, backgroundColor: 'white' } }}
                InputLabelProps={{
                  sx: {
                    '&.Mui-focused': {
                      top: '-20px',  // Mueve la etiqueta cuando está enfocada
                      fontSize: '1.4rem', // Cambia el tamaño cuando está enfocada
                      color: 'white'
                  }}
                }}
                
              />
            </Grid>
            <Grid item xs={12}>
              
              <div className='divolvide'>
                <a className='olvide' href=''>
                  Olvidé mi contraseña
                </a>
              </div>

              <Button
                fullWidth
                type="submit"
                variant="contained"
                sx={{ fontSize:'17px', backgroundColor: '#28639B', color: '#ffffff', borderRadius: 20, width: '50%', display: 'flex' ,marginRight: 'auto', marginLeft: 'auto', height: '50px', width: '100%'}}
              >
                <b>Entrar</b>
              </Button>
            </Grid>
          </Grid>
          <Box mt={2} className="RA">
            <p>¿Aún no tienes cuenta?</p>
            <a onClick={() => navigate('/Registro')}>
              <b>Regístrate aquí</b>
            </a>
          </Box>
        </form>
      </Box>
    </section>
    <Footer/>
    </>
  );
};

export default InicioSesion;
