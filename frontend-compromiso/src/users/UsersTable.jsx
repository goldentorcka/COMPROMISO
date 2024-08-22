import React, { useEffect } from 'react';
import $ from 'jquery';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import Swal from 'sweetalert2';
import clienteAxios from '../config/axios';

const UsersTable = ({ getAllUsers, setUser, setButtonForm }) => {
  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  useEffect(() => {
    // Inicializa DataTable cuando los datos cambian
    $('#usersTable').DataTable().destroy();
    $('#usersTable').DataTable({
      data: [],
      columns: [
        { title: 'Nombre', data: 'Nom_Usuario' },
        { title: 'Apellido', data: 'Ape_Usuario' },
        { title: 'Código', data: 'Cod_Usuario' },
        { title: 'Email', data: 'Cor_Usuario' },
        { title: 'Teléfono', data: 'Nde_Usuario' },
        { title: 'Estado', data: 'estado' },
        {
          title: 'Acciones',
          data: null,
          defaultContent: '<button class="edit-button">Editar</button> <button class="delete-button">Eliminar</button>',
        }
      ],
      destroy: true,
      responsive: true,
      ajax: {
        url: '/usuarios',
        dataSrc: '',
        type: 'GET',
        headers: {
          Authorization: `Bearer ${ReactSession.get("token")}`,
        },
      },
    });

    // Manejar eventos de clic en los botones de acción
    $('#usersTable').on('click', '.edit-button', function () {
      const row = $(this).closest('tr');
      const data = $('#usersTable').DataTable().row(row).data();
      setUser(data);
      setButtonForm("Actualizar");
    });

    $('#usersTable').on('click', '.delete-button', function () {
      const row = $(this).closest('tr');
      const data = $('#usersTable').DataTable().row(row).data();
      handleDelete(data.Id_Usuario);
    });

  }, [setUser, setButtonForm]);

  const handleDelete = async (userId) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esto.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo'
    });

    if (result.isConfirmed) {
      try {
        await clienteAxios.delete(`/usuarios/${userId}`);
        Swal.fire(
          'Eliminado!',
          'El usuario ha sido eliminado.',
          'success'
        );
        getAllUsers(); // Actualiza la tabla después de eliminar
      } catch (error) {
        Swal.fire(
          'Error!',
          'Hubo un problema al eliminar el usuario.',
          'error'
        );
      }
    }
  };

  return (
    <div className="container">
      <table id="usersTable" className="display" style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Código</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
      </table>
    </div>
  );
};

export default UsersTable;
