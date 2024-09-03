import React, { useState, useEffect } from 'react';
import clienteAxios from '../api.js';
import Swal from 'sweetalert2';
import FormUsers from './formUsers.jsx';
import Pagination from '../components/Pagination/Pagination';
import SidebarAdministrator from '../components/Admin/SidebarAdministrator.jsx';
import './styles.css'; // Asegúrate de que la ruta sea correcta

const CrudUsers = () => {
  const [userList, setUserList] = useState([]);
  const [user, setUser] = useState({
    Nom_Usuario: "",
    Ape_Usuario: "",
    Cod_Usuario: "",
    Cor_Usuario: "",
    Nde_Usuario: "",
    Fec_Usuario: "",
    estado: "",
    rol: "Administrador",
    password: ""
  });
  const [buttonForm, setButtonForm] = useState("Enviar");
  const [stateAddUser, setStateAddUser] = useState(true);
  const [desde, setDesde] = useState(0);
  const [hasta, setHasta] = useState(10);

  useEffect(() => {
    getAllUsers();
  }, [desde, hasta]);

  const getAllUsers = async () => {
    try {
      const response = await clienteAxios.get('/usuarios');
      setUserList(response.data);
    } catch (error) {
      console.error("Error al obtener los usuarios:", error);
    }
  };

  const getUser = async (Id_Usuario) => {
    try {
      const response = await clienteAxios.get(`/usuarios/${Id_Usuario}`);
      setUser(response.data);
      setButtonForm("Actualizar");
      setStateAddUser(true);
    } catch (error) {
      console.error("Error al obtener el usuario:", error);
    }
  };

  const deleteUser = async (Id_Usuario) => {
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
        await clienteAxios.delete(`/usuarios/${Id_Usuario}`);
        Swal.fire('Eliminado!', 'El registro ha sido eliminado.', 'success');
        getAllUsers(); // Actualiza la lista de usuarios después de eliminar
      } catch (error) {
        console.error("Error al eliminar el usuario:", error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Datos enviados:", user); // Agrega esto para depurar
      if (buttonForm === "Enviar") {
        await clienteAxios.post('/usuarios', user);
        Swal.fire('Agregado!', 'El usuario ha sido agregado.', 'success');
      } else {
        await clienteAxios.put(`/usuarios/${user.Id_Usuario}`, user);
        Swal.fire('Actualizado!', 'El usuario ha sido actualizado.', 'success');
      }
      resetForm(); // Limpia el formulario
      getAllUsers(); // Actualiza la lista de usuarios
      setStateAddUser(false);
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    }
  };

  const resetForm = () => {
    setUser({
      Nom_Usuario: "",
      Ape_Usuario: "",
      Cod_Usuario: "",
      Cor_Usuario: "",
      Nde_Usuario: "",
      Fec_Usuario: "",
      estado: "",
      rol: "Administrador",
      password: ""
    });
    setButtonForm("Enviar");
  };

  return (
    <div className="crud-container">
      <SidebarAdministrator />
      <div className="main-content">
        <h1 className="page-title">Gestión de Usuarios</h1>
        <div className="content-wrapper">
          {stateAddUser && (
            <FormUsers
              user={user}
              setUser={setUser}
              handleSubmit={handleSubmit}
              buttonForm={buttonForm}
            />
          )}
          <div className="table-wrapper">
            <table className="area-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Código</th>
                  <th>Correo</th>
                  <th>Número de Documento</th>
                  <th>Fecha</th>
                  <th>Estado</th>
                  <th>Rol</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(userList) && userList.slice(desde, hasta).map((user) => (
                  <tr key={user.Id_Usuario}>
                    <td>{user.Id_Usuario}</td>
                    <td>{user.Nom_Usuario}</td>
                    <td>{user.Ape_Usuario}</td>
                    <td>{user.Cod_Usuario}</td>
                    <td>{user.Cor_Usuario}</td>
                    <td>{user.Nde_Usuario}</td>
                    <td>{user.Fec_Usuario}</td>
                    <td>{user.estado}</td>
                    <td>{user.rol}</td>
                    <td>
                      <button className="edit-button" onClick={() => getUser(user.Id_Usuario)}>✏️</button>
                      <button className="delete-button" onClick={() => deleteUser(user.Id_Usuario)}>🗑️</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination
            URI="/usuarios"
            setDesde={setDesde}
            setHasta={setHasta}
          />
        </div>
      </div>
    </div>
  );
};

export default CrudUsers;
