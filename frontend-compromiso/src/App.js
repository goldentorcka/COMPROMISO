import React, { Suspense, useEffect } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CSpinner, useColorModes } from '@coreui/react';
import './scss/style.scss';

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'));

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'));
const IndexPage = React.lazy(() => import('./views/pages/module/IndexPage'));
const Register = React.lazy(() => import('./views/pages/register/Register'));
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));
const RegisterProcess = React.lazy(() => import('./views/admin/procesos/RegisterProcess'));
const RegisterProcedure = React.lazy(() => import('./views/admin/procedimientos/RegisterProcedure'));
const RegisterResponsible = React.lazy(() => import('./views/admin/responsables/RegisterResponsible'));
const RegisterUnit = React.lazy(() => import('./views/admin/unidades/RegisterUnit'));
const RegisterUserAdministrator = React.lazy(() => import('./views/admin/unidades/RegisterUnit'));


const App = () => {
  const { isColorModeSet, setColorMode } = useColorModes('coreui-free-react-admin-template-theme');
  const storedTheme = useSelector((state) => state.theme);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.href.split('?')[1]);
    const theme = urlParams.get('theme') && urlParams.get('theme').match(/^[A-Za-z0-9\s]+/)[0];
    if (theme) {
      setColorMode(theme);
    }

    if (isColorModeSet()) {
      return;
    }

    setColorMode(storedTheme);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <HashRouter>
      <Suspense
        fallback={
          <div className="pt-3 text-center">
            <CSpinner color="primary" variant="grow" />
          </div>
        }
      >
        <Routes>
          <Route exact path="/index" name="Pagina Inicial CompromisoSE" element={<IndexPage />} />
          <Route exact path="/login" name="Login Page" element={<Login />} />
          <Route exact path="/register" name="Register Page" element={<Register />} />
          <Route exact path='/RegisterProcess' name="Register Process" element={<RegisterProcess />} />
          <Route exact path='/registerProcedure' name="Register Procedure" element={<RegisterProcedure />} />
          <Route exact path='/RegisterResponsible' name="Register Responsible" element={<RegisterResponsible />} />
          <Route exact path='/RegisterUnit' name="Register Unit" element={<RegisterUnit />} />
          <Route exact path='/RegisterUserAdministrator' name="Register User Administrator" element={<RegisterUserAdministrator />} />
          <Route exact path="/404" name="Page 404" element={<Page404 />} />
          <Route exact path="/500" name="Page 500" element={<Page500 />} />
          <Route path="/*" name="Home" element={<DefaultLayout />} />
        </Routes>
      </Suspense>
    </HashRouter>
  );
};

export default App;
