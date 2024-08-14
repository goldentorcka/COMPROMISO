import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CButton, CCard, CCardBody, CCardHeader, CCol, CRow, CTable, CTableBody, CTableCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react';

const ResponsableList = ({ onEdit }) => {
  const [responsables, setResponsables] = useState([]);

  useEffect(() => {
    const fetchResponsables = async () => {
      try {
        const response = await axios.get('http://localhost:1337/api/responsables');
        setResponsables(response.data);
      } catch (error) {
        console.error('Error al obtener responsables:', error);
      }
    };

    fetchResponsables();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:1337/api/responsables/${id}`);
      setResponsables(responsables.filter(responsable => responsable.Id_Responsable !== id));
    } catch (error) {
      console.error('Error al eliminar responsable:', error);
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
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>Nombre</CTableHeaderCell>
                  <CTableHeaderCell>Estado</CTableHeaderCell>
                  <CTableHeaderCell>Acciones</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {responsables.map(responsable => (
                  <CTableRow key={responsable.Id_Responsable}>
                    <CTableCell>{responsable.Nom_Responsable}</CTableCell>
                    <CTableCell>{responsable.estado}</CTableCell>
                    <CTableCell>
                      <CButton color="warning" onClick={() => onEdit(responsable)}>Editar</CButton>
                      <CButton color="danger" onClick={() => handleDelete(responsable.Id_Responsable)}>Eliminar</CButton>
                    </CTableCell>
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

export default ResponsableList;
