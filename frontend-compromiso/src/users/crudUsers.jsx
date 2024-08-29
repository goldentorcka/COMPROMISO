import clienteAxios from "../config/axios";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import FormUsers from "./formUsers.jsx";
import Pagination from "../components/Pagination/Pagination";

// Accede a la variable de entorno definida en .env
const URI = import.meta.env.VITE_BACKEND_URL;

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
    rol: "Administrador", // Valor por defecto
    token: "",
    password: ""
  });
  const [buttonForm, setButtonForm] = useState("Enviar");
  const [stateAddUser, setStateAddUser] = useState(false);
  const [desde, setDesde] = useState(0);
  const [hasta, setHasta] = useState(10); // Cambiar según el número de registros por página

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    try {
      const response = await clienteAxios.get(URI);
      setUserList(response.data);
    } catch (error) {
      console.error("Error al obtener los usuarios:", error);
    }
  };

  const getUser = async (Id_Usuario) => {
    try {
      const response = await clienteAxios.get(`${URI}/${Id_Usuario}`);
      setUser(response.data);
      setButtonForm("Actualizar");
      setStateAddUser(true);
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
        await clienteAxios.delete(`${URI}/${Id_Usuario}`);
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
        await clienteAxios.post(URI, user);
        Swal.fire('Agregado!', 'El usuario ha sido agregado.', 'success');
      } else {
        await clienteAxios.put(`${URI}/${user.Id_Usuario}`, user);
        Swal.fire('Actualizado!', 'El usuario ha sido actualizado.', 'success');
      }
      setStateAddUser(false);
      getAllUsers();
      setUser({
        Nom_Usuario: "",
        Ape_Usuario: "",
        Cod_Usuario: "",
        Cor_Usuario: "",
        Nde_Usuario: "",
        Fec_Usuario: "",
        estado: "",
        rol: "Administrador",
        token: "",
        password: ""
      });
      setButtonForm("Enviar");
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    }
  };

  return (
    <>
      <h1>Gestión de Usuarios</h1>
      <button onClick={() => setStateAddUser(true)}>Agregar Usuario</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Código</th>
            <th>Correo</th>
            <th>Número de Documento</th>
            <th>Fecha de Nacimiento</th>
            <th>Estado</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(userList) && userList.slice(desde, hasta).map((user) => (
            <tr key={user.Id_Usuario}>
              <td>{user.Id_Usuario}</td>
              <td>{user.Nom_Usuario}</td>
              <td>{user.Ape_Usuario}</td>
              <td>{user.Cod_Usuario}</td>
              <td>{user.Cor_Usuario}</td>
              <td>{user.Nde_Usuario}</td>
              <td>{user.Fec_Usuario}</td>
              <td>{user.estado}</td>
              <td>{user.rol}</td>
              <td>
                <button onClick={() => getUser(user.Id_Usuario)}>Editar</button>
                <button onClick={() => deleteUser(user.Id_Usuario)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        desde={desde}
        setDesde={setDesde}
        hasta={hasta}
        setHasta={setHasta}
        max={userList.length}
      />
      {stateAddUser && (
        <FormUsers
          user={user}
          setUser={setUser}
          handleSubmit={handleSubmit}
          buttonForm={buttonForm}
        />
      )}
    </>
  );
};

export default CrudUsers;
