import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from "./context/authProvider.jsx";
import AuthLayout from "./layout/authLayout.jsx";
import RutaProtegida from "./layout/RutaProtegida.jsx";
import Home from "./components/home/home.jsx";
import CrudUsers from "./users/crudUsers.jsx";
import LoginFormAdmin from "./users/LoginUser.jsx";
import OlvidePassword from "./users/OlvidePassword.jsx";
import formUsers from "./users/formUsers.jsx";
import ManualViewer from "./components/Manuals/ManualsTecnicUser.jsx";
import ContactUs from "./components/Contacts/CarruselContacts.jsx"
import NavMenuSE from "./components/Nav/NavQuerySena/NavMenuS_E.jsx";
import NavMenuReseña from "./components/Nav/NavQuerySena/NavMenuR_H.jsx"
function App() {

  const techManualUrl = 'frontend-compromiso/src/components/pdf/Manual_de_las_Buenas_Prácticas_de_Ordeño.pdf';
  const userManualUrl = 'frontend-compromiso/src/components/pdf/OPERACIONES_BASICAS.pdf';
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login-admin" element={<LoginFormAdmin />} />
            <Route path="/contacts" element={<ContactUs />} />
            <Route path="/manuals" element={<ManualViewer techManual={techManualUrl} userManual={userManualUrl} />} />
            <Route path="/registrar" element={<formUsers />} />
            <Route path="/olvide-password" element={<OlvidePassword />} />
            <Route path="/CrudUsers" element={<CrudUsers />} />
            <Route path="/Mision-Vision" element={<NavMenuSE />} />
            <Route path="/Reseña-Historica" element={<NavMenuReseña />} /> 

          </Routes>

          
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
