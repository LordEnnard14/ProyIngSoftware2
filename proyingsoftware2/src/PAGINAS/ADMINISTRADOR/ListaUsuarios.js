import React from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';
import HeaderAdmin from '../../COMPONENTES/Header_Admin';
import BarraHorizontalAdmin from '../../COMPONENTES/BarraHorizontalAdmin';

const ListaUsuarios = () => {
  const usuarios = [
    { id: 1, nombre: 'Antonio', apellido: 'Lopez Caro', correo: 'correo@sanchez.com', fechaRegistro: '11/02/2022', estado: 'Activo' },
    { id: 12333, nombre: 'Ana', apellido: 'Sanchez', correo: 'anita123@hotmail.com', fechaRegistro: '11/02/2022', estado: 'Inactivo' },
    { id: 12344, nombre: 'Ana', apellido: 'Sanchez', correo: 'anita123@hotmail.com', fechaRegistro: '11/02/2022', estado: 'Inactivo' },
    { id: 2, nombre: 'Antonio', apellido: 'Lopez Caro', correo: 'correo@sanchez.com', fechaRegistro: '11/02/2022', estado: 'Activo' },
  ];

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header fijo */}
      <HeaderAdmin />
      
      <BarraHorizontalAdmin />

      {/* Cuerpo ajustado */}
      <Box sx={{ flexGrow: 1, mx: 4, mt: 4, overflow: 'auto' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#D6E9FE',
            padding: '10px 20px',
            borderRadius: '8px',
            mb: 4,
          }}
        >
          <Typography variant="h6">Usuarios Registrados</Typography>
        </Box>

        {/* Tabla con usuarios */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Apellido</TableCell>
                <TableCell>Correo</TableCell>
                <TableCell>Fecha de Registro</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {usuarios.map((usuario) => (
                <TableRow key={usuario.id}>
                  <TableCell>{usuario.id}</TableCell>
                  <TableCell>{usuario.nombre}</TableCell>
                  <TableCell>{usuario.apellido}</TableCell>
                  <TableCell>{usuario.correo}</TableCell>
                  <TableCell>{usuario.fechaRegistro}</TableCell>
                  <TableCell>{usuario.estado}</TableCell>
                  <TableCell>
                    <Button size="small" sx={{ mr: 1 }} color="primary">Ver</Button>
                    {usuario.estado === 'Activo' ? (
                      <Button size="small" color="secondary">Desactivar</Button>
                    ) : (
                      <Button size="small" color="primary">Activar</Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default ListaUsuarios;
