import React, { useState, useEffect } from 'react';
import clienteAxios from '../api.js';
import Swal from 'sweetalert2';
import Pagination from '../components/Pagination/Pagination';
import FormProcedures from './formProcedure.jsx';
import FormQueryProcedure from './formQueryProcedure.jsx';
import SidebarAdministrator from '../components/Admin/SidebarAdministrator.jsx';
import Modal from '../components/Modal/Init-Modal.jsx'; // Asegúrate de crear este archivo para el modal

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
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para el modal

  useEffect(() => {
    getAllProcedures();
    getAllProcesses(); // Cargar la lista de procesos al montar el componente
  }, [desde, hasta]);

  const getAllProcedures = async () => {
    try {
      const response = await clienteAxios.get('/api/procedimientos');
      setProcedureList(response.data);
      setProcedureQuery(response.data); // Inicializar procedureQuery con todos los procedimientos
    } catch (error) {
      console.error('Error al obtener los procedimientos:', error);
    }
  };

  const getAllProcesses = async () => {
    try {
      const response = await clienteAxios.get('/api/procesos');
      setProcesses(response.data); // Almacena los procesos en el estado
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
      openModal(); // Abre el modal al editar un procedimiento
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
      confirmButtonText: 'Sí, eliminarlo!'
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
      closeModal(); // Cerrar el modal al enviar el formulario
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

  return (
    <div className="crud-container">
      <SidebarAdministrator />
      <div className="main-content">
        <h1 className="page-title">Gestión de Procedimientos</h1>
        <div className="content-wrapper">
          <button
            onClick={() => {
              resetForm();
              openModal(); // Abrir el modal para agregar un procedimiento
            }}
            className="open-modal-button"
          >
            Añadir Procedimiento
          </button>
          
          <Modal isOpen={isModalOpen} onClose={closeModal}>
            <FormProcedures
              procedure={procedure}
              setProcedure={setProcedure}
              handleSubmit={handleSubmit}
              buttonForm={buttonForm}
              resetForm={resetForm}
              processes={processes} // Pasar los procesos al formulario
            />
          </Modal>
          
          <div className="table-wrapper">
            <FormQueryProcedure
              procedureQuery={procedureQuery}
              setProcedureQuery={setProcedureQuery}
            />
            <table className="process-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre del Procedimiento</th>
                  <th>Proceso</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(procedureQuery) &&
                  procedureQuery.slice(desde, hasta).map((procedure) => (
                    <tr key={procedure.Id_Procedimiento}>
                      <td>{procedure.Id_Procedimiento}</td>
                      <td>{procedure.Nom_Procedimiento}</td>
                      <td>{getProcessName(procedure.Id_Proceso)}</td>
                      <td>{procedure.estado}</td>
                      <td>
                        <div className="action-buttons">
                          <button
                            className="edit-button"
                            onClick={() => getProcedure(procedure.Id_Procedimiento)}
                          >
                            ✏️
                          </button>
                          <button
                            className="delete-button"
                            onClick={() => deleteProcedure(procedure.Id_Procedimiento)}
                          >
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <Pagination
              URI="/api/procedimientos"
              setDesde={setDesde}
              setHasta={setHasta}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrudProcedures;
