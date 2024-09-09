import React, { useState, useEffect } from 'react';
import clienteAxios from '../api.js';
import Swal from 'sweetalert2';
import Pagination from '../components/Pagination/Pagination';
import FormProcess from './formProcess.jsx';
import FormQueryProcess from './formQueryProcess.jsx';
import SidebarAdministrator from '../components/Admin/SidebarAdministrator.jsx';
import Modal from '../components/Modal/Init-Modal.jsx'; // Asegúrate de crear este archivo para el modal

const CrudProcess = () => {
  const [processList, setProcessList] = useState([]);
  const [process, setProcess] = useState({
    Nom_Proceso: '',
    Id_Responsable: '',
    estado: 'No',
  });
  const [processQuery, setProcessQuery] = useState([]);
  const [responsables, setResponsables] = useState([]);
  const [buttonForm, setButtonForm] = useState('Enviar');
  const [desde, setDesde] = useState(0);
  const [hasta, setHasta] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para el modal

  useEffect(() => {
    getAllProcesses();
    getAllResponsables(); // Obtener responsables al cargar el componente
  }, [desde, hasta]);

  const getAllProcesses = async () => {
    try {
      const response = await clienteAxios.get('/api/procesos');
      setProcessList(response.data);
      setProcessQuery(response.data); // Inicializar processQuery con todos los procesos
    } catch (error) {
      console.error('Error al obtener los procesos:', error);
    }
  };

  const getAllResponsables = async () => {
    try {
      const response = await clienteAxios.get('/api/responsables');
      setResponsables(response.data); // Inicializar la lista de responsables
    } catch (error) {
      console.error('Error al obtener responsables:', error);
    }
  };

  const getProcess = async (Id_Proceso) => {
    try {
      const response = await clienteAxios.get(`/api/procesos/${Id_Proceso}`);
      setProcess(response.data);
      setButtonForm('Actualizar');
      setIsModalOpen(true); // Abrir el modal al obtener un proceso
    } catch (error) {
      console.error('Error al obtener el proceso:', error);
    }
  };

  const deleteProcess = async (Id_Proceso) => {
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
        await clienteAxios.delete(`/api/procesos/${Id_Proceso}`);
        Swal.fire('Eliminado!', 'El registro ha sido eliminado.', 'success');
        getAllProcesses();
      } catch (error) {
        console.error('Error al eliminar el proceso:', error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (buttonForm === 'Enviar') {
        await clienteAxios.post('/api/procesos', process);
        Swal.fire('Agregado!', 'El proceso ha sido agregado.', 'success');
      } else {
        await clienteAxios.put(`/api/procesos/${process.Id_Proceso}`, process);
        Swal.fire('Actualizado!', 'El proceso ha sido actualizado.', 'success');
      }
      resetForm();
      getAllProcesses();
      setIsModalOpen(false); // Cerrar el modal al enviar el formulario
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    }
  };

  const resetForm = () => {
    setProcess({
      Nom_Proceso: '',
      Id_Responsable: '',
      estado: 'No',
    });
    setButtonForm('Enviar');
  };

  // Encuentra el nombre del responsable usando el ID
  const getResponsableName = (id) => {
    const responsable = responsables.find(r => r.Id_Responsable === id);
    return responsable ? responsable.Nom_Responsable : 'Desconocido';
  };

  return (
    <div className="crud-container">
      <SidebarAdministrator />
      <div className="main-content">
        <h1 className="page-title">Gestión de Procesos</h1>
        <div className="content-wrapper">
          <button
            onClick={() => {
              resetForm();
              setIsModalOpen(true); // Abrir el modal para agregar un proceso
            }}
            className="open-modal-button"
          >
            Añadir Proceso
          </button>
          
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <FormProcess
              process={process}
              setProcess={setProcess}
              handleSubmit={handleSubmit}
              buttonForm={buttonForm}
              resetForm={resetForm}
              responsables={responsables}
            />
          </Modal>
          
          <div className="table-wrapper">
            <FormQueryProcess
              processQuery={processQuery}
              setProcessQuery={setProcessQuery}
            />
            <table className="process-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre del Proceso</th>
                  <th>Responsable</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(processQuery) &&
                  processQuery.slice(desde, hasta).map((process) => (
                    <tr key={process.Id_Proceso}>
                      <td>{process.Id_Proceso}</td>
                      <td>{process.Nom_Proceso}</td>
                      <td>{getResponsableName(process.Id_Responsable)}</td>
                      <td>{process.estado}</td>
                      <td>
                        <div className="action-buttons">
                          <button
                            className="edit-button"
                            onClick={() => getProcess(process.Id_Proceso)}
                          >
                            ✏️
                          </button>
                          <button
                            className="delete-button"
                            onClick={() => deleteProcess(process.Id_Proceso)}
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
              URI="/api/procesos"
              setDesde={setDesde}
              setHasta={setHasta}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrudProcess;
