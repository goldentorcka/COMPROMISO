// src/components/Admin/layout/Layout.jsx
import { Outlet } from 'react-router-dom';
import SidebarAdministrator from '../SidebarAdministrator.jsx';

function Layout() {
  return (
    <div style={{ display: 'flex' }}>
      <SidebarAdministrator /> {/* Barra lateral */}
      <main style={{ flexGrow: 1, padding: '1rem' }}>
        <Outlet /> {/* Aquí se renderizarán los componentes hijos */}
      </main>
    </div>
  );
}

export default Layout;
