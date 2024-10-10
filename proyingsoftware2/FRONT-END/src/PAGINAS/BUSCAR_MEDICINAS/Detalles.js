import React, { useState, useEffect } from 'react';
import { Container, Grid, Box, Typography, Button, Link } from '@mui/material';
import Header1 from '../../COMPONENTES/Header_Principal';
import CantidadProducto from '../BUSCAR_MEDICINAS/DETALLES/Cantidad.js';
import { useNavigate, useParams } from 'react-router-dom';

const DetalleProducto = () => {
  const { id } = useParams(); // Obtenemos el ID del producto desde la URL
  const navigate = useNavigate();
  const [stockProducto, setStockProducto] = useState(null); // Estado para el stock del producto
  const [cantidad, setCantidad] = useState(1); // Estado para la cantidad de producto
  const carritoID = 1;  // ID del carrito, asumiendo que ya existe uno (puedes cambiarlo dinámicamente)

  // Usamos useEffect para obtener los datos del producto
  useEffect(() => {
    async function fetchStockProducto() {
      try {
        const response = await fetch(`http://localhost:4000/api/productos/stockProductos/${id}`); // Cambia la URL al nuevo endpoint
        if (!response.ok) {
          throw new Error('Error al obtener los datos del stockProducto');
        }
        const producto = await response.json();
        setStockProducto(producto);  // Actualizamos el estado con los datos del producto
      } catch (error) {
        console.error('Error:', error);
      }
    }
    fetchStockProducto();  // Llamamos a la función cuando el componente se monta
  }, [id]);

  // Función para agregar el producto al carrito
  const handleAddToCart = async () => {
    if (stockProducto) {
        try {
            // Obtener el ID del usuario desde el LocalStorage
            const usuario = JSON.parse(localStorage.getItem('user'));
            const usuarioID = usuario?.id;

            if (!usuarioID) {
                alert('No se encontró información del usuario. Por favor, inicia sesión.');
                return; // Si no hay un usuarioID, detiene la ejecución
            }

            // Intentar crear un carrito si no existe
            const responseCarrito = await fetch(`http://localhost:4000/api/carrito/crearCarritoSiNoExiste/${usuarioID}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const dataCarrito = await responseCarrito.json();

            if (!responseCarrito.ok) {
                alert('Error al verificar o crear el carrito.');
                return; // Detener si no se pudo crear o verificar el carrito
            }

            const carritoID = dataCarrito.carrito.id; // Obtener el ID del carrito desde la respuesta

            // Verificar los datos antes de enviarlos al backend
            console.log('Enviando datos al carrito:', {
                productoID: stockProducto.Producto.id,
                usuarioID: usuarioID,
                carritoID: carritoID,
                cantidad: cantidad,
            });

            // Llamamos al endpoint para agregar el producto al carrito
            const response = await fetch('http://localhost:4000/api/carrito/agregarProductoCarrito', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    productoID: stockProducto.Producto.id,
                    carritoID: carritoID,
                    cantidad: cantidad,
                }),
            });

            if (response.ok) {
                // alert('Producto agregado al carrito correctamente');
                const event = new Event('cartUpdated');
                window.dispatchEvent(event);
            } else {
                const errorData = await response.json();
                alert('Error al agregar el producto al carrito: ' + errorData.mensaje);
            }
        } catch (error) {
            console.error('Error al agregar el producto al carrito:', error);
            alert('Error al agregar el producto al carrito. Intente nuevamente.');
        }
    }
};

 
  const aumentarCantidad = () => {
    if (cantidad < stockProducto.cantidad) {
      setCantidad(cantidad + 1);
    }
  };

  const disminuirCantidad = () => {
    if (cantidad > 1) {
      setCantidad(cantidad - 1);
    }
  };

  if (!stockProducto) {
    return <div>No se encontró el Producto que está buscando.</div>; // Mostramos mensaje si no hay producto
  }

  // Construimos la URL de la imagen usando el ID del producto
  const imagenUrl = `http://localhost:4000/api/productos/${stockProducto.Producto.imageUrl}`;

  return (
    <>
      <Header1 />
      <Container maxWidth="md">
        <Box my={4}>
          <Typography variant="h4">{stockProducto.Producto.nombre}</Typography>
          {/* Aquí se muestra la marca */}
          <Typography variant="body1" color="textSecondary">
            Marca: {stockProducto.Producto.Marca.nombre}
          </Typography>
          {/* Aquí se muestra la tienda */}
          <Typography variant="body1" color="textSecondary">
            Vendido por: {stockProducto.Producto.Botica.nombre}
          </Typography>
        </Box>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box
              width="100%"
              height={300}
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{
                borderRadius: 5,
                overflow: 'hidden',
                backgroundColor: '#f0f0f0',
              }}
            >
              <img
                src={imagenUrl} // Usamos la URL construida
                alt={stockProducto.Producto.nombre}
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  objectFit: 'contain',
                  display: 'block',
                }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/path/to/default-image.png'; // Ruta de la imagen por defecto
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <Box border={1} borderColor="black" borderRadius={8} p={2} textAlign="center">
                <Box borderBottom={1} borderColor="black" pb={1} mb={1}>
                  <Typography variant="h6">DISPONIBLE</Typography>
                </Box>
                <Typography variant="h4" color="black" fontWeight="bold">
                  S/. {stockProducto.precio?.toFixed(2)}
                </Typography>
                <Button
                  variant="contained"
                  style={{ marginTop: 8, backgroundColor: '#4a6a7d', color: '#ffffff' }}
                  onClick={handleAddToCart}
                >
                  AÑADIR AL CARRITO
                </Button>
                <Box mt={2} />
                <CantidadProducto cantidad={cantidad} aumentar={aumentarCantidad} disminuir={disminuirCantidad} />
                <Typography variant="body2" mt={2}>
                  <Link href="#" color="inherit">
                    Ver métodos de envío disponibles
                  </Link>
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Box mt={4}>
          <Typography variant="h6">Descripción</Typography>
          <Typography variant="body1" paragraph>
            {stockProducto.Producto.descripcion}
          </Typography>
        </Box>

        <Box mt={4} mb={4} bgcolor="grey.300" p={2} borderRadius={3}>
          <Typography variant="h6">Características del Producto:</Typography>
          {stockProducto?.Producto?.caracteristicas?.length > 0 ? (
            <ul>
              {stockProducto.Producto.caracteristicas.map((caracteristica, index) => (
                <li key={index}>
                  <Typography variant="body1">{caracteristica}</Typography>
                </li>
              ))}
            </ul>
          ) : (
            <Typography variant="body1">No hay características disponibles.</Typography>
          )}
        </Box>
      </Container>
    </>
  );
};

export default DetalleProducto;
