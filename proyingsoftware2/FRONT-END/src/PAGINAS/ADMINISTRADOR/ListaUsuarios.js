import React from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';
import HeaderAdmin from '../../COMPONENTES/Header_Admin';
import BarraHorizontalAdmin from '../../COMPONENTES/BarraHorizontalAdmin';
import ContenidoListaUsuariosAdmin from './ContenidoTablas/ContenidoListaUsuariosAdmin';

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
               <ContenidoListaUsuariosAdmin key={usuario.id} usuario={usuario}/> 
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default ListaUsuarios;
