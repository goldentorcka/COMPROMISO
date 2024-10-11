// src/App.jsx
import 'regenerator-runtime/runtime';
import { useState, useEffect } from "react";
import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/home/home.jsx';
// import LoginFormAdmin from './users/LoginUser.jsx';
import OlvidePassword from './users/OlvidePassword.jsx';
import Contend_Manuals from './components/home-init/Contend-Manuals.jsx';
import NavMenuSE from './components/Nav/NavQuerySena/NavMenuS_E.jsx';
import ContendR_H from './components/home-init/Contend-R_H.jsx';
import ContendContacts from './components/home-init/Contend-Contacts.jsx';
import Layout from './components/Admin/layout/Layout.jsx';
// import AsistenteVirtual from './components/AsistenteVirtual/AsistenteVirtual.jsx'; // Descomentar esta línea
import Component from './components/query/Init-Query.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./components/Usuarios/Login.jsx";
import Register from "./components/Usuarios/Register.jsx";
import ForgotPassword from "./components/Usuarios/ForgotPassword.jsx";
import PrivateRoute from "./components/Usuarios/PrivateRoute.jsx"; // Importar la nueva ruta protegida
import NavigationBar from "./components/Usuarios/navigationBar.jsx";

// Carga asíncrona de componentes administrativos
const CrudUsers = lazy(() => import('./users/crudUsers.jsx'));
const CrudResponsables = lazy(() => import('./responsible/crudResponsibles.jsx'));
const CrudProcedure = lazy(() => import('./procedure/crudProcedure.jsx'));
const CrudProcesses = lazy(() => import('./process/crudProcess.jsx'));
const CrudDocumentos = lazy(() => import('./document/crudDocument.jsx'));

function App() {
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  // // const navigate = useNavigate();
  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     setIsAuthenticated(true);
  //   }
  // }, []);

  return (
    <BrowserRouter>
      <Suspense fallback={<div>Cargando...</div>}>
        {/* <NavigationBar isAuthenticated={isAuthenticated} /> */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/olvidePassword" element={<OlvidePassword />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/manuals" element={<Contend_Manuals />} />
            <Route path="/mision-vision" element={<NavMenuSE />} />
            <Route path="/resena-historica" element={<ContendR_H />} />
            <Route path="/contacts" element={<ContendContacts />} /> 
            <Route path="/modulo-consulta" element={<Component />} />
            {/* Agrupación de rutas administrativas bajo un Layout */}
            <Route path="/administrator" element={<Layout />}>
              <Route path="Register" element={<Register />} />
              <Route path="Responsables" element={<CrudResponsables />} />
              <Route path="Procedimientos" element={<CrudProcedure />} />
              <Route path="Procesos" element={<CrudProcesses />} />
              <Route path="Documentos" element={<CrudDocumentos />} />
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
