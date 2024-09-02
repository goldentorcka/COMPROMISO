// src/components/CrudFormatos.jsx
import React, { useState, useEffect } from 'react';
import clienteAxios from '../api.js';
import Swal from 'sweetalert2';
import FormFormatos from './FormFormatos.jsx';
import Pagination from '../components/Pagination/Pagination';
import SidebarAdministrator from '../components/Admin/SidebarAdministrator.jsx';

const CrudFormatos = () => {
  const [formatoList, setFormatoList] = useState([]);
  const [formato, setFormato] = useState({
    Cod_Formato: "",
    Fec_Actualizacion: "",
    Ver_Formato: "",
    Est_Formato: "Activo",
    Id_Responsable: "",
    Nom_Formato: "",
    Nom_Magnetico: "",
    Id_Procedimiento: "",
    Id_Unidad: "",
  });
  const [buttonForm, setButtonForm] = useState("Enviar");
  const [stateAddFormato, setStateAddFormato] = useState(true);
  const [desde, setDesde] = useState(0);
  const [hasta, setHasta] = useState(10);

  useEffect(() => {
    getAllFormatos();
  }, [desde, hasta]);

  const getAllFormatos = async () => {
    try {
      const response = await clienteAxios.get('/formatos');
      setFormatoList(response.data);
    } catch (error) {
      console.error("Error al obtener los formatos:", error);
    }
  };

  const getFormato = async (Id_Formato) => {
    try {
      const response = await clienteAxios.get(`/formatos/${Id_Formato}`);
      setFormato(response.data);
      setButtonForm("Actualizar");
      setStateAddFormato(true);
    } catch (error) {
      console.error("Error al obtener el formato:", error);
    }
  };

  const deleteFormato = async (Id_Formato) => {
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
        await clienteAxios.delete(`/formatos/${Id_Formato}`);
        Swal.fire('Eliminado!', 'El registro ha sido eliminado.', 'success');
        getAllFormatos(); // Actualiza la lista de formatos después de eliminar
      } catch (error) {
        console.error("Error al eliminar el formato:", error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (buttonForm === "Enviar") {
        await clienteAxios.post('/formatos', formato);
        Swal.fire('Agregado!', 'El formato ha sido agregado.', 'success');
      } else {
        await clienteAxios.put(`/formatos/${formato.Id_Formato}`, formato);
        Swal.fire('Actualizado!', 'El formato ha sido actualizado.', 'success');
      }
      resetForm(); // Limpia el formulario
      getAllFormatos(); // Actualiza la lista de formatos
      setStateAddFormato(false);
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    }
  };

  const resetForm = () => {
    setFormato({
      Cod_Formato: "",
      Fec_Actualizacion: "",
      Ver_Formato: "",
      Est_Formato: "Activo",
      Id_Responsable: "",
      Nom_Formato: "",
      Nom_Magnetico: "",
      Id_Procedimiento: "",
      Id_Unidad: "",
    });
    setButtonForm("Enviar");
  };

  return (
    <div style={{ display: 'flex' }}>
      <SidebarAdministrator />
      <div style={styles.crudContainer}>
        <h1 style={styles.pageTitle} className="animatedTitle">Gestión de Formatos</h1>
        <div style={styles.mainContent}>
          <div style={styles.contentWrapper}>
            {stateAddFormato && (
              <FormFormatos
                formato={formato}
                setFormato={setFormato}
                handleSubmit={handleSubmit}
                buttonForm={buttonForm}
              />
            )}
            <div style={styles.tableWrapper}>
              <table style={styles.userTable}>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Código</th>
                    <th>Fecha Actualización</th>
                    <th>Versión</th>
                    <th>Estado</th>
                    <th>Nombre</th>
                    <th>Nombre Magnético</th>
                    <th>Responsable</th>
                    <th>Procedimiento</th>
                    <th>Unidad</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(formatoList) && formatoList.slice(desde, hasta).map((formato) => (
                    <tr key={formato.Id_Formato}>
                      <td>{formato.Id_Formato}</td>
                      <td>{formato.Cod_Formato}</td>
                      <td>{new Date(formato.Fec_Actualizacion).toLocaleDateString()}</td>
                      <td>{formato.Ver_Formato}</td>
                      <td>{formato.Est_Formato}</td>
                      <td>{formato.Nom_Formato}</td>
                      <td>{formato.Nom_Magnetico}</td>
                      <td>{formato.Id_Responsable}</td>
                      <td>{formato.Id_Procedimiento}</td>
                      <td>{formato.Id_Unidad}</td>
                      <td>
                        <button style={styles.editButton} onClick={() => getFormato(formato.Id_Formato)}>✏️</button>
                        <button style={styles.deleteButton} onClick={() => deleteFormato(formato.Id_Formato)}>🗑️</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination
              URI="/formatos"
              setDesde={setDesde}
              setHasta={setHasta}
            />
            <button style={styles.consultButton}>Consultar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  crudContainer: {
    flex: 1,
    padding: '10px',
  },
  mainContent: {
    backgroundColor: '#f4f4f9',
    minHeight: '100vh',
    padding: '10px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    overflow: 'hidden',
    position: 'relative',
  },
  pageTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '10px',
    textAlign: 'center',
    color: '#333',
  },
  contentWrapper: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '10px',
    backgroundColor: '#fff',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    height: 'calc(100vh - 80px)',
    overflowY: 'auto',
  },
  tableWrapper: {
    maxHeight: '300px',
    overflowY: 'auto',
    overflowX: 'auto',
    border: '1px solid #ddd',
    borderRadius: '8px',
  },
  userTable: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '12px',
  },
  editButton: {
    backgroundColor: '#4caf50',
    border: 'none',
    color: 'white',
    padding: '6px 8px',
    fontSize: '12px',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '5px',
    transition: 'background-color 0.3s',
  },
  deleteButton: {
    backgroundColor: '#f44336',
    border: 'none',
    color: 'white',
    padding: '6px 8px',
    fontSize: '12px',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  consultButton: {
    backgroundColor: '#008cba',
    color: 'white',
    padding: '8px 12px',
    fontSize: '14px',
    borderRadius: '8px',
    cursor: 'pointer',
    border: 'none',
    display: 'inline-block',
    transition: 'background-color 0.3s, transform 0.2s',
  },
};

export default CrudFormatos;
