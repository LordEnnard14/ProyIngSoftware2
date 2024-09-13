import React, { useState } from 'react';
import { TextField, Grid, Button, Box, Typography, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Header2 from '../../COMPONENTES/Header_2'; // Importa el componente Header_2
import './Rcss.css'
import { blue } from '@mui/material/colors';

const Registro = () => {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombres: '',
    apellidos: '',
    email: '',
    celular: '',
    password: '',
    confirmarPassword: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Almacena los datos en localStorage
    localStorage.setItem('user', JSON.stringify(formData));
    console.log('Datos guardados en localStorage:', formData);
    navigate('/BusquedaMedicina');
  };

  return (
    <>
    <Header2 />
      <section id="Cuerpo">

        <article id="WallpaperIzquierda">
        <h2>DosisXtra</h2>
        <p>“Tu salud, nuestra prioridad. Llevamos bienestar hasta tu puerta”</p>
        </article>


        {/* Ajuste en el Box para centrar todo el contenido */}
        <Box 
          sx={{  
            justifyContent: 'center', 
            alignItems: 'center', 
            minHeight: '80vh', 
            padding: 2
          }}
        >
          <form onSubmit={handleSubmit}>
            <Typography variant="h5" gutterBottom align="center" sx={{ fontWeight: 'bold', mb: 2, marginBottom: '50px', marginTop:'20px', fontSize: '32px', color: 'rgb(1, 33, 61)'}}>
              Ingrese sus datos
            </Typography>
            {/* Ajuste en el Grid para centrar los elementos */}
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  label="Nombres"
                  variant="outlined"
                  required
                  InputProps={{ style: { borderRadius: 50, marginBottom:'30px',  backgroundColor: 'white' } }}
                  InputLabelProps={{
                    sx: {
                      '&.Mui-focused': {
                        top: '-20px',  // Mueve la etiqueta cuando está enfocada
                        fontSize: '1.4rem', // Cambia el tamaño cuando está enfocada
                        color: 'gray'
                      }
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  label="Apellidos"
                  variant="outlined"
                  required
                  InputProps={{ style: { borderRadius: 50, marginBottom:'30px', backgroundColor: 'white' } }}
                  InputLabelProps={{
                    sx: {
                      '&.Mui-focused': {
                        top: '-20px',  // Mueve la etiqueta cuando está enfocada
                        fontSize: '1.4rem', // Cambia el tamaño cuando está enfocada
                        color: 'gray'
                      }
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  label="Correo electrónico"
                  variant="outlined"
                  required
                  type="email"
                  InputProps={{ style: { borderRadius: 50, marginBottom:'30px',  backgroundColor: 'white' } }}
                  InputLabelProps={{
                    sx: {
                      '&.Mui-focused': {
                        top: '-20px',  // Mueve la etiqueta cuando está enfocada
                        fontSize: '1.4rem', // Cambia el tamaño cuando está enfocada
                        color: 'gray'
                      }
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  label="Número de celular"
                  variant="outlined"
                  required
                  InputProps={{ style: { borderRadius: 50, marginBottom:'20px',  backgroundColor: 'white' } }}
                  InputLabelProps={{
                    sx: {
                      '&.Mui-focused': {
                        top: '-20px',  // Mueve la etiqueta cuando está enfocada
                        fontSize: '1.4rem', // Cambia el tamaño cuando está enfocada
                        color: 'gray'
                      }
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  label="Ingrese Contraseña"
                  variant="outlined"
                  required
                  type="password"
                  InputProps={{ style: { borderRadius: 50, marginBottom:'20px',  backgroundColor: 'white' } }}
                  InputLabelProps={{
                    sx: {
                      '&.Mui-focused': {
                        top: '-20px',  // Mueve la etiqueta cuando está enfocada
                        fontSize: '1.4rem', // Cambia el tamaño cuando está enfocada
                        color: 'gray'
                      }
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  label="Confirmar Contraseña"
                  variant="outlined"
                  required
                  type="password"
                  InputProps={{ style: { borderRadius: 50, marginBottom:'20px',  backgroundColor: 'white' } }}
                  InputLabelProps={{
                    sx: {
                      '&.Mui-focused': {
                        top: '-20px',  // Mueve la etiqueta cuando está enfocada
                        fontSize: '1.4rem', // Cambia el tamaño cuando está enfocada
                        color: 'gray'
                      }
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  sx={{ backgroundColor: '#567C8D', color: '#ffffff', borderRadius: 50, height: '50px', fontWeight: 'bold', fontSize: '15px'}}
                >
                  Registrarse
                </Button>
              </Grid>
            </Grid>
            <Box mt={2} className="IS">
            <p>¿Ya tienes una cuenta?</p>
            <a onClick={() => navigate('/InicioSesion')}>
              <b>Iniciar Sesión</b>
            </a>
          </Box>
          </form>
        </Box>
    </section>
    </>
  );
};


export default Registro;
