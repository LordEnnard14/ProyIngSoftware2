import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './PerfilUserCss.css';
import Header1 from '../../COMPONENTES/Header_Principal';

const PerfilUsuario = () => {
  const { id } = useParams();
  const [usuario, setUsuario] = useState(null);
  const [nuevaDireccion, setNuevaDireccion] = useState('');
  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');

  // Cargar datos del usuario al montar el componente
  useEffect(() => {
    console.log("ID del usuario:", id); // Verifica si el id es correcto
    const fetchUsuario = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/usuarios/${id}`);
        if (!response.ok) throw new Error('Usuario no encontrado');
        const data = await response.json();
        setUsuario(data);
      } catch (error) {
        console.error(error);
        setError('Error al cargar datos del usuario');
      }
    };
  
    fetchUsuario();
  }, [id]);

  // Función para manejar la adición de una nueva dirección
  const agregarDireccion = async () => {
    const direccion = nuevaDireccion.trim();
    if (!direccion) {
        setError('Por favor ingresa una dirección');
        return;
    }

    try {
        const response = await fetch(`http://localhost:4000/api/usuarios/${id}/direcciones`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nuevaDireccion: direccion }),
        });

        if (!response.ok) {
            const errorData = await response.text();
            console.error('Error en la respuesta:', errorData);
            setError('Error al agregar dirección');
            return;
        }

        const data = await response.json();
        setUsuario((prevUsuario) => ({
            ...prevUsuario,
            direcciones: data.direcciones,
        }));

        setMensaje('Dirección añadida correctamente');
        setNuevaDireccion('');
        setError('');
    } catch (error) {
        console.error('Error en la solicitud:', error);
        setError('Error al agregar la dirección');
    }
};

  return (
    <>
    <Header1/>
    <div className='ContenedorUser'>
      {usuario ? (
        <div>
          <h1>
            {usuario.nombre} {usuario.apellidoPaterno} {usuario.apellidoMaterno}
          </h1>
          <p>Correo: {usuario.correo}</p>
          <p>Teléfono: {usuario.telefono}</p>
          <p>DNI: {usuario.dni}</p>
          <p>Te uniste el: {usuario.fechaRegistro}</p>

          <h3>Direcciones</h3>
          {usuario.direcciones && usuario.direcciones.length > 0 ? (
            usuario.direcciones.map((direccion, index) => (
              <div key={index} className="direccion-item">
                <p>{direccion}</p>
              </div>
            ))
          ) : (
            <p>No hay direcciones registradas.</p>
          )}

          <div className="agregar-direccion">
            <input
              type="text"
              value={nuevaDireccion}
              onChange={(e) => setNuevaDireccion(e.target.value)}
              placeholder="Ingresa una nueva dirección"
            />
            <button onClick={agregarDireccion}>Agregar Dirección</button>
          </div>

          {error && <p className="error">{error}</p>}
          {mensaje && <p className="mensaje">{mensaje}</p>}
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
    </>
  );
};


export default PerfilUsuario;
