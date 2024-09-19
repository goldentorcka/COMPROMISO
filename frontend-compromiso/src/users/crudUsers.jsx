import React, { useState, useEffect } from 'react';
import clienteAxios from '../api';
import Swal from 'sweetalert2';
import FormUsers from './formUsers.jsx';
import Pagination from '../components/Pagination/Pagination';
import SidebarAdministrator from '../components/Admin/SidebarAdministrator.jsx';
import Modal from '../components/Modal/Init-Modal.jsx';
import '../components/styles/stylesCrudUsers.css'; // Importa el archivo CSS
import TableComponent from '../components/datatables/ComponentTableGeneral.jsx';

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [desde, setDesde] = useState(0);
  const [hasta, setHasta] = useState(10);
  const [search, setSearch] = useState('');

  useEffect(() => {
    getAllUsers();
  }, [desde, hasta]);

  // Función para obtener todos los usuarios
  const getAllUsers = async () => {
    try {
      const response = await clienteAxios.get('/api/usuarios');
      setUserList(response.data);
    } catch (error) {
      console.error("Error al obtener los usuarios:", error);
    }
  };

  // Función para obtener un usuario por ID y abrir el modal
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

  // Función para eliminar un usuario
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

  // Función para manejar el envío del formulario (añadir o actualizar usuario)
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
      getAllUsers();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    }
  };

  // Función para resetear el formulario
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

  // Función para manejar la búsqueda (deberías agregar lógica para buscar en la API)
  const handleSearch = (formData) => {
    console.log(formData);
  };

  const columns = [
    { title: 'ID', data: 'Id_Usuario' },
    { title: 'Nombre', data: 'Nom_Usuario' },
    { title: 'Apellido', data: 'Ape_Usuario' },
    { title: 'Código', data: 'Cod_Usuario' },
    { title: 'Correo', data: 'Cor_Usuario' },
    { title: 'Número de Documento', data: 'Nde_Usuario' },
    { title: 'Fecha', data: 'Fec_Usuario' },
    { title: 'Estado', data: 'estado' },
    { title: 'Rol', data: 'rol' },
    {
      title: 'Acciones',
      data: '',
      render: (data, type, row) => (
        <div className="action-buttons">
          <button onClick={() => getUser(row.Id_Usuario)}>Editar</button>
          <button onClick={() => deleteUser(row.Id_Usuario)}>Eliminar</button>
        </div>
      )
    }
  ];

  const form = (
    <div>
      <div className="form-control">
        <input
          type="text"
          name="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar usuarios..."
        />
        <span className="search-icon">
          <i className="fas fa-search"></i>
        </span>
      </div>
    </div>
  );

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
              setIsModalOpen(true);
            }}
          >
            Añadir
          </button>
          
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <FormUsers
              user={user}
              setUser={setUser}
              handleSubmit={handleSubmit}
              buttonForm={buttonForm}
            />
          </Modal>
          
          <TableComponent
            data={userList.slice(desde, hasta)}
            columns={columns}
            form={form}
            onSearch={handleSearch}
          />

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
