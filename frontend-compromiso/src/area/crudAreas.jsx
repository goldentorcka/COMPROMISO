import React, { useState, useEffect } from 'react';
import clienteAxios from '../api.js';
import Swal from 'sweetalert2';
import Pagination from '../components/Pagination/Pagination';
import FormAreas from './formAreas.jsx';
import FormQueryArea from './FormQueryArea.jsx';
import SidebarAdministrator from '../components/Admin/SidebarAdministrator.jsx'; // Ajusta la ruta según la ubicación

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

  useEffect(() => {
    getAllAreas();
  }, [desde, hasta]);

  const getAllAreas = async () => {
    try {
      const response = await clienteAxios.get('/api/areas');
      setAreaList(response.data);
      setAreaQuery(response.data); // Inicializar areaQuery con todas las áreas
    } catch (error) {
      console.error('Error al obtener las áreas:', error);
    }
  };

  const getArea = async (Id_Area) => {
    try {
      const response = await clienteAxios.get(`/api/areas/${Id_Area}`);
      setArea(response.data);
      setButtonForm('Actualizar');
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
      confirmButtonText: 'Sí, eliminarlo!'
    });

    if (result.isConfirmed) {
      try {
        await clienteAxios.delete(`/api/areas/${Id_Area}`);
        Swal.fire('Eliminado!', 'El registro ha sido eliminado.', 'success');
        getAllAreas();
      } catch (error) {
        console.error('Error al eliminar el área:', error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (buttonForm === 'Enviar') {
        await clienteAxios.post('/api/areas', area);
        Swal.fire('Agregado!', 'El área ha sido agregada.', 'success');
      } else {
        await clienteAxios.put(`/api/areas/${area.Id_Area}`, area);
        Swal.fire('Actualizado!', 'El área ha sido actualizada.', 'success');
      }
      resetForm();
      getAllAreas();
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
    <div className="crud-container">
      <SidebarAdministrator />
      <div className="main-content">
        <h1 className="page-title">Gestión de Áreas</h1>
        <div className="content-wrapper">
          <FormAreas
            area={area}
            setArea={setArea}
            handleSubmit={handleSubmit}
            buttonForm={buttonForm}
            resetForm={resetForm}
          />
          <div className="table-wrapper">
            <FormQueryArea
              areaQuery={areaQuery}
              setAreaQuery={setAreaQuery}
            />
            <table className="area-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre del Área</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(areaQuery) &&
                  areaQuery.slice(desde, hasta).map((area) => (
                    <tr key={area.Id_Area}>
                      <td>{area.Id_Area}</td>
                      <td>{area.Nom_Area}</td>
                      <td>{area.estado}</td>
                      <td>
                        <div className="action-buttons">
                          <button
                            className="edit-button"
                            onClick={() => getArea(area.Id_Area)}
                          >
                            ✏️
                          </button>
                          <button
                            className="delete-button"
                            onClick={() => deleteArea(area.Id_Area)}
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
              URI="/api/areas"
              setDesde={setDesde}
              setHasta={setHasta}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrudAreas;
