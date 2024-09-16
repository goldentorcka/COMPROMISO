import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import $ from 'jquery';
// import 'datatables.net';
// import 'datatables.net-select';

const CrudArea = () => {
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch areas from API
    const fetchAreas = async () => {
      try {
        const response = await axios.get('http://localhost:1337/api/areas');
        setAreas(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching areas:', error);
        setLoading(false);
      }
    };

    fetchAreas();
  }, []);

  useEffect(() => {
    if (!loading) {
      $('#areasTable').DataTable({
        data: areas,
        columns: [
          { data: 'Id_Area', title: 'ID' },
          { data: 'Nom_Area', title: 'Nombre' },
          { data: 'estado', title: 'Estado' },
          {
            data: null,
            className: 'center',
            defaultContent: `
              <button class="edit">Editar</button>
              <button class="delete">Eliminar</button>
            `,
            orderable: false
          }
        ]
      });
    }
  }, [loading, areas]);

  // Function to handle editing
  const handleEdit = async (id, data) => {
    const { value: formValues } = await Swal.fire({
      title: 'Editar Área',
      html: `
        <input id="nom_area" class="swal2-input" placeholder="Nombre" value="${data.Nom_Area}">
        <select id="estado" class="swal2-select">
          <option value="Sí" ${data.estado === 'Sí' ? 'selected' : ''}>Sí</option>
          <option value="No" ${data.estado === 'No' ? 'selected' : ''}>No</option>
        </select>
      `,
      confirmButtonText: 'Actualizar',
      preConfirm: () => ({
        Nom_Area: document.getElementById('nom_area').value,
        estado: document.getElementById('estado').value
      })
    });

    if (formValues) {
      try {
        await axios.put(`http://localhost:1337/api/areas/${id}`, formValues);
        $('#areasTable').DataTable().ajax.reload();
        Swal.fire('Actualizado', 'El área ha sido actualizada', 'success');
      } catch (error) {
        Swal.fire('Error', 'No se pudo actualizar el área', 'error');
      }
    }
  };

  // Function to handle deleting
  const handleDelete = async (id) => {
    const { isConfirmed } = await Swal.fire({
      title: 'Eliminar Área',
      text: '¿Estás seguro de que quieres eliminar esta área?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    });

    if (isConfirmed) {
      try {
        await axios.delete(`http://localhost:1337/api/areas/${id}`);
        $('#areasTable').DataTable().ajax.reload();
        Swal.fire('Eliminado', 'El área ha sido eliminada', 'success');
      } catch (error) {
        Swal.fire('Error', 'No se pudo eliminar el área', 'error');
      }
    }
  };

  // Event delegation for edit and delete buttons
  $(document).on('click', '#areasTable .edit', function () {
    const data = $('#areasTable').DataTable().row($(this).parents('tr')).data();
    handleEdit(data.Id_Area, data);
  });

  $(document).on('click', '#areasTable .delete', function () {
    const data = $('#areasTable').DataTable().row($(this).parents('tr')).data();
    handleDelete(data.Id_Area);
  });

  return (
    <div>
      <h1>Gestión de Áreas</h1>
      <table id="areasTable" className="display">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {/* La tabla se llenará con DataTables */}
        </tbody>
      </table>
    </div>
  );
};

export default CrudArea;
