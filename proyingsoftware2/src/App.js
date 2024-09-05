import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Eleccion from './PAGINAS/PAG_PRINCIPAL/Eleccion';
import InicioSesion from './PAGINAS/REGISTROS/InicioSesion';
import Registro from './PAGINAS/REGISTROS/Registro';
import BusquedaMedicina from './PAGINAS/PAG_PRINCIPAL/BusquedaMedicina';
import BoticasCercanas from './PAGINAS/BOTICAS_CERCANAS/BoticasCercanas';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Eleccion />} />
        <Route path="/InicioSesion" element={<InicioSesion />} />
        <Route path="/Registro" element={<Registro />} />
        <Route path="/BusquedaMedicina" element={<BusquedaMedicina/>}/>
        <Route path="/BoticasCercanas" element={<BoticasCercanas/>}/>
      </Routes>
    </Router>
  );
}

export default App;
