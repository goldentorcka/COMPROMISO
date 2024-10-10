import 'regenerator-runtime/runtime';
import React from "react";
import ReactDOM from "react-dom/client";
import { ReactSession } from 'react-client-session';
import App from "./App.jsx";
import ErrorBoundary from './components/captureError/ErrorBoundary.jsx'; // Asegúrate de importar el componente ErrorBoundary
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'primeicons/primeicons.css';
// Importa los estilos de PrimeReact
import 'primereact/resources/themes/saga-blue/theme.css'; // o cualquier otro tema
import 'primereact/resources/primereact.min.css';
import 'primeflex/primeflex.css';      
import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';// Si usas PrimeFlex para layout




ReactSession.setStoreType("localStorage");

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
