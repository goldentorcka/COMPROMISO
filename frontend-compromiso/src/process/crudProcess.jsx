import React, { useState, useEffect } from 'react';
import clienteAxios from '../api.js';
import Swal from 'sweetalert2';
import Pagination from '../components/Pagination/Pagination';
import FormProcess from './formProcess.jsx';
import FormQueryProcess from './formQueryProcess.jsx';
import SidebarAdministrator from '../components/Admin/SidebarAdministrator.jsx'; // Ajusta la ruta según la ubicación
import './styles.css'; // Asegúrate de importar el archivo CSS

const CrudProcess = () => {
  const [processList, setProcessList] = useState([]);
  const [process, setProcess] = useState({
    Nom_Proceso: '',
    Id_Responsable: '',
    estado: 'No',
  });
  const [processQuery, setProcessQuery] = useState([]);
  const [buttonForm, setButtonForm] = useState('Enviar');
  const [desde, setDesde] = useState(0);
  const [hasta, setHasta] = useState(10);

  useEffect(() => {
    getAllProcesses();
  }, [desde, hasta]);

  const getAllProcesses = async () => {
    try {
      const response = await clienteAxios.get('/processes');
      setProcessList(response.data);
      setProcessQuery(response.data); // Inicializar processQuery con todos los procesos
    } catch (error) {
      console.error('Error al obtener los procesos:', error);
    }
  };

  const getProcess = async (Id_Proceso) => {
    try {
      const response = await clienteAxios.get(`/processes/${Id_Proceso}`);
      setProcess(response.data);
      setButtonForm('Actualizar');
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
        await clienteAxios.delete(`/processes/${Id_Proceso}`);
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
        await clienteAxios.post('/processes', process);
        Swal.fire('Agregado!', 'El proceso ha sido agregado.', 'success');
      } else {
        await clienteAxios.put(`/processes/${process.Id_Proceso}`, process);
        Swal.fire('Actualizado!', 'El proceso ha sido actualizado.', 'success');
      }
      resetForm();
      getAllProcesses();
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

  return (
    <div className="crud-container">
      <SidebarAdministrator />
      <div className="main-content">
        <h1 className="page-title">Gestión de Procesos</h1>
        <div className="content-wrapper">
          <FormProcess
            process={process}
            setProcess={setProcess}
            handleSubmit={handleSubmit}
            buttonForm={buttonForm}
            resetForm={resetForm}
          />
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
                      <td>{process.Id_Responsable}</td>
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
              URI="/processes"
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
