import React, { useState, useEffect } from 'react';
import { classNames } from 'primereact/utils';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Tag } from 'primereact/tag';
import { Button } from 'primereact/button';
import clienteAxios from '../../api.js'; // Asegúrate de que esta ruta sea correcta
// import NavMenuSE from "../../components/Nav/NavQuerySena/NavMenuS_E.jsx"; // Asegúrate de que esta ruta sea correcta

export default function AdvancedFilterDemo() {
    const [documentoList, setDocumentoList] = useState([]);
    const [filters, setFilters] = useState(null);
    const [loading, setLoading] = useState(false);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [statuses] = useState(['Activo', 'Inactivo']);
    const [processes, setProcesses] = useState([]);
    const [procedures, setProcedures] = useState([]);
    const [responsibles, setResponsibles] = useState([]);
    const [documentTypes, setDocumentTypes] = useState(['Formato', 'Instructivo']); // Reemplaza con tus tipos de documento

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
        setLoading(true);
        // Carga los datos de tu CRUD
        clienteAxios.get('api/documentos') // Cambia la ruta según tu API
            .then(response => {
                const documentosConNombres = response.data.map(doc => {
                    // Busca los nombres en las listas de procesos, procedimientos y responsables
                    const proceso = processes.find(p => p.id === doc.procesoId); // Ajusta según el campo en tu documento
                    const procedimiento = procedures.find(proc => proc.id === doc.procedimientoId); // Ajusta según el campo en tu documento
                    const responsable = responsibles.find(r => r.id === doc.responsableId); // Ajusta según el campo en tu documento

                    return {
                        ...doc,
                        nombre_proceso: proceso ? proceso.nombre_proceso : 'No disponible',
                        nombre_procedimiento: procedimiento ? procedimiento.nombre_procedimiento : 'No disponible',
                        nombre_responsable: responsable ? responsable.nombre_responsable : 'No disponible',
                    };
                });
                setDocumentoList(documentosConNombres);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error al cargar los documentos:", error);
                setLoading(false);
            });

        // Cargar procesos, procedimientos y responsables
        cargarDatosAuxiliares();
        initFilters();
    }, [processes, procedures, responsibles]);

    const cargarDatosAuxiliares = async () => {
        try {
            const procesosResponse = await clienteAxios.get('api/procesos'); // Ajusta la ruta
            const procedimientosResponse = await clienteAxios.get('api/procedimientos'); // Ajusta la ruta
            const responsablesResponse = await clienteAxios.get('api/responsables'); // Ajusta la ruta

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
            nombre_documento_magnetico: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            nombre_documento_visualizacion: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            version: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            tipo_documento: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
            fecha_elaboracion: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            nombre_proceso: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
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
                />
            </div>
        );
    };

    const nombreDocumentoBodyTemplate = (rowData) => {
        return rowData.nombre_documento;
    };

    const nombreDocumentoMagneticoBodyTemplate = (rowData) => {
        return rowData.nombre_documento_magnetico;
    };

    const nombreDocumentoVisualizacionBodyTemplate = (rowData) => {
        return rowData.nombre_documento_visualizacion;
    };

    const versionBodyTemplate = (rowData) => {
        return rowData.version;
    };

    const tipoDocumentoBodyTemplate = (rowData) => {
        return rowData.tipo_documento;
    };

    const fechaElaboracionBodyTemplate = (rowData) => {
        return rowData.fecha_elaboracion;
    };

    const nombreProcesoBodyTemplate = (rowData) => {
        return rowData.nombre_proceso; // Ahora debería mostrar el nombre correcto del proceso
    };

    const nombreProcedimientoBodyTemplate = (rowData) => {
        return rowData.nombre_procedimiento; // Ahora debería mostrar el nombre correcto del procedimiento
    };

    const nombreResponsableBodyTemplate = (rowData) => {
        return rowData.nombre_responsable; // Ahora debería mostrar el nombre correcto del responsable
    };

    const statusBodyTemplate = (rowData) => {
        return <Tag value={rowData.status} severity={getSeverity(rowData.status)} />;
    };

    const codigoBodyTemplate = (rowData) => {
        return rowData.codigo;
    };

    const statusFilterTemplate = (options) => {
        return (
            <Dropdown
                value={options.value}
                options={statuses}
                onChange={(e) => options.filterCallback(e.value, options.index)}
                placeholder="Select One"
                className="p-column-filter"
                showClear
            />
        );
    };

    const procesoFilterTemplate = (options) => {
        return (
            <Dropdown
                value={options.value}
                options={processes.map(p => ({ label: p.nombre_proceso, value: p.id }))} // Ajusta según tus datos
                onChange={(e) => options.filterCallback(e.value, options.index)}
                placeholder="Select Proceso"
                className="p-column-filter"
                showClear
            />
        );
    };

    const procedimientoFilterTemplate = (options) => {
        return (
            <Dropdown
                value={options.value}
                options={procedures.map(p => ({ label: p.nombre_procedimiento, value: p.id }))} // Ajusta según tus datos
                onChange={(e) => options.filterCallback(e.value, options.index)}
                placeholder="Select Procedimiento"
                className="p-column-filter"
                showClear
            />
        );
    };

    const responsableFilterTemplate = (options) => {
        return (
            <Dropdown
                value={options.value}
                options={responsibles.map(r => ({ label: r.nombre_responsable, value: r.id }))} // Ajusta según tus datos
                onChange={(e) => options.filterCallback(e.value, options.index)}
                placeholder="Select Responsable"
                className="p-column-filter"
                showClear
            />
        );
    };

    return (
        <>
            
            <div className="card">
                <DataTable
                    value={documentoList}
                    paginator
                    rows={10}
                    loading={loading}
                    header={renderHeader()}
                    filters={filters}
                    globalFilterFields={['codigo', 'nombre_documento', 'nombre_documento_magnetico', 'nombre_documento_visualizacion', 'version', 'tipo_documento', 'fecha_elaboracion', 'nombre_proceso', 'nombre_procedimiento', 'nombre_responsable', 'status']}
                    responsiveLayout="scroll"
                >
                    <Column field="codigo" header="Código" body={codigoBodyTemplate} filter filterPlaceholder="Buscar" />
                    <Column field="nombre_documento" header="Nombre Documento" body={nombreDocumentoBodyTemplate} filter filterPlaceholder="Buscar" />
                    <Column field="nombre_documento_magnetico" header="Nombre Documento Magnético" body={nombreDocumentoMagneticoBodyTemplate} filter filterPlaceholder="Buscar" />
                    <Column field="nombre_documento_visualizacion" header="Nombre Documento Visualización" body={nombreDocumentoVisualizacionBodyTemplate} filter filterPlaceholder="Buscar" />
                    <Column field="version" header="Versión" body={versionBodyTemplate} filter filterPlaceholder="Buscar" />
                    <Column field="tipo_documento" header="Tipo Documento" body={tipoDocumentoBodyTemplate} filter filterPlaceholder="Buscar" />
                    <Column field="fecha_elaboracion" header="Fecha Elaboración" body={fechaElaboracionBodyTemplate} filter filterPlaceholder="Buscar" />
                    <Column field="nombre_proceso" header="Nombre Proceso" body={nombreProcesoBodyTemplate} filter filterPlaceholder="Buscar" filterElement={procesoFilterTemplate} />
                    <Column field="nombre_procedimiento" header="Nombre Procedimiento" body={nombreProcedimientoBodyTemplate} filter filterPlaceholder="Buscar" filterElement={procedimientoFilterTemplate} />
                    <Column field="nombre_responsable" header="Nombre Responsable" body={nombreResponsableBodyTemplate} filter filterPlaceholder="Buscar" filterElement={responsableFilterTemplate} />
                    <Column field="status" header="Estado" body={statusBodyTemplate} filter filterElement={statusFilterTemplate} />
                </DataTable>
            </div>
        </>
    );
}
