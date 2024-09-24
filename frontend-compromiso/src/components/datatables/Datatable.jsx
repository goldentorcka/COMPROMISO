import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import Swal from 'sweetalert2'; 
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import '../styles/Datatable.css';
import { saveAs } from 'file-saver';
import Pagination from '../Pagination/pagination.jsx';
import ProductTable from '../../components/Buttons/EditDeleter.jsx';

const CustomDataTable = ({ data, columns, rowsPerPageOptions = [5, 10, 15, { label: 'Todos', value: 'all' }], initialRows = 5 }) => {
    const [rows, setRows] = useState(initialRows);
    const [paginaActual, setPaginaActual] = useState(1);
    const [showDownloadOptions, setShowDownloadOptions] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false); // Nuevo estado para controlar el modal

    const totalRegistros = data.length;

    // Calcular los datos para la página actual
    const indexOfLastRecord = paginaActual * rows;
    const indexOfFirstRecord = indexOfLastRecord - rows;
    const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);

    // Función para manejar las descargas en distintos formatos
    const handleDownload = (format) => {
        const jsonData = JSON.stringify(currentRecords, null, 2);

        let blob;
        let fileName;

        switch (format) {
            case 'json':
                blob = new Blob([jsonData], { type: 'application/json' });
                fileName = 'data.json';
                break;
            case 'csv':
                const csvData = columns.map(col => col.header).join(',') + '\n' +
                    currentRecords.map(row => columns.map(col => row[col.field]).join(',')).join('\n');
                blob = new Blob([csvData], { type: 'text/csv' });
                fileName = 'data.csv';
                break;
            default:
                return;
        }

        saveAs(blob, fileName);

        Swal.fire({
            title: '¡Descarga exitosa!',
            text: `El archivo ha sido descargado en formato ${format.toUpperCase()}.`,
            icon: 'success',
            confirmButtonText: 'OK'
        });
    };

    const handleEdit = (editedProduct) => {
        console.log('Editar producto:', editedProduct);
        setIsModalOpen(true); // Abre el modal y oculta la tabla
    };

    const handleDelete = (productId) => {
        console.log('Eliminar producto con ID:', productId);
        setIsModalOpen(true); // Abre el modal y oculta la tabla
    };

    return (
        <div className={`custom-datatable card ${isModalOpen ? 'hidden' : ''}`}>
            <DataTable value={currentRecords} className="p-datatable-responsive-scroll custom-table">
                {columns.map((col, index) => (
                    <Column key={index} field={col.field} header={col.header} style={{ width: col.width }} />
                ))}
                <Column
                    header="Acciones"
                    body={(rowData) => (
                        <div className="p-d-flex p-jc-center">
                            <ProductTable product={rowData} onEdit={() => handleEdit(rowData)} onDelete={() => handleDelete(rowData.id)} />
                        </div>
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
