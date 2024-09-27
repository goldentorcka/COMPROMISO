import React, { useState, useEffect } from 'react';
import clienteAxios from '../api.js';
import Swal from 'sweetalert2';
import FormDocumentos from './FormDocumentos.jsx';
import SidebarAdministrator from '../components/Admin/SidebarAdministrator.jsx';
import Modal from '../components/Modal/Init-Modal.jsx';
import ActionButtons from '../components/Buttons/ActionsButton.jsx';
import CustomDataTable from '../components/datatables/Datatable.jsx';

const CrudDocumentos = () => {
  const [documentoList, setDocumentoList] = useState([]);
  const [documento, setDocumento] = useState({
    Cod_Documento: "",
    Fec_Elaboracion_Documento: "",
    Ver_Documento: "",
    estado: "Activo",
    Id_Responsable: "",
    Nom_Documento: "",
    Nom_Documento_Magnetico: "",
    Id_Procedimiento: "",
  });
  const [buttonForm, setButtonForm] = useState("Enviar");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDataTableVisible, setIsDataTableVisible] = useState(true);

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
      setDocumentoList(response.data);
    } catch (error) {
      console.error("Error al obtener los documentos:", error);
    }
  };

  const getAllResponsables = async () => {
    try {
      const response = await clienteAxios.get('/api/responsables');
      setResponsables(response.data);
    } catch (error) {
      console.error("Error al obtener los responsables:", error);
    }
  };

  const getAllProcedimientos = async () => {
    try {
      const response = await clienteAxios.get('/api/procedimientos');
      setProcedimientos(response.data);
    } catch (error) {
      console.error("Error al obtener los procedimientos:", error);
    }
  };

  const handleSubmit = async (e, documentoData) => {
    e.preventDefault();
    try {
      if (buttonForm === "Enviar") {
        await clienteAxios.post('/api/documentos', documentoData);
        Swal.fire('Agregado!', 'El documento ha sido agregado.', 'success');
      } else {
        await clienteAxios.put(`/api/documentos/${documentoData.Id_Documento}`, documentoData);
        Swal.fire('Actualizado!', 'El documento ha sido actualizado.', 'success');
      }
      resetForm();
      setIsModalOpen(false);
      getAllDocumentos();
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    }
  };

  const resetForm = () => {
    setDocumento({
      Cod_Documento: "",
      Fec_Elaboracion_Documento: "",
      Ver_Documento: "",
      estado: "Activo",
      Id_Responsable: "",
      Nom_Documento: "",
      Nom_Documento_Magnetico: "",
      Id_Procedimiento: "",
    });
    setButtonForm("Enviar");
  };

  const getDocumento = (id) => {
    const selectedDocumento = documentoList.find(d => d.Id_Documento === id);
    setDocumento(selectedDocumento);
    setButtonForm("Actualizar");
    setIsModalOpen(true);
    setIsDataTableVisible(false);
  };

  const deleteDocumento = async (id) => {
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
        await clienteAxios.delete(`/api/documentos/${id}`);
        Swal.fire('Eliminado!', 'El documento ha sido eliminado.', 'success');
        getAllDocumentos();
      } catch (error) {
        console.error("Error al eliminar el documento:", error);
      }
    }
  };

  const columns = [
    { field: 'Id_Documento', header: 'ID', width: '5%' },
    { field: 'Cod_Documento', header: 'Código', width: '10%' },
    { field: 'Fec_Elaboracion_Documento', header: 'Fecha Elaboración', width: '15%' },
    { field: 'Ver_Documento', header: 'Versión', width: '10%' },
    { field: 'estado', header: 'Estado', width: '10%' },
    { field: 'Nom_Documento', header: 'Nombre', width: '15%' },
    { field: 'Nom_Documento_Magnetico', header: 'Nombre Magnético', width: '15%' },
    { field: 'Id_Responsable', header: 'Responsable', width: '10%' },
    { field: 'Id_Procedimiento', header: 'Procedimiento', width: '10%' },
    {
      body: (rowData) => (
        <ActionButtons 
          onEdit={() => getDocumento(rowData.Id_Documento)} 
          onDelete={() => deleteDocumento(rowData.Id_Documento)} 
        />
      ),
      width: '10%',
    },
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
            }}
            onClick={() => { setIsModalOpen(true); setIsDataTableVisible(false); }}
          >
            Agregar Documento
          </button>
          
          {isDataTableVisible && (
            <CustomDataTable columns={columns} data={documentoList} />
          )}

          {isModalOpen && (
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
              <FormDocumentos
                documento={documento}
                setDocumento={setDocumento}
                handleSubmit={handleSubmit}
                buttonForm={buttonForm}
                responsables={responsables}
                procedimientos={procedimientos}
              />
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
};

export default CrudDocumentos;
