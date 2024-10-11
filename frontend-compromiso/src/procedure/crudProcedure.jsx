import React, { useState, useEffect } from 'react';
import clienteAxios from '../api.js';
import Swal from 'sweetalert2';
import FormProcedure from './formProcedure.jsx'; 
import SidebarAdministrator from '../components/Admin/SidebarAdministrator.jsx';
import Modal from '../components/Modal/Init-Modal.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import CustomDataTable from '../components/datatables/Datatable.jsx';

const CrudProcedimientos = () => {
  const [procedimientoList, setProcedimientoList] = useState([]);
  const [procedimiento, setProcedimiento] = useState(null);
  const [processes, setProcesses] = useState([]);
  const [buttonForm, setButtonForm] = useState("Enviar");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDataTableVisible, setIsDataTableVisible] = useState(true);

  useEffect(() => {
    getAllProcedimientos();
    getAllProcesses();
  }, []);

  const getAllProcedimientos = async () => {
    try {
      const response = await clienteAxios.get('/api/procedimientos');
      setProcedimientoList(response.data);
    } catch (error) {
      console.error("Error al obtener los procedimientos:", error);
      Swal.fire('Error', 'No se pudieron obtener los procedimientos', 'error');
    }
  };

  const getAllProcesses = async () => {
    try {
      const response = await clienteAxios.get('/api/procesos');
      setProcesses(response.data);
    } catch (error) {
      console.error("Error al obtener los procesos:", error);
      Swal.fire('Error', 'No se pudieron obtener los procesos', 'error');
    }
  };

  const handleSubmit = async (e, procedimientoData) => {
    e.preventDefault();
    const validationError = validateProcedimiento(procedimientoData);
    if (validationError) {
      Swal.fire('Error', validationError, 'error');
      return;
    }

    try {
      if (buttonForm === "Enviar") {
        await clienteAxios.post('/api/procedimientos', procedimientoData);
        Swal.fire('Agregado!', 'El procedimiento ha sido agregado.', 'success');
      } else if (buttonForm === "Actualizar" && procedimiento) {
        await clienteAxios.put(`/api/procedimientos/${procedimiento.id_procedimiento}`, procedimientoData);
        Swal.fire('Actualizado!', 'El procedimiento ha sido actualizado.', 'success');
      }
      resetForm();
      setIsModalOpen(false);
      getAllProcedimientos();
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      Swal.fire('Error', 'No se pudo guardar el procedimiento', 'error');
    }
  };

  const resetForm = () => {
    setProcedimiento(null);
    setButtonForm("Enviar");
  };

  const validateProcedimiento = (procedimiento) => {
    const { nombre_procedimiento, id_proceso } = procedimiento;
    if (!nombre_procedimiento || nombre_procedimiento.trim() === "") {
      return 'El nombre del procedimiento es obligatorio.';
    }
    if (!id_proceso) {
      return 'El ID del proceso es obligatorio.';
    }
    return null;
  };

  // Function to get the name of the process by its ID
  const getProcessNameById = (id) => {
    const process = processes.find(proc => proc.id_proceso === id);
    return process ? process.nombre_proceso : 'Desconocido';
  };

  const columns = [
    { field: 'id_procedimiento', header: 'ID', width: '10%' },
    { field: 'nombre_procedimiento', header: 'Nombre', width: '50%' },
    { field: 'id_proceso', header: 'ID Proceso', width: '20%' },
    { field: 'estado', header: 'Estado', width: '20%' },
  ];

  const modifiedProcedimientoList = procedimientoList.map(proc => ({
    ...proc,
    id_proceso: getProcessNameById(proc.id_proceso), // Replace ID with process name
  }));

  const getProcedimiento = (rowData) => {
    setProcedimiento(rowData);
    setButtonForm("Actualizar");
    setIsModalOpen(true);
  };

  const deleteProcedimiento = async (rowData) => {
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
        const response = await clienteAxios.delete(`/api/procedimientos/${rowData.id_procedimiento}`);
        if (response.status === 204) {
          Swal.fire('Eliminado!', 'El procedimiento ha sido eliminado.', 'success');
          getAllProcedimientos();
        } else {
          Swal.fire('Error', 'No se pudo eliminar el procedimiento', 'error');
        }
      } catch (error) {
        console.error("Error al eliminar el procedimiento:", error);
        Swal.fire('Error', 'No se pudo eliminar el procedimiento', 'error');
      }
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f4f4f4' }}>
      <SidebarAdministrator />
      <div style={{ flex: 1, padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
        <h1 style={{ marginBottom: '20px', fontSize: '2rem', fontFamily: 'Georgia, serif', textTransform: 'uppercase' }}>
          Gestión de Procedimientos
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
            title={buttonForm === "Enviar" ? "Agregar Procedimiento" : "Actualizar Procedimiento"}
          >
            <FormProcedure
              procedimiento={procedimiento} 
              handleSubmit={handleSubmit}
              buttonForm={buttonForm}
              processes={processes} // Asegúrate de pasar la lista de procesos al formulario
            />
          </Modal>

          {isDataTableVisible && 
            <CustomDataTable
              data={modifiedProcedimientoList} // Use modified list with process names
              columns={columns}
              onEdit={getProcedimiento}
              onDelete={deleteProcedimiento}
              searchField="nombre_procedimiento" 
              exportFields={['id_procedimiento', 'nombre_procedimiento', 'id_proceso', 'estado']}
            />
          }
        </div>
      </div>
    </div>
  );
};

export default CrudProcedimientos;
