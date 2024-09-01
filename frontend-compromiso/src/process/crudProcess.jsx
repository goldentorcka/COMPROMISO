import React, { useState, useEffect } from 'react';
import clienteAxios from '../api';
import Swal from 'sweetalert2';
import FormProcesses from './formProcess.jsx';
import Pagination from '../components/Pagination/Pagination';

const CrudProcesses = () => {
  const [procesosList, setProcesosList] = useState([]);
  const [proceso, setProceso] = useState({
    Nom_Proceso: "",
    Id_Responsable: "",
    estado: "Sí",
  });
  const [buttonForm, setButtonForm] = useState("Enviar");
  const [stateAddProceso, setStateAddProceso] = useState(true);
  const [desde, setDesde] = useState(0);
  const [hasta, setHasta] = useState(10);

  useEffect(() => {
    getAllProcesos();
  }, [desde, hasta]);

  const getAllProcesos = async () => {
    try {
      const response = await clienteAxios.get('/procesos');
      // Asegúrate de que la respuesta sea un array
      if (Array.isArray(response.data)) {
        setProcesosList(response.data);
      } else {
        console.error("La respuesta de la API no es un array:", response.data);
        setProcesosList([]);
      }
    } catch (error) {
      console.error("Error al obtener los procesos:", error);
      setProcesosList([]); // Asegúrate de que sea un array vacío en caso de error
    }
  };

  const getProceso = async (Id_Proceso) => {
    try {
      const response = await clienteAxios.get(`/procesos/${Id_Proceso}`);
      setProceso(response.data);
      setButtonForm("Actualizar");
      setStateAddProceso(true);
    } catch (error) {
      console.error("Error al obtener el proceso:", error);
    }
  };

  const deleteProceso = async (Id_Proceso) => {
    try {
      await clienteAxios.delete(`/procesos/${Id_Proceso}`);
      Swal.fire('Proceso eliminado', '', 'success');
      getAllProcesos();
    } catch (error) {
      console.error("Error al eliminar el proceso:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (stateAddProceso) {
        await clienteAxios.post('/procesos', proceso);
        Swal.fire('Proceso creado', '', 'success');
      } else {
        await clienteAxios.put(`/procesos/${proceso.Id_Proceso}`, proceso);
        Swal.fire('Proceso actualizado', '', 'success');
      }
      setProceso({
        Nom_Proceso: "",
        Id_Responsable: "",
        estado: "Sí",
      });
      setButtonForm("Enviar");
      setStateAddProceso(true);
      getAllProcesos();
    } catch (error) {
      console.error("Error al guardar el proceso:", error);
    }
  };

  return (
    <div>
      <FormProcesses
        handleSubmit={handleSubmit}
        proceso={proceso}
        setProceso={setProceso}
        buttonForm={buttonForm}
      />
      <div className="crud-process-list">
        <h2>Lista de Procesos</h2>
        {Array.isArray(procesosList) && procesosList.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>ID Responsable</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {procesosList.map((proceso) => (
                <tr key={proceso.Id_Proceso}>
                  <td>{proceso.Id_Proceso}</td>
                  <td>{proceso.Nom_Proceso}</td>
                  <td>{proceso.Id_Responsable}</td>
                  <td>{proceso.estado}</td>
                  <td>
                    <button onClick={() => getProceso(proceso.Id_Proceso)}>Editar</button>
                    <button onClick={() => deleteProceso(proceso.Id_Proceso)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No hay procesos disponibles</p>
        )}
        <Pagination setDesde={setDesde} setHasta={setHasta} />
      </div>
    </div>
  );
};

export default CrudProcesses;
