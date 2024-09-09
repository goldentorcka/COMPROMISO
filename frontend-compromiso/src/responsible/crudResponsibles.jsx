import React, { useState, useEffect } from 'react';
import clienteAxios from '../api.js';
import Swal from 'sweetalert2';
import Pagination from '../components/Pagination/Pagination';
import FormQueryResponsable from './formQueryResponsibles.jsx';
import SidebarAdministrator from '../components/Admin/SidebarAdministrator.jsx';
import Button from 'react-bootstrap/Button'; // Asegúrate de importar Button desde react-bootstrap
import Modal from '../components/Modal/Init-Modal.jsx'; // Asegúrate de crear este archivo para el modal


const CrudResponsables = () => {
  const [responsableList, setResponsableList] = useState([]);
  const [responsable, setResponsable] = useState({
    Nom_Responsable: '',
    estado: 'Sí',
  });
  const [responsableQuery, setResponsableQuery] = useState([]);
  const [buttonForm, setButtonForm] = useState('Enviar');
  const [desde, setDesde] = useState(0);
  const [hasta, setHasta] = useState(10);
  const [showModal, setShowModal] = useState(false); // Estado para controlar la visibilidad del modal

  useEffect(() => {
    getAllResponsables();
  }, [desde, hasta]);

  const getAllResponsables = async () => {
    try {
      const response = await clienteAxios.get('/api/responsables');
      setResponsableList(response.data);
      setResponsableQuery(response.data); // Inicializar responsableQuery con todos los api/responsables
    } catch (error) {
      console.error('Error al obtener los responsables:', error);
    }
  };

  const getResponsable = async (id) => {
    try {
      const response = await clienteAxios.get(`/api/responsables/${id}`);
      setResponsable(response.data);
      setButtonForm('Actualizar');
      setShowModal(true); // Mostrar el modal al seleccionar un responsable
    } catch (error) {
      console.error('Error al obtener el responsable:', error);
    }
  };

  const deleteResponsable = async (id) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás recuperar este registro!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo!'
    });

    if (result.isConfirmed) {
      try {
        await clienteAxios.delete(`/api/responsables/${id}`);
        Swal.fire('Eliminado!', 'El registro ha sido eliminado.', 'success');
        getAllResponsables();
      } catch (error) {
        console.error('Error al eliminar el responsable:', error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (buttonForm === 'Enviar') {
        await clienteAxios.post('/api/responsables', responsable);
        Swal.fire('Agregado!', 'El responsable ha sido agregado.', 'success');
      } else {
        await clienteAxios.put(`/api/responsables/${responsable.Id_Responsable}`, responsable);
        Swal.fire('Actualizado!', 'El responsable ha sido actualizado.', 'success');
      }
      resetForm();
      getAllResponsables();
      setShowModal(false); // Cerrar el modal después de enviar
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    }
  };

  const resetForm = () => {
    setResponsable({
      Nom_Responsable: '',
      estado: 'Sí',
    });
    setButtonForm('Enviar');
  };

  const handleShowModal = () => setShowModal(true); // Función para abrir el modal

  return (
    <div className="crud-container">
      <SidebarAdministrator />
      <div className="main-content">
        <h1 className="page-title">Gestión de Responsables</h1>
        <div className="content-wrapper">
          {/* Modal se renderiza basado en el estado showModal */}
          <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="Nom_Responsable">Nombre del Responsable</label>
                <input
                  type="text"
                  id="Nom_Responsable"
                  value={responsable.Nom_Responsable}
                  onChange={(e) => setResponsable({ ...responsable, Nom_Responsable: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="estado">Estado</label>
                <select
                  id="estado"
                  value={responsable.estado}
                  onChange={(e) => setResponsable({ ...responsable, estado: e.target.value })}
                >
                  <option value="Sí">Sí</option>
                  <option value="No">No</option>
                </select>
              </div>
              <Button type="submit" variant="primary">
                {buttonForm}
              </Button>
              <Button type="button" variant="secondary" onClick={() => setShowModal(false)}>
                Cancelar
              </Button>
            </form>
          </Modal>
          <Button variant="primary" onClick={handleShowModal}>
            Registrar Responsable
          </Button>
          <div className="table-wrapper">
            <FormQueryResponsable
              responsableQuery={responsableQuery}
              setResponsableQuery={setResponsableQuery}
            />
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
                  responsableQuery.slice(desde, hasta).map((responsable) => (
                    <tr key={responsable.Id_Responsable}>
                      <td>{responsable.Id_Responsable}</td>
                      <td>{responsable.Nom_Responsable}</td>
                      <td>{responsable.estado}</td>
                      <td>
                        <div className="action-buttons">
                          <button
                            className="edit-button"
                            onClick={() => getResponsable(responsable.Id_Responsable)}
                          >
                            ✏️
                          </button>
                          <button
                            className="delete-button"
                            onClick={() => deleteResponsable(responsable.Id_Responsable)}
                          >
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <Pagination
              URI="/api/responsables"
              setDesde={setDesde}
              setHasta={setHasta}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrudResponsables;
