import React, { useState, useEffect } from 'react';
import clienteAxios from '../api.js';
import Swal from 'sweetalert2';
import Pagination from '../components/Pagination/Pagination';
import FormUnits from './FormUnits.jsx';
import FormQueryUnit from './FormQueryUnits.jsx';
import SidebarAdministrator from '../components/Admin/SidebarAdministrator.jsx';
import Modal from '../components/Modal/Init-Modal.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';
import ActionButtons from '../components/Buttons/ActionsButton.jsx'; // Importa el componente

const CrudUnits = () => {
  const [unitList, setUnitList] = useState([]);
  const [unit, setUnit] = useState({
    Nom_Unidad: '',
    estado: 'Sí',
  });
  const [unitQuery, setUnitQuery] = useState([]);
  const [buttonForm, setButtonForm] = useState('Enviar');
  const [desde, setDesde] = useState(0);
  const [hasta, setHasta] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getAllUnits();
  }, [desde, hasta]);

  const getAllUnits = async () => {
    try {
      const response = await clienteAxios.get('/api/units');
      setUnitList(response.data);
      setUnitQuery(response.data);
    } catch (error) {
      console.error('Error al obtener las unidades:', error);
    }
  };

  const getUnit = async (Id_Unidad) => {
    try {
      const response = await clienteAxios.get(`/api/units/${Id_Unidad}`);
      setUnit(response.data);
      setButtonForm('Actualizar');
      setIsModalOpen(true);
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
      confirmButtonText: 'Sí, eliminarlo!',
    });

    if (result.isConfirmed) {
      try {
        await clienteAxios.delete(`/api/units/${Id_Unidad}`);
        Swal.fire('Eliminado!', 'El registro ha sido eliminado.', 'success');
        getAllUnits(); // Actualiza la tabla después de eliminar
      } catch (error) {
        console.error('Error al eliminar la unidad:', error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!/^[A-Za-z\s]+$/.test(unit.Nom_Unidad)) {
      Swal.fire(
        'Error!',
        'El nombre de la unidad solo puede contener letras y espacios.',
        'error'
      );
      return;
    }

    try {
      if (buttonForm === 'Enviar') {
        await clienteAxios.post('/api/units', unit);
        Swal.fire('Agregado!', 'La unidad ha sido agregada.', 'success');
      } else {
        await clienteAxios.put(`/api/units/${unit.Id_Unidad}`, unit);
        Swal.fire('Actualizado!', 'La unidad ha sido actualizada.', 'success');
      }
      resetForm();
      setIsModalOpen(false);
      getAllUnits(); // Actualiza la tabla después de la acción
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    }
  };

  const resetForm = () => {
    setUnit({
      Nom_Unidad: '',
      estado: 'Sí',
    });
    setButtonForm('Enviar');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f4f4f4' }}>
      <SidebarAdministrator style={{ width: '240px', backgroundColor: '#343a40' }} />
      <div style={{ flex: 1, padding: '20px', marginLeft: '240px' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '20px', fontSize: '2rem', fontFamily: 'Georgia, serif', textTransform: 'uppercase' }}>
          Gestión de Unidades
        </h1>
        <div style={{ width: '100%', maxWidth: '1200px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', padding: '0 20px' }}>
          <button
            style={{
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
            }}
            onClick={() => {
              resetForm();
              setIsModalOpen(true);
            }}
          >
            <FontAwesomeIcon icon={faBuilding} style={{ marginRight: '8px' }} />
            Añadir
          </button>

          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <FormUnits
              unit={unit}
              setUnit={setUnit}
              handleSubmit={handleSubmit}
              buttonForm={buttonForm}
              resetForm={resetForm}
            />
          </Modal>

          <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
            <FormQueryUnit
              unitQuery={unitQuery}
              setUnitQuery={setUnitQuery}
            />
            <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#fff', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
              <thead>
                <tr>
                  <th style={{ backgroundColor: '#f9f9f9', textAlign: 'center', fontWeight: 'bold' }}>ID</th>
                  <th style={{ backgroundColor: '#f9f9f9', textAlign: 'center', fontWeight: 'bold' }}>Nombre</th>
                  <th style={{ backgroundColor: '#f9f9f9', textAlign: 'center', fontWeight: 'bold' }}>Estado</th>
                  <th style={{ backgroundColor: '#f9f9f9', textAlign: 'center', fontWeight: 'bold' }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {unitList.slice(desde, hasta).map((unit) => (
                  <tr key={unit.Id_Unidad}>
                    <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'center' }}>{unit.Id_Unidad}</td>
                    <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'center' }}>{unit.Nom_Unidad}</td>
                    <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'center' }}>{unit.estado}</td>
                    <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'center' }}>
                      <ActionButtons
                        onEdit={() => getUnit(unit.Id_Unidad)}
                        onDelete={() => deleteUnit(unit.Id_Unidad)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Pagination
            desde={desde}
            setDesde={setDesde}
            hasta={hasta}
            setHasta={setHasta}
            data={unitList}
          />
        </div>
      </div>
    </div>
  );
};

export default CrudUnits;
