import React from 'react';
import { Container, Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import Header1 from "../../COMPONENTES/Header_Principal";

const MisOrdenes = () => {
  const ordenesEjemplo = [
    { id: 1, nombre: 'John Doe', cantidad: 2, total: '120.50', estado: 'Completada' },
    { id: 2, nombre: 'Jane Smith', cantidad: 1, total: '75.00', estado: 'Pendiente' },
    { id: 3, nombre: 'Mike Johnson', cantidad: 5, total: '200.00', estado: 'Cancelada' },
  ];

  return (
    <>
      <Header1 /> 
      <Container maxWidth="md" sx={{ mt: 5, mb: 5 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', color: '#2F4156' }}>
            Mis Ordenes
          </Typography>
        </Box>

        <TableContainer component={Paper} elevation={3}>
          <Table>
            <TableHead sx={{ backgroundColor: '#567C8D' }}>
              <TableRow>
                <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>ID de la Orden</TableCell>
                <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Nombre</TableCell>
                <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Cantidad</TableCell>
                <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Total</TableCell>
                <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Estado</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ordenesEjemplo.map((orden) => (
                <TableRow key={orden.id}>
                  <TableCell>{orden.id}</TableCell>
                  <TableCell>{orden.nombre}</TableCell>
                  <TableCell>{orden.cantidad}</TableCell>
                  <TableCell>{orden.total}</TableCell>
                  <TableCell>{orden.estado}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
};

export default MisOrdenes;
