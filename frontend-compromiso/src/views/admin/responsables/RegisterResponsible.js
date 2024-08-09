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


const RegisterResponsible = () => {
  const [validated, setValidated] = useState(false);
  const [nombreResponsable, setNombreResponsable] = useState('');
  const [estado, setEstado] = useState('');
  const [error, setError] = useState(null); // Estado de error

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;

    // Validación manual de los campos requeridos
    if (!nombreResponsable || !estado) {
      setError('Todos los campos son obligatorios.');
      logger.error('Faltan campos obligatorios: nombreResponsable o estado.');
      return;
    }

    if (form.checkValidity() === false) {
      setValidated(true);
      return;
    }

    try {
      const response = await axios.post('http://localhost:1337/api/responsables', {
        data: {
          nombre_responsable: nombreResponsable,
          estado: estado,
          // Puedes agregar `created_by_id` y `updated_by_id` si es necesario
        }
      });

      if (response.status === 201) {
        alert('Responsable registrado con éxito');
        setNombreResponsable('');
        setEstado('');
        setError(null); // Limpiar error en caso de éxito
      } else {
        logger.error(`Error registrando el responsable: Status ${response.status} - ${response.statusText}`);
        alert(`Error: ${response.statusText}`);
        setError(`Error: ${response.statusText}`);
      }
    } catch (error) {
      logger.error(`Error registrando el responsable: ${error.message}`);
      alert('Hubo un error al registrar el responsable. Verifica la consola para más detalles.');
      setError('Hubo un error al registrar el responsable');
    }
  };

  const handleEstadoChange = (event) => {
    setEstado(event.target.value);
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Registro de Responsable</strong>
          </CCardHeader>
          <CCardBody>
            <p className="text-body-secondary small">
              En este formulario se realizará el registro de los responsables
            </p>
            <CForm
              className="row g-3 needs-validation"
              noValidate
              validated={validated}
              onSubmit={handleSubmit}
            >
              <CCol md={12} className="position-relative">
                <CFormLabel htmlFor="validationTooltip01">Nombre del Responsable</CFormLabel>
                <CFormInput
                  type="text"
                  id="validationTooltip01"
                  placeholder="Ingresa el nombre del responsable"
                  value={nombreResponsable}
                  onChange={(e) => setNombreResponsable(e.target.value)}
                  required
                />
                <CFormFeedback tooltip invalid>
                  El nombre del Responsable es requerido
                </CFormFeedback>
              </CCol>

              <CCol md={12} className="position-relative">
                <CFormLabel htmlFor="validationTooltip04">Estado</CFormLabel>
                <CFormSelect
                  id="validationTooltip04"
                  value={estado}
                  onChange={handleEstadoChange}
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
                  Registrar Responsable
                </CButton>
              </CCol>

              {error && (
                <CCol xs={12} className="position-relative">
                  <div className="text-danger">{error}</div>
                </CCol>
              )}
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default RegisterResponsible;
