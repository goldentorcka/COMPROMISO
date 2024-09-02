import { useEffect, useState } from "react";
import clienteAxios from "../config/axios"; // Corregido el nombre de la importación
import { ReactSession } from 'react-client-session';

const FormQueryResponsables = ({ buttonForm, setResponsableQuery }) => {
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

      const URI = `/api/responsables/{id}${query}`; // Cambiado el endpoint para consultar responsables
      try {
        const respuesta = await clienteAxios.get(URI, config);
        if (respuesta.status === 200) {
          setResponsableQuery(respuesta.data); // Asigna la respuesta a `setResponsableQuery`
        } else {
          console.log("Error: " + respuesta.status);
          setResponsableQuery([]);
        }
      } catch (error) {
        console.error(error);
        setResponsableQuery([]);
      }
    } else {
      setResponsableQuery([]);
    }
  };

  useEffect(() => {
    setResponsableQuery([]);
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
            id="responsableQuery"
            placeholder="Buscar Responsables..."
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

export default FormQueryResponsables;
