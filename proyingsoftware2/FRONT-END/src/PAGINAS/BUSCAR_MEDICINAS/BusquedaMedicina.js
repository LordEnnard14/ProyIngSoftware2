import React, { useEffect, useState } from 'react';
import { Box, Grid } from '@mui/material';
import Header1 from '../../COMPONENTES/Header_Principal';
import NavegacionMedicinas from '../../COMPONENTES/NavegacionMedicinas';
import Footer from '../../COMPONENTES/Footer_Principal';
import ContenidoPaginaBusqueda from './ContenidoBusquedaMedicina.js'; 

const BusquedaMedicina = () => {
  const [stocks, setStocks] = useState([]);

  const fetchData = async () => {
    try {
      const respuesta = await fetch('http://localhost:4000/api/productos/stockproductos'); // Cambiamos al nuevo endpoint
      const resultado = await respuesta.json();

      const baseUrl = `http://localhost:4000/api/productos/`; // La URL base para las imágenes

      // Mapea los datos obtenidos del stock de productos
      const stockConDatos = resultado.map(stock => ({
        id: stock.Producto?.id || 'Sin ID',
        name: stock.Producto?.nombre || 'Sin nombre',
        marca: stock.Producto?.Marca?.nombre || 'Sin marca',
        botica: stock.Botica?.nombre || 'Sin botica',
        direccion: stock.Botica?.direccion || 'Sin dirección',
        cantidad: stock.cantidad || 0,
        image: `${baseUrl}${stock.Producto?.imageUrl}`, // Ruta para la imagen del producto
        precio: stock.precio || 0
      }));

      setStocks(stockConDatos); 
    } catch (error) {
      console.error('Error al obtener los stockproductos:', error);
    }
  };

  useEffect(() => {
    fetchData(); 
  }, []);

  return (
    <div>
      <Header1 />
      <NavegacionMedicinas />
      <Box sx={{ flexGrow: 1, padding: 4 }}>
        {stocks.length === 0 ? (
          <Box textAlign="center" padding={4}>
            No se encontraron productos con stock.
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
            {stocks.map((stock, index) => (
              <ContenidoPaginaBusqueda
                key={index}  
                caractProducto={stock}
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
