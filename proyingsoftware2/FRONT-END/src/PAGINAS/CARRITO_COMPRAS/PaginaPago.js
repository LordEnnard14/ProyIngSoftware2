import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, TextField, Button, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Grid, MenuItem, Select } from '@mui/material';
import HeaderAdmin from '../../COMPONENTES/Header_Admin';

const PaginaPago = () => {
  const [metodoEntrega, setMetodoEntrega] = useState('recojo');  // Controla el método de entrega
  const [botica, setBotica] = useState('');  // Botica seleccionada
  const [numeroTarjeta, setNumeroTarjeta] = useState('');  // Número de tarjeta
  const [errorTarjeta, setErrorTarjeta] = useState('');  // Mensaje de error para la tarjeta
  const [cvv, setCvv] = useState('');  // CVV
  const [errorCvv, setErrorCvv] = useState('');  // Mensaje de error para el CVV
  const [productos, setProductos] = useState([]);  // Productos del carrito

  useEffect(() => {
    // Leer productos del carrito desde localStorage
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setProductos(cartItems);
  }, []);

  const handleMetodoEntregaChange = (event) => {
    setMetodoEntrega(event.target.value);
  };

  const handleBoticaChange = (event) => {
    setBotica(event.target.value);
  };

  const validarNumeroTarjeta = (numero) => {
    const visaMastercardRegex = /^4[0-9]{12}(?:[0-9]{3})?$|^5[1-5][0-9]{14}$/; // Visa o Mastercard
    const amexRegex = /^3[47][0-9]{13}$/; // American Express

    if (visaMastercardRegex.test(numero) || amexRegex.test(numero)) {
      setErrorTarjeta('');
    } else {
      setErrorTarjeta('Número de tarjeta inválido. Visa/Mastercard: 16 dígitos, American Express: 15 dígitos');
    }
  };

  const handleNumeroTarjetaChange = (event) => {
    const numero = event.target.value.replace(/\D/g, '');  // Eliminar caracteres no numéricos
    setNumeroTarjeta(numero);
    validarNumeroTarjeta(numero);
  };

  const validarCvv = (numeroCvv) => {
    const visaMastercardRegex = /^4[0-9]{12}(?:[0-9]{3})?$|^5[1-5][0-9]{14}$/; // Visa o Mastercard
    const amexRegex = /^3[47][0-9]{13}$/; // American Express

    // Si la tarjeta es Visa o Mastercard, el CVV debe tener 3 dígitos
    if (visaMastercardRegex.test(numeroTarjeta)) {
      if (numeroCvv.length !== 3) {
        setErrorCvv('El CVV para Visa/Mastercard debe ser de 3 dígitos');
      } else {
        setErrorCvv('');
      }
    }
    // Si la tarjeta es American Express, el CVV debe tener 4 dígitos
    else if (amexRegex.test(numeroTarjeta)) {
      if (numeroCvv.length !== 4) {
        setErrorCvv('El CVV para American Express debe ser de 4 dígitos');
      } else {
        setErrorCvv('');
      }
    }
  };

  const handleCvvChange = (event) => {
    const cvvValue = event.target.value.replace(/\D/g, '');  // Eliminar caracteres no numéricos
    setCvv(cvvValue);
    validarCvv(cvvValue);
  };

  const calcularTotal = () => {
    return productos.reduce((total, producto) => total + producto.precio * producto.cantidad, 0).toFixed(2);
  };

  const handleFinalizarCompra = () => {
    // Validar que toda la información necesaria esté completa
    if (!metodoEntrega) {
      alert('Selecciona un método de entrega.');
      return;
    }

    if (metodoEntrega === 'recojo' && !botica) {
      alert('Selecciona una botica para el recojo.');
      return;
    }

    if (!numeroTarjeta || errorTarjeta) {
      alert('Ingrese un número de tarjeta válido.');
      return;
    }

    if (!cvv || errorCvv) {
      alert('Ingrese un CVV válido.');
      return;
    }

    // Aquí se puede manejar la lógica para finalizar la compra, como enviar datos al servidor o actualizar el estado
    alert('Compra realizada con éxito!');
    // Redirigir a una página de confirmación o finalizar el proceso
  };

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <HeaderAdmin />
      
      <Box sx={{ flexGrow: 1, mx: 4, mt: 4 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#D6E9FE',
            padding: '10px 20px',
            borderRadius: '8px',
            mb: 4,
          }}
        >
          <Typography variant="h6">Proceso de Pago</Typography>
        </Box>

        <Paper sx={{ padding: '20px', mb: 4 }}>
          <Typography variant="h6">Resumen del Pedido</Typography>
          {productos.map((producto) => (
            <Box key={producto.id} sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
              <Typography>{producto.name} (x{producto.cantidad})</Typography>
              <Typography>S/ {(producto.precio * producto.cantidad).toFixed(2)}</Typography>
            </Box>
          ))}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
            <Typography variant="h6">Total:</Typography>
            <Typography variant="h6">S/ {calcularTotal()}</Typography>
          </Box>
        </Paper>

        <Paper sx={{ padding: '20px', mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Información del Cliente</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Nombre Completo" variant="outlined" required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Correo Electrónico" variant="outlined" required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Número de Teléfono" variant="outlined" required />
            </Grid>
          </Grid>
        </Paper>

        <Paper sx={{ padding: '20px', mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Método de Entrega</Typography>
          <FormControl component="fieldset">
            <FormLabel component="legend">Selecciona el método de entrega</FormLabel>
            <RadioGroup
              aria-label="metodo-entrega"
              name="metodo-entrega"
              value={metodoEntrega}
              onChange={handleMetodoEntregaChange}
            >
              <FormControlLabel value="recojo" control={<Radio />} label="Recojo en Tienda (Gratis)" />
            </RadioGroup>
          </FormControl>

          {metodoEntrega === 'recojo' && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1">Selecciona la Botica para Recojo:</Typography>
              <Select
                fullWidth
                value={botica}
                onChange={handleBoticaChange}
                displayEmpty
                sx={{ mt: 2 }}
              >
                <MenuItem value="" disabled>
                  Selecciona una botica
                </MenuItem>
                <MenuItem value="Botica Central">Botica Central</MenuItem>
                <MenuItem value="Botica Sur">Botica Sur</MenuItem>
                <MenuItem value="Botica Norte">Botica Norte</MenuItem>
              </Select>
            </Box>
          )}
        </Paper>

        <Paper sx={{ padding: '20px', mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Método de Pago</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Número de Tarjeta"
                variant="outlined"
                required
                value={numeroTarjeta}
                onChange={handleNumeroTarjetaChange}
                error={!!errorTarjeta}
                helperText={errorTarjeta}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField fullWidth label="Fecha de Expiración" variant="outlined" placeholder="MM/YY" required />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="CVV"
                variant="outlined"
                required
                value={cvv}
                onChange={handleCvvChange}
                error={!!errorCvv}
                helperText={errorCvv}
              />
            </Grid>
          </Grid>
        </Paper>

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button
            variant="contained"
            color="primary"
            sx={{ width: '50%' }}
            onClick={handleFinalizarCompra}
            disabled={!!errorTarjeta || !!errorCvv}
          >
            Finalizar Compra
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default PaginaPago;
