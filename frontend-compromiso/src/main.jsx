import React from "react";
import ReactDOM from "react-dom/client";
import { ReactSession } from 'react-client-session';
import App from "./App.jsx";


ReactSession.setStoreType("localStorage");

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);