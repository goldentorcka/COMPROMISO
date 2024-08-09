import React, { useState } from 'react';
import axios from 'axios';
import logger from '../config/logger.js';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormFeedback,
  CFormLabel,
  CFormSelect,
  CRow,
} from '@coreui/react';


const RegisterProcess = () => {
  const [validated, setValidated] = useState(false);
  const [nombreProceso, setNombreProceso] = useState('');
  const [estado, setEstado] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    
    // Validación manual de los campos requeridos
    if (!nombreProceso || !estado) {
      alert('Todos los campos son obligatorios.');
      logger.error('Faltan campos obligatorios: nombreProceso o estado.');
      return;
    }

    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      setValidated(true);
      return;
    }

    try {
      const response = await axios.post('http://localhost:1337/api/procesos', {
        nombre_proceso: nombreProceso,
        estado: estado,
      });

      if (response.status === 201) {
        alert('Proceso registrado con éxito');
        setNombreProceso('');
        setEstado('');
      } else {
        logger.error(`Error registrando el proceso: Status ${response.status} - ${response.statusText}`);
        alert(`Error: ${response.statusText}`);
      }
    } catch (error) {
      logger.error(`Error registrando el proceso: ${error.message}`);
      alert('Hubo un error al registrar el proceso. Verifica la consola para más detalles.');
    }
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Registro de Proceso</strong>
          </CCardHeader>
          <CCardBody>
            <CForm
              className="row g-3 needs-validation"
              noValidate
              validated={validated}
              onSubmit={handleSubmit}
            >
              <CCol md={12} className="position-relative">
                <CFormLabel htmlFor="validationTooltip01">Nombre del Proceso</CFormLabel>
                <CFormInput
                  type="text"
                  id="validationTooltip01"
                  placeholder="Ingresa el nombre del proceso"
                  value={nombreProceso}
                  onChange={(e) => setNombreProceso(e.target.value)}
                  required
                />
                <CFormFeedback tooltip invalid>
                  El nombre del proceso es requerido
                </CFormFeedback>
              </CCol>
              <CCol md={12} className="position-relative">
                <CFormLabel htmlFor="validationTooltip04">Estado</CFormLabel>
                <CFormSelect
                  id="validationTooltip04"
                  value={estado}
                  onChange={(e) => setEstado(e.target.value)}
                  required
                >
                  <option disabled value="">Seleccionar estado...</option>
                  <option value="Activo">Activo</option>
                  <option value="Inactivo">Inactivo</option>
                </CFormSelect>
                <CFormFeedback tooltip invalid>
                  Debes seleccionar un estado
                </CFormFeedback>
              </CCol>
              <CCol xs={12} className="position-relative">
                <CButton color="primary" type="submit">
                  Registrar Proceso
                </CButton>
              </CCol>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default RegisterProcess;
