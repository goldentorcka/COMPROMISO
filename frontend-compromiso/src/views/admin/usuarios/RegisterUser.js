import React, { useState } from 'react';
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

const Tooltips = () => {
  const [validated, setValidated] = useState(false);
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [estado, setEstado] = useState('');
  const [error, setError] = useState(null); // Estado de error

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;

    // Validación manual de los campos requeridos
    if (!nombreUsuario || !estado) {
      setError('Todos los campos son obligatorios.');
      setValidated(true);
      return;
    }

    if (form.checkValidity() === false) {
      setValidated(true);
      return;
    }

    try {
      // Aquí deberías agregar la lógica para manejar la solicitud (e.g., axios.post)
      alert('Usuario Administrador registrado con éxito');
      // Limpieza de los campos después de enviar
      setNombreUsuario('');
      setEstado('');
      setError(null); // Limpiar error en caso de éxito
    } catch (error) {
      console.error('Error registrando el Usuario Administrador:', error);
      setError('Hubo un error al registrar el Usuario Administrador');
    }
  };

  return (
    <CForm
      className="row g-3 needs-validation"
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
    >
      <CCol md={12} className="position-relative">
        <CFormLabel htmlFor="validationTooltip01">Nombre del Usuario Administrador</CFormLabel>
        <CFormInput
          type="text"
          id="validationTooltip01"
          placeholder="Ingresa el nombre del Usuario Administrador"
          value={nombreUsuario}
          onChange={(e) => setNombreUsuario(e.target.value)}
          required
        />
        <CFormFeedback tooltip invalid>
          El nombre del Usuario Administrador es requerido
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
          Registrar Usuario Administrador
        </CButton>
      </CCol>

      {error && (
        <CCol xs={12} className="position-relative">
          <div className="text-danger">{error}</div>
        </CCol>
      )}
    </CForm>
  );
};

const RegisterUserAdministrator = () => {
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Registro de Usuario Administrador</strong>
          </CCardHeader>
          <CCardBody>
            <p className="text-body-secondary small">
              En este formulario se realizará el registro de los Usuario Administradores
            </p>
            <Tooltips />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default RegisterUserAdministrator;
