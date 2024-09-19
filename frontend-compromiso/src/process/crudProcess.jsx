import React, { useState, useEffect } from 'react';
import clienteAxios from '../api.js';
import Swal from 'sweetalert2';
import Pagination from '../components/Pagination/Pagination';
import FormProcess from './FormProcess.jsx';
import FormQueryProcess from './FormQueryProcess.jsx';
import SidebarAdministrator from '../components/Admin/SidebarAdministrator.jsx';
import Modal from '../components/Modal/Init-Modal.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faProjectDiagram } from '@fortawesome/free-solid-svg-icons';
import ActionButtons from '../components/Buttons/ActionsButton.jsx'; // Asegúrate de tener este componente

const styles = {
  root: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#f4f4f4',
  },
  crudContainer: {
    display: 'flex',
    flex: 1,
    padding: '20px',
    marginLeft: '240px',
  },
  sidebar: {
    width: '240px',
    backgroundColor: '#343a40',
  },
  mainContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  pageTitle: {
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '2rem',
    fontFamily: 'Georgia, serif',
    textTransform: 'uppercase',
  },
  contentWrapper: {
    width: '100%',
    maxWidth: '1200px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
    padding: '0 20px',
  },
  addButton: {
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
  },
  icon: {
    marginRight: '8px',
  },
  tableWrapper: {
    width: '100%',
    maxWidth: '800px',
    margin: '0 auto',
  },
  processTable: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: '#fff',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  tableHeader: {
    backgroundColor: '#f9f9f9',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  tableCell: {
    border: '1px solid #ddd',
    padding: '10px',
    textAlign: 'center',
  },
  actionButtons: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
  },
  button: {
    padding: '5px 10px',
    fontSize: '1rem',
    cursor: 'pointer',
    border: 'none',
    borderRadius: '5px',
  },
};

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
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getAllProcesses();
    getAllResponsables();
  }, [desde, hasta]);

  const getAllProcesses = async () => {
    try {
      const response = await clienteAxios.get('/api/procesos');
      setProcessList(response.data);
      setProcessQuery(response.data);
    } catch (error) {
      console.error('Error al obtener los procesos:', error);
    }
  };

  const getAllResponsables = async () => {
    try {
      const response = await clienteAxios.get('/api/responsables');
      setResponsables(response.data);
    } catch (error) {
      console.error('Error al obtener responsables:', error);
    }
  };

  const getProcess = async (Id_Proceso) => {
    try {
      const response = await clienteAxios.get(`/api/procesos/${Id_Proceso}`);
      setProcess(response.data);
      setButtonForm('Actualizar');
      setIsModalOpen(true);
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
      confirmButtonText: 'Sí, eliminarlo!',
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
      setIsModalOpen(false);
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

  const getResponsableName = (id) => {
    const responsable = responsables.find(r => r.Id_Responsable === id);
    return responsable ? responsable.Nom_Responsable : 'Desconocido';
  };

  return (
    <div style={styles.root}>
      <SidebarAdministrator style={styles.sidebar} />
      <div style={styles.crudContainer}>
        <div style={styles.mainContent}>
          <h1 style={styles.pageTitle}>Gestión de Procesos</h1>
          <div style={styles.contentWrapper}>
            <button
              style={styles.addButton}
              onClick={() => {
                resetForm();
                setIsModalOpen(true);
              }}
            >
              <FontAwesomeIcon icon={faProjectDiagram} style={styles.icon} /> Añadir
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

            <div style={styles.tableWrapper}>
              <FormQueryProcess
                processQuery={processQuery}
                setProcessQuery={setProcessQuery}
              />
              <table style={styles.processTable}>
                <thead>
                  <tr>
                    <th style={styles.tableHeader}>ID</th>
                    <th style={styles.tableHeader}>Nombre del Proceso</th>
                    <th style={styles.tableHeader}>Responsable</th>
                    <th style={styles.tableHeader}>Estado</th>
                    <th style={styles.tableHeader}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {processList.slice(desde, hasta).map((process) => (
                    <tr key={process.Id_Proceso}>
                      <td style={styles.tableCell}>{process.Id_Proceso}</td>
                      <td style={styles.tableCell}>{process.Nom_Proceso}</td>
                      <td style={styles.tableCell}>{getResponsableName(process.Id_Responsable)}</td>
                      <td style={styles.tableCell}>{process.estado}</td>
                      <td style={styles.tableCell}>
                        <ActionButtons
                          onEdit={() => getProcess(process.Id_Proceso)}
                          onDelete={() => deleteProcess(process.Id_Proceso)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <Pagination
                desde={desde}
                setDesde={setDesde}
                hasta={hasta}
                setHasta={setHasta}
                data={processList}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrudProcess;
