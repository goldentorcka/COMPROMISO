// import { useEffect, useState } from "react";
// import clienteAxios from "../config/axios";
// import { ReactSession } from 'react-client-session';

// const FormQueryUsers = ({ buttonForm, setUserQuery }) => {
//   const [searchQuery, setSearchQuery] = useState({
//     nombre: "",
//     apellido: "",
//     correo: "",
//     rol: ""
//   });

//   const sendFormQuery = async () => {
//     const { nombre, apellido, correo, rol } = searchQuery;

//     // Crea la query dinámica según los campos que se ingresen
//     if (nombre || apellido || correo || rol) {
//       const token = ReactSession.get("token");
//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       };

//       let URI = `/usuarios/search?`;
//       if (nombre) URI += `nombre=${nombre}&`;
//       if (apellido) URI += `apellido=${apellido}&`;
//       if (correo) URI += `correo=${correo}&`;
//       if (rol) URI += `rol=${rol}&`;

//       try {
//         const respuesta = await clienteAxios.get(URI, config);
//         if (respuesta.status === 200) {
//           setUserQuery(respuesta.data); // Asigna la respuesta a `setUserQuery`
//         } else {
//           console.log("Error: " + respuesta.status);
//           setUserQuery([]);
//         }
//       } catch (error) {
//         console.error(error);
//         setUserQuery([]);
//       }
//     } else {
//       setUserQuery([]);
//     }
//   };

//   useEffect(() => {
//     setUserQuery([]);
//     setSearchQuery({
//       nombre: "",
//       apellido: "",
//       correo: "",
//       rol: ""
//     });
//   }, [buttonForm]);

//   return (
//     <div className="flex content-center w-96">
//       <form
//         id="queryForm"
//         className="bg-white rounded-2xl max-w-3xl w-full"
//         onSubmit={(e) => {
//           e.preventDefault();
//           sendFormQuery();
//         }}
//       >
//         <div className="mb-4">
//           <input
//             type="text"
//             id="userQueryNombre"
//             placeholder="Buscar por Nombre..."
//             className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
//             value={searchQuery.nombre}
//             onChange={(e) =>
//               setSearchQuery({ ...searchQuery, nombre: e.target.value })
//             }
//           />
//         </div>
//         <div className="mb-4">
//           <input
//             type="text"
//             id="userQueryApellido"
//             placeholder="Buscar por Apellido..."
//             className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
//             value={searchQuery.apellido}
//             onChange={(e) =>
//               setSearchQuery({ ...searchQuery, apellido: e.target.value })
//             }
//           />
//         </div>
//         <div className="mb-4">
//           <input
//             type="email"
//             id="userQueryCorreo"
//             placeholder="Buscar por Correo..."
//             className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
//             value={searchQuery.correo}
//             onChange={(e) =>
//               setSearchQuery({ ...searchQuery, correo: e.target.value })
//             }
//           />
//         </div>
//         <div className="mb-4">
//           <input
//             type="text"
//             id="userQueryRol"
//             placeholder="Buscar por Rol..."
//             className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
//             value={searchQuery.rol}
//             onChange={(e) =>
//               setSearchQuery({ ...searchQuery, rol: e.target.value })
//             }
//           />
//         </div>
//         <button
//           type="submit"
//           className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
//         >
//           Buscar
//         </button>
//       </form>
//     </div>
//   );
// };

// export default FormQueryUsers;
