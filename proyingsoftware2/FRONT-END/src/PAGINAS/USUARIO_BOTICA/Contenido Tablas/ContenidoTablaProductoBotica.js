import React from "react";
import PropTypes from 'prop-types';
import { Button, TableCell, TableRow } from '@mui/material';

function AgregarFilaProductoBotica(props) {
  const { producto } = props;

  return (
    <TableRow key={producto.id}>
      <TableCell sx={{ textAlign: 'center' }}>{producto.id}</TableCell>
      <TableCell sx={{ textAlign: 'center' }}>{producto.nombre}</TableCell>
      <TableCell sx={{ textAlign: 'center' }}>S/. {parseFloat(producto.precio).toFixed(2)}</TableCell>
      <TableCell sx={{ textAlign: 'center' }}>{producto.fechaRegistro.slice(0, 10)}</TableCell>
      <TableCell sx={{ textAlign: 'center' }}>{producto.stock}</TableCell>
      <TableCell sx={{ textAlign: 'center' }}>{producto.estado}</TableCell>
      <TableCell sx={{ textAlign: 'center' }}>
        <Button size="small" sx={{ mr: 1 }} color="primary">Ver</Button>
        {producto.estado === 'Disponible' ? (
          <Button size="small" color="secondary">Desactivar</Button>
        ) : (
          <Button size="small" color="primary">Activar</Button>
        )}
      </TableCell>
    </TableRow>
  );
}

AgregarFilaProductoBotica.propTypes = {
  producto: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    nombre: PropTypes.string.isRequired,
    precio: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    fechaRegistro: PropTypes.string.isRequired,
    stock: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    estado: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired, // Permitir string o boolean
  }).isRequired,
};

export default AgregarFilaProductoBotica;
