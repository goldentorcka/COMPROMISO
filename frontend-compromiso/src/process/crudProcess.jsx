import React, { useState, useEffect } from 'react';
import clienteAxios from '../api'; // Ajusta la ruta según la ubicación de tu archivo api.js
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
      setProcesosList(response.data);
    } catch (error) {
      console.error("Error al obtener los procesos:", error);
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
        await clienteAxios.delete(`/procesos/${Id_Proceso}`);
        Swal.fire('Eliminado!', 'El registro ha sido eliminado.', 'success');
        getAllProcesos();
      } catch (error) {
        console.error("Error al eliminar el proceso:", error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (buttonForm === "Enviar") {
        await clienteAxios.post('/procesos', proceso);
        Swal.fire('Agregado!', 'El proceso ha sido agregado.', 'success');
      } else {
        await clienteAxios.put(`/procesos/${proceso.Id_Proceso}`, proceso);
        Swal.fire('Actualizado!', 'El proceso ha sido actualizado.', 'success');
      }
      resetForm();
      getAllProcesos();
      setStateAddProceso(false);
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    }
  };

  const resetForm = () => {
    setProceso({
      Nom_Proceso: "",
      Id_Responsable: "",
      estado: "Sí",
    });
    setButtonForm("Enviar");
  };

  return (
    <div style={styles.crudContainer}>
      <h1 style={styles.pageTitle} className="animatedTitle">Gestión de Procesos</h1>
      <div style={styles.mainContent}>
        <div style={styles.contentWrapper}>
          {stateAddProceso && (
            <FormProcesses
              proceso={proceso}
              setProceso={setProceso}
              handleSubmit={handleSubmit}
              buttonForm={buttonForm}
            />
          )}
          <table style={styles.procesoTable}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Responsable</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(procesosList) && procesosList.slice(desde, hasta).map((proceso) => (
                <tr key={proceso.Id_Proceso}>
                  <td>{proceso.Id_Proceso}</td>
                  <td>{proceso.Nom_Proceso}</td>
                  <td>{proceso.Id_Responsable}</td>
                  <td>{proceso.estado}</td>
                  <td>
                    <button style={styles.editButton} onClick={() => getProceso(proceso.Id_Proceso)}>✏️</button>
                    <button style={styles.deleteButton} onClick={() => deleteProceso(proceso.Id_Proceso)}>🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            URI="/procesos"
            setDesde={setDesde}
            setHasta={setHasta}
          />
        </div>
      </div>
    </div>
  );
};

const styles = {
  crudContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
  },
  mainContent: {
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  contentWrapper: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '20px',
    backgroundColor: '#fff',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  },
  pageTitle: {
    fontSize: '32px',
    fontWeight: 'bold',
    marginBottom: '20px',
    textAlign: 'center',
  },
  procesoTable: {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '20px',
  },
  editButton: {
    background: 'none',
    border: 'none',
    color: '#3085d6',
    cursor: 'pointer',
  },
  deleteButton: {
    background: 'none',
    border: 'none',
    color: '#d33',
    cursor: 'pointer',
    marginLeft: '10px',
  },
};

export default CrudProcesses;
