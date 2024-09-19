// src/components/DataTable.js
import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import 'primereact/resources/themes/saga-blue/theme.css'; // tema de PrimeReact
import 'primereact/resources/primereact.min.css'; // estilos de PrimeReact
import 'primeicons/primeicons.css'; // iconos de PrimeReact
import '../components/styles/DataTable.css'; // Importa tus estilos CSS personalizados

const CustomDataTable = ({ data, columns, rowsPerPageOptions = [5, 10, 15], initialRows = 5 }) => {
    const [rows, setRows] = useState(initialRows);

    const handleDownload = () => {
        // Lógica para descargar los datos
        console.log("Descargando datos...");
    };

    return (
        <div className="custom-datatable">
            <div className="header">
                <Button 
                    icon="pi pi-download" 
                    label="Descargar" 
                    className="p-button-success p-mb-2" 
                    onClick={handleDownload} 
                />
            </div>
            <DataTable 
                value={data} 
                paginator 
                rows={rows} 
                rowsPerPageOptions={rowsPerPageOptions} 
                className="p-datatable-responsive-scroll custom-table"
            >
                {columns.map((col, index) => (
                    <Column key={index} field={col.field} header={col.header} style={{ width: col.width }} />
                ))}
            </DataTable>
            <div className="p-d-flex p-jc-end p-mt-2">
                <Dropdown 
                    value={rows} 
                    options={rowsPerPageOptions.map(option => ({ label: option, value: option }))} 
                    onChange={(e) => setRows(e.value)} 
                    placeholder="Filas por página" 
                />
                <Button 
                    icon="pi pi-refresh" 
                    className="p-button-rounded p-button-text p-mr-2" 
                    onClick={() => window.location.reload()} // Ejemplo de refresco
                />
            </div>
        </div>
    );
};

export default CustomDataTable;
