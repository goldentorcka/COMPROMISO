import React, { useState, useEffect } from 'react';
import { classNames } from 'primereact/utils';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import { Button } from 'primereact/button';
import clienteAxios from '../../api.js';
import { FaEye, FaDownload } from 'react-icons/fa';
import NavMenuPublic from "../Nav/NavMenuPublic.jsx";
import { Dialog } from 'primereact/dialog';
import { PDFViewer } from '@react-pdf-viewer/core';

function AdvancedFilterDemo() {
    const [documentoList, setDocumentoList] = useState([]);
    const [filters, setFilters] = useState(null);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [statuses] = useState(['Activo', 'Inactivo']);
    const [processes, setProcesses] = useState([]);
    const [procedures, setProcedures] = useState([]);
    const [responsibles, setResponsibles] = useState([]);
    const [filterCodigo, setFilterCodigo] = useState('');
    const [filterProceso, setFilterProceso] = useState('');
    const [filterProcedimiento, setFilterProcedimiento] = useState('');
    const [filterResponsable, setFilterResponsable] = useState('');
    const [selectedDocument, setSelectedDocument] = useState(null); // Para el modal
    const [modalVisible, setModalVisible] = useState(false); // Control del modal
    const [fileUrls, setFileUrls] = useState([]); // Para almacenar URLs de los archivos PDF

    const getSeverity = (status) => {
        switch (status) {
            case 'Inactivo':
                return 'danger';
            case 'Activo':
                return 'success';
            default:
                return null;
        }
    };

    useEffect(() => {
        cargarDatosAuxiliares();
        initFilters();
    }, []);

    useEffect(() => {
        const fetchDocumentos = async () => {
            try {
                const response = await clienteAxios.get('api/documentos');
                const documentosConNombres = response.data.map(doc => {
                    const procedimiento = procedures.find(proc => proc.id === doc.procedimientoId);
                    const responsable = responsibles.find(r => r.id === doc.responsableId);

                    return {
                        ...doc,
                        nombre_procedimiento: procedimiento ? procedimiento.nombre_procedimiento : 'No disponible',
                        nombre_responsable: responsable ? responsable.nombre_responsable : 'No disponible',
                        fileUrl: doc.fileUrl // Asegurarnos de que cada documento tenga la URL del archivo
                    };
                });
                setDocumentoList(documentosConNombres);
            } catch (error) {
                console.error("Error al cargar los documentos:", error);
            }
        };

        if (procedures.length && responsibles.length) {
            fetchDocumentos();
        }
    }, [procedures, responsibles]);

    const cargarDatosAuxiliares = async () => {
        try {
            const procesosResponse = await clienteAxios.get('api/procesos');
            const procedimientosResponse = await clienteAxios.get('api/procedimientos');
            const responsablesResponse = await clienteAxios.get('api/responsables');

            setProcesses(procesosResponse.data);
            setProcedures(procedimientosResponse.data);
            setResponsibles(responsablesResponse.data);
        } catch (error) {
            console.error("Error al cargar datos auxiliares:", error);
        }
    };

    const initFilters = () => {
        setFilters({
            global: { value: null, matchMode: FilterMatchMode.CONTAINS },
            codigo: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            nombre_documento: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            version: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            tipo_documento: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
            fecha_elaboracion: { operator: FilterOperator.AAND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            nombre_procedimiento: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
            nombre_responsable: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
            status: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
        });
        setGlobalFilterValue('');
    };

    const clearFilter = () => {
        initFilters();
    };

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };
        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const renderHeader = () => {
        return (
            <div className="flex justify-content-between">
                <Button type="button" icon="pi pi-filter-slash" label="Clear" outlined onClick={clearFilter} />
                <InputText
                    value={globalFilterValue}
                    onChange={onGlobalFilterChange}
                    placeholder="Keyword Search"
                    className="p-inputtext-sm" // Estilo pequeño
                />
            </div>
        );
    };

    const nombreDocumentoBodyTemplate = (rowData) => rowData.nombre_documento;
    const versionBodyTemplate = (rowData) => rowData.version;
    const tipoDocumentoBodyTemplate = (rowData) => rowData.tipo_documento;
    const fechaElaboracionBodyTemplate = (rowData) => rowData.fecha_elaboracion;
    const nombreProcedimientoBodyTemplate = (rowData) => rowData.nombre_procedimiento;
    const nombreResponsableBodyTemplate = (rowData) => rowData.nombre_responsable;
    const statusBodyTemplate = (rowData) => <Tag value={rowData.status} severity={getSeverity(rowData.status)} />;
    const codigoBodyTemplate = (rowData) => rowData.codigo;

    const actionBodyTemplate = (rowData) => (
        <div className="flex gap-2">
            <Button 
                icon={<FaEye />} 
                className="p-button-rounded" 
                onClick={() => handleViewDocument(rowData)} 
                title="Ver Documento" 
            />
            <Button 
                icon={<FaDownload />} 
                className="p-button-rounded" 
                onClick={() => handleDownloadDocument(rowData)} 
                title="Descargar Documento" 
            />
        </div>
    );

    const handleViewDocument = (rowData) => {
        setSelectedDocument(rowData); 
        setModalVisible(true);
    };

    const handleDownloadDocument = (rowData) => {
        const url = rowData.fileUrl; // Asegurarse de que la URL del archivo esté presente
        const link = document.createElement('a');
        link.href = url;
        link.download = rowData.nombre_documento; // Nombre de archivo a descargar
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const closeModal = () => {
        setModalVisible(false);
        setSelectedDocument(null);
    };

    return (
        <div style={{ marginTop: '80px' }}>
            <NavMenuPublic />
            <div className="card" style={{ width: '95%', margin: '0 auto', marginTop: '20px' }}>
                <DataTable
                    value={documentoList}
                    filters={filters}
                    paginator
                    rows={6} // Reducir filas por página
                    rowsPerPageOptions={[5, 6, 8, 10]} // Opciones de cantidad de filas
                    header={renderHeader}
                    globalFilterFields={['codigo', 'nombre_documento', 'tipo_documento', 'fecha_elaboracion', 'nombre_procedimiento', 'nombre_responsable']}
                    className="p-datatable-sm" // Para hacer la tabla más pequeña
                    style={{ margin: '20px', borderRadius: '10px' }}
                >
                    <Column field="codigo" header="Código" body={codigoBodyTemplate} filter sortable />
                    <Column field="nombre_documento" header="Nombre Documento" body={nombreDocumentoBodyTemplate} filter sortable />
                    <Column field="version" header="Versión" body={versionBodyTemplate} filter sortable />
                    <Column field="tipo_documento" header="Tipo Documento" body={tipoDocumentoBodyTemplate} filter sortable />
                    <Column field="fecha_elaboracion" header="Fecha Elaboración" body={fechaElaboracionBodyTemplate} filter sortable />
                    <Column field="nombre_procedimiento" header="Procedimiento" body={nombreProcedimientoBodyTemplate} filter sortable />
                    <Column field="nombre_responsable" header="Responsable" body={nombreResponsableBodyTemplate} filter sortable />
                    <Column field="status" header="Estado" body={statusBodyTemplate} filter sortable />
                    <Column body={actionBodyTemplate} header="Acciones" />
                </DataTable>
            </div>

            <Dialog
                header="Visualizar Documento"
                visible={modalVisible}
                style={{ width: '70vw' }}
                footer={<Button label="Cerrar" icon="pi pi-times" onClick={closeModal} />}
                onHide={closeModal}
            >
                {selectedDocument && (
                    <PDFViewer fileUrl={selectedDocument.fileUrl} />
                )}
            </Dialog>
        </div>
    );
}

export default AdvancedFilterDemo;
