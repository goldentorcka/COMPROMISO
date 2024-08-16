import clienteAxios from "../config/axios.jsx";
import { useState, useEffect } from "react";
import { ReactSession } from 'react-client-session';
import Swal from "sweetalert2";
import FormProcedure from "../procedure/formProcedure.jsx"; // Componente para el formulario de procedimientos
import FormQueryProcedure from "../procedure/formQueryProcedure.jsx"; // Componente para buscar procedimientos
import Pagination from "../pagination.jsx";
import Alerta from "../components/Alerta.jsx";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { IoMdPersonAdd } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

const URI = "procedimientos"; // Endpoint para procedimientos

const CrudProcedure = () => {
  const [procedureList, setProcedureList] = useState([]);
  const [procedureQuery, setProcedureQuery] = useState([]);
  const [buttonForm, setButtonForm] = useState("Enviar");
  const [stateAddProcedure, setStateAddProcedure] = useState(false);
  const [desde, setDesde] = useState(0);
  const [hasta, setHasta] = useState(0);
  const [alerta, setAlerta] = useState({});

  const [procedure, setProcedure] = useState({
    Nom_Procedimiento: "",
    Id_Proceso: "",
    estado: "",
  });

  useEffect(() => {
    getAllProcedures();
  }, []);

  const getAllProcedures = async () => {
    const token = ReactSession.get("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const responseApi = await clienteAxios.get(URI, config);
      if (responseApi.status === 200) {
        setProcedureList(responseApi.data);
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

  const getProcedure = async (Id_Procedimiento) => {
    setButtonForm("Actualizar");
    const token = ReactSession.get("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const responseApi = await clienteAxios.get(`${URI}/${Id_Procedimiento}`, config);
      if (responseApi.status === 200) {
        setProcedure(responseApi.data);
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

  const deleteProcedure = (Id_Procedimiento) => {
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
          const responseApi = await clienteAxios.delete(`${URI}/${Id_Procedimiento}`, config);
          if (responseApi.status === 200) {
            getAllProcedures(); // Refrescar la lista después de borrar
            Swal.fire({
              title: "Borrado!",
              text: "El registro ha sido borrado.",
              icon: "success",
            });
          } else {
            Swal.fire({
              title: "Error!",
              text: responseApi.data.message,
              icon: "error",
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
          onClick={() => setStateAddProcedure(!stateAddProcedure)}
        >
          {stateAddProcedure ? (
            <AiOutlineMinusCircle size={16} className="me-2" />
          ) : (
            <IoMdPersonAdd size={16} className="me-2" />
          )}
          {stateAddProcedure ? "Ocultar" : "Agregar"}
        </button>
      </div>
      <div className="overflow-x-auto">
        <div className="flex justify-between">
          <div>
            <h1 className="font-semibold text-lg text-gray-700">
              Buscar Por Nombre...
            </h1>
            <FormQueryProcedure
              getProcedure={getProcedure}
              deleteProcedure={deleteProcedure}
              buttonForm={buttonForm}
              procedureQuery={procedureQuery}
              setProcedureQuery={setProcedureQuery}
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
              <th className="py-2 px-4 border-2 border-b-gray-500">Proceso</th>
              <th className="py-2 px-4 border-2 border-b-gray-500">Estado</th>
              <th className="py-2 px-4 border-2 border-b-gray-500">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {(procedureQuery.length ? procedureQuery : procedureList).map(
              (procedure, indice) =>
                indice >= desde && indice < hasta ? (
                  <tr
                    key={procedure.Id_Procedimiento}
                    className="odd:bg-white even:bg-gray-100 select-none"
                  >
                    <td className="py-2 px-4 border-b">
                      {procedure.Id_Procedimiento}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {procedure.Nom_Procedimiento}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {procedure.Id_Proceso} {/* Deberías mostrar el nombre del proceso en lugar del ID si es posible */}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {procedure.estado}
                    </td>
                    <td className="py-2 px-4 border-b">
                      <button
                        onClick={() => [
                          getProcedure(procedure.Id_Procedimiento),
                          setStateAddProcedure(true),
                        ]}
                        className="text-blue-500 hover:text-blue-700 hover:border hover:border-blue-500 mr-3 p-1 rounded"
                      >
                        <FaRegEdit />
                      </button>
                      <button
                        onClick={() => deleteProcedure(procedure.Id_Procedimiento)}
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
          max={procedureList.length}
        />
      </div>
      {stateAddProcedure && (
        <FormProcedure
          procedure={procedure}
          setProcedure={setProcedure}
          updateTextButton={updateTextButton}
          buttonForm={buttonForm}
          getAllProcedures={getAllProcedures}
          setStateAddProcedure={setStateAddProcedure}
        />
      )}
    </>
  );
};

export default CrudProcedure;
