// CrudAreas.jsx
import React, { useState, useEffect } from 'react';
import clienteAxios from '../api.js';
import Swal from 'sweetalert2';
import Pagination from '../components/Pagination/pagination.jsx';
import FormAreas from './FormAreas.jsx'; // Asegúrate de tener un formulario adecuado para las áreas
import SidebarAdministrator from '../components/Admin/SidebarAdministrator.jsx';
import Modal from '../components/Modal/Init-Modal.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';
import ActionButtons from '../components/Buttons/ActionsButton.jsx';
import CustomDataTable from '../components/datatables/Datatable.jsx'; // Importa el componente DataTable

const CrudAreas = () => {
  const [areaList, setAreaList] = useState([]);
  const [area, setArea] = useState({
    Nom_Area: "",
    estado: "Sí",
  });
  const [areaQuery, setAreaQuery] = useState([]);
  const [buttonForm, setButtonForm] = useState("Enviar");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getAllAreas();
  }, []);

  const getAllAreas = async () => {
    try {
      const response = await clienteAxios.get('/api/areas');
      setAreaList(response.data);
      setAreaQuery(response.data);
    } catch (error) {
      console.error("Error al obtener las áreas:", error);
    }
  };

  const getArea = async (Id_Area) => {
    try {
      const response = await clienteAxios.get(`/api/areas/${Id_Area}`);
      setArea(response.data);
      setButtonForm("Actualizar");
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error al obtener el área:", error);
    }
  };

  const deleteArea = async (Id_Area) => {
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
        await clienteAxios.delete(`/api/areas/${Id_Area}`);
        Swal.fire('Eliminado!', 'El registro ha sido eliminado.', 'success');
        getAllAreas();
      } catch (error) {
        console.error("Error al eliminar el área:", error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (buttonForm === "Enviar") {
        await clienteAxios.post('/api/areas', area);
        Swal.fire('Agregado!', 'El área ha sido agregada.', 'success');
      } else {
        await clienteAxios.put(`/api/areas/${area.Id_Area}`, area);
        Swal.fire('Actualizado!', 'El área ha sido actualizada.', 'success');
      }
      resetForm();
      setIsModalOpen(false);
      getAllAreas();
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    }
  };

  const resetForm = () => {
    setArea({
      Nom_Area: "",
      estado: "Sí",
    });
    setButtonForm("Enviar");
  };

  const handleSearch = (formData) => {
    console.log(formData);
    // Implementar lógica de búsqueda si es necesario
  };

  const columns = [
    { field: 'Id_Area', header: 'ID', width: '10%' },
    { field: 'Nom_Area', header: 'Nombre del Área', width: '30%' },
    { field: 'estado', header: 'Estado', width: '20%' },
    {
      field: 'actions', header: 'Acciones', width: '20%',
      body: (rowData) => (
        <ActionButtons 
          onEdit={() => getArea(rowData.Id_Area)} 
          onDelete={() => deleteArea(rowData.Id_Area)} 
        />
      )
    }
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f4f4f4' }}>
      <SidebarAdministrator style={{ width: '240px', backgroundColor: '#343a40' }} />
      <div style={{ flex: 1, padding: '20px', marginLeft: '240px' }}>
        <h1 style={{ textAlign: 'center' }}>Administrador - Áreas</h1>
        <div className="admin-menu">
          <a className="admin-item" href="/crudusuarios" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span className="admin-link">Ir a Usuarios</span>
            <FontAwesomeIcon icon={faBuilding} />
          </a>
        </div>
        <button
          className="btn btn-primary btn-block my-2"
          onClick={() => {
            resetForm();
            setIsModalOpen(true);
          }}
        >
          Agregar Área
        </button>
        <CustomDataTable data={areaList} columns={columns} />
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <FormAreas
            area={area}
            buttonLabel={buttonForm}
            onSubmit={handleSubmit}
            onChange={(e) => setArea({ ...area, [e.target.name]: e.target.value })}
            onReset={resetForm}
          />
        </Modal>
      </div>
    </div>
  );
};

export default CrudAreas;
