import React, { useState } from 'react'
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
} from '@coreui/react'

const Tooltips = () => {
  const [validated, setValidated] = useState(false)
  const [estado, setEstado] = useState('')

  const handleSubmit = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }
    setValidated(true)
  }

  const handleEstadoChange = (event) => {
    setEstado(event.target.value)
  }

  return (
    <CForm
      className="row g-3 needs-validation"
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
    >
      <CCol md={12} className="position-relative">
        <CFormLabel htmlFor="validationTooltip01">Nombre del Area</CFormLabel>
        <CFormInput
          type="text"
          id="validationTooltip01"
          placeholder="Ingresa el nombre del area"
          required
        />
        <CFormFeedback tooltip invalid>
          El nombre del Area es requerido
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
          Debes seleccionar un area
        </CFormFeedback>
      </CCol>

      <CCol xs={12} className="position-relative">
        <CButton color="primary" type="submit">
          Registrar Area
        </CButton>
      </CCol>
    </CForm>
  )
}

const RegisterArea = () => {
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Registro de Area</strong>
          </CCardHeader>
          <CCardBody>
            <p className="text-body-secondary small">
              En este formulario se realizará el registro de las Areas
            </p>
            <div href="forms/#tooltips">{Tooltips()}</div>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default RegisterArea
