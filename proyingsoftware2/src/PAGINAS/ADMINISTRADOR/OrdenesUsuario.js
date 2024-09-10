import HeaderAdmin from '../../COMPONENTES/Header_Admin'; 
import BarraHorizontal from '../../COMPONENTES/BarraHorizontalAdmin'; 
import React from 'react';
import { Box, Typography, Grid, Paper, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Button } from '@mui/material';

const OrdenesUsuario = () => {
    return(
        <div>
            <HeaderAdmin/>
            <BarraHorizontal/>
            <Box sx={{ mt: 4, mx: 4 }}>

                {/* Sección de Detalle de Usuario Registrado */}
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center', // Centra el texto horizontalmente
                    alignItems: 'center', // Centra el texto verticalmente
                    backgroundColor: '#D6E9FE', // Fondo color celeste
                    padding: '10px 20px',
                    borderRadius: '8px',
                    mb: 4,
                    height: '50px' // Establece una altura fija si es necesario
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    Detalle de Usuario Registrado
                  </Typography>
                </Box>

                {/* Información del usuario */}
                <Paper
                  elevation={4}
                  sx={{
                    padding: 2,
                    mb: 4,
                  }}
                >
                  <Typography variant="body1">
                    <strong>ID:</strong> 12343
                  </Typography>
                  <Typography variant="body1">
                    <strong>Nombre:</strong> Juan Sánchez
                  </Typography>
                  <Typography variant="body1">
                    <strong>Correo:</strong> altavista@1234.com
                  </Typography>
                  <Typography variant="body1">
                    <strong>Fecha de Registro:</strong> 11/03/2021
                  </Typography>
                </Paper>

                {/* Tabla de Órdenes recientes */}
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        Órdenes recientes (máximo 10)
                    </Typography>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell><strong>ID</strong></TableCell>
                                    <TableCell><strong>Fecha de Orden</strong></TableCell>
                                    <TableCell><strong>Total</strong></TableCell>
                                    <TableCell><strong>Productos</strong></TableCell>
                                    <TableCell><strong>Estado</strong></TableCell>
                                    <TableCell><strong>Acciones</strong></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>1</TableCell>
                                    <TableCell>11/03/2023</TableCell>
                                    <TableCell>S/125.00</TableCell>
                                    <TableCell>13</TableCell>
                                    <TableCell>Pendiente</TableCell>
                                    <TableCell><Button variant="contained" color="primary">Ver</Button></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>1</TableCell>
                                    <TableCell>11/03/2023</TableCell>
                                    <TableCell>S/125.00</TableCell>
                                    <TableCell>1</TableCell>
                                    <TableCell>Por Enviar</TableCell>
                                    <TableCell><Button variant="contained" color="primary">Ver</Button></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>1</TableCell>
                                    <TableCell>11/03/2023</TableCell>
                                    <TableCell>S/125.00</TableCell>
                                    <TableCell>4</TableCell>
                                    <TableCell>Entregado</TableCell>
                                    <TableCell><Button variant="contained" color="primary">Ver</Button></TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>

            </Box>
        </div>
    );
};

export default OrdenesUsuario;