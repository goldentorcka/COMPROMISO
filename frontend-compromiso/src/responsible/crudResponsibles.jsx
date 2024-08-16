import clienteAxios from "../config/axios.jsx";
import { useState, useEffect } from "react";
import { ReactSession } from 'react-client-session';
import Swal from "sweetalert2";

import FormResponsables from "../responsible/formResponsibles.jsx";  // Renombrado para reflejar la tabla responsable
import FormQueryResponsables from "../responsible/formQueryResponsibles.jsx";  // Renombrado para reflejar la tabla responsable
import Pagination from "../pagination.jsx";
import Alerta from "../components/Alerta.jsx";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { IoMdPersonAdd } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

const URI = "responsables"; // Ajustado a la nueva URI

const CrudResponsables = () => {
  const [responsableList, setResponsableList] = useState([]);
  const [responsableQuery, setResponsableQuery] = useState([]);
  const [buttonForm, setButtonForm] = useState("Enviar");
  const [stateAddResponsable, setStateAddResponsable] = useState(false);
  const [desde, setDesde] = useState(0);
  const [hasta, setHasta] = useState(0);
  const [alerta, setAlerta] = useState({});

  const [responsable, setResponsable] = useState({
    Id_Responsable: "",
    Nom_Responsable: "",
    createdat: "",
    updatedat: "",
    estado: "",
  });

  useEffect(() => {
    getAllResponsables();
  }, []);

  const getAllResponsables = async () => {
    const token = ReactSession.get("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const responseApi = await clienteAxios(URI, config);
      if (responseApi.status === 200) {
        setResponsableList(responseApi.data);
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

  const getResponsable = async (Id_Responsable) => {
    setButtonForm("Actualizar");
    const token = ReactSession.get("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const responseApi = await clienteAxios(`${URI}/${Id_Responsable}`, config);
      if (responseApi.status === 200) {
        setResponsable(responseApi.data);
      } else {
        setAlerta({
          msg: "Error al cargar el registro!",
          error: true,
        });
      }
    } catch (error) {
      setAlerta({
        msg: "Error al cargar el registro!",
        error: true,
      });
      console.error(error);
    }
  };

  const deleteResponsable = (Id_Responsable) => {
    Swal.fire({
      title: "¿Estás seguro?",
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
          const responseApi = await clienteAxios.delete(`${URI}/${Id_Responsable}`, config);
          if (responseApi.status === 200) {
            getAllResponsables();  // Refrescar la lista después de borrar
            Swal.fire({
              title: "Borrado!",
              text: "El registro ha sido borrado.",
              icon: "success",
            });
          } else {
            setAlerta({
              msg: responseApi.data.message || "Error al borrar el registro!",
              error: true,
            });
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
          onClick={() => setStateAddResponsable(!stateAddResponsable)}
        >
          {stateAddResponsable ? (
            <AiOutlineMinusCircle size={16} className="me-2" />
          ) : (
            <IoMdPersonAdd size={16} className="me-2" />
          )}
          {stateAddResponsable ? "Ocultar" : "Agregar"}
        </button>
      </div>
      <div className="overflow-x-auto">
        <div className="flex justify-between">
          <div>
            <h1 className="font-semibold text-lg text-gray-700">Buscar Por Nombre...</h1>
            <FormQueryResponsables
              getResponsable={getResponsable}
              deleteResponsable={deleteResponsable}
              buttonForm={buttonForm}
              responsableQuery={responsableQuery}
              setResponsableQuery={setResponsableQuery}
            />
          </div>
        </div>
        <hr />
        {msg && <Alerta alerta={alerta} />}
        <table className="min-w-full bg-white text-center text-sm">
          <thead className="text-white bg-green-700">
            <tr>
              <th className="py-2 px-4 border-2 border-b-gray-500">ID</th>
              <th className="py-2 px-4 border-2 border-b-gray-500">Nombre</th>
              <th className="py-2 px-4 border-2 border-b-gray-500">Fecha Creación</th>
              <th className="py-2 px-4 border-2 border-b-gray-500">Fecha Actualización</th>
              <th className="py-2 px-4 border-2 border-b-gray-500">Estado</th>
              <th className="py-2 px-4 border-2 border-b-gray-500">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {(responsableQuery.length ? responsableQuery : responsableList).map(
              (responsable, indice) =>
                indice >= desde && indice < hasta ? (
                  <tr key={responsable.Id_Responsable} className="odd:bg-white even:bg-gray-100 select-none">
                    <td className="py-2 px-4 border-b">{responsable.Id_Responsable}</td>
                    <td className="py-2 px-4 border-b">{responsable.Nom_Responsable}</td>
                    <td className="py-2 px-4 border-b">{responsable.createdat}</td>
                    <td className="py-2 px-4 border-b">{responsable.updatedat}</td>
                    <td className="py-2 px-4 border-b">{responsable.estado}</td>
                    <td className="py-2 px-4 border-b">
                      <button
                        onClick={() => [getResponsable(responsable.Id_Responsable), setStateAddResponsable(true)]}
                        className="text-blue-500 hover:text-blue-700 hover:border hover:border-blue-500 mr-3 p-1 rounded"
                      >
                        <FaRegEdit />
                      </button>
                      <button
                        onClick={() => deleteResponsable(responsable.Id_Responsable)}
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
          max={responsableList.length}
        />
      </div>
      {stateAddResponsable ? (
        <FormResponsables
          responsable={responsable}
          setResponsable={setResponsable}
          updateTextButton={updateTextButton}
          buttonForm={buttonForm}
          getAllResponsables={getAllResponsables}
          setStateAddResponsable={setStateAddResponsable}
        />
      ) : null}
    </>
  );
};

export default CrudResponsables;
