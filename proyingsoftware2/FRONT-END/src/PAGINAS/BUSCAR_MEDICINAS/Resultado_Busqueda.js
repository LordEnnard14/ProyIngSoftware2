import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Grid, Button } from '@mui/material';
import Header1 from '../../COMPONENTES/Header_Principal';
import NavegacionMedicinas from '../../COMPONENTES/NavegacionMedicinas';
import Footer from '../../COMPONENTES/Footer_Principal';
import ContenidoPaginaBusqueda from './ContenidoBusquedaMedicina.js'; 

const ResultadoBusqueda = () => {
  const location = useLocation();
  const { query } = location.state || { query: '' }; // Obtenemos el término de búsqueda
  const [filteredStocks, setFilteredStocks] = useState([]); // Stocks filtrados
  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const productsPerPage = 8; // Número de productos por página
  const [isSearchEmpty, setIsSearchEmpty] = useState(false); // Para manejar si la búsqueda está vacía
  const [totalPages, setTotalPages] = useState(1); // Total de páginas
  const [searchError, setSearchError] = useState(''); // Para manejar errores de búsqueda

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const endpoint = query
          ? `http://localhost:4000/api/productos/searchStockProductos?query=${query}`
          : `http://localhost:4000/api/productos/stockProductosAll`; // Todos los productos si no hay búsqueda

        const response = await fetch(endpoint);

        if (!response.ok) {
          const errorResponse = await response.json(); // Obtener mensaje de error del backend
          throw new Error(errorResponse.message || 'Error al obtener los datos del servidor'); // Lanzar el error con mensaje
        }

        const data = await response.json();
        console.log("Datos obtenidos:", data); // Para depurar

        const stockConDatos = data.map(stock => ({
          id: stock?.id || 'Sin ID',
          name: stock.Producto?.nombre || 'Sin nombre',
          marca: stock.Producto?.Marca?.nombre || 'Sin marca',
          botica: stock.Producto?.Botica?.nombre || 'Sin botica',
          direccion: stock.Botica?.direccion || 'Sin dirección',
          cantidad: stock.cantidad || 0,
          image: `http://localhost:4000/api/productos/${stock.Producto?.imageUrl}`,
          precio: stock.precio || 0,
        }));

        setFilteredStocks(stockConDatos);
        setTotalPages(Math.ceil(stockConDatos.length / productsPerPage));

        // Actualizar isSearchEmpty según el resultado
        if (query && stockConDatos.length === 0) {
          setIsSearchEmpty(true);
          setSearchError(`No se encontraron productos con '${query}'.`);
        } else {
          setIsSearchEmpty(false);
          setSearchError(''); // Resetear el error si hay resultados
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setSearchError(error.message); // Usar el mensaje de error real
        setFilteredStocks([]);
      }
    };

    fetchProductos();
  }, [query]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredStocks.slice(indexOfFirstProduct, indexOfLastProduct);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPaginationButtons = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <Button
          key={i}
          variant="contained"
          onClick={() => handlePageClick(i)}
          style={{ margin: '0 5px', backgroundColor: '#567C8D' }}
          disabled={currentPage === i}
        >
          {i}
        </Button>
      );
    }
    return pageNumbers;
  };

  return (
    <div>
      <Header1 />
      <NavegacionMedicinas />
      <Box sx={{ flexGrow: 1, padding: 4 }}>
        {searchError ? (
          <Box textAlign="center" padding={4}>
            {searchError} {/* Mensaje de error del servidor */}
          </Box>
        ) : isSearchEmpty ? (
          <Box textAlign="center" padding={4}>
            {query
              ? `No se encontraron productos con '${query}'.` // Mensaje específico
              : "No se encontraron productos disponibles."}
          </Box>
        ) : (
          <>
            <Grid
              container
              spacing={3}
              justifyContent="flex-start"
              alignItems="flex-start"
              paddingRight={'10%'}
              paddingLeft={'10%'}
            >
              {currentProducts.map((stock) => (
                <ContenidoPaginaBusqueda
                  key={stock.id}
                  caractProducto={stock}
                  style={{ marginLeft: '10px', backgroundColor: '#567C8D' }}
                />
              ))}
            </Grid>

            <Box textAlign="center" marginTop={4}>
              <Button
                variant="contained"
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                style={{ marginLeft: '10px', backgroundColor: '#567C8D' }}
              >
                Anterior
              </Button>
              {renderPaginationButtons()}
              <Button
                variant="contained"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                style={{ marginLeft: '10px', backgroundColor: '#567C8D' }}
              >
                Siguiente
              </Button>
            </Box>
          </>
        )}
      </Box>
      <Footer />
    </div>
  );
};

export default ResultadoBusqueda;
