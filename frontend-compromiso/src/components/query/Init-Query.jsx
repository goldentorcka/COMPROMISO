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
import { FaEye, FaDownload } from 'react-icons/fa'; // Asegúrate de tener react-icons instalado

export default function AdvancedFilterDemo() {
    const [documentoList, setDocumentoList] = useState([]);
    const [filters, setFilters] = useState(null);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [statuses] = useState(['Activo', 'Inactivo']);
    const [processes, setProcesses] = useState([]);
    const [procedures, setProcedures] = useState([]);
    const [responsibles, setResponsibles] = useState([]);
    const [documentTypes] = useState(['Formato', 'Instructivo']); // Reemplaza con tus tipos de documento

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
        // Carga los datos de tu CRUD después de que se hayan cargado los datos auxiliares
        const fetchDocumentos = async () => {
            try {
                const response = await clienteAxios.get('api/documentos'); // Cambia la ruta según tu API
                const documentosConNombres = response.data.map(doc => {
                    const proceso = processes.find(p => p.id === doc.procesoId);
                    const procedimiento = procedures.find(proc => proc.id === doc.procedimientoId);
                    const responsable = responsibles.find(r => r.id === doc.responsableId);

                    return {
                        ...doc,
                        nombre_proceso: proceso ? proceso.nombre_proceso : 'No disponible',
                        nombre_procedimiento: procedimiento ? procedimiento.nombre_procedimiento : 'No disponible',
                        nombre_responsable: responsable ? responsable.nombre_responsable : 'No disponible',
                    };
                });
                setDocumentoList(documentosConNombres);
            } catch (error) {
                console.error("Error al cargar los documentos:", error);
            }
        };

        if (processes.length && procedures.length && responsibles.length) {
            fetchDocumentos();
        }
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
        return rowData.nombre_proceso;
    };

    const nombreProcedimientoBodyTemplate = (rowData) => {
        return rowData.nombre_procedimiento;
    };

    const nombreResponsableBodyTemplate = (rowData) => {
        return rowData.nombre_responsable;
    };

    const statusBodyTemplate = (rowData) => {
        return <Tag value={rowData.status} severity={getSeverity(rowData.status)} />;
    };

    const codigoBodyTemplate = (rowData) => {
        return rowData.codigo;
    };

    // Nueva función para el renderizado de la columna de acciones
    const actionBodyTemplate = (rowData) => {
        const handleView = () => {
            // Lógica para manejar la visualización del documento
            console.log("Visualizando:", rowData);
        };

        const handleDownload = () => {
            // Lógica para manejar la descarga del documento
            console.log("Descargando:", rowData);
            // Aquí podrías implementar la animación 3D en CSS o usar una librería
        };

        return (
            <div className="flex gap-2">
                <Button 
                    icon={<FaEye />} 
                    className="p-button-rounded" 
                    onClick={handleView} 
                    title="Ver Documento" 
                />
                <Button 
                    icon={<FaDownload />} 
                    className="p-button-rounded" 
                    onClick={handleDownload} 
                    title="Descargar Documento" 
                    style={{ animation: 'zoom 0.3s' }} // Aplicar una animación
                />
            </div>
        );
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
                options={processes.map(p => ({ label: p.nombre_proceso, value: p.id }))} 
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
                options={procedures.map(p => ({ label: p.nombre_procedimiento, value: p.id }))}
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
                options={responsibles.map(r => ({ label: r.nombre_responsable, value: r.id }))}
                onChange={(e) => options.filterCallback(e.value, options.index)}
                placeholder="Select Responsable"
                className="p-column-filter"
                showClear
            />
        );
    };

    return (
        <div className="card">
            <h5>Documentos</h5>
            <DataTable
                value={documentoList}
                filters={filters}
                globalFilterFields={['codigo', 'nombre_documento', 'version', 'tipo_documento', 'fecha_elaboracion', 'nombre_proceso', 'nombre_procedimiento', 'nombre_responsable', 'status']}
                header={renderHeader()}
                paginator
                rows={10}
                rowsPerPageOptions={[5, 10, 25]}
                emptyMessage="No se encontraron documentos."
            >
                <Column field="codigo" header="Código" body={codigoBodyTemplate} filter filterPlaceholder="Buscar código" />
                <Column field="nombre_documento" header="Nombre del Documento" body={nombreDocumentoBodyTemplate} filter filterPlaceholder="Buscar nombre" />
                <Column field="version" header="Versión" body={versionBodyTemplate} filter filterPlaceholder="Buscar versión" />
                <Column field="tipo_documento" header="Tipo de Documento" body={tipoDocumentoBodyTemplate} filter filterPlaceholder="Buscar tipo" />
                <Column field="fecha_elaboracion" header="Fecha de Elaboración" body={fechaElaboracionBodyTemplate} filter filterPlaceholder="Buscar fecha" />
                <Column field="nombre_proceso" header="Nombre del Proceso" body={nombreProcesoBodyTemplate} filter filterElement={procesoFilterTemplate} />
                <Column field="nombre_procedimiento" header="Nombre del Procedimiento" body={nombreProcedimientoBodyTemplate} filter filterElement={procedimientoFilterTemplate} />
                <Column field="nombre_responsable" header="Nombre del Responsable" body={nombreResponsableBodyTemplate} filter filterElement={responsableFilterTemplate} />
                <Column field="status" header="Estado" body={statusBodyTemplate} filter filterElement={statusFilterTemplate} />
                <Column body={actionBodyTemplate} header="Acciones" />
            </DataTable>
        </div>
    );
}
