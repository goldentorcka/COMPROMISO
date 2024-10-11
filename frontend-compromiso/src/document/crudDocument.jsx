import React, { useState, useEffect } from 'react';
import clienteAxios from '../api.js';
import Swal from 'sweetalert2';
import FormDocumentos from './formDocument.jsx';
import SidebarAdministrator from '../components/Admin/SidebarAdministrator.jsx';
import Modal from '../components/Modal/Init-Modal.jsx';
import CustomDataTable from '../components/datatables/Datatable.jsx';

const CrudDocumentos = () => {
  const [documentoList, setDocumentoList] = useState([]);
  const [documento, setDocumento] = useState(null);
  const [buttonForm, setButtonForm] = useState("Enviar");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [responsables, setResponsables] = useState([]);
  const [procedimientos, setProcedimientos] = useState([]);
  const [isDataTableVisible, setIsDataTableVisible] = useState(true);

  useEffect(() => {
    getAllDocumentos();
    getAllResponsables();
    getAllProcedimientos();
  }, []);

  const getAllDocumentos = async () => {
    try {
      const response = await clienteAxios.get('/api/documentos');
      setDocumentoList(response.data);
    } catch (error) {
      console.error("Error al obtener los documentos:", error);
      Swal.fire('Error', 'No se pudieron obtener los documentos', 'error');
    }
  };

  const getAllResponsables = async () => {
    try {
      const response = await clienteAxios.get('/api/responsables');
      setResponsables(response.data);
    } catch (error) {
      console.error("Error al obtener los responsables:", error);
      Swal.fire('Error', 'No se pudieron obtener los responsables', 'error');
    }
  };

  const getAllProcedimientos = async () => {
    try {
      const response = await clienteAxios.get('/api/procedimientos');
      setProcedimientos(response.data);
    } catch (error) {
      console.error("Error al obtener los procedimientos:", error);
      Swal.fire('Error', 'No se pudieron obtener los procedimientos', 'error');
    }
  };

  const handleSubmit = async (e, documentoData) => {
    e.preventDefault();
    const validationError = validateDocumento(documentoData);
    if (validationError) {
      Swal.fire('Error', validationError, 'error');
      return;
    }

    try {
      if (buttonForm === "Enviar") {
        const nombreArchivoPDF = documentoData.nombre_documento.replace(/\s/g, '_') + ".pdf";
        const updatedData = { ...documentoData, nombre_documento_magnetico: nombreArchivoPDF };

        await clienteAxios.post('/api/documentos', updatedData);
        Swal.fire('Agregado!', 'El documento ha sido agregado.', 'success');
      } else if (buttonForm === "Actualizar" && documento) {
        await clienteAxios.put(`/api/documentos/${documento.id_documento}`, documentoData);
        Swal.fire('Actualizado!', 'El documento ha sido actualizado.', 'success');
      }
      resetForm();
      setIsModalOpen(false);
      getAllDocumentos();
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      Swal.fire('Error', 'No se pudo guardar el documento', 'error');
    }
  };

  const resetForm = () => {
    setDocumento(null);
    setButtonForm("Enviar");
    setIsDataTableVisible(true);
  };

  const validateDocumento = (documento) => {
    const { codigo, nombre_documento, id_responsable, id_procedimiento } = documento;

    if (!codigo || codigo.trim() === "") {
      return 'El código del documento es obligatorio.';
    }

    if (!nombre_documento || nombre_documento.trim() === "") {
      return 'El nombre del documento es obligatorio.';
    }

    if (!id_responsable) {
      return 'El ID del responsable es obligatorio.';
    }

    if (!id_procedimiento) {
      return 'El ID del procedimiento es obligatorio.';
    }

    return null;
  };

  const getResponsableNameById = (id) => {
    const responsable = responsables.find(res => res.id_responsable === id);
    return responsable ? responsable.nombre_responsable : 'Desconocido';
  };

  const getProcedimientoNameById = (id) => {
    const procedimiento = procedimientos.find(proc => proc.id_procedimiento === id);
    return procedimiento ? procedimiento.nombre_procedimiento : 'Desconocido';
  };

  const columns = [
    { field: 'codigo', header: 'Código', width: '10%' },
    { field: 'nombre_documento', header: 'Nombre', width: '15%' },
    { field: 'nombre_documento_magnetico', header: 'Nombre Magnético', width: '15%' },
    { field: 'id_responsable', header: 'Responsable', width: '15%' },
    { field: 'id_procedimiento', header: 'Procedimiento', width: '15%' },
  ];

  const modifiedDocumentoList = documentoList.map(doc => ({
    ...doc,
    id_responsable: getResponsableNameById(doc.id_responsable),
    id_procedimiento: getProcedimientoNameById(doc.id_procedimiento),
  }));

  const getDocumento = (rowData) => {
    setDocumento(rowData);
    setButtonForm("Actualizar");
    setIsModalOpen(true);
  };

  const deleteDocumento = async (rowData) => {
    const confirmDelete = await Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminarlo!'
    });

    if (confirmDelete.isConfirmed) {
      try {
        const response = await clienteAxios.delete(`/api/documentos/${rowData.id_documento}`);
        if (response.status === 204) {
          Swal.fire('Eliminado!', 'El documento ha sido eliminado.', 'success');
          getAllDocumentos();
        } else {
          Swal.fire('Error', 'No se pudo eliminar el documento', 'error');
        }
      } catch (error) {
        console.error("Error al eliminar el documento:", error);
        Swal.fire('Error', 'No se pudo eliminar el documento', 'error');
      }
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f4f4f4' }}>
      <SidebarAdministrator />
      <div style={{ flex: 1, padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
        <h1 style={{ marginBottom: '20px', fontSize: '2rem', fontFamily: 'Georgia, serif', textTransform: 'uppercase' }}>
          Gestión de Documentos
        </h1>
        <div style={{ width: '100%', maxWidth: '1200px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '10px 20px',
              fontSize: '1rem',
              backgroundColor: '#4caf50',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              marginBottom: '20px',
            }}
            onClick={() => {
              resetForm();
              setIsModalOpen(true);
            }}
          >
            Añadir Documento
          </button>

          {isModalOpen && (
            <div style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 999,
            }} />
          )}

          <Modal 
            isOpen={isModalOpen} 
            onClose={() => {
              setIsModalOpen(false);
              setIsDataTableVisible(true);
            }}
            title={buttonForm === "Enviar" ? "Agregar Documento" : "Actualizar Documento"}
          >
            <FormDocumentos
              documento={documento} 
              handleSubmit={handleSubmit}
              buttonForm={buttonForm}
              responsables={responsables} // Asegúrate de pasar la lista de responsables al formulario
              procedimientos={procedimientos} // Asegúrate de pasar la lista de procedimientos al formulario
            />
          </Modal>

          {isDataTableVisible && 
            <CustomDataTable
              data={modifiedDocumentoList} // Use modified list with names
              columns={columns}
              onEdit={getDocumento}
              onDelete={deleteDocumento}
              searchField="nombre_documento" 
              exportFields={['codigo', 'nombre_documento', 'nombre_documento_magnetico', 'id_responsable', 'id_procedimiento']}
            />
          }
        </div>
      </div>
    </div>
  );
};

export default CrudDocumentos;
