// import { useState } from "react";

// const FormQueryUnidades = ({ getUnidad, deleteUnidad, buttonForm, unidadQuery, setUnidadQuery }) => {
//   const [search, setSearch] = useState("");

//   const handleSearch = async (e) => {
//     e.preventDefault();
//     try {
//       // Aquí podrías hacer una llamada a la API para buscar unidades por nombre
//       const result = unidadQuery.filter(u => u.Nom_Unidad.toLowerCase().includes(search.toLowerCase()));
//       setUnidadQuery(result);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <form onSubmit={handleSearch} className="mb-4">
//       <input
//         type="text"
//         placeholder="Buscar por nombre..."
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//         className="w-full px-3 py-2 border rounded"
//       />
//       <button
//         type="submit"
//         className="bg-green-600 text-white px-4 py-2 rounded mt-2 hover:bg-green-800"
//       >
//         Buscar
//       </button>
//     </form>
//   );
// };

// export default FormQueryUnidades;
