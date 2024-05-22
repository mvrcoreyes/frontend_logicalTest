import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./components/LoginPage/index.jsx";
import ArticulosPage from "./components/Articulos/index.jsx";
import FacturacionPage from "./components/Facturacion/index.jsx";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/articulos" element={<ArticulosPage />} />
        <Route path="/facturacion" element={<FacturacionPage />} />
        {/* Opcional: agregar una ruta predeterminada para la raíz */}
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </Router>
  );
};

export default App;
