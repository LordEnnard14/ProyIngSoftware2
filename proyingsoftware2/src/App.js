import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Eleccion from './PAGINAS/PAG_PRINCIPAL/Eleccion';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Eleccion />} />
      </Routes>
    </Router>
  );
}

export default App;
