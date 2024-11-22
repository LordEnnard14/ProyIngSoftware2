import React from "react";
import PropTypes from "prop-types";
import { Button, TableCell, TableRow } from "@mui/material";

function ContenidoTablaUsuario({ usuario, onEstadoChange }) {
    const handleEstadoToggle = () => {
        const nuevoEstado = usuario.estado === "Disponible" ? "No Disponible" : "Disponible";
        onEstadoChange(usuario.id, nuevoEstado);
    };

    return (
        <TableRow key={usuario.id}>
            <TableCell sx={{ textAlign: "center" }}>{usuario.id}</TableCell>
            <TableCell sx={{ textAlign: "center" }}>{usuario.nombre}</TableCell>
            <TableCell sx={{ textAlign: "center" }}>{usuario.apellidoPaterno}</TableCell>
            <TableCell sx={{ textAlign: "center" }}>{usuario.apellidoMaterno}</TableCell>
            <TableCell sx={{ textAlign: "center" }}>{usuario.fechaRegistro.slice(0, 10)}</TableCell>
            <TableCell sx={{ textAlign: "center" }}>{usuario.correo}</TableCell>
            <TableCell sx={{ textAlign: "center" }}>{usuario.telefono}</TableCell>
            <TableCell sx={{ textAlign: "center" }}>{usuario.dni}</TableCell>
            <TableCell sx={{ textAlign: "center" }}>{usuario.estado}</TableCell>
            <TableCell sx={{ textAlign: "center" }}>
                <Button size="small" color="secondary" onClick={handleEstadoToggle}>
                    <strong>{usuario.estado === "Disponible" ? "Desactivar" : "Activar"}</strong>
                </Button>
            </TableCell>
        </TableRow>
    );
}

ContenidoTablaUsuario.propTypes = {
    usuario: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        nombre: PropTypes.string.isRequired,
        apellidoPaterno: PropTypes.string.isRequired,
        apellidoMaterno: PropTypes.string.isRequired,
        fechaRegistro: PropTypes.string.isRequired,
        correo: PropTypes.string.isRequired,
        telefono: PropTypes.string.isRequired,
        dni: PropTypes.string.isRequired,
        estado: PropTypes.string.isRequired,
    }).isRequired,
    onEstadoChange: PropTypes.func.isRequired,
};

export default ContenidoTablaUsuario;
