import { useEffect, useState } from "react";
import clienteAxios from "../config/axios";
import { ReactSession } from 'react-client-session';

const FormQueryProcesses = ({ buttonForm, setProcessQuery }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const sendFormQuery = async (query) => {
    if (query) {
      const token = ReactSession.get("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const URI = `/procesos/nombre/${query}`; // Cambia el endpoint para consultar procesos
      try {
        const respuesta = await clienteAxios.get(URI, config);
        if (respuesta.status === 200) {
          setProcessQuery(respuesta.data); // Asigna la respuesta a `setProcessQuery`
        } else {
          console.log("Error: " + respuesta.status);
          setProcessQuery([]);
        }
      } catch (error) {
        console.error(error);
        setProcessQuery([]);
      }
    } else {
      setProcessQuery([]);
    }
  };

  useEffect(() => {
    setProcessQuery([]);
    setSearchQuery("");
  }, [buttonForm]);

  return (
    <div className="flex content-center w-96">
      <form
        id="queryForm"
        className="bg-white rounded-2xl max-w-3xl w-full"
      >
        <div className="mb-4">
          <input
            type="text"
            id="processQuery"
            placeholder="Buscar Procesos..."
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={searchQuery}
            onChange={(e) => {
              const { value } = e.target;
              setSearchQuery(value);
              sendFormQuery(value);
            }}
          />
        </div>
      </form>
    </div>
  );
};

export default FormQueryProcesses;
