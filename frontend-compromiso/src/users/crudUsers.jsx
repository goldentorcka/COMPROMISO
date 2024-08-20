import clieteAxios from "../config/axios.jsx";
import { useState, useEffect } from "react";
import { ReactSession } from 'react-client-session';
import Swal from "sweetalert2";

import FormUsers from "./formUsers.jsx";
import FormQueryUsers from "./formQueryUsers.jsx";
// import ModalDialog from "./modalDialog.jsx";
import Pagination from "../pagination.jsx";
// import ImportarCSV from "./importarCSV.jsx";
import Alerta from "../components/Alerta.jsx";

// import { MdDeleteOutline } from "react-icons/md";
// import { FaRegEdit } from "react-icons/fa";
// import { IoMdPersonAdd } from "react-icons/io";
// import { AiOutlineMinusCircle } from "react-icons/ai";
// import { Outlet } from "react-router-dom";

const URI = "usuarios";

const CrudUsers = () => {
  const [userList, setUserList] = useState([]);
  const [userQuery, setUserQuery] = useState([]);
  const [buttonForm, setButtonForm] = useState("Enviar");
  const [stateAddUser, setStateAddUser] = useState(false);
  // const [onDoubleClickUser, setOnDoubleClickUser] = useState({});
  // const [modalDialog, setModalDialog] = useState(false);
  const [desde, setDesde] = useState(0);
  const [hasta, setHasta] = useState(0);
  const [alerta, setAlerta] = useState({});

  const [user, setUser] = useState({
    Nom_Usuario: "",
    Ape_Usuario: "",
    Cod_Usuario: "",
    Cor_Usuario: "",
    Nde_Usuario: "",
    Fec_Usuario: "",
    estado: "",
    rol: "",
    token: "",
    password: "",
  });

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    const token = ReactSession.get("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const respuestApi = await clieteAxios(URI, config);
      if (respuestApi.status === 200) {
        setUserList(respuestApi.data);
      } else {
        setAlerta({
          msg: "Error al cargar los registros!",
          error: true,
        });
      }
    } catch (error) {
      setAlerta({
        msg: "Error al cargar los registros!",
        error: true,
      });
      console.error(error);
    }
  };

  const getUser = async (Id_Usuario) => {
    setButtonForm("Actualizar");
    const token = ReactSession.get("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const respuestApi = await clieteAxios(`${URI}/${Id_Usuario}`, config);
      if (respuestApi.status === 200) {
        setUser({
          ...respuestApi.data,
        });
      } else {
        setAlerta({
          msg: "Error al cargar los registros!",
          error: true,
        });
      }
    } catch (error) {
      setAlerta({
        msg: "Error al cargar los registros!",
        error: true,
      });
      console.error(error);
    }
  };

  const deleteUser = (Id_Usuario) => {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, Borrar!",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const token = ReactSession.get("token");
        const config = {
          headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const respuestApi = await clieteAxios.delete(
          `/${URI}/${Id_Usuario}`,
          config
        );
        if (respuestApi.status === 200) {
          getAllUsers();  // Refrescar la lista después de borrar
          Swal.fire({
            title: "Borrado!",
            text: "El registro ha sido borrado.",
            icon: "success",
          });
        } else {
          alert(respuestApi.data.message);
        }
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "Hubo un problema al intentar borrar el registro.",
          icon: "error",
        });
        console.error(error);
      }
      }
    });
  };

  const updateTextButton = (text) => {
    setButtonForm(text);
  };

  const { msg } = alerta;

  return (
    <>
      <div className="flex justify-end pb-3">
        <button
          className="bg-green-600 px-6 py-2 rounded-xl text-white font-bold m-4 flex items-center hover:bg-green-800"
          onClick={() => {
            setStateAddUser(!stateAddUser);
          }}
        >
          {stateAddUser ? (
            <AiOutlineMinusCircle size={16} className="me-2" />
          ) : (
            <IoMdPersonAdd size={16} className="me-2" />
          )}
          {stateAddUser ? "Ocultar" : "Agregar"}
        </button>
      </div>
      <div className="overflow-x-auto">
        <div className="flex justify-between">
          <div>
            <h1 className="font-semibold text-lg text-gray-700">
              Buscar Por Nombre...
            </h1>
            <FormQueryUsers
              getUser={getUser}
              deleteUser={deleteUser}
              buttonForm={buttonForm}
              userQuery={userQuery}
              setUserQuery={setUserQuery}
            />
          </div>
        </div>
        <hr />
        {msg && <Alerta alerta={alerta} />}
        <table className="min-w-full bg-white text-center text-sm">
          <thead className="text-white bg-green-700">
            <tr className="">
              <th className="py-2 px-4 border-2 border-b-gray-500">ID</th>
              <th className="py-2 px-4 border-2 border-b-gray-500">Nombre</th>
              <th className="py-2 px-4 border-2 border-b-gray-500">Apellido</th>
              <th className="py-2 px-4 border-2 border-b-gray-500">Código</th>
              <th className="py-2 px-4 border-2 border-b-gray-500">Correo</th>
              <th className="py-2 px-4 border-2 border-b-gray-500">Estado</th>
              <th className="py-2 px-4 border-2 border-b-gray-500">Rol</th>
              <th className="py-2 px-4 border-2 border-b-gray-500">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {(userQuery.length ? userQuery : userList).map(
              (user, indice) =>
                indice >= desde && indice < hasta ? (
                  <tr
                    key={user.Id_Usuario}
                    className="odd:bg-white even:bg-gray-100 select-none"

                  >
                    <td className="py-2 px-4 border-b">
                      {user.Id_Usuario}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {user.Nom_Usuario}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {user.Ape_Usuario}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {user.Cod_Usuario}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {user.Cor_Usuario}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {user.estado}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {user.rol}
                    </td>
                    <td className="py-2 px-4 border-b">
                      <button
                        onClick={() => [
                          getUser(user.Id_Usuario),
                          setStateAddUser(true),
                        ]}
                        className="text-blue-500 hover:text-blue-700 hover:border hover:border-blue-500 mr-3 p-1 rounded"
                      >
                        <FaRegEdit />
                      </button>
                      <button
                        onClick={() => deleteUser(user.Id_Usuario)}
                        className="text-red-500 hover:text-red-700 hover:border hover:border-red-500 p-1 rounded"
                      >
                        <MdDeleteOutline />
                      </button>
                    </td>
                  </tr>
                ) : null
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-4">
        <Pagination
          desde={desde}
          setDesde={setDesde}
          hasta={hasta}
          setHasta={setHasta}
          max={userList.length}
        />
      </div>
      {stateAddUser ? (
        <FormUsers
          user={user}
          setUser={setUser}
          updateTextButton={updateTextButton}
          buttonForm={buttonForm}
          getAllUsers={getAllUsers}
          setStateAddUser={setStateAddUser}
        />
      ) : null}
      <Outlet />
    </>
  );
};

export default CrudUsers;
