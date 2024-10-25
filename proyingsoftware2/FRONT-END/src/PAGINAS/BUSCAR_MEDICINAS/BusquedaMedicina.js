import React, { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Box, Grid } from '@mui/material';
import Header1 from '../../COMPONENTES/Header_Principal';
import NavegacionMedicinas from '../../COMPONENTES/NavegacionMedicinas';
import Footer from '../../COMPONENTES/Footer_Principal';
import ContenidoPaginaBusqueda from './ContenidoBusquedaMedicina.js'; 

const BusquedaMedicina = () => {
  const [catalogo, setCatalogo] = useState([]);

  const [searchParams] = useSearchParams();
  const categoria = useMemo(() => searchParams.get('categoria'), [searchParams]);

  const fetchData = async () => {
    try {
      const respuesta = await fetch(`http://localhost:4000/api/productoDetalle/ProductosAll`); 
      const resultado = await respuesta.json();
      console.log(resultado);
  
      const baseUrl = `http://localhost:4000/api/productoDetalle/`; 
  
      const catalogo = resultado.ProductosDetalles.map(dato => ({
        id: dato.id || 'Sin ID',
        name: dato.Producto?.nombre || 'Sin nombre',
        marca: dato.Producto?.Marca?.nombre || 'Sin marca',
        botica: dato.Botica?.nombre || 'Sin botica',
        direccion: dato.Botica?.direccion || 'Sin dirección',
        cantidad: dato.cantidad || 0,        
        image: `${baseUrl}${dato.imageUrl || ''}`,
        precio: dato.precio || 0
      }));
  
      setCatalogo(catalogo); 
    } catch (error) {
      console.error('Error al obtener los productos:', error);
    }
  };

  
  useEffect(() => {
    fetchData();
  }, [categoria]); 

  return (
    <div>
      <Header1 />
      <NavegacionMedicinas />
      <Box sx={{ flexGrow: 1, padding: 4 }}>
        {catalogo.length === 0 ? (
          <Box textAlign="center" padding={4}>
            Servidor caído, intenta mas tarde.
          </Box>
        ) : (
          <Grid
            container
            spacing={3}
            justifyContent="flex-start"
            alignItems="flex-start"
            paddingRight={'10%'}
            paddingLeft={'10%'}
          >
            {catalogo.map((catalogo, index) => (
              <ContenidoPaginaBusqueda
                key={index}  
                caractProducto={catalogo}
              />
            ))}
          </Grid>
        )}
      </Box>
      <Footer />
    </div>
  );
};

export default BusquedaMedicina;
