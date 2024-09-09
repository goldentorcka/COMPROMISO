import React, { useState, useEffect } from 'react';
import clienteAxios from '../api.js';
import Swal from 'sweetalert2';
import Pagination from '../components/Pagination/Pagination';
import FormUnits from './formUnits.jsx';
import FormQueryUnit from './formQueryUnits.jsx';
import SidebarAdministrator from '../components/Admin/SidebarAdministrator.jsx';
import Modal from '../components/Modal/Init-Modal.jsx'; // Asegúrate de crear este archivo para el modal

const CrudUnits = () => {
  const [unitList, setUnitList] = useState([]);
  const [unit, setUnit] = useState({
    Nom_Unidad: '',
    Id_Area: '',
    estado: 'No',
  });
  const [unitQuery, setUnitQuery] = useState([]);
  const [areas, setAreas] = useState([]);
  const [buttonForm, setButtonForm] = useState('Enviar');
  const [desde, setDesde] = useState(0);
  const [hasta, setHasta] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para el modal

  useEffect(() => {
    getAllUnits();
    getAllAreas();
  }, [desde, hasta]);

  const getAllUnits = async () => {
    try {
      const response = await clienteAxios.get('/api/unidades');
      setUnitList(response.data);
      setUnitQuery(response.data);
    } catch (error) {
      console.error('Error al obtener las unidades:', error);
    }
  };

  const getAllAreas = async () => {
    try {
      const response = await clienteAxios.get('/api/areas');
      setAreas(response.data);
    } catch (error) {
      console.error('Error al obtener las áreas:', error);
    }
  };

  const getUnit = async (Id_Unidad) => {
    try {
      const response = await clienteAxios.get(`/api/unidades/${Id_Unidad}`);
      setUnit(response.data);
      setButtonForm('Actualizar');
      setIsModalOpen(true); // Abrir el modal al obtener una unidad
    } catch (error) {
      console.error('Error al obtener la unidad:', error);
    }
  };

  const deleteUnit = async (Id_Unidad) => {
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
        await clienteAxios.delete(`/api/unidades/${Id_Unidad}`);
        Swal.fire('Eliminado!', 'El registro ha sido eliminado.', 'success');
        getAllUnits();
      } catch (error) {
        console.error('Error al eliminar la unidad:', error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (buttonForm === 'Enviar') {
        await clienteAxios.post('/api/unidades', unit);
        Swal.fire('Agregado!', 'La unidad ha sido agregada.', 'success');
      } else {
        await clienteAxios.put(`/api/unidades/${unit.Id_Unidad}`, unit);
        Swal.fire('Actualizado!', 'La unidad ha sido actualizada.', 'success');
      }
      resetForm();
      getAllUnits();
      setIsModalOpen(false); // Cerrar el modal al enviar el formulario
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    }
  };

  const resetForm = () => {
    setUnit({
      Nom_Unidad: '',
      Id_Area: '',
      estado: 'No',
    });
    setButtonForm('Enviar');
  };

  const getAreaNameById = (id) => {
    const area = areas.find((area) => area.Id_Area === id);
    return area ? area.Nom_Area : 'Área no disponible';
  };

  return (
    <div className="crud-container">
      <SidebarAdministrator />
      <div className="main-content">
        <h1 className="page-title">Gestión de Unidades</h1>
        <div className="content-wrapper">
          <button
            onClick={() => {
              resetForm();
              setIsModalOpen(true); // Abrir el modal para agregar una unidad
            }}
            className="open-modal-button"
          >
            Añadir Unidad
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
          
          <div className="table-wrapper">
            <FormQueryUnit
              unitQuery={unitQuery}
              setUnitQuery={setUnitQuery}
            />
            <table className="unit-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre de la Unidad</th>
                  <th>Área</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(unitQuery) &&
                  unitQuery.slice(desde, hasta).map((unit) => (
                    <tr key={unit.Id_Unidad}>
                      <td>{unit.Id_Unidad}</td>
                      <td>{unit.Nom_Unidad}</td>
                      <td>{getAreaNameById(unit.Id_Area)}</td>
                      <td>{unit.estado}</td>
                      <td>
                        <div className="action-buttons">
                          <button
                            className="edit-button"
                            onClick={() => getUnit(unit.Id_Unidad)}
                          >
                            ✏️
                          </button>
                          <button
                            className="delete-button"
                            onClick={() => deleteUnit(unit.Id_Unidad)}
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
              URI="/api/unidades"
              setDesde={setDesde}
              setHasta={setHasta}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrudUnits;
