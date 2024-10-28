import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';
import Header_Botica from '../../COMPONENTES/Header_Botica';
import BarraHorizontalBotica from '../../COMPONENTES/BarraHorizontalBotica';
import { useNavigate } from 'react-router-dom';
import ContenidoTablaProductoBotica from '../USUARIO_BOTICA/Contenido Tablas/ContenidoTablaProductoBotica';

const ListaProductosBotica = () => {
  const [productos, setProductos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductos = async () => {
      const user = JSON.parse(localStorage.getItem('user')); // Obtener el ID de la botica
      const boticaID = user?.id; // Asignar el id de la botica

      if (boticaID) {
        try {
          const respuesta = await fetch(`http://localhost:4000/api/admin/boticaProductos/${boticaID}`);
          const resultado = await respuesta.json();

          const productosBotica = resultado.map(producto => ({
            id: producto?.id || 'Sin ID',
            marca: producto?.Producto?.Marca?.nombre || 'Sin marca',
            nombre: producto?.Producto?.nombre || 'Sin nombre',
            precio: producto?.precio || 'Sin precio',
            fechaRegistro: producto?.fechaRegistro || 'Fecha no disponible', // Ajuste del campo si está disponible
            stock: producto?.cantidad || 'Sin stock',
            estado: producto?.estado ? 'Disponible' : 'No disponible', // Mostrar 'Disponible' si es true, 'No disponible' si es false
          }));

          setProductos(productosBotica);
        } catch (error) {
          console.error("Error al obtener los productos:", error);
        }
      } else {
        console.error("No se encontró el ID de la botica en el localStorage");
      }
    };

    fetchProductos();
  }, []);

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header_Botica />
      <BarraHorizontalBotica />

      {/* Contenido principal con flexGrow para ocupar el resto del espacio disponible */}
      <Box sx={{ flexGrow: 1, mx: 4, mt: 4 }}>
        {/* Caja de "Productos" similar a la de "Usuarios Registrados" */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#D6E9FE', // Azul claro
            padding: '10px 20px',
            borderRadius: '8px',
            mb: 4,
          }}
        >
          <Typography variant="h6">Productos</Typography>
          <Button onClick={() => navigate('/AgregarProducto')}> Agregar Producto </Button>
        </Box>

        {/* Tabla de productos */}
        <TableContainer component={Paper} sx={{ height: '100%' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ textAlign: 'center' }}>ID</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>Marca</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>Nombre</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>Precio</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>Fecha Registro</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>Stock</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>Estado</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productos.map((producto) => (
                <ContenidoTablaProductoBotica key={producto.id} producto={producto} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default ListaProductosBotica;
