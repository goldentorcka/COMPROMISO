import React, { useState, useEffect } from 'react';
import clienteAxios from '../api.js';
import Swal from 'sweetalert2';
import FormResponsables from './formResponsibles.jsx'; // Asegúrate de tener este componente
import SidebarAdministrator from '../components/Admin/SidebarAdministrator.jsx';
import Modal from '../components/Modal/Init-Modal.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import ActionButtons from '../components/Buttons/ActionsButton.jsx';
import CustomDataTable from '../components/datatables/Datatable.jsx';

const CrudResponsables = () => {
  const [responsableList, setResponsableList] = useState([]);
  const [responsable, setResponsable] = useState({
    Nom_Responsable: "",
    estado: "Activo",
  });
  const [buttonForm, setButtonForm] = useState("Enviar");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDataTableVisible, setIsDataTableVisible] = useState(true);

  useEffect(() => {
    getAllResponsables();
  }, []);

  const getAllResponsables = async () => {
    try {
      const response = await clienteAxios.get('/api/responsables');
      setResponsableList(response.data);
    } catch (error) {
      console.error("Error al obtener los responsables:", error);
    }
  };

  const handleSubmit = async (e, responsableData) => {
    e.preventDefault(); // Aquí se llama a preventDefault en el evento
    const validationError = validateResponsable(responsableData);
    if (validationError) {
      Swal.fire('Error', validationError, 'error');
      return;
    }

    try {
      if (buttonForm === "Enviar") {
        await clienteAxios.post('/api/responsables', responsableData);
        Swal.fire('Agregado!', 'El responsable ha sido agregado.', 'success');
      } else {
        await clienteAxios.put(`/api/responsables/${responsableData.Id_Responsable}`, responsableData);
        Swal.fire('Actualizado!', 'El responsable ha sido actualizado.', 'success');
      }
      resetForm();
      setIsModalOpen(false);
      getAllResponsables();
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    }
  };

  const resetForm = () => {
    setResponsable({
      Nom_Responsable: "",
      estado: "Activo",
    });
    setButtonForm("Enviar");
  };

  const validateResponsable = (responsable) => {
    const { Nom_Responsable } = responsable;
    if (!Nom_Responsable) {
      return 'El nombre es obligatorio.';
    }
    if (!/^[A-Za-z\s]+$/.test(Nom_Responsable)) {
      return 'El nombre solo puede contener letras.';
    }
    return null;
  };

  const columns = [
    { field: 'Id_Responsable', header: 'ID', width: '10%' },
    { field: 'Nom_Responsable', header: 'Nombre', width: '70%' },
    { field: 'estado', header: 'Estado', width: '20%' },
    {
      body: (rowData) => (
        <ActionButtons 
          onEdit={() => getResponsable(rowData.Id_Responsable)} 
          onDelete={() => deleteResponsable(rowData.Id_Responsable)} 
        />
      )
    }
  ];

  const getResponsable = (id) => {
    const selectedResponsable = responsableList.find(res => res.Id_Responsable === id);
    setResponsable(selectedResponsable);
    setButtonForm("Actualizar");
    setIsModalOpen(true);
    setIsDataTableVisible(false);
  };

  const deleteResponsable = async (id) => {
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
        await clienteAxios.delete(`/api/responsables/${id}`);
        Swal.fire('Eliminado!', 'El responsable ha sido eliminado.', 'success');
        getAllResponsables();
      } catch (error) {
        console.error("Error al eliminar el responsable:", error);
      }
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f4f4f4' }}>
      <SidebarAdministrator />
      <div style={{ flex: 1, padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
        <h1 style={{ marginBottom: '20px', fontSize: '2rem', fontFamily: 'Georgia, serif', textTransform: 'uppercase' }}>
          Gestión de Responsables
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
              setIsDataTableVisible(false);
            }}
          >
            <FontAwesomeIcon icon={faUser} style={{ marginRight: '8px' }} />
            Añadir
          </button>
          
          <Modal isOpen={isModalOpen} onClose={() => {
            setIsModalOpen(false);
            setIsDataTableVisible(true);
          }}>
            <FormResponsables
              responsable={responsable}
              setResponsable={setResponsable}
              handleSubmit={handleSubmit}
              buttonForm={buttonForm}
            />
          </Modal>

          {isDataTableVisible && 
            <CustomDataTable 
              data={responsableList} 
              columns={columns} 
              onEdit={getResponsable} 
              onDelete={deleteResponsable} 
            />
          }
        </div>
      </div>
    </div>
  );
};

export default CrudResponsables;
