import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from '../components/Modal/Init-Modal.jsx'; // Asegúrate de crear este archivo para el modal
import FormUnits from './formUnits.jsx';
import FormQueryUnit from './formQueryUnits.jsx';
import Pagination from '../components/Pagination/Pagination';
import SidebarAdministrator from '../components/Admin/SidebarAdministrator.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLayerGroup } from '@fortawesome/free-solid-svg-icons';
import '../components/styles/stylesCrudUnits.css';

const CrudUnits = () => {
  const [units, setUnits] = useState([]);
  const [unit, setUnit] = useState({});
  const [unitQuery, setUnitQuery] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [desde, setDesde] = useState(0);
  const [hasta, setHasta] = useState(10);
  const [buttonForm, setButtonForm] = useState('Añadir');
  const [areas, setAreas] = useState([]);

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
    }
  };

  const fetchAreas = async () => {
    try {
      const response = await axios.get('/api/areas');
      setAreas(response.data);
    } catch (error) {
      console.error('Error fetching areas:', error);
    }
  };

  const getUnit = (id) => {
    const selectedUnit = units.find((u) => u.Id_Unidad === id);
    setUnit(selectedUnit);
    setButtonForm('Actualizar');
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    }
  };

  const updateUnit = async () => {
    try {
      await axios.put(`/api/unidades/${unit.Id_Unidad}`, unit);
      fetchUnits();
    } catch (error) {
      console.error('Error updating unit:', error);
    }
  };

  const deleteUnit = async (id) => {
    try {
      await axios.delete(`/api/unidades/${id}`);
      fetchUnits();
    } catch (error) {
      console.error('Error deleting unit:', error);
    }
  };

  const resetForm = () => {
    setUnit({});
    setButtonForm('Añadir');
  };

  const getAreaNameById = (areaId) => {
    const area = areas.find((a) => a.Id_Area === areaId);
    return area ? area.Nom_Area : 'N/A';
  };

  return (
    <div className="root">
      <div className="crudContainer">
        <SidebarAdministrator className="sidebar" />
        <div className="mainContent">
          <h1 className="pageTitle">Gestión de Unidades</h1>
          <div className="contentWrapper">
            <button
              className="addButton"
              onClick={() => {
                resetForm();
                setIsModalOpen(true); // Abrir el modal para agregar una unidad
              }}
            >
              <FontAwesomeIcon icon={faLayerGroup} className="icon" /> Añadir
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

            <div className="tableWrapper">
              <FormQueryUnit
                unitQuery={unitQuery}
                setUnitQuery={setUnitQuery}
              />
              <table className="unitTable">
                <thead>
                  <tr>
                    <th className="tableHeader">ID</th>
                    <th className="tableHeader">Nombre de la Unidad</th>
                    <th className="tableHeader">Área</th>
                    <th className="tableHeader">Estado</th>
                    <th className="tableHeader">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(unitQuery) &&
                    unitQuery.slice(desde, hasta).map((unit) => (
                      <tr
                        key={unit.Id_Unidad}
                        className="tableRow"
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.backgroundColor =
                            document.querySelector('.tableRowHover').style.backgroundColor)
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.backgroundColor =
                            document.querySelector('.tableRow').style.backgroundColor)
                        }
                      >
                        <td className="tableCell">{unit.Id_Unidad}</td>
                        <td className="tableCell">{unit.Nom_Unidad}</td>
                        <td className="tableCell">{getAreaNameById(unit.Id_Area)}</td>
                        <td className="tableCell">{unit.estado}</td>
                        <td className="tableCell actionButtons">
                          <button
                            className="button"
                            onClick={() => getUnit(unit.Id_Unidad)}
                          >
                            Editar
                          </button>
                          <button
                            className="button buttonDelete"
                            onClick={() => deleteUnit(unit.Id_Unidad)}
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              <Pagination
                totalItems={unitQuery.length}
                itemsPerPage={10}
                currentPage={Math.ceil((desde + 1) / 10)}
                onPageChange={(page) => {
                  const start = (page - 1) * 10;
                  const end = start + 10;
                  setDesde(start);
                  setHasta(end);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrudUnits;
