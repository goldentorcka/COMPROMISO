import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CCard, CCardBody, CCardHeader, CCol, CRow, CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CButton } from '@coreui/react';

const ProcessList = () => {
  const [procesos, setProcesos] = useState([]);

  useEffect(() => {
    const fetchProcesos = async () => {
      try {
        const response = await axios.get('http://localhost:1337/api/procesos');
        setProcesos(response.data);
      } catch (error) {
        console.error('Error fetching procesos:', error);
      }
    };

    fetchProcesos();
  }, []);

  const handleEdit = (id) => {
    // Implementa la lógica para editar un proceso aquí
    console.log('Edit process with id:', id);
    // Redirigir a una página de edición o abrir un modal
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:1337/api/procesos/${id}`);
      setProcesos(procesos.filter(proceso => proceso.id !== id));
    } catch (error) {
      console.error('Error deleting proceso:', error);
    }
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Lista de Procesos</strong>
          </CCardHeader>
          <CCardBody>
            <CTable hover>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>ID</CTableHeaderCell>
                  <CTableHeaderCell>Nombre del Proceso</CTableHeaderCell>
                  <CTableHeaderCell>Acciones</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {procesos.map((proceso) => (
                  <CTableRow key={proceso.id}>
                    <CTableDataCell>{proceso.id}</CTableDataCell>
                    <CTableDataCell>{proceso.nombre_proceso}</CTableDataCell>
                    <CTableDataCell>
                      <CButton color="info" onClick={() => handleEdit(proceso.id)}>Editar</CButton>
                      <CButton color="danger" onClick={() => handleDelete(proceso.id)} className="ms-2">Borrar</CButton>
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

export default ProcessList;
