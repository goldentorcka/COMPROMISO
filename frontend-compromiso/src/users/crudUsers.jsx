import React, { useState, useEffect } from 'react';
import clienteAxios from '../api.js';
import Swal from 'sweetalert2';
import Pagination from '../components/Pagination/Pagination';
import FormUsers from './formUsers.jsx';
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

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    try {
      const response = await clienteAxios.get('/api/usuarios');
      setUserList(response.data);
    } catch (error) {
      console.error("Error al obtener los usuarios:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateUser(user);
    if (validationError) {
      Swal.fire('Error', validationError, 'error');
      return;
    }

    try {
      if (buttonForm === "Enviar") {
        await clienteAxios.post('/api/usuarios', user);
        Swal.fire('Agregado!', 'El usuario ha sido agregado.', 'success');
      } else {
        await clienteAxios.put(`/api/usuarios/${user.Id_Usuario}`, user);
        Swal.fire('Actualizado!', 'El usuario ha sido actualizado.', 'success');
      }
      resetForm();
      setIsModalOpen(false);
      getAllUsers();
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
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

  const columns = [
    { field: 'id', header: 'ID', width: '10%' },
    { field: 'Nom_Usuario', header: 'Nombre', width: '20%' },
    { field: 'Usuario', header: 'Usuario', width: '20%' },
    { field: 'Correo_Usuario', header: 'Correo', width: '30%' },
    {
      // field: 'actions', header: 'Acciones', width: '10%',
      body: (rowData) => (
        <ActionButtons 
          onEdit={() => getUser(rowData.id)} 
          onDelete={() => deleteUser(rowData.id)} 
        />
      )
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

          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <FormUsers
              user={user}
              setUser={setUser}
              handleSubmit={handleSubmit}
              buttonForm={buttonForm}
              resetForm={resetForm}
            />
          </Modal>

          <CustomDataTable data={userList} columns={columns} />
        </div>
      </div>
    </div>
  );
};

export default CrudUsers;
