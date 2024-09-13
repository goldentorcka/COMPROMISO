import React, { useState, useEffect } from 'react';
import clienteAxios from '../api.js';
import Swal from 'sweetalert2';
import Pagination from '../components/Pagination/Pagination';
import FormProcedures from './formProcedure.jsx';
import FormQueryProcedure from './formQueryProcedure.jsx';
import SidebarAdministrator from '../components/Admin/SidebarAdministrator.jsx';
import Modal from '../components/Modal/Init-Modal.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons';
import DataTable from '../components/datatables/DataTable.jsx';

const styles = {
  // Tus estilos aquí
};

const CrudProcedures = () => {
  const [procedureList, setProcedureList] = useState([]);
  const [procedure, setProcedure] = useState({
    Id_Procedimiento: '',
    Nom_Procedimiento: '',
    Id_Proceso: '',
    estado: 'No',
  });
  const [procedureQuery, setProcedureQuery] = useState([]);
  const [processes, setProcesses] = useState([]);
  const [buttonForm, setButtonForm] = useState('Enviar');
  const [desde, setDesde] = useState(0);
  const [hasta, setHasta] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getAllProcedures();
    getAllProcesses();
  }, [desde, hasta]);

  const getAllProcedures = async () => {
    try {
      const response = await clienteAxios.get('/api/procedimientos');
      setProcedureList(response.data);
      setProcedureQuery(response.data);
    } catch (error) {
      console.error('Error al obtener los procedimientos:', error);
    }
  };

  const getAllProcesses = async () => {
    try {
      const response = await clienteAxios.get('/api/procesos');
      setProcesses(response.data);
    } catch (error) {
      console.error('Error al obtener los procesos:', error);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const getProcedure = async (Id_Procedimiento) => {
    try {
      const response = await clienteAxios.get(`/api/procedimientos/${Id_Procedimiento}`);
      setProcedure(response.data);
      setButtonForm('Actualizar');
      openModal();
    } catch (error) {
      console.error('Error al obtener el procedimiento:', error);
    }
  };

  const deleteProcedure = async (Id_Procedimiento) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás recuperar este registro!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo!',
    });

    if (result.isConfirmed) {
      try {
        await clienteAxios.delete(`/api/procedimientos/${Id_Procedimiento}`);
        Swal.fire('Eliminado!', 'El registro ha sido eliminado.', 'success');
        getAllProcedures();
      } catch (error) {
        console.error('Error al eliminar el procedimiento:', error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (buttonForm === 'Enviar') {
        await clienteAxios.post('/api/procedimientos', procedure);
        Swal.fire('Agregado!', 'El procedimiento ha sido agregado.', 'success');
      } else {
        await clienteAxios.put(`/api/procedimientos/${procedure.Id_Procedimiento}`, procedure);
        Swal.fire('Actualizado!', 'El procedimiento ha sido actualizado.', 'success');
      }
      resetForm();
      getAllProcedures();
      closeModal();
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    }
  };

  const resetForm = () => {
    setProcedure({
      Id_Procedimiento: '',
      Nom_Procedimiento: '',
      Id_Proceso: '',
      estado: 'No',
    });
    setButtonForm('Enviar');
  };

  const getProcessName = (Id_Proceso) => {
    const process = processes.find((proc) => proc.Id_Proceso === Id_Proceso);
    return process ? process.Nom_Proceso : 'Desconocido';
  };

  const columns = [
    {
      Header: 'ID',
      accessor: 'Id_Procedimiento',
    },
    {
      Header: 'Nombre del Procedimiento',
      accessor: 'Nom_Procedimiento',
    },
    {
      Header: 'Proceso',
      id: 'processName',
      accessor: d => getProcessName(d.Id_Proceso),
    },
    {
      Header: 'Estado',
      accessor: 'estado',
    },
  ];

  return (
    <div style={styles.root}>
      <div style={styles.crudContainer}>
        <SidebarAdministrator style={styles.sidebar} />
        <div style={styles.mainContent}>
          <h1 style={styles.pageTitle}>Gestión de Procedimientos</h1>
          <div style={styles.contentWrapper}>
            <button
              style={styles.openModalButton}
              onClick={() => {
                resetForm();
                openModal();
              }}
            >
              <FontAwesomeIcon icon={faFileAlt} style={styles.icon} /> Añadir
            </button>
            
            <Modal isOpen={isModalOpen} onClose={closeModal}>
              <FormProcedures
                procedure={procedure}
                setProcedure={setProcedure}
                handleSubmit={handleSubmit}
                buttonForm={buttonForm}
                resetForm={resetForm}
                processes={processes}
              />
            </Modal>
            
            <div style={styles.tableWrapper}>
              <FormQueryProcedure
                procedureQuery={procedureQuery}
                setProcedureQuery={setProcedureQuery}
              />
              <DataTable
                columns={columns}
                data={procedureQuery.slice(desde, hasta)}
                getProcessName={getProcessName}
                onEdit={getProcedure}
                onDelete={deleteProcedure}
              />
              <Pagination
                URI="/api/procedimientos"
                setDesde={setDesde}
                setHasta={setHasta}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrudProcedures;
