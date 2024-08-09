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

const RegisterUnit = () => {
  const [validated, setValidated] = useState(false);
  const [nombre, setNombre] = useState('');
  const [estado, setEstado] = useState('');
  const [areas, setAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState('');
  const [error, setError] = useState(null); // Estado de error

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const response = await axios.get('http://localhost:1337/api/areas');
        setAreas(response.data);
      } catch (error) {
        logger.error('Error obteniendo las áreas: ' + error.message);
        console.error('Error obteniendo las áreas:', error);
        setError('Error al obtener las áreas. Verifica la consola para más detalles.');
      }
    };

    fetchAreas();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;

    // Validación manual de los campos requeridos
    if (!nombre || !estado || !selectedArea) {
      setError('Todos los campos son obligatorios.');
      logger.error('Faltan campos obligatorios: nombre, estado o área.');
      return;
    }

    if (form.checkValidity() === false) {
      setValidated(true);
      return;
    }

    try {
      const response = await axios.post('http://localhost:1337/api/unidades', {
        Nom_Unidad: nombre,
        Estado: estado,
        Id_Area: selectedArea,
      });

      if (response.status === 201) {
        alert('Unidad registrada con éxito');
        setNombre('');
        setEstado('');
        setSelectedArea('');
        setError(null); // Limpiar error en caso de éxito
      } else {
        logger.error(`Error registrando la unidad: Status ${response.status} - ${response.statusText}`);
        alert(`Error: ${response.statusText}`);
        setError(`Error: ${response.statusText}`);
      }
    } catch (error) {
      logger.error('Error registrando la unidad: ' + error.message);
      alert('Hubo un error al registrar la unidad. Verifica la consola para más detalles.');
      setError('Hubo un error al registrar la unidad');
    }
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Registro de Unidad</strong>
          </CCardHeader>
          <CCardBody>
            <CForm
              className="row g-3 needs-validation"
              noValidate
              validated={validated}
              onSubmit={handleSubmit}
            >
              <CCol md={12} className="position-relative">
                <CFormLabel htmlFor="validationTooltip01">Nombre de la Unidad</CFormLabel>
                <CFormInput
                  type="text"
                  id="validationTooltip01"
                  placeholder="Ingresa el nombre de la unidad"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
                <CFormFeedback tooltip invalid>
                  El nombre de la Unidad es requerido
                </CFormFeedback>
              </CCol>

              <CCol md={12} className="position-relative">
                <CFormLabel htmlFor="validationTooltip02">Área</CFormLabel>
                <CFormSelect
                  id="validationTooltip02"
                  value={selectedArea}
                  onChange={(e) => setSelectedArea(e.target.value)}
                  required
                >
                  <option disabled value="">Seleccionar área...</option>
                  {areas.map((area) => (
                    <option key={area.Id_Area} value={area.Id_Area}>
                      {area.Nom_Area}
                    </option>
                  ))}
                </CFormSelect>
                <CFormFeedback tooltip invalid>
                  Debes seleccionar un área
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
                  Registrar Unidad
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

export default RegisterUnit;
