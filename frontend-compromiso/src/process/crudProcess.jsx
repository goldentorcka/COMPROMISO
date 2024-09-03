import React, { useState, useEffect } from 'react';
import FormProcesses from './formProcess.jsx'; // Verifica que este archivo exista en la ruta correcta
import Pagination from '../components/Pagination/Pagination';
import SidebarAdministrator from '../components/Admin/SidebarAdministrator';
import FormQueryProcess from './formQueryProcess.jsx';
import './CrudProcesses.css'; // Asegúrate de que la ruta sea correcta

const CrudProcesses = () => {
  const [processList, setProcessList] = useState([]);
  const [process, setProcess] = useState({
    Id_Process: "",
    Nom_Proceso: "",
    description: "",
    date: "",
    status: "",
  });
  const [buttonForm, setButtonForm] = useState("Enviar");
  const [stateAddProcess, setStateAddProcess] = useState(true);
  const [desde, setDesde] = useState(0);
  const [hasta, setHasta] = useState(10);

  useEffect(() => {
    getAllProcesses();
  }, [desde, hasta]);

  const getAllProcesses = async () => {
    try {
      const response = await clienteAxios.get('/processes');
      setProcessList(response.data);
    } catch (error) {
      console.error("Error al obtener los procesos:", error);
    }
  };

  const getProcess = async (Id_Process) => {
    try {
      const response = await clienteAxios.get(`/processes/${Id_Process}`);
      setProcess(response.data);
      setButtonForm("Actualizar");
      setStateAddProcess(true);
    } catch (error) {
      console.error("Error al obtener el proceso:", error);
    }
  };

  const deleteProcess = async (Id_Process) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás recuperar este registro!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo!'
    });

    if (result.isConfirmed) {
      try {
        await clienteAxios.delete(`/processes/${Id_Process}`);
        Swal.fire('Eliminado!', 'El registro ha sido eliminado.', 'success');
        getAllProcesses(); // Actualiza la lista de procesos después de eliminar
      } catch (error) {
        console.error("Error al eliminar el proceso:", error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (buttonForm === "Enviar") {
        await clienteAxios.post('/processes', process);
        Swal.fire('Agregado!', 'El proceso ha sido agregado.', 'success');
      } else {
        await clienteAxios.put(`/processes/${process.Id_Process}`, process);
        Swal.fire('Actualizado!', 'El proceso ha sido actualizado.', 'success');
      }
      resetForm(); // Limpia el formulario
      getAllProcesses(); // Actualiza la lista de procesos
      setStateAddProcess(false);
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    }
  };

  const resetForm = () => {
    setProcess({
      Id_Process: "",
      Nom_Proceso: "",
      description: "",
      date: "",
      status: "",
    });
    setButtonForm("Enviar");
  };

  return (
    <div className="crud-container">
      <SidebarAdministrator />
      <div className="main-content">
        <h1 className="page-title">Gestión de Procesos</h1>
        <div className="content-wrapper">
          <FormQueryProcess fetchProcess={getProcess} />
          {stateAddProcess && (
            <FormProcesses
              process={process}
              setProcess={setProcess}
              handleSubmit={handleSubmit}
              buttonForm={buttonForm}
            />
          )}
          <div className="table-wrapper">
            <table className="area-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Descripción</th>
                  <th>Fecha</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(processList) && processList.slice(desde, hasta).map((proc) => (
                  <tr key={proc.Id_Process}>
                    <td>{proc.Id_Process}</td>
                    <td>{proc.Nom_Proceso}</td>
                    <td>{proc.description}</td>
                    <td>{proc.date}</td>
                    <td>{proc.status}</td>
                    <td>
                      <button className="edit-button" onClick={() => getProcess(proc.Id_Process)}>✏️</button>
                      <button className="delete-button" onClick={() => deleteProcess(proc.Id_Process)}>🗑️</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination
            desde={desde}
            hasta={hasta}
            setDesde={setDesde}
            setHasta={setHasta}
            totalItems={processList.length}
            itemsPerPage={10}
          />
        </div>
      </div>
    </div>
  );
};

export default CrudProcesses;
