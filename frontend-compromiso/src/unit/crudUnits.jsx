import clienteAxios from "../config/axios.jsx";
import { useState, useEffect } from "react";
import { ReactSession } from 'react-client-session';
import Swal from "sweetalert2";
import FormUnidades from "../unit/formUnits.jsx"; // Componente para el formulario de unidades
import FormQueryUnidades from "../unit/formQueryUnits.jsx"; // Componente para buscar unidades
import Pagination from '../components/Pagination/Pagination';

import { AiOutlineMinusCircle } from "react-icons/ai";
import { IoMdPersonAdd } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

const URI = "unidades"; // Endpoint para unidades

const CrudUnidades = () => {
  const [unidadList, setUnidadList] = useState([]);
  const [unidadQuery, setUnidadQuery] = useState([]);
  const [buttonForm, setButtonForm] = useState("Enviar");
  const [stateAddUnidad, setStateAddUnidad] = useState(false);
  const [desde, setDesde] = useState(0);
  const [hasta, setHasta] = useState(0);
  const [alerta, setAlerta] = useState({});
  const [unidad, setUnidad] = useState({
    Nom_Unidad: "",
    Id_Area: "",
    estado: "",
  });

  useEffect(() => {
    getAllUnidades();
  }, []);

  const getAllUnidades = async () => {
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
        setUnidadList(responseApi.data);
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

  const getUnidad = async (Id_Unidad) => {
    setButtonForm("Actualizar");
    const token = ReactSession.get("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const responseApi = await clienteAxios.get(`${URI}/${Id_Unidad}`, config);
      if (responseApi.status === 200) {
        setUnidad(responseApi.data);
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

  const deleteUnidad = (Id_Unidad) => {
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
          const responseApi = await clienteAxios.delete(`${URI}/${Id_Unidad}`, config);
          if (responseApi.status === 200) {
            getAllUnidades(); // Refrescar la lista después de borrar
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
          onClick={() => setStateAddUnidad(!stateAddUnidad)}
        >
          {stateAddUnidad ? (
            <AiOutlineMinusCircle size={16} className="me-2" />
          ) : (
            <IoMdPersonAdd size={16} className="me-2" />
          )}
          {stateAddUnidad ? "Ocultar" : "Agregar"}
        </button>
      </div>
      <div className="overflow-x-auto">
        <div className="flex justify-between">
          <div>
            <h1 className="font-semibold text-lg text-gray-700">
              Buscar Por Nombre...
            </h1>
            <FormQueryUnidades
              getUnidad={getUnidad}
              deleteUnidad={deleteUnidad}
              buttonForm={buttonForm}
              unidadQuery={unidadQuery}
              setUnidadQuery={setUnidadQuery}
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
              <th className="py-2 px-4 border-2 border-b-gray-500">Área</th>
              <th className="py-2 px-4 border-2 border-b-gray-500">Estado</th>
              <th className="py-2 px-4 border-2 border-b-gray-500">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {(unidadQuery.length ? unidadQuery : unidadList).map(
              (unidad, indice) =>
                indice >= desde && indice < hasta ? (
                  <tr
                    key={unidad.Id_Unidad}
                    className="odd:bg-white even:bg-gray-100 select-none"
                  >
                    <td className="py-2 px-4 border-b">
                      {unidad.Id_Unidad}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {unidad.Nom_Unidad}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {unidad.Id_Area}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {unidad.estado}
                    </td>
                    <td className="py-2 px-4 border-b">
                      <button
                        onClick={() => [
                          getUnidad(unidad.Id_Unidad),
                          updateTextButton("Actualizar"),
                        ]}
                        className="text-blue-500 hover:text-blue-700 mx-2"
                      >
                        <FaRegEdit size={16} />
                      </button>
                      <button
                        onClick={() => deleteUnidad(unidad.Id_Unidad)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <MdDeleteOutline size={16} />
                      </button>
                    </td>
                  </tr>
                ) : null
            )}
          </tbody>
        </table>
        <Pagination
          data={unidadQuery.length ? unidadQuery : unidadList}
          desde={desde}
          hasta={hasta}
          setDesde={setDesde}
          setHasta={setHasta}
        />
      </div>
      {stateAddUnidad && (
        <FormUnidades
          setUnidad={setUnidad}
          unidad={unidad}
          setStateAddUnidad={setStateAddUnidad}
          buttonForm={buttonForm}
          setButtonForm={setButtonForm}
          getAllUnidades={getAllUnidades}
        />
      )}
    </>
  );
};

export default CrudUnidades;
