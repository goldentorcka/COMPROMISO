import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CCard, CCardBody, CCardHeader, CCol, CRow, CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CButton } from '@coreui/react';

const ProcedureList = () => {
  const [procedimientos, setProcedimientos] = useState([]);

  useEffect(() => {
    const fetchProcedimientos = async () => {
      try {
        const response = await axios.get('http://localhost:1337/api/procedimientos');
        setProcedimientos(response.data);
      } catch (error) {
        console.error('Error fetching procedimientos:', error);
      }
    };

    fetchProcedimientos();
  }, []);

  const handleEdit = (id) => {
    // Implementa la lógica para editar un procedimiento aquí
    console.log('Edit procedure with id:', id);
    // Redirigir a una página de edición o abrir un modal
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:1337/api/procedimientos/${id}`);
      setProcedimientos(procedimientos.filter(procedimiento => procedimiento.id !== id));
    } catch (error) {
      console.error('Error deleting procedimiento:', error);
    }
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Lista de Procedimientos</strong>
          </CCardHeader>
          <CCardBody>
            <CTable hover>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>ID</CTableHeaderCell>
                  <CTableHeaderCell>Nombre del Procedimiento</CTableHeaderCell>
                  <CTableHeaderCell>Acciones</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {procedimientos.map((procedimiento) => (
                  <CTableRow key={procedimiento.id}>
                    <CTableDataCell>{procedimiento.id}</CTableDataCell>
                    <CTableDataCell>{procedimiento.nombre_procedimiento}</CTableDataCell>
                    <CTableDataCell>
                      <CButton color="info" onClick={() => handleEdit(procedimiento.id)}>Editar</CButton>
                      <CButton color="danger" onClick={() => handleDelete(procedimiento.id)} className="ms-2">Borrar</CButton>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default ProcedureList;
