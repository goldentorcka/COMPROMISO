import clienteAxios from "../config/axios.jsx";
import { useState, useEffect } from "react";
import { ReactSession } from 'react-client-session';
import Swal from "sweetalert2";
import FormProcesses from "../process/formProcess.jsx"; // Asegúrate de tener un componente similar para procesos
import FormQueryProcesses from "../process/formQueryProcess.jsx"; // Componente para buscar procesos
import Pagination from "../pagination.jsx";
import Alerta from "../components/Alerta.jsx";

const URI = "procesos"; // Cambiado el endpoint a 'procesos'

const CrudProcesses = () => {
  const [processList, setProcessList] = useState([]);
  const [processQuery, setProcessQuery] = useState([]);
  const [buttonForm, setButtonForm] = useState("Enviar");
  const [stateAddProcess, setStateAddProcess] = useState(false);
  const [desde, setDesde] = useState(0);
  const [hasta, setHasta] = useState(0);
  const [alerta, setAlerta] = useState({});

  const [process, setProcess] = useState({
    Nom_Proceso: "",
    Id_Responsable: "",
    estado: "",
  });

  useEffect(() => {
    getAllProcesses();
  }, []);

  const getAllProcesses = async () => {
    const token = ReactSession.get("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const responseApi = await clienteAxios.get(URI, config); // Ajustado el método a .get
      if (responseApi.status === 200) {
        setProcessList(responseApi.data);
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

  const getProcess = async (Id_Proceso) => {
    setButtonForm("Actualizar");
    const token = ReactSession.get("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const responseApi = await clienteAxios.get(`${URI}/${Id_Proceso}`, config); // Ajustado el método a .get
      if (responseApi.status === 200) {
        setProcess({
          ...responseApi.data,
        });
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

  const deleteProcess = (Id_Proceso) => {
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
          const responseApi = await clienteAxios.delete(
            `/${URI}/${Id_Proceso}`,
            config
          );
          if (responseApi.status === 200) {
            getAllProcesses(); // Refrescar la lista después de borrar
            Swal.fire({
              title: "Borrado!",
              text: "El registro ha sido borrado.",
              icon: "success",
            });
          } else {
            alert(responseApi.data.message);
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
            setStateAddProcess(!stateAddProcess);
          }}
        >
          {stateAddProcess ? (
            <AiOutlineMinusCircle size={16} className="me-2" />
          ) : (
            <IoMdPersonAdd size={16} className="me-2" />
          )}
          {stateAddProcess ? "Ocultar" : "Agregar"}
        </button>
      </div>
      <div className="overflow-x-auto">
        <div className="flex justify-between">
          <div>
            <h1 className="font-semibold text-lg text-gray-700">
              Buscar Por Nombre...
            </h1>
            <FormQueryProcesses
              getProcess={getProcess}
              deleteProcess={deleteProcess}
              buttonForm={buttonForm}
              processQuery={processQuery}
              setProcessQuery={setProcessQuery}
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
              <th className="py-2 px-4 border-2 border-b-gray-500">Responsable</th>
              <th className="py-2 px-4 border-2 border-b-gray-500">Estado</th>
              <th className="py-2 px-4 border-2 border-b-gray-500">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {(processQuery.length ? processQuery : processList).map(
              (process, indice) =>
                indice >= desde && indice < hasta ? (
                  <tr
                    key={process.Id_Proceso}
                    className="odd:bg-white even:bg-gray-100 select-none"
                  >
                    <td className="py-2 px-4 border-b">
                      {process.Id_Proceso}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {process.Nom_Proceso}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {process.Id_Responsable}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {process.estado}
                    </td>
                    <td className="py-2 px-4 border-b">
                      <button
                        onClick={() => [
                          getProcess(process.Id_Proceso),
                          setStateAddProcess(true),
                        ]}
                        className="text-blue-500 hover:text-blue-700 hover:border hover:border-blue-500 mr-3 p-1 rounded"
                      >
                        <FaRegEdit />
                      </button>
                      <button
                        onClick={() => deleteProcess(process.Id_Proceso)}
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
          max={processList.length}
        />
      </div>
      {stateAddProcess ? (
        <FormProcesses
          process={process}
          setProcess={setProcess}
          updateTextButton={updateTextButton}
          buttonForm={buttonForm}
          getAllProcesses={getAllProcesses}
          setStateAddProcess={setStateAddProcess}
        />
      ) : null}
      <Outlet />
    </>
  );
};

export default CrudProcesses;
