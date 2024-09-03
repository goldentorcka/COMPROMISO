import React, { useState, useEffect } from 'react';
import clienteAxios from '../api'; // Asegúrate de que la importación es correcta
import Swal from 'sweetalert2';
import FormResponsible from './formResponsibles';
import Pagination from '../components/Pagination/Pagination'; // Asegúrate de que este componente exista
import SidebarAdministrator from '../components/Admin/SidebarAdministrator';
import '../css/stylesCrudResponsible.css';

const CrudResponsible = () => {
  const [responsibles, setResponsibles] = useState([]);
  const [currentResponsible, setCurrentResponsible] = useState({
    Id_Responsible: "",
    Name: "",
    Email: "",
    Phone: "",
    Status: "Active",
  });
  const [buttonForm, setButtonForm] = useState("Submit");
  const [stateAddResponsible, setStateAddResponsible] = useState(true);
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);

  useEffect(() => {
    fetchResponsibles();
  }, [page]);

  const fetchResponsibles = async () => {
    try {
      const response = await clienteAxios.get('/responsibles', {
        params: {
          _page: page,
          _limit: perPage,
        },
      });
      setResponsibles(response.data);
    } catch (error) {
      console.error("Error al obtener los responsables:", error);
    }
  };

  const fetchResponsible = async (Id_Responsible) => {
    try {
      const response = await clienteAxios.get(`/responsibles/${Id_Responsible}`);
      setCurrentResponsible(response.data);
      setButtonForm("Update");
      setStateAddResponsible(true);
    } catch (error) {
      console.error("Error al obtener el responsable:", error);
    }
  };

  const deleteResponsible = async (Id_Responsible) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to recover this record!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        await clienteAxios.delete(`/responsibles/${Id_Responsible}`);
        Swal.fire('Deleted!', 'The record has been deleted.', 'success');
        fetchResponsibles(); // Update the list after deletion
      } catch (error) {
        console.error("Error al eliminar el responsable:", error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (buttonForm === "Submit") {
        await clienteAxios.post('/responsibles', currentResponsible);
        Swal.fire('Added!', 'The responsible has been added.', 'success');
      } else {
        await clienteAxios.put(`/responsibles/${currentResponsible.Id_Responsible}`, currentResponsible);
        Swal.fire('Updated!', 'The responsible has been updated.', 'success');
      }
      resetForm(); // Clear the form
      fetchResponsibles(); // Update the list
      setStateAddResponsible(false);
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    }
  };

  const resetForm = () => {
    setCurrentResponsible({
      Id_Responsible: "",
      Name: "",
      Email: "",
      Phone: "",
      Status: "Active",
    });
    setButtonForm("Submit");
  };

  return (
    <div className="crud-container">
      <SidebarAdministrator />
      <div className="main-content">
        <h1 className="page-title">Manage Responsible Persons</h1>
        <div className="content-wrapper">
          {stateAddResponsible && (
            <FormResponsible
              responsible={currentResponsible}
              setResponsible={setCurrentResponsible}
              handleSubmit={handleSubmit}
              buttonForm={buttonForm}
            />
          )}
          <div className="table-wrapper">
            <table className="responsible-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {responsibles.map((resp) => (
                  <tr key={resp.Id_Responsible}>
                    <td>{resp.Id_Responsible}</td>
                    <td>{resp.Name}</td>
                    <td>{resp.Email}</td>
                    <td>{resp.Phone}</td>
                    <td>{resp.Status}</td>
                    <td>
                      <button
                        className="edit-button"
                        onClick={() => fetchResponsible(resp.Id_Responsible)}
                      >
                        ✏️
                      </button>
                      <button
                        className="delete-button"
                        onClick={() => deleteResponsible(resp.Id_Responsible)}
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination
            setPage={setPage}
            perPage={perPage}
            page={page}
          />
        </div>
      </div>
    </div>
  );
};

export default CrudResponsible;
