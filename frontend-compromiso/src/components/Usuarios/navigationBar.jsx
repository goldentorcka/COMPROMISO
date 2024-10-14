// components/NavigationBar.jsx
import { Link } from 'react-router-dom';
// import SidebarAdministrator from "../Admin/SidebarAdministrator.jsx";

import NavMenuPublic from "../Nav/NavMenuPublic.jsx";
const NavigationBar = ({ isAuthenticated, handleLogout }) => {
  return (
<>

          {!isAuthenticated ? (
            <>
              <NavMenuPublic/>
            </>
          ) : (
            <>
            {/* <SidebarAdministrator /> */}
            
            </>
          )}


</>
  );
};

export default NavigationBar;
