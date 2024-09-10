import React, { useState, useEffect } from 'react';
import clienteAxios from '../api.js';
import Swal from 'sweetalert2';
import Pagination from '../components/Pagination/Pagination';
import FormQueryResponsable from './formQueryResponsibles.jsx';
import SidebarAdministrator from '../components/Admin/SidebarAdministrator.jsx';
import Button from 'react-bootstrap/Button';
import Modal from '../components/Modal/Init-Modal.jsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { saveAs } from 'file-saver';
import XLSX from 'xlsx';

const CrudResponsables = () => {
  const [responsableList, setResponsableList] = useState([]);
  const [responsableQuery, setResponsableQuery] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getAllResponsables();
  }, []);

  const getAllResponsables = async () => {
    try {
      const response = await clienteAxios.get('/api/responsables');
      setResponsableList(response.data);
      setResponsableQuery(response.data);
    } catch (error) {
      console.error('Error al obtener los responsables:', error);
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [['ID', 'Nombre del Responsable', 'Estado']],
      body: responsableQuery.map(responsable => [
        responsable.Id_Responsable,
        responsable.Nom_Responsable,
        responsable.estado,
      ]),
    });
    doc.save('responsables.pdf');
  };

  const generateExcel = () => {
    const ws = XLSX.utils.json_to_sheet(responsableQuery);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Responsables');
    XLSX.writeFile(wb, 'responsables.xlsx');
  };

  const generateSQL = () => {
    const sqlStatements = responsableQuery.map(responsable => 
      `INSERT INTO responsables (Id_Responsable, Nom_Responsable, estado) VALUES (${responsable.Id_Responsable}, '${responsable.Nom_Responsable}', '${responsable.estado}');`
    ).join('\n');
    
    const blob = new Blob([sqlStatements], { type: 'text/sql;charset=utf-8;' });
    saveAs(blob, 'responsables.sql');
  };

  return (
    <div className="crud-container">
      <SidebarAdministrator />
      <div className="main-content">
        <h1 className="page-title">Gestión de Responsables</h1>
        <div className="content-wrapper">
          <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
            {/* Tu formulario aquí */}
          </Modal>
          <Button variant="primary" onClick={() => setShowModal(true)}>
            Registrar Responsable
          </Button>
          <div className="table-wrapper">
            <FormQueryResponsable
              responsableQuery={responsableQuery}
              setResponsableQuery={setResponsableQuery}
            />
            <table className="responsable-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre del Responsable</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                  <th>Descargar</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(responsableQuery) &&
                  responsableQuery.map((responsable) => (
                    <tr key={responsable.Id_Responsable}>
                      <td>{responsable.Id_Responsable}</td>
                      <td>{responsable.Nom_Responsable}</td>
                      <td>{responsable.estado}</td>
                      <td>
                        <div className="action-buttons">
                          {/* Botones de Editar y Eliminar */}
                        </div>
                      </td>
                      <td>
                        <div className="download-buttons">
                          <button onClick={generatePDF}>📄 PDF</button>
                          <button onClick={generateExcel}>📊 Excel</button>
                          <button onClick={generateSQL}>💾 SQL</button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <Pagination
              URI="/api/responsables"
              setDesde={setDesde}
              setHasta={setHasta}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrudResponsables;
