import React, { useState, useEffect } from 'react';
import clienteAxios from '../api.js';
import Swal from 'sweetalert2';
import FormUser from './formUsers.jsx'; // Componente del formulario para usuarios
import SidebarAdministrator from '../components/Admin/SidebarAdministrator.jsx';
import Modal from '../components/Modal/Init-Modal.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import ActionButtons from '../components/Buttons/ActionsButton.jsx';
import CustomDataTable from '../components/datatables/Datatable.jsx';

const CrudUsers = () => {
  const [userList, setUserList] = useState([]);
  const [user, setUser] = useState({
    Nom_Usuario: "",
    Usuario: "",
    Correo_Usuario: "",
    Contraseña_Usuario: "",
    estado: "Activo",
    rol: "Administrador",
  });
  const [buttonForm, setButtonForm] = useState("Enviar");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDataTableVisible, setIsDataTableVisible] = useState(true);

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    try {
      const response = await clienteAxios.get('/api/usuarios');
      if (Array.isArray(response.data)) {
        setUserList(response.data);
      } else if (Array.isArray(response.data.usuarios)) {
        setUserList(response.data.usuarios);
      } else {
        setUserList([]);
        console.error('La respuesta de la API no es un array');
      }
    } catch (error) {
      console.error("Error al obtener los usuarios:", error);
      Swal.fire('Error', 'No se pudieron obtener los usuarios', 'error');
    }
  };

  const handleSubmit = async (userData) => {
    const validationError = validateUser(userData);
    if (validationError) {
      Swal.fire('Error', validationError, 'error');
      return;
    }

    try {
      if (buttonForm === "Enviar") {
        await clienteAxios.post('/api/usuarios', userData);
        Swal.fire('Agregado!', 'El usuario ha sido agregado.', 'success');
      } else {
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
    setUser({
      Nom_Usuario: "",
      Usuario: "",
      Correo_Usuario: "",
      Contraseña_Usuario: "",
      estado: "Activo",
      rol: "Administrador",
    });
    setButtonForm("Enviar");
  };

  const validateUser = (user) => {
    const { Nom_Usuario, Usuario, Correo_Usuario, Contraseña_Usuario } = user;
    if (!Nom_Usuario || !Usuario || !Correo_Usuario || !Contraseña_Usuario) {
      return 'Todos los campos son obligatorios.';
    }
    if (!/^[A-Za-z\s]+$/.test(Nom_Usuario)) {
      return 'El nombre solo puede contener letras.';
    }
    if (!/^[A-Za-z0-9_]+$/.test(Usuario)) {
      return 'El usuario solo puede contener letras, números y guiones bajos.';
    }
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(Correo_Usuario)) {
      return 'El correo electrónico no es válido.';
    }
    if (Contraseña_Usuario.length < 6) {
      return 'La contraseña debe tener al menos 6 caracteres.';
    }
    return null;
  };

  const getUser = (rowData) => {
    setUser(rowData); // Aquí se pasa el usuario completo
    setButtonForm("Actualizar");
    setIsModalOpen(true);
    setIsDataTableVisible(false); // Ocultar la tabla cuando se está en el formulario
  };

  const deleteUser = async (rowData) => {
    const confirmDelete = await Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminarlo!'
    });
    
    if (confirmDelete.isConfirmed) {
      try {
        const response = await clienteAxios.delete(`/api/usuarios/${rowData.id}`);
        if (response.status === 204) {
          Swal.fire('Eliminado!', 'El usuario ha sido eliminado.', 'success');
          getAllUsers();
        } else {
          Swal.fire('Error', 'No se pudo eliminar el usuario', 'error');
        }
      } catch (error) {
        console.error("Error al eliminar el usuario:", error);
        Swal.fire('Error', 'No se pudo eliminar el usuario', 'error');
      }
    }
  };

  const columns = [
    { field: 'id', header: 'ID', width: '10%' },
    { field: 'Nom_Usuario', header: 'Nombre', width: '20%' },
    { field: 'Usuario', header: 'Usuario', width: '20%' },
    { field: 'Correo_Usuario', header: 'Correo', width: '30%' },
    {
      body: (rowData) => (
        <ActionButtons 
          onEdit={() => getUser(rowData)} 
          onDelete={() => deleteUser(rowData)} 
        />
      ),
      header: 'Acciones', // Agregado el header de las acciones
      width: '20%'
    }
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f4f4f4' }}>
      <SidebarAdministrator />
      <div style={{ flex: 1, padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
        <h1 style={{ marginBottom: '20px', fontSize: '2rem', fontFamily: 'Georgia, serif', textTransform: 'uppercase' }}>
          Gestión de Usuarios
        </h1>
        <div style={{ width: '100%', maxWidth: '1200px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
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
            <FontAwesomeIcon icon={faUser} style={{ marginRight: '8px' }} />
            Añadir
          </button>

          {isModalOpen && (
            <div style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 999,
            }} />
          )}

          <Modal 
            isOpen={isModalOpen} 
            onClose={() => {
              setIsModalOpen(false);
              setIsDataTableVisible(true); // Mostrar el DataTable al cerrar el modal
            }}
            title={buttonForm === "Enviar" ? "Agregar Usuario" : "Actualizar Usuario"}
          >
            <FormUser
              user={user} // Aquí se pasa el usuario seleccionado
              handleSubmit={handleSubmit}
              buttonForm={buttonForm}
            />
          </Modal>

          {isDataTableVisible && 
            <CustomDataTable
              data={userList} // Cambiado a userList
              columns={columns} // Cambiado a columns
              searchField="Nom_Usuario" // Búsqueda por nombre
              exportFields={['id', 'Nom_Usuario', 'Usuario', 'Correo_Usuario', 'estado']} // Especifica los campos a exportar
            />
          }
        </div>
      </div>
    </div>
  );
};

export default CrudUsers;
