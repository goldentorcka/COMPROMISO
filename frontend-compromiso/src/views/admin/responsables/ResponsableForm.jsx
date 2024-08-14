import React, { useState, useEffect } from 'react';
import axios from 'axios';
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

const ResponsableForm = ({ responsable, onSave }) => {
  const [nombreResponsable, setNombreResponsable] = useState('');
  const [estado, setEstado] = useState('');

  useEffect(() => {
    if (responsable) {
      setNombreResponsable(responsable.Nom_Responsable);
      setEstado(responsable.estado);
    }
  }, [responsable]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    try {
      if (responsable) {
        // Actualizar responsable existente
        await axios.put(`http://localhost:1337/api/responsables/${responsable.Id_Responsable}`, {
          Nom_Responsable: nombreResponsable,
          estado: estado,
        });
      } else {
        // Crear nuevo responsable
        await axios.post('http://localhost:1337/api/responsables', {
          Nom_Responsable: nombreResponsable,
          estado: estado,
        });
      }
      onSave();
      setNombreResponsable('');
      setEstado('');
    } catch (error) {
      console.error('Error al guardar responsable:', error);
    }
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>{responsable ? 'Editar Responsable' : 'Registrar Responsable'}</strong>
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={handleSubmit}>
              <CCol md={12} className="position-relative">
                <CFormLabel htmlFor="nombreResponsable">Nombre del Responsable</CFormLabel>
                <CFormInput
                  type="text"
                  id="nombreResponsable"
                  placeholder="Ingresa el nombre del responsable"
                  value={nombreResponsable}
                  onChange={(e) => setNombreResponsable(e.target.value)}
                  required
                />
                <CFormFeedback tooltip invalid>
                  El nombre del responsable es requerido
                </CFormFeedback>
              </CCol>
              <CCol md={12} className="position-relative">
                <CFormLabel htmlFor="estado">Estado</CFormLabel>
                <CFormSelect
                  id="estado"
                  value={estado}
                  onChange={(e) => setEstado(e.target.value)}
                  required
                >
                  <option disabled value="">Seleccionar estado...</option>
                  <option value="Sí">Sí</option>
                  <option value="No">No</option>
                </CFormSelect>
                <CFormFeedback tooltip invalid>
                  Debes seleccionar un estado
                </CFormFeedback>
              </CCol>
              <CCol xs={12} className="position-relative">
                <CButton color="primary" type="submit">
                  {responsable ? 'Actualizar Responsable' : 'Registrar Responsable'}
                </CButton>
              </CCol>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default ResponsableForm;
