import React, { useState, useEffect } from 'react';
import clienteAxios from '../api.js';
import Swal from 'sweetalert2';
import Pagination from '../components/Pagination/Pagination';
import FormUsers from './formUsers.jsx';
import FormQueryUsers from './formQueryUsers.jsx'; 
import SidebarAdministrator from '../components/Admin/SidebarAdministrator.jsx';
import Modal from '../components/Modal/Init-Modal.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import ActionButtons from '../components/Buttons/ActionsButton.jsx';
import CustomDataTable from '../components/datatables/Datatable.jsx'; // Importa el componente DataTable

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
  const [userQuery, setUserQuery] = useState([]);
  const [buttonForm, setButtonForm] = useState("Enviar");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    try {
      const response = await clienteAxios.get('/api/usuarios');
      setUserList(response.data);
      setUserQuery(response.data);
    } catch (error) {
      console.error("Error al obtener los usuarios:", error);
    }
  };

  const getUser = async (Id_Usuario) => {
    try {
      const response = await clienteAxios.get(`/api/usuarios/${Id_Usuario}`);
      setUser(response.data);
      setButtonForm("Actualizar");
      setIsModalOpen(true);
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
        getAllUsers();
      } catch (error) {
        console.error("Error al eliminar el usuario:", error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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

  const handleSearch = (formData) => {
    console.log(formData);
    // Implementar lógica de búsqueda si es necesario
  };

  const columns = [
    { field: 'id', header: 'ID', width: '10%' },
    { field: 'Nom_Usuario', header: 'Nombre', width: '20%' },
    { field: 'Ape_Usuario', header: 'Apellido', width: '20%' },
    { field: 'Cod_Usuario', header: 'Código', width: '20%' },
    { field: 'Cor_Usuario', header: 'Correo', width: '30%' },
    {
      field: 'actions', header: 'Acciones', width: '10%',
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
      <SidebarAdministrator style={{ width: '240px', backgroundColor: '#343a40' }} />
      <div style={{ flex: 1, padding: '20px', marginLeft: '240px' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '20px', fontSize: '2rem', fontFamily: 'Georgia, serif', textTransform: 'uppercase' }}>
          Gestión de Usuarios
        </h1>
        <div style={{ width: '100%', maxWidth: '1200px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', padding: '0 20px' }}>
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

          <FormQueryUsers
            userQuery={userQuery}
            setUserQuery={setUserQuery}
          />

          <CustomDataTable data={userList} columns={columns} />
        </div>
      </div>
    </div>
  );
};

export default CrudUsers;
