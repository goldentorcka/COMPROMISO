import React, { useState, useEffect } from 'react';
import clienteAxios from '../api.js';
import Swal from 'sweetalert2';
import Pagination from '../components/Pagination/pagination.jsx';
import SidebarAdministrator from '../components/Admin/SidebarAdministrator.jsx';
import Modal from '../components/Modal/Init-Modal.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import ActionButtons from '../components/Buttons/ActionsButton.jsx'; // Asegúrate de tener este componente

const CrudResponsables = () => {
  const [responsableList, setResponsableList] = useState([]);
  const [responsable, setResponsable] = useState({
    Nom_Responsable: '',
    estado: 'Activo',
  });
  const [buttonForm, setButtonForm] = useState('Enviar');
  const [desde, setDesde] = useState(0);
  const [hasta, setHasta] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getAllResponsables();
  }, [desde, hasta]);

  const getAllResponsables = async () => {
    try {
      const response = await clienteAxios.get('/api/responsables');
      setResponsableList(response.data);
    } catch (error) {
      console.error('Error al obtener los responsables:', error);
      Swal.fire('Error', 'No se pudieron obtener los responsables.', 'error');
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
      Swal.fire('Error', 'No se pudo obtener el responsable.', 'error');
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
        Swal.fire('Error', 'No se pudo eliminar el responsable.', 'error');
        console.error('Error al eliminar el responsable:', error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (responsable.Nom_Responsable.trim() === '') {
      Swal.fire('Error', 'El nombre del responsable es requerido.', 'error');
      return;
    }

    try {
      if (buttonForm === 'Enviar') {
        await clienteAxios.post('/api/responsables', responsable);
        Swal.fire('Agregado!', 'El responsable ha sido agregado.', 'success');
      } else {
        await clienteAxios.put(`/api/responsables/${responsable.Id_Responsable}`, responsable);
        Swal.fire('Actualizado!', 'El responsable ha sido actualizado.', 'success');
      }
      resetForm();
      setIsModalOpen(false);
      getAllResponsables();
    } catch (error) {
      Swal.fire('Error', 'Hubo un problema al enviar el formulario.', 'error');
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

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f4f4f4' }}>
      <SidebarAdministrator style={{ width: '240px', backgroundColor: '#343a40' }} />
      <div style={{ flex: 1, padding: '20px', marginLeft: '240px' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '20px', fontSize: '2rem', fontFamily: 'Georgia, serif', textTransform: 'uppercase' }}>
          Gestión de Responsables
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
            Añadir Responsable
          </button>

          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '10px' }}>
                <label>Nombre del Responsable:</label>
                <input
                  type="text"
                  value={responsable.Nom_Responsable}
                  onChange={(e) => setResponsable({ ...responsable, Nom_Responsable: e.target.value })}
                  required
                />
              </div>
              <div style={{ marginBottom: '10px' }}>
                <label>Estado:</label>
                <select value={responsable.estado} onChange={(e) => setResponsable({ ...responsable, estado: e.target.value })}>
                  <option value="Activo">Activo</option>
                  <option value="Inactivo">Inactivo</option>
                </select>
              </div>
              <button type="submit">{buttonForm}</button>
            </form>
          </Modal>

          <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#fff', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
              <thead>
                <tr>
                  <th style={{ backgroundColor: '#f9f9f9', textAlign: 'center', fontWeight: 'bold' }}>ID</th>
                  <th style={{ backgroundColor: '#f9f9f9', textAlign: 'center', fontWeight: 'bold' }}>Nombre</th>
                  <th style={{ backgroundColor: '#f9f9f9', textAlign: 'center', fontWeight: 'bold' }}>Estado</th>
                  <th style={{ backgroundColor: '#f9f9f9', textAlign: 'center', fontWeight: 'bold' }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {responsableList.slice(desde, hasta).map((responsable) => (
                  <tr key={responsable.Id_Responsable}>
                    <td style={{ textAlign: 'center', padding: '8px', borderBottom: '1px solid #ddd' }}>{responsable.Id_Responsable}</td>
                    <td style={{ textAlign: 'center', padding: '8px', borderBottom: '1px solid #ddd' }}>{responsable.Nom_Responsable}</td>
                    <td style={{ textAlign: 'center', padding: '8px', borderBottom: '1px solid #ddd' }}>{responsable.estado}</td>
                    <td style={{ textAlign: 'center', padding: '8px', borderBottom: '1px solid #ddd' }}>
                      <ActionButtons onEdit={() => getResponsable(responsable.Id_Responsable)} onDelete={() => deleteResponsable(responsable.Id_Responsable)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination
              totalItems={responsableList.length}
              itemsPerPage={10}
              currentPage={Math.floor(desde / 10) + 1}
              onPageChange={(page) => {
                setDesde((page - 1) * 10);
                setHasta(page * 10);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrudResponsables;
