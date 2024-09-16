import React, { useState, useEffect } from 'react';
import clienteAxios from '../api.js';
import Swal from 'sweetalert2';
import FormUsers from './formUsers.jsx';
import Pagination from '../components/Pagination/Pagination';
import SidebarAdministrator from '../components/Admin/SidebarAdministrator.jsx';
import Modal from '../components/Modal/Init-Modal.jsx'; // Asegúrate de crear este archivo para el modal
import '../components/styles/stylesCrudUsers.css'; // Importa el archivo CSS

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
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para el modal
  const [desde, setDesde] = useState(0);
  const [hasta, setHasta] = useState(10);

  useEffect(() => {
    getAllUsers();
  }, [desde, hasta]);

  const getAllUsers = async () => {
    try {
      const response = await clienteAxios.get('/api/usuarios');
      setUserList(response.data);
    } catch (error) {
      console.error("Error al obtener los usuarios:", error);
    }
  };

  const getUser = async (Id_Usuario) => {
    try {
      const response = await clienteAxios.get(`/api/usuarios/${Id_Usuario}`);
      setUser(response.data);
      setButtonForm("Actualizar");
      setIsModalOpen(true); // Abrir el modal al obtener un usuario
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
        await clienteAxios.delete(`/api/usuarios/${Id_Usuario}`);
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
        await clienteAxios.post('/api/usuarios', user);
        Swal.fire('Agregado!', 'El usuario ha sido agregado.', 'success');
      } else {
        await clienteAxios.put(`/api/usuarios/${user.Id_Usuario}`, user);
        Swal.fire('Actualizado!', 'El usuario ha sido actualizado.', 'success');
      }
      resetForm(); // Limpia el formulario
      getAllUsers(); // Actualiza la lista de usuarios
      setIsModalOpen(false); // Cerrar el modal al enviar el formulario
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
    <div className="root">
      <SidebarAdministrator className="sidebar" />
      <div className="mainContent">
        <h1 className="pageTitle">Gestión de Usuarios</h1>
        <div className="contentWrapper">
          <button
            className="openModalButton"
            onClick={() => {
              resetForm();
              setIsModalOpen(true); // Abrir el modal para añadir un usuario
            }}
          >
            Añadir Usuario
          </button>
          
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <FormUsers
              user={user}
              setUser={setUser}
              handleSubmit={handleSubmit}
              buttonForm={buttonForm}
            />
          </Modal>
          
          <div className="tableWrapper">
            <table className="userTable">
              <thead>
                <tr>
                  <th className="tableHeader">ID</th>
                  <th className="tableHeader">Nombre</th>
                  <th className="tableHeader">Apellido</th>
                  <th className="tableHeader">Código</th>
                  <th className="tableHeader">Correo</th>
                  <th className="tableHeader">Número de Documento</th>
                  <th className="tableHeader">Fecha</th>
                  <th className="tableHeader">Estado</th>
                  <th className="tableHeader">Rol</th>
                  <th className="tableHeader">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(userList) && userList.slice(desde, hasta).map((user) => (
                  <tr key={user.Id_Usuario}>
                    <td className="tableCell">{user.Id_Usuario}</td>
                    <td className="tableCell">{user.Nom_Usuario}</td>
                    <td className="tableCell">{user.Ape_Usuario}</td>
                    <td className="tableCell">{user.Cod_Usuario}</td>
                    <td className="tableCell">{user.Cor_Usuario}</td>
                    <td className="tableCell">{user.Nde_Usuario}</td>
                    <td className="tableCell">{user.Fec_Usuario}</td>
                    <td className="tableCell">{user.estado}</td>
                    <td className="tableCell">{user.rol}</td>
                    <td className="tableCell">
                      <div className="actionButtons">
                        <button
                          className="button editButton"
                          onClick={() => getUser(user.Id_Usuario)}
                        >
                          ✏️
                        </button>
                        <button
                          className="button deleteButton"
                          onClick={() => deleteUser(user.Id_Usuario)}
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Pagination
            totalItems={userList.length}
            itemsPerPage={10}
            currentPage={Math.floor(desde / 10) + 1}
            onPageChange={(pageNumber) => {
              setDesde((pageNumber - 1) * 10);
              setHasta(pageNumber * 10);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CrudUsers;

