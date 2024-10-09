import React, { useState, useEffect } from 'react';
import clienteAxios from '../api.js';
import Swal from 'sweetalert2';
import FormUser from './formUsers.jsx';
import SidebarAdministrator from '../components/Admin/SidebarAdministrator.jsx';
import Modal from '../components/Modal/Init-Modal.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import CustomDataTable from '../components/datatables/Datatable.jsx';

const CrudUsers = () => {
  const [userList, setUserList] = useState([]);
  const [user, setUser] = useState(null);
  const [buttonForm, setButtonForm] = useState("Enviar");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDataTableVisible, setIsDataTableVisible] = useState(true);

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    try {
      const response = await clienteAxios.get('/api/usuarios');
      setUserList(response.data.usuarios); // Ajustado para extraer la lista de usuarios
    } catch (error) {
      console.error("Error al obtener los usuarios:", error);
      Swal.fire('Error', 'No se pudieron obtener los usuarios', 'error');
    }
  };

  const handleSubmit = async (e, userData) => {
    e.preventDefault();
    const validationError = validateUser(userData);
    if (validationError) {
      Swal.fire('Error', validationError, 'error');
      return;
    }

    try {
      if (buttonForm === "Enviar") {
        await clienteAxios.post('/api/usuarios', userData);
        Swal.fire('Agregado!', 'El usuario ha sido agregado.', 'success');
      } else if (buttonForm === "Actualizar" && user) {
        await clienteAxios.put(`/api/usuarios/${user.Id_Usuario}`, userData);
        Swal.fire('Actualizado!', 'El usuario ha sido actualizado.', 'success');
      }
      resetForm();
      setIsModalOpen(false);
      getAllUsers();
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      Swal.fire('Error', 'No se pudo guardar el usuario', 'error');
    }
  };

  const resetForm = () => {
    setUser(null);
    setButtonForm("Enviar");
  };

  const validateUser = (user) => {
    const { Nom_Usuario, Correo_Usuario, Usuario, Contraseña_Usuario } = user;
    if (!Nom_Usuario) {
      return 'El nombre es obligatorio.';
    }
    if (!/^[A-Za-z\s]+$/.test(Nom_Usuario)) {
      return 'El nombre solo puede contener letras.';
    }
    if (!Usuario) {
      return 'El nombre de usuario es obligatorio.';
    }
    if (!Correo_Usuario) {
      return 'El correo es obligatorio.';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(Correo_Usuario)) {
      return 'El formato del correo es inválido.';
    }
    if (!Contraseña_Usuario) {
      return 'La contraseña es obligatoria.';
    }
    return null; // Sin errores
  };

  // Funciones para abrir el modal y cargar el usuario a editar
  const openModal = (userData) => {
    setUser(userData);
    setButtonForm("Actualizar");
    setIsModalOpen(true);
  };

  const deleteUser = async (userId) => {
    const confirmation = await Swal.fire({
      title: '¿Estás seguro?',
      text: "¡Este usuario será eliminado!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminarlo!',
      cancelButtonText: 'Cancelar'
    });

    if (confirmation.isConfirmed) {
      try {
        await clienteAxios.delete(`/api/usuarios/${userId}`);
        Swal.fire('Eliminado!', 'El usuario ha sido eliminado.', 'success');
        getAllUsers(); // Recargar la lista de usuarios
      } catch (error) {
        console.error("Error al eliminar el usuario:", error);
        Swal.fire('Error', 'No se pudo eliminar el usuario', 'error');
      }
    }
  };

  return (
    <div>
      <SidebarAdministrator />
      <div className="container">
        <h2>
          <FontAwesomeIcon icon={faUser} /> Gestión de Usuarios
        </h2>
        <button onClick={() => setIsModalOpen(true)}>Agregar Usuario</button>
        {isDataTableVisible && (
          <CustomDataTable 
            data={userList} 
            openModal={openModal} 
            deleteUser={deleteUser} 
          />
        )}
        {isModalOpen && (
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <FormUser 
              user={user} 
              buttonText={buttonForm} 
              handleSubmit={handleSubmit} 
            />
          </Modal>
        )}
      </div>
    </div>
  );
};

export default CrudUsers;
