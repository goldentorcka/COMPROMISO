import React, { useState, useEffect } from 'react';
import clienteAxios from '../api.js';
import Swal from 'sweetalert2';
import Pagination from '../components/Pagination/Pagination';
import FormResponsables from './formResponsibles.jsx';
import SidebarAdministrator from '../components/Admin/SidebarAdministrator.jsx';
import Modal from '../components/Modal/Init-Modal.jsx';
import DownloadButtons from '../components/Buttons/ButtonsDowload.jsx'; // Importa el componente

const styles = {
  root: {
    minHeight: '100vh',
    backgroundColor: '#f4f4f4',
    overflowX: 'hidden',
  },
  crudContainer: {
    display: 'flex',
    minHeight: 'calc(100vh - 60px)',
    width: '107%',
  },
  sidebar: {
    width: '250px',
    backgroundColor: '#333',
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '20px',
  },
  mainContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    marginTop: '20px',
  },
  pageTitle: {
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '2rem',
  },
  contentWrapper: {
    width: '100%',
    maxWidth: '1200px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '20px',
    paddingLeft: '20px',
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
    marginLeft: '190px',
  },
  tableWrapper: {
    width: '100%',
    maxWidth: '800px',
    margin: '0 auto',
  },
  responsableTable: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: '#fff',
  },
  tableHeader: {
    backgroundColor: '#f9f9f9',
    textAlign: 'center',
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
  editButton: {
    backgroundColor: '#4caf50',
    color: '#fff',
  },
  deleteButton: {
    backgroundColor: '#f44336',
    color: '#fff',
  },
};

const CrudResponsables = () => {
  const [responsableList, setResponsableList] = useState([]);
  const [responsable, setResponsable] = useState({
    Nom_Responsable: '',
    estado: 'Activo',
  });
  const [responsableQuery, setResponsableQuery] = useState([]);
  const [buttonForm, setButtonForm] = useState('Enviar');
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalRegistros, setTotalRegistros] = useState(0);
  const [registrosPorPagina] = useState(10); // Número de registros por página
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getAllResponsables();
  }, [paginaActual]);

  const getAllResponsables = async () => {
    try {
      const response = await clienteAxios.get('/api/responsables');
      const totalRegistros = response.data.length;
      setTotalRegistros(totalRegistros);
      const startIndex = (paginaActual - 1) * registrosPorPagina;
      const endIndex = startIndex + registrosPorPagina;
      setResponsableList(response.data);
      setResponsableQuery(response.data.slice(startIndex, endIndex));
    } catch (error) {
      console.error('Error al obtener los responsables:', error);
    }
  };

  const getResponsable = async (Id_Responsable) => {
    try {
      const response = await clienteAxios.get(`/api/responsables/${Id_Responsable}`);
      setResponsable(response.data);
      setButtonForm('Actualizar');
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error al obtener el responsable:', error);
    }
  };

  const deleteResponsable = async (Id_Responsable) => {
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
        await clienteAxios.delete(`/api/responsables/${Id_Responsable}`);
        Swal.fire('Eliminado!', 'El registro ha sido eliminado.', 'success');
        getAllResponsables();
      } catch (error) {
        console.error('Error al eliminar el responsable:', error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (buttonForm === 'Enviar') {
        await clienteAxios.post('/api/responsables', responsable);
        Swal.fire('Agregado!', 'El responsable ha sido agregado.', 'success');
      } else {
        await clienteAxios.put(`/api/responsables/${responsable.Id_Responsable}`, responsable);
        Swal.fire('Actualizado!', 'El responsable ha sido actualizado.', 'success');
      }
      resetForm();
      setIsModalOpen(false);
      getAllResponsables();
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    }
  };

  const resetForm = () => {
    setResponsable({
      Nom_Responsable: '',
      estado: 'Activo',
    });
    setButtonForm('Enviar');
  };

  return (
    <div style={styles.root}>
      <div style={styles.crudContainer}>
        <SidebarAdministrator style={styles.sidebar} />
        <div style={styles.mainContent}>
          <h1 style={styles.pageTitle}>Gestión de Responsables</h1>
          <div style={styles.contentWrapper}>
            <button
              style={styles.addButton}
              onClick={() => {
                setResponsable({
                  Nom_Responsable: '',
                  estado: 'Activo',
                });
                setButtonForm('Enviar');
                setIsModalOpen(true);
              }}
            >
              Agregar Responsable
            </button>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
              <FormResponsables
                responsable={responsable}
                setResponsable={setResponsable}
                handleSubmit={handleSubmit}
                buttonForm={buttonForm}
              />
            </Modal>

            <DownloadButtons data={responsableList} formType="responsable" /> {/* Agrega los botones de descarga */}

            <div style={styles.tableWrapper}>
              <table style={styles.responsableTable}>
                <thead>
                  <tr>
                    <th style={styles.tableHeader}>ID</th>
                    <th style={styles.tableHeader}>Nombre del Responsable</th>
                    <th style={styles.tableHeader}>Estado</th>
                    <th style={styles.tableHeader}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(responsableQuery) &&
                    responsableQuery.map((responsable) => (
                      <tr key={responsable.Id_Responsable}>
                        <td style={styles.tableCell}>{responsable.Id_Responsable}</td>
                        <td style={styles.tableCell}>{responsable.Nom_Responsable}</td>
                        <td style={styles.tableCell}>{responsable.estado}</td>
                        <td style={styles.tableCell}>
                          <div style={styles.actionButtons}>
                            <button
                              style={{ ...styles.button, ...styles.editButton }}
                              onClick={() => getResponsable(responsable.Id_Responsable)}
                            >
                              ✏️
                            </button>
                            <button
                              style={{ ...styles.button, ...styles.deleteButton }}
                              onClick={() => deleteResponsable(responsable.Id_Responsable)}
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
                totalRegistros={totalRegistros}
                registrosPorPagina={registrosPorPagina}
                paginaActual={paginaActual}
                setPaginaActual={setPaginaActual}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrudResponsables;
