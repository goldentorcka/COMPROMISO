import React, { useState, useEffect } from 'react';
import clienteAxios from '../api.js';
import Swal from 'sweetalert2';
import Pagination from '../components/Pagination/Pagination';
import FormAreas from './FormAreas.jsx';
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
      const response = await clienteAxios.get('/areas');
      setAreaList(response.data);
      setAreaQuery(response.data); // Inicializar areaQuery con todas las áreas
    } catch (error) {
      console.error('Error al obtener las áreas:', error);
    }
  };

  const getArea = async (Id_Area) => {
    try {
      const response = await clienteAxios.get(`/areas/${Id_Area}`);
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
        await clienteAxios.delete(`/areas/${Id_Area}`);
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
        await clienteAxios.post('/areas', area);
        Swal.fire('Agregado!', 'El área ha sido agregada.', 'success');
      } else {
        await clienteAxios.put(`/areas/${area.Id_Area}`, area);
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
    <div style={styles.crudContainer}>
      <SidebarAdministrator />
      <div style={styles.mainContent}>
        <h1 style={styles.pageTitle}>Gestión de Áreas</h1>
        <div style={styles.contentWrapper}>
          <FormAreas
            area={area}
            setArea={setArea}
            handleSubmit={handleSubmit}
            buttonForm={buttonForm}
            resetForm={resetForm}
          />
          <div style={styles.tableWrapper}>
            <FormQueryArea
              areaQuery={areaQuery}
              setAreaQuery={setAreaQuery}
            />
            <table style={styles.areaTable}>
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
                        <button
                          style={styles.editButton}
                          onClick={() => getArea(area.Id_Area)}
                        >
                          ✏️
                        </button>
                        <button
                          style={styles.deleteButton}
                          onClick={() => deleteArea(area.Id_Area)}
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <Pagination
              URI="/areas"
              setDesde={setDesde}
              setHasta={setHasta}
            />
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
  areaTable: {
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

export default CrudAreas;
