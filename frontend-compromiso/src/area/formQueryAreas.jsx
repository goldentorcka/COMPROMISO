import { useState } from "react";

const FormQueryArea = ({ getArea, deleteArea, buttonForm, areaQuery, setAreaQuery }) => {
  const [search, setSearch] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      // Aquí podrías hacer una llamada a la API para buscar áreas por nombre
      const result = areaQuery.filter(a => a.Nom_Area.toLowerCase().includes(search.toLowerCase()));
      setAreaQuery(result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSearch} className="mb-4">
      <input
        type="text"
        placeholder="Buscar por nombre..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-3 py-2 border rounded"
      />
      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded mt-2 hover:bg-green-800"
      >
        Buscar
      </button>
    </form>
  );
};

export default FormQueryArea;
