import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom';
import FooterPrincipal from './COMPONENTES/Footer_Principal.js';
import HeaderPrincipal from './COMPONENTES/Header_Principal.js';
import Eleccion from './PAGINAS/PAG_PRINCIPAL/Eleccion.js';
import InicioBuscarMedicina from './PAGINAS/BUSCAR_MEDICINA/Inicio.js';
import { createBrowserRouter } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
const router = createBrowserRouter([
  {
    path: "/",    
    element: <Eleccion />
  },
  {
    path: "/InicioBuscarMedicina",    
    element: <InicioBuscarMedicina />
  }
])

function App() {
  return (
    <Router>
      <Eleccion />
    </Router>
  );

}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
export default App;