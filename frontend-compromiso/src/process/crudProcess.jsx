import React, { useState, useEffect } from 'react';
import clienteAxios from '../api.js';
import Swal from 'sweetalert2';
import FormProcess from './formProcess.jsx';
import SidebarAdministrator from '../components/Admin/SidebarAdministrator.jsx';
import Modal from '../components/Modal/Init-Modal.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import CustomDataTable from '../components/datatables/Datatable.jsx';

const CrudProcesos = () => {
  const [procesoList, setProcesoList] = useState([]);
  const [proceso, setProceso] = useState(null);
  const [buttonForm, setButtonForm] = useState("Enviar");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDataTableVisible, setIsDataTableVisible] = useState(true);

  useEffect(() => {
    getAllProcesos();
  }, []);

  const getAllProcesos = async () => {
    try {
      const response = await clienteAxios.get('/api/procesos');
      setProcesoList(response.data);
    } catch (error) {
      console.error("Error al obtener los procesos:", error);
      Swal.fire('Error', 'No se pudieron obtener los procesos', 'error');
    }
  };

  const handleSubmit = async (e, procesoData) => {
    e.preventDefault();

    try {
      if (buttonForm === "Enviar") {
        await clienteAxios.post('/api/procesos', procesoData);
        Swal.fire('Agregado!', 'El proceso ha sido agregado.', 'success');
      } else if (buttonForm === "Actualizar" && proceso) {
        await clienteAxios.put(`/api/procesos/${proceso.id_proceso}`, procesoData);
        Swal.fire('Actualizado!', 'El proceso ha sido actualizado.', 'success');
      }
      resetForm();
      setIsModalOpen(false);
      getAllProcesos();
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      Swal.fire('Error', 'No se pudo guardar el proceso', 'error');
    }
  };

  const resetForm = () => {
    setProceso(null);
    setButtonForm("Enviar");
  };

  const columns = [
    { field: 'id_proceso', header: 'ID', width: '10%' },
    { field: 'nombre_proceso', header: 'Nombre', width: '60%' },
    { field: 'estado', header: 'Estado', width: '20%' }
  ];

  const getProceso = (rowData) => {
    setProceso(rowData);
    setButtonForm("Actualizar");
    setIsModalOpen(true);
  };

  const deleteProceso = async (rowData) => {
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
        const response = await clienteAxios.delete(`/api/procesos/${rowData.id_proceso}`);
        if (response.status === 204) {
          Swal.fire('Eliminado!', 'El proceso ha sido eliminado.', 'success');
          getAllProcesos();
        } else {
          Swal.fire('Error', 'No se pudo eliminar el proceso', 'error');
        }
      } catch (error) {
        console.error("Error al eliminar el proceso:", error);
        Swal.fire('Error', 'No se pudo eliminar el proceso', 'error');
      }
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f4f4f4' }}>
      <SidebarAdministrator />
      <div style={{ flex: 1, padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
        <h1 style={{ marginBottom: '20px', fontSize: '2rem', fontFamily: 'Georgia, serif', textTransform: 'uppercase' }}>
          Gestión de Procesos
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
            title={buttonForm === "Enviar" ? "Agregar Proceso" : "Actualizar Proceso"}
          >
            <FormProcess
              proceso={proceso} 
              handleSubmit={handleSubmit}
              buttonForm={buttonForm}
            />
          </Modal>

          {isDataTableVisible && 
            <CustomDataTable
              data={procesoList}
              columns={columns}
              onEdit={getProceso}
              onDelete={deleteProceso}
              searchField="nombre_proceso"
              exportFields={['id_proceso', 'nombre_proceso', 'estado']}
            />
          }
        </div>
      </div>
    </div>
  );
};

export default CrudProcesos;
