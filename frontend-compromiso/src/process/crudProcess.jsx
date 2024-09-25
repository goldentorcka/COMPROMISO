import React, { useState, useEffect } from 'react';
import clienteAxios from '../api.js';
import Swal from 'sweetalert2';
import FormProcess from './formProcess.jsx'; // Asegúrate de tener este componente
import SidebarAdministrator from '../components/Admin/SidebarAdministrator.jsx';
import Modal from '../components/Modal/Init-Modal.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import ActionButtons from '../components/Buttons/ActionsButton.jsx';
import CustomDataTable from '../components/datatables/Datatable.jsx';

const CrudProcesos = () => {
  const [procesoList, setProcesoList] = useState([]);
  const [proceso, setProceso] = useState({
    Nom_Proceso: '',
    Tip_Proceso: 'Proceso de Innovacion',
    estado: 'Activo',
  });
  const [buttonForm, setButtonForm] = useState('Enviar');
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
      console.error('Error al obtener los procesos:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateProceso(proceso);
    if (validationError) {
      Swal.fire('Error', validationError, 'error');
      return;
    }

    try {
      if (buttonForm === 'Enviar') {
        await clienteAxios.post('/api/procesos', proceso);
        Swal.fire('Agregado!', 'El proceso ha sido agregado.', 'success');
      } else {
        await clienteAxios.put(`/api/procesos/${proceso.Id_Proceso}`, proceso);
        Swal.fire('Actualizado!', 'El proceso ha sido actualizado.', 'success');
      }
      resetForm();
      setIsModalOpen(false);
      setIsDataTableVisible(true);
      getAllProcesos();
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    }
  };

  const resetForm = () => {
    setProceso({
      Nom_Proceso: '',
      Tip_Proceso: 'Proceso de Innovacion',
      estado: 'Activo',
    });
    setButtonForm('Enviar');
  };

  const validateProceso = (proceso) => {
    const { Nom_Proceso } = proceso;
    if (!Nom_Proceso) {
      return 'El nombre del proceso es obligatorio.';
    }
    return null;
  };

  const columns = [
    { field: 'Id_Proceso', header: 'ID', width: '10%' },
    { field: 'Nom_Proceso', header: 'Nombre', width: '50%' },
    { field: 'Tip_Proceso', header: 'Tipo', width: '20%' },
    { field: 'estado', header: 'Estado', width: '20%' },
    {
      body: (rowData) => (
        <ActionButtons
          onEdit={() => getProceso(rowData.Id_Proceso)}
          onDelete={() => deleteProceso(rowData.Id_Proceso)}
        />
      ),
    },
  ];

  const getProceso = (id) => {
    const selectedProceso = procesoList.find((proc) => proc.Id_Proceso === id);
    setProceso(selectedProceso);
    setButtonForm('Actualizar');
    setIsModalOpen(true);
    setIsDataTableVisible(false);
  };

  const deleteProceso = async (id) => {
    const confirmDelete = await Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminarlo!',
    });

    if (confirmDelete.isConfirmed) {
      try {
        await clienteAxios.delete(`/api/procesos/${id}`);
        Swal.fire('Eliminado!', 'El proceso ha sido eliminado.', 'success');
        getAllProcesos();
      } catch (error) {
        console.error('Error al eliminar el proceso:', error);
      }
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f4f4f4' }}>
      <SidebarAdministrator />
      <div
        style={{
          flex: 1,
          padding: '20px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <h1
          style={{
            marginBottom: '20px',
            fontSize: '2rem',
            fontFamily: 'Georgia, serif',
            textTransform: 'uppercase',
          }}
        >
          Gestión de Procesos
        </h1>
        <div
          style={{
            width: '100%',
            maxWidth: '1200px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px',
          }}
        >
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

          <Modal
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
              setIsDataTableVisible(true);
            }}
          >
            <FormProcess
              process={proceso}
              setProcess={setProceso}
              handleSubmit={handleSubmit}
              buttonForm={buttonForm}
            />
          </Modal>

          {isDataTableVisible && <CustomDataTable data={procesoList} columns={columns} />}
        </div>
      </div>
    </div>
  );
};

export default CrudProcesos;
