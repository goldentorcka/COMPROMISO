import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CCard, CCardBody, CCardHeader, CCol, CRow, CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CButton } from '@coreui/react';

const ResponsibleList = () => {
  const [responsables, setResponsables] = useState([]);

  useEffect(() => {
    const fetchResponsables = async () => {
      try {
        const response = await axios.get('http://localhost:1337/api/responsables');
        setResponsables(response.data);
      } catch (error) {
        console.error('Error fetching responsables:', error);
      }
    };

    fetchResponsables();
  }, []);

  const handleEdit = (id) => {
    // Implementa la lógica para editar un responsable aquí
    console.log('Edit responsible with id:', id);
    // Redirigir a una página de edición o abrir un modal
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:1337/api/responsables/${id}`);
      setResponsables(responsables.filter(responsable => responsable.id !== id));
    } catch (error) {
      console.error('Error deleting responsable:', error);
    }
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Lista de Responsables</strong>
          </CCardHeader>
          <CCardBody>
            <CTable hover>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>ID</CTableHeaderCell>
                  <CTableHeaderCell>Nombre</CTableHeaderCell>
                  <CTableHeaderCell>Estado</CTableHeaderCell>
                  <CTableHeaderCell>Acciones</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {responsables.map((responsable) => (
                  <CTableRow key={responsable.id}>
                    <CTableDataCell>{responsable.id}</CTableDataCell>
                    <CTableDataCell>{responsable.nombre}</CTableDataCell>
                    <CTableDataCell>{responsable.estado}</CTableDataCell>
                    <CTableDataCell>
                      <CButton color="info" onClick={() => handleEdit(responsable.id)}>Editar</CButton>
                      <CButton color="danger" onClick={() => handleDelete(responsable.id)} className="ms-2">Borrar</CButton>
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

export default ResponsibleList;
