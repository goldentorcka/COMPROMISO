import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TableComponent = ({ tableName, columns }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Cargar datos desde la API de Strapi
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:1337/api/${tableName}`);
                setData(response.data.data); // ajustar según tu API
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchData();
    }, [tableName]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading data</p>;

    return (
        <table>
            <thead>
                <tr>
                    {columns.map((col, index) => (
                        <th key={index}>{col.header}</th>
                    ))}
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {data.map((row) => (
                    <tr key={row.id}>
                        {columns.map((col, index) => (
                            <td key={index}>{row[col.accessor]}</td>
                        ))}
                        <td>
                            <button onClick={() => handleEdit(row.id)}>Editar</button>
                            <button onClick={() => handleDelete(row.id)}>Borrar</button>
                        </td>
                    </tr>
                ))}
            </tbody>
         </table>
    );
};

// Handlers para acciones (editar y eliminar)
const handleEdit = (id) => {
    // lógica para editar (abrir modal o redirigir a formulario)
    console.log(`Editar registro con ID: ${id}`);
};   

const handleDelete = async (id) => {
    try {
        await axios.delete(`http://localhost:1337/api/tu_tabla/${id}`);
        console.log(`Registro con ID: ${id} borrado`);
        // Actualizar la tabla después de borrar
    } catch (error) {
        console.error("Error al borrar", error);
    }
};

export default TableComponent;
