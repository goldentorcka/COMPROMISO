// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/home/home.jsx';
import LoginFormAdmin from './users/LoginUser.jsx';
import OlvidePassword from './users/OlvidePassword.jsx';
import Contend_Manuals from './components/home-init/Contend-Manuals.jsx';
import NavMenuSE from './components/Nav/NavQuerySena/NavMenuS_E.jsx';
import ContendR_H from './components/home-init/Contend-R_H.jsx';
import CrudUsers from './users/crudUsers.jsx';
import CrudResponsables from './responsible/crudResponsibles.jsx';
import CrudProcedure from './procedure/crudProcedure.jsx';
import CrudProcesses from './process/crudProcess.jsx';
import CrudUnidades from './unit/crudUnits.jsx';
import CrudArea from './area/crudAreas.jsx';
import ContendContacts from './components/home-init/Contend-Contacts.jsx';
import Layout from './components/Admin/layout/Layout.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import AsistenteVirtual from './components/AsistenteVirtual/Asistente-virtual.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/loginFormAdmin" element={<LoginFormAdmin />} />
        <Route path="/olvidePassword" element={<OlvidePassword />} />
        <Route path="/manuales" element={<Contend_Manuals />} />
        <Route path="/se/admin" element={<NavMenuSE />} />
        <Route path="/recursos-humanos" element={<ContendR_H />} />
        <Route path="/admin/crud-users" element={<CrudUsers />} />
        <Route path="/admin/crud-responsables" element={<CrudResponsables />} />
        <Route path="/admin/crud-procedures" element={<CrudProcedure />} />
        <Route path="/admin/crud-processes" element={<CrudProcesses />} />
        <Route path="/admin/crud-unidades" element={<CrudUnidades />} />
        <Route path="/admin/crud-areas" element={<CrudArea />} />
        <Route path="/contactos" element={<ContendContacts />} />
        <Route path="/admin/layout" element={<Layout />} />
      </Routes>
      <AsistenteVirtual /> {/* Aquí integras el Asistente Virtual */}
    </BrowserRouter>
  );
}

export default App;
