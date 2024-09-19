import React, { useState, useEffect } from 'react';
import clienteAxios from '../api.js';
import Swal from 'sweetalert2';
import Pagination from '../components/Pagination/Pagination';
import FormAreas from './FormAreas.jsx';
import FormQueryArea from './FormQueryArea.jsx';
import SidebarAdministrator from '../components/Admin/SidebarAdministrator.jsx';
import Modal from '../components/Modal/Init-Modal.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';
import ActionButtons from '../components/Buttons/ActionsButton.jsx'; // Importa el componente

const CrudAreas = () => {
  const [areaList, setAreaList] = useState([]);
  const [area, setArea] = useState({
    Nom_Area: '',
    estado: 'Sí',
  });
  const [areaQuery, setAreaQuery] = useState([]);
  const [buttonForm, setButtonForm] = useState('Enviar');
  const [desde, setDesde] = useState(0);
  const [hasta, setHasta] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getAllAreas();
  }, [desde, hasta]);

  const getAllAreas = async () => {
    try {
      const response = await clienteAxios.get('/api/areas');
      setAreaList(response.data);
      setAreaQuery(response.data);
    } catch (error) {
      console.error('Error al obtener las áreas:', error);
    }
  };

  const getArea = async (Id_Area) => {
    try {
      const response = await clienteAxios.get(`/api/areas/${Id_Area}`);
      setArea(response.data);
      setButtonForm('Actualizar');
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error al obtener el área:', error);
    }
  };

  const deleteArea = async (Id_Area) => {
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
        await clienteAxios.delete(`/api/areas/${Id_Area}`);
        Swal.fire('Eliminado!', 'El registro ha sido eliminado.', 'success');
        getAllAreas(); // Actualiza la tabla después de eliminar
      } catch (error) {
        console.error('Error al eliminar el área:', error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!/^[A-Za-z\s]+$/.test(area.Nom_Area)) {
      Swal.fire(
        'Error!',
        'El nombre del área solo puede contener letras y espacios.',
        'error'
      );
      return;
    }

    try {
      if (buttonForm === 'Enviar') {
        await clienteAxios.post('/api/areas', area);
        Swal.fire('Agregado!', 'El área ha sido agregada.', 'success');
      } else {
        await clienteAxios.put(`/api/areas/${area.Id_Area}`, area);
        Swal.fire('Actualizado!', 'El área ha sido actualizada.', 'success');
      }
      resetForm();
      setIsModalOpen(false);
      getAllAreas(); // Actualiza la tabla después de la acción
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    }
  };

  const resetForm = () => {
    setArea({
      Nom_Area: '',
      estado: 'Sí',
    });
    setButtonForm('Enviar');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f4f4f4' }}>
      <SidebarAdministrator style={{ width: '240px', backgroundColor: '#343a40' }} />
      <div style={{ flex: 1, padding: '20px', marginLeft: '240px' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '20px', fontSize: '2rem', fontFamily: 'Georgia, serif', textTransform: 'uppercase' }}>
          Gestión de Áreas
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
            <FormAreas
              area={area}
              setArea={setArea}
              handleSubmit={handleSubmit}
              buttonForm={buttonForm}
              resetForm={resetForm}
            />
          </Modal>

          <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
            <FormQueryArea
              areaQuery={areaQuery}
              setAreaQuery={setAreaQuery}
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
                {areaList.slice(desde, hasta).map((area) => (
                  <tr key={area.Id_Area}>
                    <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'center' }}>{area.Id_Area}</td>
                    <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'center' }}>{area.Nom_Area}</td>
                    <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'center' }}>{area.estado}</td>
                    <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'center' }}>
                      <ActionButtons
                        onEdit={() => getArea(area.Id_Area)}
                        onDelete={() => deleteArea(area.Id_Area)}
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
            data={areaList}
          />
        </div>
      </div>
    </div>
  );
};

export default CrudAreas;
