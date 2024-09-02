import React, { useState, useEffect } from 'react';
import clienteAxios from '../api';
import Swal from 'sweetalert2';
import Pagination from '../components/Pagination/Pagination';
import FormProcesses from './formQueryProcess.jsx';
const CrudProcesses = () => {
  const [procesosList, setProcesosList] = useState([]);
  const [proceso, setProceso] = useState({
    Nom_Proceso: '',
    Id_Responsable: '',
    estado: 'Sí',
  });
  const [buttonForm, setButtonForm] = useState('Enviar');
  const [stateAddProceso, setStateAddProceso] = useState(true);
  const [desde, setDesde] = useState(0);
  const [hasta, setHasta] = useState(10);

  useEffect(() => {
    getAllProcesos();
  }, [desde, hasta]);

  const getAllProcesos = async () => {
    try {
      const response = await clienteAxios.get('/procesos');
      if (Array.isArray(response.data)) {
        setProcesosList(response.data);
      } else {
        console.error('La respuesta de la API no es un array:', response.data);
        setProcesosList([]);
      }
    } catch (error) {
      console.error('Error al obtener los procesos:', error);
      setProcesosList([]);
    }
  };

  const getProceso = async (Id_Proceso) => {
    try {
      const response = await clienteAxios.get(`/procesos/${Id_Proceso}`);
      setProceso(response.data);
      setButtonForm('Actualizar');
      setStateAddProceso(true);
    } catch (error) {
      console.error('Error al obtener el proceso:', error);
    }
  };

  const deleteProceso = async (Id_Proceso) => {
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
        await clienteAxios.delete(`/procesos/${Id_Proceso}`);
        Swal.fire('Eliminado!', 'El proceso ha sido eliminado.', 'success');
        getAllProcesos();
      } catch (error) {
        console.error('Error al eliminar el proceso:', error);
      }
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
      resetForm();
      getAllProcesos();
    } catch (error) {
      console.error('Error al guardar el proceso:', error);
    }
  };

  const resetForm = () => {
    setProceso({
      Nom_Proceso: '',
      Id_Responsable: '',
      estado: 'Sí',
    });
    setButtonForm('Enviar');
    setStateAddProceso(true);
  };

  return (
    <div style={styles.crudContainer}>
      <SidebarAdministrator />
      <div style={styles.mainContent}>
        <h1 style={styles.pageTitle}>Gestión de Procesos</h1>
        <div style={styles.contentWrapper}>
          <FormProcesses
            handleSubmit={handleSubmit}
            proceso={proceso}
            setProceso={setProceso}
            buttonForm={buttonForm}
          />
          <div style={styles.tableWrapper}>
            <table style={styles.processTable}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre del Proceso</th>
                  <th>ID Responsable</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(procesosList) && procesosList.length > 0 ? (
                  procesosList.slice(desde, hasta).map((proceso) => (
                    <tr key={proceso.Id_Proceso}>
                      <td>{proceso.Id_Proceso}</td>
                      <td>{proceso.Nom_Proceso}</td>
                      <td>{proceso.Id_Responsable}</td>
                      <td>{proceso.estado}</td>
                      <td>
                        <button
                          style={styles.editButton}
                          onClick={() => getProceso(proceso.Id_Proceso)}
                        >
                          ✏️
                        </button>
                        <button
                          style={styles.deleteButton}
                          onClick={() => deleteProceso(proceso.Id_Proceso)}
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">No hay procesos disponibles</td>
                  </tr>
                )}
              </tbody>
            </table>
            <Pagination setDesde={setDesde} setHasta={setHasta} />
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  crudContainer: {
    display: 'flex',
  },
  mainContent: {
    flex: 1,
    padding: '20px',
    backgroundColor: '#f4f4f9',
    minHeight: '100vh',
  },
  pageTitle: {
    fontSize: '32px',
    fontWeight: 'bold',
    marginBottom: '20px',
    textAlign: 'center',
    color: '#333',
  },
  contentWrapper: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '20px',
    backgroundColor: '#fff',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  },
  tableWrapper: {
    marginTop: '20px',
  },
  processTable: {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '20px',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  },
  editButton: {
    backgroundColor: '#4caf50',
    border: 'none',
    color: 'white',
    padding: '8px 12px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '16px',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '5px',
    transition: 'background-color 0.3s',
  },
  deleteButton: {
    backgroundColor: '#f44336',
    border: 'none',
    color: 'white',
    padding: '8px 12px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '16px',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
};

export default CrudProcesses;
