import React, { useState, useEffect } from 'react';
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

const RegisterProcedure = () => {
  const [validated, setValidated] = useState(false);
  const [nombreProcedimiento, setNombreProcedimiento] = useState('');
  const [estado, setEstado] = useState('');
  const [procesos, setProcesos] = useState([]);
  const [selectedProceso, setSelectedProceso] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProcesos = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:1337/api/procesos');
        setProcesos(response.data.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError('Error obteniendo los procesos');
        console.error('Error obteniendo los procesos:', error);
        logger.error(`Error obteniendo los procesos: ${error.message}`);
      }
    };

    fetchProcesos();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    // Validación manual de los campos requeridos
    if (!nombreProcedimiento || !selectedProceso || !estado) {
      alert('Todos los campos son obligatorios.');
      logger.error('Faltan campos obligatorios: nombreProcedimiento, selectedProceso o estado.');
      return;
    }

    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      setValidated(true);
      return;
    }

    try {
      const response = await axios.post('http://localhost:1337/api/procedimientos', {
        data: {
          nombre_procedimiento: nombreProcedimiento,
          Id_Proceso: selectedProceso,
          estado: estado,
        }
      });

      if (response.status === 201) {
        alert('Procedimiento registrado con éxito');
        setNombreProcedimiento('');
        setEstado('');
        setSelectedProceso('');
      } else {
        logger.error(`Error registrando el procedimiento: Status ${response.status} - ${response.statusText}`);
        alert(`Error: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error registrando el procedimiento:', error);
      alert('Hubo un error al registrar el procedimiento');
      logger.error(`Error registrando el procedimiento: ${error.message}`);
    }
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Registro de Procedimiento</strong>
          </CCardHeader>
          <CCardBody>
            <CForm
              className="row g-3 needs-validation"
              noValidate
              validated={validated}
              onSubmit={handleSubmit}
            >
              <CCol md={12} className="position-relative">
                <CFormLabel htmlFor="validationTooltip01">Nombre del Procedimiento</CFormLabel>
                <CFormInput
                  type="text"
                  id="validationTooltip01"
                  placeholder="Ingresa el nombre del procedimiento"
                  value={nombreProcedimiento}
                  onChange={(e) => setNombreProcedimiento(e.target.value)}
                  required
                />
                <CFormFeedback tooltip invalid>
                  El nombre del procedimiento es requerido
                </CFormFeedback>
              </CCol>
              <CCol md={12} className="position-relative">
                <CFormLabel htmlFor="validationTooltip02">Proceso</CFormLabel>
                <CFormSelect
                  id="validationTooltip02"
                  value={selectedProceso}
                  onChange={(e) => setSelectedProceso(e.target.value)}
                  required
                >
                  <option disabled value="">
                    Seleccionar proceso...
                  </option>
                  {procesos.map((proceso) => (
                    <option key={proceso.id} value={proceso.id}>
                      {proceso.attributes.nombre_proceso}
                    </option>
                  ))}
                </CFormSelect>
                <CFormFeedback tooltip invalid>
                  Debes seleccionar un proceso
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
                  <option disabled value="">
                    Seleccionar estado...
                  </option>
                  <option value="Activo">Activo</option>
                  <option value="Inactivo">Inactivo</option>
                </CFormSelect>
                <CFormFeedback tooltip invalid>
                  Debes seleccionar un estado
                </CFormFeedback>
              </CCol>
              <CCol xs={12} className="position-relative">
                <CButton color="primary" type="submit">
                  Registrar Procedimiento
                </CButton>
              </CCol>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default RegisterProcedure;
