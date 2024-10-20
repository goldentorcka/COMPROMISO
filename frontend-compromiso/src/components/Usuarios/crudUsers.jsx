import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Register from './Register'; // El formulario de registro
import SidebarAdministrator from '../Admin/SidebarAdministrator';
import Modal from '../Modal/Init-Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import CustomDataTable from '../datatables/Datatable';

const CrudUsuarios = () => {
  const [userList, setUserList] = useState([]); // Lista de usuarios
  const [user, setUser] = useState(null); // Usuario seleccionado para editar
  const [buttonForm, setButtonForm] = useState("Enviar"); // Controla si es agregar o actualizar
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado del modal
  const [isDataTableVisible, setIsDataTableVisible] = useState(true); // Visibilidad de la tabla de datos

  useEffect(() => {
    getAllUsers(); // Obtener usuarios al cargar el componente
  }, []);

  // Obtener todos los usuarios
  const getAllUsers = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/auth`);
      setUserList(response.data); // Guardar usuarios en el estado
    } catch (error) {
      console.error("Error al obtener los usuarios:", error);
      Swal.fire('Error', 'No se pudieron obtener los usuarios', 'error');
    }
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e, userData) => {
    e.preventDefault();
    try {
      if (buttonForm === "Enviar") {
        // Crear nuevo usuario
        await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/register`, userData);
        Swal.fire('Agregado!', 'El usuario ha sido agregado.', 'success');
      } else if (buttonForm === "Actualizar" && user) {
        // Actualizar usuario existente
        await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/auth/${user.id}`, userData);
        Swal.fire('Actualizado!', 'El usuario ha sido actualizado.', 'success');
      }
      resetForm(); // Resetear formulario
      setIsModalOpen(false); // Cerrar modal
      getAllUsers(); // Actualizar lista de usuarios
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      Swal.fire('Error', 'No se pudo guardar el usuario', 'error');
    }
  };

  // Resetear formulario
  const resetForm = () => {
    setUser(null); // Limpiar usuario seleccionado
    setButtonForm("Enviar"); // Cambiar el botón a "Enviar"
  };

  // Columnas para la tabla de usuarios
  const columns = [
    { field: 'id', header: 'ID', width: '10%' },
    { field: 'email', header: 'Email', width: '50%' },
    { field: 'password', header: 'Password', width: '20%' }
  ];

  // Obtener usuario seleccionado para editar
  const getUser = (rowData) => {
    setUser(rowData); // Cargar usuario en el estado
    setButtonForm("Actualizar"); // Cambiar el botón a "Actualizar"
    setIsModalOpen(true); // Abrir modal
  };

  // Eliminar usuario
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
        const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/auth/${rowData.id}`);
        if (response.status === 204) {
          Swal.fire('Eliminado!', 'El usuario ha sido eliminado.', 'success');
          getAllUsers(); // Actualizar lista de usuarios
        } else {
          Swal.fire('Error', 'No se pudo eliminar el usuario', 'error');
        }
      } catch (error) {
        console.error("Error al eliminar el usuario:", error);
        Swal.fire('Error', 'No se pudo eliminar el usuario', 'error');
      }
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f4f4f4' }}>
      <SidebarAdministrator /> {/* Barra lateral */}
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
              resetForm(); // Limpiar formulario
              setIsModalOpen(true); // Abrir modal para agregar
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
              setIsDataTableVisible(true);
            }}
            title={buttonForm === "Enviar" ? "Agregar Usuario" : "Actualizar Usuario"}
          >
            <Register
              user={user} 
              handleSubmit={handleSubmit}
              buttonForm={buttonForm}
            />
          </Modal>

          {isDataTableVisible && 
            <CustomDataTable
              data={userList}
              columns={columns}
              onEdit={getUser} // Editar usuario
              onDelete={deleteUser} // Eliminar usuario
              searchField="email" // Campo de búsqueda
              exportFields={['id', 'email', 'rol']} // Campos para exportar
            />
          }
        </div>
      </div>
    </div>
  );
};

export default CrudUsuarios;
