import React from "react";
import { CCard, CCardBody, CCardHeader, CRow, CCol } from "@coreui/react";
import '../../styles/InitUserView.css'; // Importamos los estilos adicionales

const InitUserView = () => {
  return (
    <>
      <CRow className="justify-content-center align-items-center">
        {/* Añadimos las imágenes al inicio */}
        <CCol xs="12" md="10" lg="8" className="text-center mb-4">
          <img
            src="../../../../Public/images/logos/logoSE.png" // Reemplaza con la URL de tu imagen
            alt="Logo 1"
            className="image-3d"
          />
          <img
            src="../../../../Public/images/logos/logo.png" // Reemplaza con la URL de tu imagen
            alt="Logo 2"
            className="image-3d"
          />
        </CCol>

        <CCol xs="12" md="10" lg="8" className="mb-4">
          <CCard className="shadow-sm card-3d">
            <CCardHeader className="bg-primary text-white text-center">
              <h2>Bienvenido al Panel de Administración de CALGDOCS</h2>
            </CCardHeader>
            <CCardBody className="p-4">
              <p>
                <strong>CALGDOCS</strong> es un aplicativo diseñado para la gestión de formatos del 
                Centro Agropecuario La Granja del Espinal, perteneciente a la regional Tolima del SENA. 
                Este sistema te permitirá administrar y consultar los diferentes formatos utilizados en 
                las seis áreas del centro.
              </p>
              <p>
                Nuestro objetivo es facilitar la gestión documental y asegurar que cada área tenga acceso 
                rápido y eficiente a los formatos requeridos para sus operaciones. El sistema está compuesto 
                por cinco módulos clave que te permitirán:
              </p>
              <ul className="mb-3">
                <li>Gestionar los <strong>procesos</strong> y procedimientos relacionados a cada área.</li>
                <li>Registrar y mantener actualizados los <strong>formatos</strong> necesarios en las unidades.</li>
                <li>Asignar <strong>responsables</strong> a cada procedimiento o formato.</li>
                <li>Consultar y descargar <strong>documentos</strong> de manera sencilla.</li>
              </ul>
              <p>
                Este panel de administración te ofrece las herramientas necesarias para gestionar los 
                formatos y mantener el orden y la eficiencia dentro del Centro Agropecuario La Granja.
              </p>
              <p className="text-center">
                ¡Explora los módulos y comienza a administrar de manera eficiente!
              </p>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default InitUserView;
