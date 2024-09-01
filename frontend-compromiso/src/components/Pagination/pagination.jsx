import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import clienteAxios from "../../config/axios.jsx";
import { ReactSession } from 'react-client-session';

const Pagination = ({ URI, setDesde, setHasta }) => {
  const [numRegistros, setNumRegistros] = useState(0);
  const [registrosPorPagina, setRegistrosPorPagina] = useState(5);
  const [paginas, setPaginas] = useState(0);
  const [paginaActual, setPaginaActual] = useState(1);
  const [botones, setBotones] = useState([]);

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
      const pages = Math.ceil(cantidadRegistros / registrosPorPagina);
      setPaginas(pages);
    } catch (error) {
      console.error("Error al obtener los registros:", error);
    }
  };

  useEffect(() => {
    GetAllUsers();
  }, []);

  useEffect(() => {
    if (paginas > 0) {
      paginar(paginaActual);
    }
  }, [paginas, paginaActual]);

  const paginar = (pagina) => {
    setPaginaActual(pagina);

    const desdePagina = (pagina - 1) * registrosPorPagina;
    setDesde(desdePagina);

    const hastaPagina = Math.min(pagina * registrosPorPagina, numRegistros);
    setHasta(hastaPagina);

    // Calcular los botones de paginación a mostrar
    const rango = 3;
    let inicio, fin;

    if (paginas <= rango) {
      inicio = 1;
      fin = paginas;
    } else if (pagina <= Math.ceil(rango / 2)) {
      inicio = 1;
      fin = rango;
    } else if (pagina > paginas - Math.floor(rango / 2)) {
      inicio = paginas - rango + 1;
      fin = paginas;
    } else {
      inicio = pagina - Math.floor(rango / 2);
      fin = pagina + Math.floor(rango / 2);
    }

    const botonesArray = Array.from({ length: fin - inicio + 1 }, (_, i) => inicio + i);
    setBotones(botonesArray);
  };

  const anterior = () => {
    if (paginaActual > 1) {
      paginar(paginaActual - 1);
    }
  };

  const siguiente = () => {
    if (paginaActual < paginas) {
      paginar(paginaActual + 1);
    }
  };

  return (
    <div className="flex items-center justify-between px-4 py-3">
      <button
        className="relative inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={anterior}
        disabled={paginaActual === 1}
      >
        <ChevronLeftIcon className="h-5 w-5" />
        <span className="sr-only">Anterior</span>
      </button>
      <div className="flex items-center space-x-1">
        {botones.map((numero) => (
          <button
            key={numero}
            className={`relative inline-flex items-center px-3 py-1.5 text-sm font-medium ${numero === paginaActual ? "bg-green-600 text-white" : "bg-white text-gray-800"} ring-1 ring-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-600`}
            onClick={() => paginar(numero)}
          >
            {numero}
          </button>
        ))}
      </div>
      <button
        className="relative inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
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
