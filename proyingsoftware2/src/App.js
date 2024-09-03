import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FooterPrincipal from './COMPONENTES/Footer_Principal.js';
import HeaderPrincipal from './COMPONENTES/Header_Principal.js';
import Eleccion from './PAGINAS/PAG_PRINCIPAL/Eleccion.js';
import InicioBuscarMedicina from './PAGINAS/BUSCAR_MEDICINA/Inicio.js'

function App() {
  return (
    <Router>
      <HeaderPrincipal />
      
      <Routes>
       
      </Routes>
      <FooterPrincipal />
    </Router>
  );
}

export default App;