import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/authProvider.jsx";
import AuthLayout from "./layout/authLayout.jsx";
import RutaProtegida from "./layout/RutaProtegida.jsx";
import Home from "./home/home.jsx";
import CrudUsers from "./users/crudUsers.jsx";
import LoginFormAdmin from "./users/LoginUser";
import FormUsers from "./users/formUsers.jsx"

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="*" element={<Home />} /> {/* Captura todas las rutas desconocidas */}
            <Route path="auth/*" element={<AuthLayout />}>
              <Route index element={<LoginFormAdmin />} />
              <Route path="registrar" element={<FormUsers />} />
            </Route>

            <Route path="/admin/*" element={<RutaProtegida />}>
              <Route index element={<CrudUsers />} />
              {/* Otras rutas dentro de admin */}
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
