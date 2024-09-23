// import React, { useEffect, useState } from "react";
// import $ from "jquery";
// import "datatables.net-dt/css/jquery.dataTables.min.css";
// import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
// import clieteAxios from "../../config/axios.jsx";
// import { ReactSession } from 'react-client-session';

// const Pagination = ({ URI, setDesde, setHasta }) => {
//   const [numRegistros, setNumRegistros] = useState(0);
//   const [registrosPorPagina, setRegistrosPorPagina] = useState(5);
//   const [paginaActual, setPaginaActual] = useState(1);

//   const GetAllUsers = async () => {
//     const token = ReactSession.get("token");
//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     };
//     try {
//       const response = await clieteAxios(URI, config);
//       const cantidadRegistros = response.data.length;
//       setNumRegistros(cantidadRegistros);
//       inicializarDataTable();
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const inicializarDataTable = () => {
//     $("#example").DataTable({
//       paging: false, // Desactivar la paginación de DataTables
//       // Configura otras opciones si es necesario
//     });
//   };

//   useEffect(() => {
//     GetAllUsers();
//   }, []);

//   useEffect(() => {
//     paginar(paginaActual);
//   }, [paginaActual]);

//   const paginar = (pagina) => {
//     setPaginaActual(pagina);

//     const desdePagina = (pagina - 1) * registrosPorPagina;
//     setDesde(desdePagina);

//     const hastaPagina = pagina * registrosPorPagina;
//     setHasta(hastaPagina);

//     $("#example").DataTable().clear().rows.add(datosPaginados()).draw();
//   };

//   const datosPaginados = () => {
//     // Lógica para obtener los datos paginados
//     // Debes devolver los datos en el formato esperado por DataTables
//     return [];
//   };

//   const anterior = () => {
//     if (paginaActual > 1) {
//       paginar(paginaActual - 1);
//     }
//   };

//   const siguiente = () => {
//     if (paginaActual < Math.ceil(numRegistros / registrosPorPagina)) {
//       paginar(paginaActual + 1);
//     }
//   };

//   return (
//     <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
//       <div className="flex flex-1 justify-between sm:hidden">
//         <button
//           className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
//           onClick={anterior}
//         >
//           Anterior
//         </button>
//         <button
//           className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
//           onClick={siguiente}
//         >
//           Siguiente
//         </button>
//       </div>
//       <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
//         <div>
//           <p className="text-sm text-gray-700">
//             Mostrando{" "}
//             <span className="font-medium">
//               {(paginaActual - 1) * registrosPorPagina + 1}
//             </span>{" "}
//             a{" "}
//             <span className="font-medium">
//               {Math.min(paginaActual * registrosPorPagina, numRegistros)}
//             </span>{" "}
//             de <span className="font-medium">{numRegistros}</span> registros.
//           </p>
//         </div>
//         <div>
//           <nav
//             aria-label="Pagination"
//             className="isolate inline-flex -space-x-px rounded-md shadow-sm"
//           >
//             <button
//               className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
//               onClick={anterior}
//             >
//               <span className="sr-only">Anterior</span>
//               <ChevronLeftIcon aria-hidden="true" className="h-5 w-5" />
//             </button>
//             <li
//               className={`relative z-10 inline-flex items-center px-4 py-2 text-sm font-semibold ${paginaActual === 1 ? "bg-green-600 text-white" : "bg-white"} focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 cursor-pointer ring-1 ring-inset ring-gray-300`}
//               onClick={() => paginar(1)}
//             >
//               1
//             </li>
//             {/* Añade aquí los números de página intermedios según sea necesario */}
//             <button
//               className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
//               onClick={siguiente}
//             >
//               <span className="sr-only">Siguiente</span>
//               <ChevronRightIcon aria-hidden="true" className="h-5 w-5" />
//             </button>
//           </nav>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Pagination;
