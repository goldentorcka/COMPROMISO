import clienteAxios from "../config/axios.jsx";
import { useState, useEffect } from "react";
import { ReactSession } from 'react-client-session';
import Swal from "sweetalert2";
import FormArea from "../area/formAreas.jsx"; // Componente para el formulario de áreas
import FormQueryArea from "../area/formQueryAreas.jsx"; // Componente para buscar áreas
import Pagination from "../pagination.jsx";
import Alerta from "../components/Alerta.jsx";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { IoMdPersonAdd } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

const URI = "areas"; // Endpoint para áreas

const CrudArea = () => {
  const [areaList, setAreaList] = useState([]);
  const [areaQuery, setAreaQuery] = useState([]);
  const [buttonForm, setButtonForm] = useState("Enviar");
  const [stateAddArea, setStateAddArea] = useState(false);
  const [desde, setDesde] = useState(0);
  const [hasta, setHasta] = useState(0);
  const [alerta, setAlerta] = useState({});

  const [area, setArea] = useState({
    Nom_Area: "",
    estado: "",
  });

  useEffect(() => {
    getAllAreas();
  }, []);

  const getAllAreas = async () => {
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
        setAreaList(responseApi.data);
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

  const getArea = async (Id_Area) => {
    setButtonForm("Actualizar");
    const token = ReactSession.get("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const responseApi = await clienteAxios.get(`${URI}/${Id_Area}`, config);
      if (responseApi.status === 200) {
        setArea(responseApi.data);
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

  const deleteArea = (Id_Area) => {
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
          const responseApi = await clienteAxios.delete(`${URI}/${Id_Area}`, config);
          if (responseApi.status === 200) {
            getAllAreas(); // Refrescar la lista después de borrar
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
          onClick={() => setStateAddArea(!stateAddArea)}
        >
          {stateAddArea ? (
            <AiOutlineMinusCircle size={16} className="me-2" />
          ) : (
            <IoMdPersonAdd size={16} className="me-2" />
          )}
          {stateAddArea ? "Ocultar" : "Agregar"}
        </button>
      </div>
      <div className="overflow-x-auto">
        <div className="flex justify-between">
          <div>
            <h1 className="font-semibold text-lg text-gray-700">
              Buscar Por Nombre...
            </h1>
            <FormQueryArea
              getArea={getArea}
              deleteArea={deleteArea}
              buttonForm={buttonForm}
              areaQuery={areaQuery}
              setAreaQuery={setAreaQuery}
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
              <th className="py-2 px-4 border-2 border-b-gray-500">Estado</th>
              <th className="py-2 px-4 border-2 border-b-gray-500">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {(areaQuery.length ? areaQuery : areaList).map(
              (area, indice) =>
                indice >= desde && indice < hasta ? (
                  <tr
                    key={area.Id_Area}
                    className="odd:bg-white even:bg-gray-100 select-none"
                  >
                    <td className="py-2 px-4 border-b">
                      {area.Id_Area}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {area.Nom_Area}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {area.estado}
                    </td>
                    <td className="py-2 px-4 border-b">
                      <button
                        onClick={() => [
                          getArea(area.Id_Area),
                          setStateAddArea(true),
                        ]}
                        className="text-blue-500 hover:text-blue-700 hover:border hover:border-blue-500 mr-3 p-1 rounded"
                      >
                        <FaRegEdit />
                      </button>
                      <button
                        onClick={() => deleteArea(area.Id_Area)}
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
          max={areaList.length}
        />
      </div>
      {stateAddArea && (
        <FormArea
          area={area}
          setArea={setArea}
          updateTextButton={updateTextButton}
          buttonForm={buttonForm}
          getAllAreas={getAllAreas}
          setStateAddArea={setStateAddArea}
        />
      )}
    </>
  );
};

export default CrudArea;
