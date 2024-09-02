import React, { useState, useEffect } from 'react';
import clienteAxios from '../api.js'; // Ajusta la ruta según la ubicación de tu archivo api.js
import Swal from 'sweetalert2';
import FormQueryResponsables from './formQueryResponsibles.jsx'; // Asegúrate de tener un componente de formulario para responsables
import Pagination from '../components/Pagination/Pagination';
import SidebarAdministrator from '../components/Admin/SidebarAdministrator.jsx'; // Ajusta la ruta según la ubicación

const CrudResponsables = () => {
  const [responsableList, setResponsableList] = useState([]);
  const [responsable, setResponsable] = useState({
    Nom_Responsable: "",
    estado: "Sí", // Valor predeterminado para el estado
  });
  const [buttonForm, setButtonForm] = useState("Enviar");
  const [stateAddResponsable, setStateAddResponsable] = useState(true);
  const [desde, setDesde] = useState(0);
  const [hasta, setHasta] = useState(10);

  useEffect(() => {
    getAllResponsables();
  }, [desde, hasta]);

  const getAllResponsables = async () => {
    try {
      const response = await clienteAxios.get('/responsables');
      setResponsableList(response.data);
    } catch (error) {
      console.error("Error al obtener los responsables:", error);
    }
  };

  const getResponsable = async (Id_Responsable) => {
    try {
      const response = await clienteAxios.get(`/responsables/${Id_Responsable}`);
      setResponsable(response.data);
      setButtonForm("Actualizar");
      setStateAddResponsable(true);
    } catch (error) {
      console.error("Error al obtener el responsable:", error);
    }
  };

  const deleteResponsable = async (Id_Responsable) => {
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
        await clienteAxios.delete(`/responsables/${Id_Responsable}`);
        Swal.fire('Eliminado!', 'El registro ha sido eliminado.', 'success');
        getAllResponsables();
      } catch (error) {
        console.error("Error al eliminar el responsable:", error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (buttonForm === "Enviar") {
        await clienteAxios.post('/responsables', responsable);
        Swal.fire('Agregado!', 'El responsable ha sido agregado.', 'success');
      } else {
        await clienteAxios.put(`/responsables/${responsable.Id_Responsable}`, responsable);
        Swal.fire('Actualizado!', 'El responsable ha sido actualizado.', 'success');
      }
      resetForm();
      getAllResponsables();
      setStateAddResponsable(false);
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    }
  };

  const resetForm = () => {
    setResponsable({
      Nom_Responsable: "",
      estado: "Sí",
    });
    setButtonForm("Enviar");
  };

  return (
    <div style={{ display: 'flex' }}>
      <SidebarAdministrator />
      <div style={styles.crudContainer}>
        <h1 style={styles.pageTitle} className="animatedTitle">Gestión de Responsables</h1>
        <div style={styles.mainContent}>
          <div style={styles.contentWrapper}>
            {stateAddResponsable && (
              <FormQueryResponsables
                responsable={responsable}
                setResponsable={setResponsable}
                handleSubmit={handleSubmit}
                buttonForm={buttonForm}
              />
            )}
            <table style={styles.responsableTable}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre Responsable</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(responsableList) && responsableList.slice(desde, hasta).map((responsable) => (
                  <tr key={responsable.Id_Responsable}>
                    <td>{responsable.Id_Responsable}</td>
                    <td>{responsable.Nom_Responsable}</td>
                    <td>{responsable.estado}</td>
                    <td>
                      <button style={styles.editButton} onClick={() => getResponsable(responsable.Id_Responsable)}>✏️</button>
                      <button style={styles.deleteButton} onClick={() => deleteResponsable(responsable.Id_Responsable)}>🗑️</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination
              URI="/responsables"
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
    flex: 1,
    padding: '20px',
  },
  mainContent: {
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
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
  },
  responsableTable: {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '20px',
  },
  editButton: {
    background: 'none',
    border: 'none',
    color: '#3085d6',
    cursor: 'pointer',
  },
  deleteButton: {
    background: 'none',
    border: 'none',
    color: '#d33', 
    cursor: 'pointer',
    marginLeft: '10px',
  },
};

export default CrudResponsables;
