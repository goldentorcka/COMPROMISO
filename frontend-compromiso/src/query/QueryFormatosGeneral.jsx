import { useState } from "react";
import clieteAxios from "../config/axios"; // Asegúrate de ajustar la ruta de importación según sea necesario
import "../css/stylesConsultaFormatos.css"; // Archivo CSS para estilos personalizados

const ConsultaFormatos = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [resultados, setResultados] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!searchTerm.trim()) return;

    try {
      const url = `/api/formatos?nombre=${searchTerm}`; // Ajusta la ruta según tu API
      const { data } = await clieteAxios.get(url);
      setResultados(data);
    } catch (error) {
      console.error("Error al buscar los formatos:", error);
    }
  };

  return (
    <div className="consulta-container">
      <h1 className="consulta-title">Consulta de Formatos</h1>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Buscar formatos por nombre..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-button">
          <i className="fas fa-search"></i> {/* Icono de lupa */}
        </button>
      </form>
      <div className="resultados-container">
        {resultados.length > 0 ? (
          resultados.map((formato) => (
            <div key={formato.id} className="resultado-item">
              <h2>{formato.nombre}</h2>
              <p>{formato.descripcion}</p>
              <a href={formato.url} target="_blank" rel="noopener noreferrer">
                Descargar
              </a>
            </div>
          ))
        ) : (
          <p>No se encontraron formatos.</p>
        )}
      </div>
    </div>
  );
};

export default ConsultaFormatos;
