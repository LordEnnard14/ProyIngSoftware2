import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Box } from '@mui/material'; // Asegúrate de importar Box desde MUI
import Eleccion from './PAGINAS/PAG_PRINCIPAL/Eleccion';
import InicioSesion from './PAGINAS/REGISTROS/InicioSesion';
import Registro from './PAGINAS/REGISTROS/Registro';
import BusquedaMedicina from './PAGINAS/BUSCAR_MEDICINAS/BusquedaMedicina';
import BoticasCercanas from './PAGINAS/BOTICAS_CERCANAS/BoticasCercanas';
import DetallesProductos from './PAGINAS/BUSCAR_MEDICINAS/Detalles';
import ResultadoBusqueda from './PAGINAS/BUSCAR_MEDICINAS/Resultado_Busqueda';
import Footer from './COMPONENTES/Footer_Principal'; // Importa tu Footer

function App() {
  return (
    <Router>
      <Box
        sx={{
          minHeight: '100vh', 
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box sx={{ flex: 1 }}> 
          <Routes>
            <Route path="/" element={<Eleccion />} />
            <Route path="/InicioSesion" element={<InicioSesion />} />
            <Route path="/Registro" element={<Registro />} />
            <Route path="/BusquedaMedicina" element={<BusquedaMedicina />} />
            <Route path="/BoticasCercanas" element={<BoticasCercanas />} />
            <Route path="/detalles/:id" element={<DetallesProductos />} />
            <Route path="/ResultadoBusqueda" element={<ResultadoBusqueda />} />
            
          </Routes>
        </Box>
        <Footer /> 
      </Box>
    </Router>
  );
}

export default App;
