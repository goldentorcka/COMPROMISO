import React, { useState, useEffect } from 'react';
import clienteAxios from '../api.js';
import Swal from 'sweetalert2';
import FormProcedure from './FormProcedure.jsx';
import Pagination from '../components/Pagination/Pagination';
import SidebarAdministrator from '../components/Admin/SidebarAdministrator.jsx';
import '../css/stylesCrudProcedure.css';

const CrudProcedure = () => {
  const [procedimientos, setProcedimientos] = useState([]);
  const [currentProcedure, setCurrentProcedure] = useState({
    Id_Procedimiento: "",
    Nom_Procedimiento: "",
    Id_Proceso: "",
    estado: "Sí",
  });
  const [buttonForm, setButtonForm] = useState("Enviar");
  const [stateAddProcedure, setStateAddProcedure] = useState(true);
  const [desde, setDesde] = useState(0);
  const [hasta, setHasta] = useState(10);

  useEffect(() => {
    fetchProcedimientos();
  }, [desde, hasta]);

  const fetchProcedimientos = async () => {
    try {
      const response = await clienteAxios.get('/procedimientos', {
        params: {
          desde,
          hasta
        }
      });
      setProcedimientos(response.data);
    } catch (error) {
      console.error("Error al obtener los procedimientos:", error);
    }
  };

  const fetchProcedure = async (Id_Procedimiento) => {
    try {
      const response = await clienteAxios.get(`/procedimientos/${Id_Procedimiento}`);
      setCurrentProcedure(response.data);
      setButtonForm("Actualizar");
      setStateAddProcedure(true);
    } catch (error) {
      console.error("Error al obtener el procedimiento:", error);
    }
  };

  const deleteProcedure = async (Id_Procedimiento) => {
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
        await clienteAxios.delete(`/procedimientos/${Id_Procedimiento}`);
        Swal.fire('Eliminado!', 'El registro ha sido eliminado.', 'success');
        fetchProcedimientos(); // Actualiza la lista después de eliminar
      } catch (error) {
        console.error("Error al eliminar el procedimiento:", error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (buttonForm === "Enviar") {
        await clienteAxios.post('/procedimientos', currentProcedure);
        Swal.fire('Agregado!', 'El procedimiento ha sido agregado.', 'success');
      } else {
        await clienteAxios.put(`/procedimientos/${currentProcedure.Id_Procedimiento}`, currentProcedure);
        Swal.fire('Actualizado!', 'El procedimiento ha sido actualizado.', 'success');
      }
      resetForm(); // Limpia el formulario
      fetchProcedimientos(); // Actualiza la lista
      setStateAddProcedure(false);
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    }
  };

  const resetForm = () => {
    setCurrentProcedure({
      Id_Procedimiento: "",
      Nom_Procedimiento: "",
      Id_Proceso: "",
      estado: "Sí",
    });
    setButtonForm("Enviar");
  };

  return (
    <div className="crud-container">
      <SidebarAdministrator />
      <div className="main-content">
        <h1 className="page-title">Gestión de Procedimientos</h1>
        <div className="content-wrapper">
          {stateAddProcedure && (
            <FormProcedure
              procedure={currentProcedure}
              setProcedure={setCurrentProcedure}
              handleSubmit={handleSubmit}
              buttonForm={buttonForm}
            />
          )}
          <div className="table-wrapper">
            <table className="procedure-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>ID Proceso</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(procedimientos) && procedimientos.slice(desde, hasta).map((proc) => (
                  <tr key={proc.Id_Procedimiento}>
                    <td>{proc.Id_Procedimiento}</td>
                    <td>{proc.Nom_Procedimiento}</td>
                    <td>{proc.Id_Proceso}</td>
                    <td>{proc.estado}</td>
                    <td>
                      <button className="edit-button" onClick={() => fetchProcedure(proc.Id_Procedimiento)}>✏️</button>
                      <button className="delete-button" onClick={() => deleteProcedure(proc.Id_Procedimiento)}>🗑️</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination
            URI="/procedimientos"
            setDesde={setDesde}
            setHasta={setHasta}
          />
        </div>
      </div>
    </div>
  );
};

export default CrudProcedure;
