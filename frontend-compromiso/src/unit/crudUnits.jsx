import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from '../components/Modal/Init-Modal.jsx';
import FormUnits from './formUnits.jsx';
import FormQueryUnit from './formQueryUnits.jsx';
import Pagination from '../components/Pagination/Pagination';
import SidebarAdministrator from '../components/Admin/SidebarAdministrator.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLayerGroup } from '@fortawesome/free-solid-svg-icons';

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
  icon: {
    marginRight: '8px',
  },
  tableWrapper: {
    width: '100%',
    maxWidth: '800px',
    margin: '0 auto',
  },
  unitTable: {
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
  buttonDelete: {
    backgroundColor: '#f44336',
    color: '#fff',
  },
};

const CrudUnits = () => {
  const [units, setUnits] = useState([]);
  const [unit, setUnit] = useState({});
  const [unitQuery, setUnitQuery] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [desde, setDesde] = useState(0);
  const [hasta, setHasta] = useState(10);
  const [buttonForm, setButtonForm] = useState('Añadir');
  const [areas, setAreas] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    fetchUnits();
    fetchAreas();
  }, []);

  const fetchUnits = async () => {
    try {
      const response = await axios.get('/api/unidades');
      setUnits(response.data);
      setUnitQuery(response.data);
    } catch (error) {
      console.error('Error fetching units:', error);
      setErrorMsg('Error al cargar las unidades.');
    }
  };

  const fetchAreas = async () => {
    try {
      const response = await axios.get('/api/areas');
      setAreas(response.data);
    } catch (error) {
      console.error('Error fetching areas:', error);
      setErrorMsg('Error al cargar las áreas.');
    }
  };

  const validateUnit = () => {
    if (!unit.Nom_Unidad || !unit.Id_Area || !unit.estado) {
      setErrorMsg('Todos los campos son obligatorios.');
      return false;
    }
    return true;
  };

  const getUnit = (id) => {
    const selectedUnit = units.find((u) => u.Id_Unidad === id);
    setUnit(selectedUnit);
    setButtonForm('Actualizar');
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateUnit()) return;

    if (buttonForm === 'Añadir') {
      await addUnit();
    } else {
      await updateUnit();
    }
    setIsModalOpen(false);
    resetForm();
  };

  const addUnit = async () => {
    try {
      await axios.post('/api/unidades', unit);
      fetchUnits();
    } catch (error) {
      console.error('Error adding unit:', error);
      setErrorMsg('Error al añadir la unidad.');
    }
  };

  const updateUnit = async () => {
    try {
      await axios.put(`/api/unidades/${unit.Id_Unidad}`, unit);
      fetchUnits();
    } catch (error) {
      console.error('Error updating unit:', error);
      setErrorMsg('Error al actualizar la unidad.');
    }
  };

  const deleteUnit = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta unidad?')) {
      try {
        await axios.delete(`/api/unidades/${id}`);
        fetchUnits();
      } catch (error) {
        console.error('Error deleting unit:', error);
        setErrorMsg('Error al eliminar la unidad.');
      }
    }
  };

  const resetForm = () => {
    setUnit({});
    setButtonForm('Añadir');
    setErrorMsg('');
  };

  const getAreaNameById = (areaId) => {
    const area = areas.find((a) => a.Id_Area === areaId);
    return area ? area.Nom_Area : 'N/A';
  };

  return (
    <div style={styles.root}>
      <div style={styles.crudContainer}>
        <SidebarAdministrator style={styles.sidebar} />
        <div style={styles.mainContent}>
          <h1 style={styles.pageTitle}>Gestión de Unidades</h1>
          {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
          <div style={styles.contentWrapper}>
            <button
              style={styles.addButton}
              onClick={() => {
                resetForm();
                setIsModalOpen(true);
              }}
            >
              <FontAwesomeIcon icon={faLayerGroup} style={styles.icon} />
              Añadir
            </button>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
              <FormUnits
                unit={unit}
                setUnit={setUnit}
                handleSubmit={handleSubmit}
                buttonForm={buttonForm}
                resetForm={resetForm}
                areas={areas}
              />
            </Modal>

            <div style={styles.tableWrapper}>
              <FormQueryUnit unitQuery={unitQuery} setUnitQuery={setUnitQuery} />
              <table style={styles.unitTable}>
                <thead>
                  <tr>
                    <th style={styles.tableHeader}>ID</th>
                    <th style={styles.tableHeader}>Nombre de la Unidad</th>
                    <th style={styles.tableHeader}>Área</th>
                    <th style={styles.tableHeader}>Estado</th>
                    <th style={styles.tableHeader}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(unitQuery) &&
                    unitQuery.slice(desde, hasta).map((unit) => (
                      <tr key={unit.Id_Unidad}>
                        <td style={styles.tableCell}>{unit.Id_Unidad}</td>
                        <td style={styles.tableCell}>{unit.Nom_Unidad}</td>
                        <td style={styles.tableCell}>{getAreaNameById(unit.Id_Area)}</td>
                        <td style={styles.tableCell}>{unit.estado}</td>
                        <td style={styles.tableCell}>
                          <div style={styles.actionButtons}>
                            <button
                              style={styles.button}
                              onClick={() => getUnit(unit.Id_Unidad)}
                            >
                              Editar
                            </button>
                            <button
                              style={{ ...styles.button, ...styles.buttonDelete }}
                              onClick={() => deleteUnit(unit.Id_Unidad)}
                            >
                              Eliminar
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <Pagination desde={desde} hasta={hasta} setDesde={setDesde} setHasta={setHasta} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrudUnits;
