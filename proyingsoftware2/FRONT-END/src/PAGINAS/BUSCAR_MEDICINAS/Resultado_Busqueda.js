import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Grid, Typography, Paper } from '@mui/material';
import Header1 from '../../COMPONENTES/Header_Principal';
import NavegacionMedicinas from '../../COMPONENTES/NavegacionMedicinas';
import Footer from '../../COMPONENTES/Footer_Principal';
import ContenidoPaginaBusqueda from './ContenidoBusquedaMedicina.js'; 

const ResultadoBusqueda = () => {
  const location = useLocation();
  const { query } = location.state || { query: '' }; // Obtenemos el término de búsqueda
  const [filteredStocks, setFilteredStocks] = useState([]); // Stocks filtrados

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        // Cambié la URL para que apunte correctamente a /searchStockProductos
        const response = await fetch(`http://localhost:4000/api/productos/searchStockProductos?query=${query}`);

        if (!response.ok) {
          throw new Error('Error al obtener los datos del servidor');
        }
        const data = await response.json();

        // Asegúrate de que el API retorne los campos correctos
        console.log("Datos obtenidos:", data); // Para depurar

        // Mapea los datos obtenidos del stock de productos
        const stockConDatos = data.map(stock => ({
          id: stock?.id || 'Sin ID',
          name: stock.Producto?.nombre || 'Sin nombre',
          marca: stock.Producto?.Marca?.nombre || 'Sin marca',
          botica: stock.Botica?.nombre || 'Sin botica',
          direccion: stock.Botica?.direccion || 'Sin dirección',
          cantidad: stock.cantidad || 0,
          image: `http://localhost:4000/api/productos/${stock.Producto?.imageUrl}`, // Ruta para la imagen del producto
          precio: stock.precio || 0,
        }));

        setFilteredStocks(stockConDatos); 
      } catch (error) {
        console.error('Error fetching data:', error);
        setFilteredStocks([]);
      }
    };

    if (query) {
      fetchProductos();
    }
  }, [query]);

  return (
    <div>
      <Header1 />
      <NavegacionMedicinas />
      <Box sx={{ flexGrow: 1, padding: 4 }}>
        {filteredStocks.length === 0 ? (
          <Box textAlign="center" padding={4}>
            No se encontraron productos con stock para "{query}".
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
            {filteredStocks.map((stock) => (
              <ContenidoPaginaBusqueda
                key={stock.id}
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

export default ResultadoBusqueda;
