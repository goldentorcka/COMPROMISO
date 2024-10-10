import React, { useState, useEffect } from 'react';
import clienteAxios from '../api.js';
import Swal from 'sweetalert2';
import FormResponsables from './formResponsibles.jsx'; 
import SidebarAdministrator from '../components/Admin/SidebarAdministrator.jsx';
import Modal from '../components/Modal/Init-Modal.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import ActionButtons from '../components/Buttons/ActionsButton.jsx';
import CustomDataTable from '../components/datatables/Datatable.jsx';

const CrudResponsables = () => {
  const [responsableList, setResponsableList] = useState([]);
  const [responsable, setResponsable] = useState(null);
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
      Swal.fire('Error', 'No se pudieron obtener los responsables', 'error');
    }
  };

  const handleSubmit = async (e, responsableData) => {
    e.preventDefault();
    const validationError = validateResponsable(responsableData);
    if (validationError) {
      Swal.fire('Error', validationError, 'error');
      return;
    }

    try {
      if (buttonForm === "Enviar") {
        await clienteAxios.post('/api/responsables', responsableData);
        Swal.fire('Agregado!', 'El responsable ha sido agregado.', 'success');
      } else if (buttonForm === "Actualizar" && responsable) {
        await clienteAxios.put(`/api/responsables/${responsable.id_responsable}`, responsableData);
        Swal.fire('Actualizado!', 'El responsable ha sido actualizado.', 'success');
      }
      resetForm();
      setIsModalOpen(false);
      getAllResponsables();
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      Swal.fire('Error', 'No se pudo guardar el responsable', 'error');
    }
  };

  const resetForm = () => {
    setResponsable(null);
    setButtonForm("Enviar");
  };

  const validateResponsable = (responsable) => {
    const { nombre_responsable } = responsable;
    if (!nombre_responsable) {
      return 'El nombre es obligatorio.';
    }
    if (!/^[A-Za-z\s]+$/.test(nombre_responsable)) {
      return 'El nombre solo puede contener letras.';
    }
    return null;
  };

  const columns = [
    { field: 'id_responsable', header: 'ID', width: '10%' },
    { field: 'nombre_responsable', header: 'Nombre', width: '70%' },
    { field: 'estado', header: 'Estado', width: '20%' }
  ];

  const getResponsable = (rowData) => {
    setResponsable(rowData);
    setButtonForm("Actualizar");
    setIsModalOpen(true);
  };

  const deleteResponsable = async (rowData) => {
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
        const response = await clienteAxios.delete(`/api/responsables/${rowData.id_responsable}`);
        if (response.status === 204) {
          Swal.fire('Eliminado!', 'El responsable ha sido eliminado.', 'success');
          getAllResponsables();
        } else {
          Swal.fire('Error', 'No se pudo eliminar el responsable', 'error');
        }
      } catch (error) {
        console.error("Error al eliminar el responsable:", error);
        Swal.fire('Error', 'No se pudo eliminar el responsable', 'error');
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
            }}
          >
            <FontAwesomeIcon icon={faUser} style={{ marginRight: '8px' }} />
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
            onClose={() => {
              setIsModalOpen(false);
              setIsDataTableVisible(true);
            }}
            title={buttonForm === "Enviar" ? "Agregar Responsable" : "Actualizar Responsable"}
          >
            <FormResponsables
              responsable={responsable} 
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
              searchField="nombre_responsable" 
              exportFields={['id_responsable', 'nombre_responsable', 'estado']}
            />
          }
        </div>
      </div>
    </div>
  );
};

export default CrudResponsables;
