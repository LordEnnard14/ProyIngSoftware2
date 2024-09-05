import React from 'react';
import { TextField, Grid, Button, Box, Typography, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Header2 from '../../COMPONENTES/Header_2'; // Importa el componente Header_2

const Registro = () => {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes manejar el envío del formulario, por ejemplo, enviando los datos al backend.
  };

  return (
    <div>
      <Header2 />
      {/* Ajuste en el Box para centrar todo el contenido */}
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
          {/* Ajuste en el Grid para centrar los elementos */}
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                label="Nombres"
                variant="outlined"
                required
                InputProps={{ style: { borderRadius: 50 } }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                label="Apellidos"
                variant="outlined"
                required
                InputProps={{ style: { borderRadius: 50 } }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                label="Correo electrónico"
                variant="outlined"
                required
                type="email"
                InputProps={{ style: { borderRadius: 50 } }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                label="Número de celular"
                variant="outlined"
                required
                InputProps={{ style: { borderRadius: 50 } }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                label="Ingrese Contraseña"
                variant="outlined"
                required
                type="password"
                InputProps={{ style: { borderRadius: 50 } }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                label="Confirmar Contraseña"
                variant="outlined"
                required
                type="password"
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
