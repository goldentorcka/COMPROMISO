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

  useEffect(() => {
    getAllDocumentos();
    getAllResponsables();
    getAllProcedimientos();
  }, []);

  const getAllDocumentos = async () => {
    try {
      const response = await clienteAxios.get('/api/documentos');
      const documentosConNombres = response.data.map(doc => {
        const procedimiento = procedimientos.find(proc => proc.Id_Procedimiento === doc.Id_Procedimiento);
        const responsable = responsables.find(res => res.Id_Responsable === doc.Id_Responsable);
        return {
          ...doc,
          Nom_Procedimiento: procedimiento ? procedimiento.Nom_Procedimiento : 'No definido',
          Nom_Responsable: responsable ? responsable.Nom_Responsable : 'No definido',
        };
      });
      setDocumentoList(documentosConNombres);
    } catch (error) {
      console.error("Error al obtener los documentos:", error);
      Swal.fire('Error', 'No se pudieron obtener los documentos', 'error');
    }
  };

  const getAllResponsables = async () => {
    try {
      const response = await clienteAxios.get('/api/responsables');
      setResponsables(response.data);
      await getAllDocumentos();
    } catch (error) {
      console.error("Error al obtener los responsables:", error);
      Swal.fire('Error', 'No se pudieron obtener los responsables', 'error');
    }
  };

  const getAllProcedimientos = async () => {
    try {
      const response = await clienteAxios.get('/api/procedimientos');
      setProcedimientos(response.data);
      await getAllDocumentos();
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
        await clienteAxios.post('/api/documentos', documentoData);
        Swal.fire('Agregado!', 'El documento ha sido agregado.', 'success');
      } else {
        await clienteAxios.put(`/api/documentos/${documento.Id_Documento}`, documentoData);
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
  };

  const validateDocumento = (documento) => {
    const { Cod_Documento, Nom_Documento, Id_Responsable, Id_Procedimiento } = documento;
    if (!Cod_Documento) return 'El código del documento es obligatorio.';
    if (!Nom_Documento) return 'El nombre del documento es obligatorio.';
    if (!Id_Responsable) return 'El ID del responsable es obligatorio.';
    if (!Id_Procedimiento) return 'El ID del procedimiento es obligatorio.';
    return null;
  };

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
        await clienteAxios.delete(`/api/documentos/${rowData.Id_Documento}`);
        Swal.fire('Eliminado!', 'El documento ha sido eliminado.', 'success');
        getAllDocumentos();
      } catch (error) {
        console.error("Error al eliminar el documento:", error);
        Swal.fire('Error', 'No se pudo eliminar el documento', 'error');
      }
    }
  };

  const columns = [
    { field: 'Id_Documento', header: 'ID', width: '5%' },
    { field: 'Cod_Documento', header: 'Código', width: '15%' },
    { field: 'Nom_Documento', header: 'Nombre', width: '25%' },
    { field: 'estado', header: 'Estado', width: '10%' },
    { field: 'Nom_Procedimiento', header: 'Nombre Procedimiento', width: '20%' },
    { field: 'Nom_Responsable', header: 'Nombre Responsable', width: '20%' }
  ];

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
            Añadir
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
            onClose={() => setIsModalOpen(false)}
            title={buttonForm === "Enviar" ? "Agregar Documento" : "Actualizar Documento"}
          >
            <FormDocumentos
              documento={documento}
              handleSubmit={handleSubmit}
              buttonForm={buttonForm}
              procedimientos={procedimientos}
              responsables={responsables}
            />
          </Modal>

          <CustomDataTable
            data={documentoList}
            columns={columns}
            onEdit={getDocumento}
            onDelete={deleteDocumento}
            searchField="Nom_Documento"
            exportFields={['Id_Documento', 'Cod_Documento', 'Nom_Documento', 'estado', 'Nom_Procedimiento', 'Nom_Responsable']}
          />
        </div>
      </div>
    </div>
  );
};

export default CrudDocumentos;
