import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from "./context/authProvider.jsx";
import AuthLayout from "./layout/authLayout.jsx";
import RutaProtegida from "./layout/RutaProtegida.jsx";
import Home from "./components/home/home.jsx";
import CrudUsers from "./users/crudUsers.jsx";
import LoginFormAdmin from "./users/LoginUser.jsx";
import OlvidePassword from "./users/OlvidePassword.jsx";
import formUsers from "./users/formUsers.jsx";
import Contend_Manuals from "./components/home-init/Contend-Manuals.jsx";
import ContendContacts from "./components/home-init/Contend-Contacts.jsx";
import NavMenuSE from "./components/Nav/NavQuerySena/NavMenuS_E.jsx";
import ContendR_H from "./components/home-init/Contend-R_H.jsx";
import Init_Admin from "./components/Admin/init-Admin.jsx";
import CrudResponsables from "./responsible/crudResponsibles.jsx";
import CrudProcesses from "./process/crudProcess.jsx";
import CrudProcedure from "./procedure/crudProcedure.jsx";
import CrudAreas from './area/CrudAreas';

function App() {
  // Actualiza las URLs de los PDFs si están en la carpeta public
  const techManualUrl = '/pdf/Manual_de_las_Buenas_Prácticas_de_Ordeño.pdf';
  const userManualUrl = '/pdf/OPERACIONES_BASICAS.pdf';

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login-admin" element={<LoginFormAdmin />} />
          <Route path="/contacts" element={<ContendContacts />} />
          <Route path="/manuals" element={<Contend_Manuals techManual={techManualUrl} userManual={userManualUrl} />} />
          <Route path="/registrar" element={<formUsers />} />
          <Route path="/olvide-password" element={<OlvidePassword />} />
          <Route path="/CrudUsers" element={<CrudUsers />} />
          <Route path="/Responsables" element={<CrudResponsables />} />
          <Route path="/Procesos" element={<CrudProcesses />} />
          <Route path="/Procedimientos" element={<CrudProcedure />} />
          <Route path="/Areas" element={<CrudAreas />} />
          <Route path="/Mision-Vision" element={<NavMenuSE />} />
          <Route path="/Reseña-Historica" element={<ContendR_H />} />
          <Route path="/Administrator" element={<Init_Admin />} />

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
