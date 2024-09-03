import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FormQueryResponsables = () => {
  const [responsableQuery, setResponsableQuery] = useState('');

  // Efecto para manejar cambios en responsableQuery
  useEffect(() => {
    // Ejemplo de efecto que depende de responsableQuery
    const fetchData = async () => {
      try {
        const response = await axios.get(`/responsables?query=${responsableQuery}`);
        console.log(response.data);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    fetchData();
  }, [responsableQuery]);

  return (
    <div>
      <input
        type="text"
        value={responsableQuery}
        onChange={(e) => setResponsableQuery(e.target.value)}
        placeholder="Buscar responsables"
      />
    </div>
  );
};

export default FormQueryResponsables;
