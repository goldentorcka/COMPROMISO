import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import '../styles/Datatable.css';
import Pagination from '../Pagination/pagination.jsx';
import ActionButtons from '../Buttons/ActionsButton.jsx'; // Importa tus botones de acción
import SearchBar from '../Search/SearchBar.jsx'; // Asegúrate de importar el componente SearchBar

const CustomDataTable = ({
    data,
    columns,
    onEdit,
    onDelete,
    rowsPerPageOptions = [5, 10, 15, { label: 'Todos', value: 'all' }],
    initialRows = 5,
    searchField,
    exportFields
}) => {
    const [rows, setRows] = useState(initialRows);
    const [paginaActual, setPaginaActual] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const totalRegistros = data.length;

    // Filtrar datos basados en el término de búsqueda
    const filteredData = data.filter(item =>
        item[searchField]?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastRecord = paginaActual * rows;
    const indexOfFirstRecord = indexOfLastRecord - rows;
    const currentRecords = filteredData.slice(indexOfFirstRecord, indexOfLastRecord);

    return (
        <div className="custom-datatable card">
            <SearchBar data={data} onSearch={setSearchTerm} searchField={searchField} />

            <DataTable
                value={currentRecords}
                className="p-datatable-responsive-scroll custom-table"
                scrollable   // Habilita el scroll
                style={{ minWidth: '1000px' }} // Ajusta el ancho mínimo de la tabla
            >
                {columns.map((col, index) => (
                    <Column key={index} field={col.field} header={col.header} />
                ))}
                <Column
                    header="Acciones"
                    body={(rowData) => (
                        <ActionButtons
                            onEdit={() => onEdit(rowData)}  // Pasar el objeto completo de la fila
                            onDelete={() => onDelete(rowData)}  // Pasar el objeto completo de la fila
                        />
                    )}
                    headerStyle={{ width: '20%', textAlign: 'center' }}
                    bodyStyle={{ textAlign: 'center', overflow: 'visible' }}
                />
            </DataTable>

            <Pagination
                totalRegistros={filteredData.length} // Usar el número de registros filtrados
                registrosPorPagina={rows}
                paginaActual={paginaActual}
                setPaginaActual={setPaginaActual}
                registros={filteredData} // Pasar los registros filtrados al componente de paginación
                exportFields={exportFields} // Pasar las claves a exportar
            />
        </div>
    );
};

export default CustomDataTable;
