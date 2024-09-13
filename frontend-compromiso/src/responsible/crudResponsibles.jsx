import React, { useState, useEffect } from 'react';
import clienteAxios from '../api.js';
import Swal from 'sweetalert2';
import FormGeneral from '../components/datatables/GeneralForm.jsx'; // Importa el nuevo formulario general
import Pagination from '../components/Pagination/Pagination';
import SidebarAdministrator from '../components/Admin/SidebarAdministrator.jsx';
import Modal from '../components/Modal/Init-Modal.jsx'; // Asegúrate de crear este archivo para el modal
import DownloadButtons from '../components/Buttons/ButtonsDowload.jsx'; // Importa el componente
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash, faUserShield } from '@fortawesome/free-solid-svg-icons';
import '../components/styles/stylesResponsiblesCrud.css'; // Importa el archivo CSS

const CrudResponsables = () => {
  const [responsableList, setResponsableList] = useState([]);
  const [responsable, setResponsable] = useState({
    Nom_Responsable: '',
    estado: 'Activo',
  });
  const [responsableQuery, setResponsableQuery] = useState([]);
  const [buttonForm, setButtonForm] = useState('Enviar');
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalRegistros, setTotalRegistros] = useState(0);
  const [registrosPorPagina] = useState(10); // Número de registros por página
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getAllResponsables();
  }, [paginaActual]);

  const getAllResponsables = async () => {
    try {
      const response = await clienteAxios.get('/api/responsables');
      const totalRegistros = response.data.length;
      setTotalRegistros(totalRegistros);
      const startIndex = (paginaActual - 1) * registrosPorPagina;
      const endIndex = Math.min(startIndex + registrosPorPagina, totalRegistros);
      setResponsableList(response.data);
      setResponsableQuery(response.data.slice(startIndex, endIndex));
    } catch (error) {
      console.error('Error al obtener los responsables:', error);
    }
  };

  const getResponsable = async (Id_Responsable) => {
    try {
      const response = await clienteAxios.get(`/api/responsables/${Id_Responsable}`);
      setResponsable(response.data);
      setButtonForm('Actualizar');
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error al obtener el responsable:', error);
    }
  };

  const deleteResponsable = async (Id_Responsable) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás recuperar este registro!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo!',
    });

    if (result.isConfirmed) {
      try {
        await clienteAxios.delete(`/api/responsables/${Id_Responsable}`);
        Swal.fire('Eliminado!', 'El registro ha sido eliminado.', 'success');
        getAllResponsables();
      } catch (error) {
        console.error('Error al eliminar el responsable:', error);
      }
    }
  };

  const handleSubmit = async (data) => {
    try {
      if (buttonForm === 'Enviar') {
        await clienteAxios.post('/api/responsables', data);
        Swal.fire('Agregado!', 'El responsable ha sido agregado.', 'success');
      } else {
        await clienteAxios.put(`/api/responsables/${data.Id_Responsable}`, data);
        Swal.fire('Actualizado!', 'El responsable ha sido actualizado.', 'success');
      }
      resetForm();
      setIsModalOpen(false);
      getAllResponsables();
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    }
  };

  const resetForm = () => {
    setResponsable({
      Nom_Responsable: '',
      estado: 'Activo',
    });
    setButtonForm('Enviar');
  };

  const formFields = [
    { name: 'Nom_Responsable', label: 'Nombre del Responsable', type: 'text', placeholder: 'Nombre', required: true },
    { name: 'estado', label: 'Estado', type: 'select', options: [
      { value: 'Activo', label: 'Activo' },
      { value: 'Inactivo', label: 'Inactivo' }
    ], required: true },
  ];

  return (
    <div className="crud-root">
      <div className="crud-container">
        <SidebarAdministrator />
        <div className="main-content">
          <h1 className="page-title">Gestión de Responsables</h1>
          <div className="content-wrapper">
            <button
              className="add-button"
              onClick={() => {
                setResponsable({
                  Nom_Responsable: '',
                  estado: 'Activo',
                });
                setButtonForm('Enviar');
                setIsModalOpen(true);
              }}
            >
              <FontAwesomeIcon icon={faUserShield} /> Agregar
            </button>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
              <FormGeneral
                initialValues={responsable}
                fields={formFields}
                onSubmit={handleSubmit}
                onCancel={() => {
                  resetForm();
                  setIsModalOpen(false);
                }}
                buttonText={buttonForm}
              />
            </Modal>

            <DownloadButtons 
              data={responsableList} 
              formType="responsable" 
              title="GESTIÓN DE RESPONSABLES" 
            /> {/* Pasa el título dinámico */}

            <div className="table-wrapper">
              <table className="responsable-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre del Responsable</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(responsableQuery) &&
                    responsableQuery.map((resp) => (
                      <tr key={resp.Id_Responsable}>
                        <td>{resp.Id_Responsable}</td>
                        <td>{resp.Nom_Responsable}</td>
                        <td>{resp.estado}</td>
                        <td>
                          <div className="action-buttons">
                            <button
                              className="edit-button"
                              onClick={() => getResponsable(resp.Id_Responsable)}
                            >
                              <FontAwesomeIcon icon={faEdit} />
                            </button>
                            <button
                              className="delete-button"
                              onClick={() => deleteResponsable(resp.Id_Responsable)}
                            >
                              <FontAwesomeIcon icon={faTrash} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              <Pagination
                totalRegistros={totalRegistros}
                registrosPorPagina={registrosPorPagina}
                paginaActual={paginaActual}
                setPaginaActual={setPaginaActual}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrudResponsables;
