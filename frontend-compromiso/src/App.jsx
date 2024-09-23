// src/App.jsx
import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/home/home.jsx';
import LoginFormAdmin from './users/LoginUser.jsx';
import OlvidePassword from './users/OlvidePassword.jsx';
import Contend_Manuals from './components/home-init/Contend-Manuals.jsx';
import NavMenuSE from './components/Nav/NavQuerySena/NavMenuS_E.jsx';
import ContendR_H from './components/home-init/Contend-R_H.jsx';
import ContendContacts from './components/home-init/Contend-Contacts.jsx';
import Layout from './components/Admin/layout/Layout.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
// import AsistenteVirtual from './components/AsistenteVirtual/Asistente-virtual.jsx';

// Carga asíncrona de componentes administrativos
const CrudUsers = lazy(() => import('./users/crudUsers.jsx'));
const CrudResponsables = lazy(() => import('./responsible/crudResponsibles.jsx'));
const CrudProcedure = lazy(() => import('./procedure/crudProcedure.jsx'));
const CrudProcesses = lazy(() => import('./process/crudProcess.jsx'));


function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Cargando...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login-admin" element={<LoginFormAdmin />} />
          <Route path="/olvidePassword" element={<OlvidePassword />} />
          <Route path="/manuals" element={<Contend_Manuals />} />
          <Route path="/mision-vision" element={<NavMenuSE />} />
          <Route path="/resena-historica" element={<ContendR_H />} />
          <Route path="/contacts" element={<ContendContacts />} />

          {/* Agrupación de rutas administrativas bajo un Layout */}
          <Route path="/administrator" element={<Layout />}>
            <Route path="Usuarios" element={<CrudUsers />} />
            <Route path="Responsables" element={<CrudResponsables />} />
            <Route path="Procedimientos" element={<CrudProcedure />} />
            <Route path="Procesos" element={<CrudProcesses />} />
          </Route>
        </Routes>
      </Suspense>

      {/* Asistente Virtual */}
      {/* <AsistenteVirtual /> */}
    </BrowserRouter>
  );
}

export default App;
