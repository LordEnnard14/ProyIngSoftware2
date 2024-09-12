import React, { useState } from 'react';
import { TextField, Grid, Button, Box, Typography, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Header2 from '../../COMPONENTES/Header_2'; // Importa el componente Header_2

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
    <div>
      <Header2 />
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: '80vh', 
          padding: 2 
        }}
      >
        <form onSubmit={handleSubmit}>
          <Typography variant="h5" gutterBottom align="center" sx={{ fontWeight: 'bold', mb: 2 }}>
            Ingrese sus datos
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                label="Nombres"
                name="nombres"
                variant="outlined"
                required
                value={formData.nombres}
                onChange={handleInputChange}
                InputProps={{ style: { borderRadius: 50 } }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                label="Apellidos"
                name="apellidos"
                variant="outlined"
                required
                value={formData.apellidos}
                onChange={handleInputChange}
                InputProps={{ style: { borderRadius: 50 } }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                label="Correo electrónico"
                name="email"
                variant="outlined"
                required
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                InputProps={{ style: { borderRadius: 50 } }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                label="Número de celular"
                name="celular"
                variant="outlined"
                required
                value={formData.celular}
                onChange={handleInputChange}
                InputProps={{ style: { borderRadius: 50 } }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                label="Ingrese Contraseña"
                name="password"
                variant="outlined"
                required
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                InputProps={{ style: { borderRadius: 50 } }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                label="Confirmar Contraseña"
                name="confirmarPassword"
                variant="outlined"
                required
                type="password"
                value={formData.confirmarPassword}
                onChange={handleInputChange}
                InputProps={{ style: { borderRadius: 50 } }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                sx={{ backgroundColor: '#567C8D', color: '#ffffff', borderRadius: 50 }}
              >
                Registrarse
              </Button>
            </Grid>
          </Grid>
          <Box mt={2} textAlign="center">
            <Link onClick={() => navigate('/InicioSesion')} sx={{ textDecoration: 'none' }}>
              ¿Ya tienes una cuenta? Inicia sesión aquí
            </Link>
          </Box>
        </form>
      </Box>
    </div>
  );
};

export default Registro;
