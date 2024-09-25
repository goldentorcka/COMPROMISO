import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import Swal from 'sweetalert2';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import '../styles/Datatable.css';
import { saveAs } from 'file-saver';
import Pagination from '../Pagination/pagination.jsx';

const CustomDataTable = ({ data, columns, rowsPerPageOptions = [5, 10, 15, { label: 'Todos', value: 'all' }], initialRows = 5 }) => {
    const [rows, setRows] = useState(initialRows);
    const [paginaActual, setPaginaActual] = useState(1);
    const [editedData, setEditedData] = useState(null);
    const [errors, setErrors] = useState({});

    const totalRegistros = data.length;

    const indexOfLastRecord = paginaActual * rows;
    const indexOfFirstRecord = indexOfLastRecord - rows;
    const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);

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

    const handleEdit = (rowData) => {
        setEditedData(rowData);
    };

    const handleSave = (editedProduct) => {
        const newErrors = {};
        columns.forEach(column => {
            const value = editedProduct[column.field];
            if (column.type === 'number' && isNaN(value)) {
                newErrors[column.field] = 'Debe ser un número';
            }
            if (column.type === 'text' && /\d/.test(value)) {
                newErrors[column.field] = 'No debe contener números';
            }
        });

        if (Object.keys(newErrors).length === 0) {
            // Actualizar los datos aquí
            const updatedData = data.map((item) => (item.id === editedProduct.id ? editedProduct : item));
            setEditedData(null); 
            setErrors({});

            // Mostrar alerta de éxito
            Swal.fire({
                title: '¡Edición exitosa!',
                text: 'El registro ha sido editado correctamente.',
                icon: 'success',
                confirmButtonText: 'OK'
            });
        } else {
            setErrors(newErrors);
        }
    };

    const handleCancelEdit = () => {
        setEditedData(null);
    };

    const handleDelete = (productId) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: 'Esta acción no se puede revertir',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                const updatedData = data.filter((item) => item.id !== productId);
                setEditedData(null);
                // Aquí se puede actualizar el estado del data con updatedData
            }
        });
    };

    const renderEditableCell = (rowData, column) => {
        // No permitir editar el campo 'id'
        if (column.field === 'id') {
            return <span>{rowData[column.field]}</span>;
        }

        // Si es un campo de estado (select), mostrar un select con las opciones
        if (editedData && editedData.id === rowData.id) {
            if (column.field === 'status') {
                return (
                    <select
                        value={editedData[column.field] || ''}
                        onChange={(e) => setEditedData({ ...editedData, [column.field]: e.target.value })}
                    >
                        <option value="Activo">Activo</option>
                        <option value="Inactivo">Inactivo</option>
                    </select>
                );
            }

            // Si es un campo tipo texto o número, mostrar un input
            return (
                <input
                    type={column.type || 'text'}
                    value={editedData[column.field] || ''}
                    onChange={(e) => setEditedData({ ...editedData, [column.field]: e.target.value })}
                />
            );
        }

        return <span>{rowData[column.field]}</span>;
    };

    return (
        <div className="custom-datatable card">
            <DataTable value={currentRecords} className="p-datatable-responsive-scroll custom-table">
                {columns.map((col, index) => (
                    <Column key={index} field={col.field} header={col.header} body={(rowData) => renderEditableCell(rowData, col)} />
                ))}
                <Column
                    header="Acciones"
                    body={(rowData) => (
                        <div className="p-d-flex p-jc-center">
                            {editedData && editedData.id === rowData.id ? (
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <Button
                                        icon="pi pi-check"
                                        className="p-button-rounded p-button-success"
                                        onClick={() => handleSave(editedData)}
                                    />
                                    <Button
                                        icon="pi pi-times"
                                        className="p-button-rounded p-button-danger"
                                        onClick={handleCancelEdit}
                                    />
                                </div>
                            ) : (
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <Button
                                        icon="pi pi-pencil"
                                        className="p-button-rounded"
                                        onClick={() => handleEdit(rowData)}
                                    />
                                    <Button
                                        icon="pi pi-trash"
                                        className="p-button-rounded p-button-danger"
                                        onClick={() => handleDelete(rowData.id)}
                                    />
                                </div>
                            )}
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
