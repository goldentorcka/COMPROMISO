import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import '../styles/Datatable.css';
import Pagination from '../Pagination/pagination.jsx';
import ActionButtons from '../Buttons/ActionsButton.jsx'; // Importa tus botones de acción

const CustomDataTable = ({ data, columns, onEdit, onDelete, rowsPerPageOptions = [5, 10, 15, { label: 'Todos', value: 'all' }], initialRows = 5 }) => {
    const [rows, setRows] = useState(initialRows);
    const [paginaActual, setPaginaActual] = useState(1);
    const totalRegistros = data.length;

    const indexOfLastRecord = paginaActual * rows;
    const indexOfFirstRecord = indexOfLastRecord - rows;
    const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);

    return (
        <div className="custom-datatable card">
            <DataTable value={currentRecords} className="p-datatable-responsive-scroll custom-table">
                {columns.map((col, index) => (
                    <Column key={index} field={col.field} header={col.header} />
                ))}
                <Column
                    header="Acciones"
                    body={(rowData) => (
                        <ActionButtons
                            onEdit={() => onEdit(rowData)}
                            onDelete={() => onDelete(rowData.Id_Responsable)}
                        />
                    )}
                    headerStyle={{ width: '20%', textAlign: 'center' }}
                    bodyStyle={{ textAlign: 'center', overflow: 'visible' }}
                />
            </DataTable>

            <Pagination
                totalRegistros={totalRegistros}
                registrosPorPagina={rows}
                paginaActual={paginaActual}
                setPaginaActual={setPaginaActual}
            />
        </div>
    );
};

export default CustomDataTable;
