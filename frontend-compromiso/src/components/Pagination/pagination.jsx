import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import clienteAxios from "../../config/axios.jsx";
import { ReactSession } from 'react-client-session';

const Pagination = ({ URI, setDesde, setHasta }) => {
  const [numRegistros, setNumRegistros] = useState(0);
  const [registrosPorPagina] = useState(5);
  const [paginaActual, setPaginaActual] = useState(1);
  const [paginas, setPaginas] = useState(0);

  const GetAllUsers = async () => {
    const token = ReactSession.get("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await clienteAxios.get(URI, config);
      const cantidadRegistros = response.data.length;
      setNumRegistros(cantidadRegistros);
      setPaginas(Math.ceil(cantidadRegistros / registrosPorPagina));
    } catch (error) {
      console.error("Error al obtener los registros:", error);
    }
  };

  useEffect(() => {
    GetAllUsers();
  }, [URI]);

  useEffect(() => {
    const desde = (paginaActual - 1) * registrosPorPagina;
    const hasta = Math.min(paginaActual * registrosPorPagina, numRegistros);
    setDesde(desde);
    setHasta(hasta);
  }, [paginaActual, numRegistros, registrosPorPagina, setDesde, setHasta]);

  const anterior = () => {
    if (paginaActual > 1) setPaginaActual(paginaActual - 1);
  };

  const siguiente = () => {
    if (paginaActual < paginas) setPaginaActual(paginaActual + 1);
  };

  return (
    <div className="flex items-center justify-between px-4 py-3">
      <button
        className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={anterior}
        disabled={paginaActual === 1}
      >
        <ChevronLeftIcon className="h-5 w-5" />
        <span className="sr-only">Anterior</span>
      </button>
      <div className="flex items-center space-x-1">
        {[...Array(paginas).keys()].map((n) => (
          <button
            key={n + 1}
            className={`relative inline-flex items-center px-3 py-1.5 text-sm font-medium ${n + 1 === paginaActual ? "bg-green-600 text-white" : "bg-white text-gray-800"} ring-1 ring-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-600`}
            onClick={() => setPaginaActual(n + 1)}
          >
            {n + 1}
          </button>
        ))}
      </div>
      <button
        className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={siguiente}
        disabled={paginaActual === paginas}
      >
        <ChevronRightIcon className="h-5 w-5" />
        <span className="sr-only">Siguiente</span>
      </button>
    </div>
  );
};

export default Pagination;
