import 'regenerator-runtime/runtime'; // Necesario para soporte de async/await en navegadores
import { useState, useEffect, Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/home/home.jsx';
import Contend_Manuals from './components/home-init/Contend-Manuals.jsx';
import NavMenuSE from './components/Nav/NavQuerySena/NavMenuS_E.jsx';
import ContendR_H from './components/home-init/Contend-R_H.jsx';
import ContendContacts from './components/home-init/Contend-Contacts.jsx';
import Layout from './components/Admin/layout/Layout.jsx';
import Login from "./components/Usuarios/Login.jsx";
import ForgotPassword from "./components/Usuarios/ForgotPassword.jsx";
import PrivateRoute from "./components/Usuarios/PrivateRoute.jsx"; // Ruta protegida
import NavigationBar from "./components/Usuarios/navigationBar.jsx";
import AdvancedFilterDemo from "./components/query/Init-Query.jsx";

// Carga asíncrona de componentes administrativos
const CrudUsuarios = lazy(() => import('./components/Usuarios/crudUsers.jsx'));
const CrudResponsables = lazy(() => import('./responsible/crudResponsibles.jsx'));
const CrudProcedure = lazy(() => import('./procedure/crudProcedure.jsx'));
const CrudProcesses = lazy(() => import('./process/crudProcess.jsx'));
const CrudDocumentos = lazy(() => import('./document/crudDocument.jsx'));

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Verifica si hay un token en localStorage al cargar la aplicación
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <BrowserRouter>
      <Suspense fallback={<div>Cargando...</div>}>
        <NavigationBar isAuthenticated={isAuthenticated} /> {/* Navegación basada en autenticación */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/manuals" element={<Contend_Manuals />} />
          <Route path="/mision-vision" element={<NavMenuSE />} />
          <Route path="/resena-historica" element={<ContendR_H />} />
          <Route path="/contacts" element={<ContendContacts />} />
          <Route path="/modulo-consulta" element={<AdvancedFilterDemo />} />

          {/* Agrupación de rutas administrativas bajo un Layout */}
          <Route path="/administrator" element={<Layout />}>
            <Route path="Usuarios" element={<PrivateRoute isAuthenticated={isAuthenticated}><CrudUsuarios /></PrivateRoute>} />
            <Route path="Responsables" element={<PrivateRoute isAuthenticated={isAuthenticated}><CrudResponsables /></PrivateRoute>} />
            <Route path="Procedimientos" element={<PrivateRoute isAuthenticated={isAuthenticated}><CrudProcedure /></PrivateRoute>} />
            <Route path="Procesos" element={<PrivateRoute isAuthenticated={isAuthenticated}><CrudProcesses /></PrivateRoute>} />
            <Route path="Documentos" element={<PrivateRoute isAuthenticated={isAuthenticated}><CrudDocumentos /></PrivateRoute>} />
          </Route>
        </Routes>
        {/* <Footer /> */}
      </Suspense>

      {/* Asistente Virtual siempre presente */}
      {/* <AsistenteVirtual /> */}
    </BrowserRouter>
  );
}

export default App;
