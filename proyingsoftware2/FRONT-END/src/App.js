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
import CarritoCompras from './PAGINAS/CARRITO_COMPRAS/CarritoCompras';
import PaginaPago from './PAGINAS/CARRITO_COMPRAS/PaginaPago';
//Vistas de administrador
import Dashboard from './PAGINAS/ADMINISTRADOR/Dashboard';
import Footer from './COMPONENTES/Footer_Principal'; 
import OrdenesUsuario from './PAGINAS/ADMINISTRADOR/OrdenesUsuario'
import AgregarProducto from './PAGINAS/ADMINISTRADOR/AgregarProductos'
import ListaUsuarios from './PAGINAS/ADMINISTRADOR/ListaUsuarios'
import ListaProductos from './PAGINAS/ADMINISTRADOR/ListaProductos'


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
            <Route path="/Dashboard" element={<Dashboard/>} />
            <Route path="/OrdenesUsuario" element={<OrdenesUsuario/>} />
            <Route path="/AgregarProducto" element={<AgregarProducto/>} />
            <Route path="/ListaUsuarios" element={<ListaUsuarios/>} />
            <Route path="/ListaProductos" element={<ListaProductos/>} />
            <Route path="/CarritoCompras" element={<CarritoCompras/>} />
            <Route path='/PaginaPago' element={<PaginaPago/>}/>
          </Routes>
        </Box>
       
      </Box>
    </Router>
  );
}

export default App;
