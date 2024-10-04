import React, { useState } from 'react';
import { TextField, Grid, Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Header2 from '../../COMPONENTES/Header_2';
import './Rcss.css';
import Footer from '../../COMPONENTES/Footer_Principal';

const Registro = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    email: '',
    telefono: '',
    dni: '',
    password: '',
    confirmarPassword: ''
  });

  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Aca se verifica si las contraseñas coinciden o no
    if (formData.password !== formData.confirmarPassword) {
      setErrorMessage('Las contraseñas no coinciden');
      return;
    }

    // Se hace el llamado del endpoint para utilizar el metodo POST
    try {
      const response = await fetch('http://localhost:3100/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Usuario registrado con éxito');
        navigate('/BusquedaMedicina');
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Error al registrar el usuario');
        console.error('Error al registrar:', errorData);
      }
    } catch (error) {
      setErrorMessage('Hubo un problema con la solicitud, intente nuevamente más tarde');
      console.error('Error en la solicitud:', error);
    }
  };

  return (
    <>
      <Header2 />
      <section id="Cuerpo">
        <article id="WallpaperIzquierda">
          <h2>DosisXtra</h2>
          <p>“Tu salud, nuestra prioridad. Llevamos bienestar hasta tu puerta”</p>
        </article>

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
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  label="Nombre"
                  variant="outlined"
                  required
                  name="nombre"
                  onChange={handleInputChange}
                  value={formData.nombre}
                  InputProps={{ style: { borderRadius: 50, marginBottom:'30px', backgroundColor: 'white' } }}
                  InputLabelProps={{
                    sx: {
                      '&.Mui-focused': {
                        top: '-20px',
                        fontSize: '1.4rem',
                        color: 'gray'
                      }
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  label="Apellido Paterno"
                  variant="outlined"
                  required
                  name="apellidoPaterno"
                  onChange={handleInputChange}
                  value={formData.apellidoPaterno}
                  InputProps={{ style: { borderRadius: 50, marginBottom:'30px', backgroundColor: 'white' } }}
                  InputLabelProps={{
                    sx: {
                      '&.Mui-focused': {
                        top: '-20px',
                        fontSize: '1.4rem',
                        color: 'gray'
                      }
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  label="Apellido Materno"
                  variant="outlined"
                  required
                  name="apellidoMaterno"
                  onChange={handleInputChange}
                  value={formData.apellidoMaterno}
                  InputProps={{ style: { borderRadius: 50, marginBottom:'30px', backgroundColor: 'white' } }}
                  InputLabelProps={{
                    sx: {
                      '&.Mui-focused': {
                        top: '-20px',
                        fontSize: '1.4rem',
                        color: 'gray'
                      }
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  label="Correo Electrónico"
                  variant="outlined"
                  required
                  name="email"
                  type="email"
                  onChange={handleInputChange}
                  value={formData.email}
                  InputProps={{ style: { borderRadius: 50, marginBottom:'30px', backgroundColor: 'white' } }}
                  InputLabelProps={{
                    sx: {
                      '&.Mui-focused': {
                        top: '-20px',
                        fontSize: '1.4rem',
                        color: 'gray'
                      }
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  label="Teléfono"
                  variant="outlined"
                  required
                  name="telefono"
                  onChange={handleInputChange}
                  value={formData.telefono}
                  InputProps={{ style: { borderRadius: 50, marginBottom:'20px', backgroundColor: 'white' } }}
                  InputLabelProps={{
                    sx: {
                      '&.Mui-focused': {
                        top: '-20px',
                        fontSize: '1.4rem',
                        color: 'gray'
                      }
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  label="DNI"
                  variant="outlined"
                  required
                  name="dni"
                  onChange={handleInputChange}
                  value={formData.dni}
                  InputProps={{ style: { borderRadius: 50, marginBottom:'20px', backgroundColor: 'white' } }}
                  InputLabelProps={{
                    sx: {
                      '&.Mui-focused': {
                        top: '-20px',
                        fontSize: '1.4rem',
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
                  name="password"
                  type="password"
                  onChange={handleInputChange}
                  value={formData.password}
                  InputProps={{ style: { borderRadius: 50, marginBottom:'20px', backgroundColor: 'white' } }}
                  InputLabelProps={{
                    sx: {
                      '&.Mui-focused': {
                        top: '-20px',
                        fontSize: '1.4rem',
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
                  name="confirmarPassword"
                  type="password"
                  onChange={handleInputChange}
                  value={formData.confirmarPassword}
                  InputProps={{ style: { borderRadius: 50, marginBottom:'20px', backgroundColor: 'white' } }}
                  InputLabelProps={{
                    sx: {
                      '&.Mui-focused': {
                        top: '-20px',
                        fontSize: '1.4rem',
                        color: 'gray'
                      }
                    }
                  }}
                />
              </Grid>
            </Grid>

            {/* Mostrar mensaje de error */}
            {errorMessage && (
              <Typography color="error" align="center" sx={{ mt: 2 }}>
                {errorMessage}
              </Typography>
            )}

            {/* Box para centrar el botón en la parte inferior */}
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
              <Button
                type="submit"
                variant="contained"
                sx={{ backgroundColor: '#567C8D', color: '#ffffff', borderRadius: 50, height: '50px', width: '200px', fontWeight: 'bold', fontSize: '16px' }}
              >
                Crear cuenta
              </Button>
            </Box>
          </form>
        </Box>
      </section>
      <Footer />
    </>
  );
};

export default Registro;
