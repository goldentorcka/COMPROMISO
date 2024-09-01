import React, { useState, useEffect } from 'react';
import clienteAxios from '../api.js';
import Swal from 'sweetalert2';
import FormAreas from './FormAreas.jsx';
import Pagination from '../components/Pagination/Pagination';
import FormQueryArea from './formQueryArea.jsx';

const CrudAreas = () => {
  const [areaList, setAreaList] = useState([]);
  const [area, setArea] = useState({
    Nom_Area: "",
    estado: "Sí",
  });
  const [buttonForm, setButtonForm] = useState("Enviar");
  const [stateAddArea, setStateAddArea] = useState(true);
  const [stateAreaQuery, setStateAreaQuery] = useState([]);
  const [desde, setDesde] = useState(0);
  const [hasta, setHasta] = useState(10);

  useEffect(() => {
    getAllAreas();
  }, [desde, hasta]);

  const getAllAreas = async () => {
    try {
      const response = await clienteAxios.get('/areas');
      setAreaList(response.data);
      setStateAreaQuery(response.data);
    } catch (error) {
      console.error("Error al obtener las áreas:", error);
    }
  };

  const getArea = async (Id_Area) => {
    try {
      const response = await clienteAxios.get(`/areas/${Id_Area}`);
      setArea(response.data);
      setButtonForm("Actualizar");
      setStateAddArea(true);
    } catch (error) {
      console.error("Error al obtener el área:", error);
    }
  };

  const deleteArea = async (Id_Area) => {
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
        await clienteAxios.delete(`/areas/${Id_Area}`);
        Swal.fire('Eliminado!', 'El registro ha sido eliminado.', 'success');
        getAllAreas();
      } catch (error) {
        console.error("Error al eliminar el área:", error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (buttonForm === "Enviar") {
        await clienteAxios.post('/areas', area);
        Swal.fire('Agregado!', 'El área ha sido agregada.', 'success');
      } else {
        await clienteAxios.put(`/areas/${area.Id_Area}`, area);
        Swal.fire('Actualizado!', 'El área ha sido actualizada.', 'success');
      }
      resetForm();
      getAllAreas();
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    }
  };

  const resetForm = () => {
    setArea({
      Nom_Area: "",
      estado: "Sí",
    });
    setButtonForm("Enviar");
    setStateAddArea(false);
  };

  return (
    <div style={styles.crudContainer}>
      <h1 style={styles.pageTitle} className="animatedTitle">Gestión de Áreas</h1>
      <div style={styles.mainContent}>
        <div style={styles.contentWrapper}>
          <FormQueryArea 
            getArea={getArea} 
            deleteArea={deleteArea}
            buttonForm={buttonForm} 
            areaQuery={stateAreaQuery} 
            setAreaQuery={setStateAreaQuery}
          />
          {stateAddArea && (
            <FormAreas
              area={area}
              setArea={setArea}
              handleSubmit={handleSubmit}
              buttonForm={buttonForm}
            />
          )}
          <div style={styles.tableWrapper}>
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
                {Array.isArray(stateAreaQuery) && stateAreaQuery.slice(desde, hasta).map((area) => (
                  <tr key={area.Id_Area}>
                    <td>{area.Id_Area}</td>
                    <td>{area.Nom_Area}</td>
                    <td>{area.estado}</td>
                    <td>
                      <button style={styles.editButton} onClick={() => getArea(area.Id_Area)}>✏️</button>
                      <button style={styles.deleteButton} onClick={() => deleteArea(area.Id_Area)}>🗑️</button>
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
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#f4f4f9',
    minHeight: '100vh',
  },
  mainContent: {
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
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
    color: '#333',
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
  areaTableHeader: {
    backgroundColor: '#f5f5f5',
    color: '#333',
    fontWeight: 'bold',
  },
  areaTableRow: {
    borderBottom: '1px solid #ddd',
  },
  areaTableCell: {
    padding: '12px',
    textAlign: 'left',
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
  buttonHover: {
    backgroundColor: '#45a049', // Color para el botón editar en hover
  },
  buttonHoverDelete: {
    backgroundColor: '#e53935', // Color para el botón eliminar en hover
  },
};

export default CrudAreas;
