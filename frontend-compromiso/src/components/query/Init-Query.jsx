import React, { useState, useEffect } from 'react';
import { classNames } from 'primereact/utils';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Tag } from 'primereact/tag';
import { MultiSelect } from 'primereact/multiselect';
import { Slider } from 'primereact/slider';
import NavMenuPublic from "../Nav/NavMenuPublic.jsx";

const TableComponent = () => {
  const [data, setData] = useState(null);
  const [filters, setFilters] = useState(null);
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [loading, setLoading] = useState(true);
  
  const responsables = [
    { name: 'Gestor de la Unidad y Líder Agrícola' },
    { name: 'Gestores - Líderes y Gerentes' }
  ];

  useEffect(() => {
    const fetchData = async () => {
      const mockData = [
        {
          proceso: 'Producción de Bienes y Prestación de Servicios',
          procedimiento: 'Planeación y Control de la producción',
          documento: 'Producción Formato Cosecha (BPA)',
          archivo: '04 FOr CBPA 01 cosecha bpa.xlsx',
          tipoDocumento: 'Formato',
          codigo: 'FOr-CBPA-04-01/09-15',
          version: '1',
          fecha: new Date('2024-03-02T11:53:22'),
          responsable: 'Gestor de la Unidad y Líder Agrícola',
        },
        {
          proceso: 'Gestión Administrativa',
          procedimiento: 'Planeación Administrativa y Operativa',
          documento: 'Formato Acta de Entrega',
          archivo: '01 FOr AE 01 acta entrega.docx',
          tipoDocumento: 'Formato',
          codigo: 'FOr-AE-01-01/11-12',
          version: '1',
          fecha: new Date('2024-03-04T07:53:29'),
          responsable: 'Gestores - Líderes y Gerentes',
        }
      ];
      setData(mockData);
      setLoading(false);
    };

    fetchData();
    initFilters();
  }, []);

  const initFilters = () => {
    setFilters({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      proceso: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
      procedimiento: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
      documento: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
      archivo: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
      tipoDocumento: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
      codigo: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
      version: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
      fecha: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
      responsable: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.IN }] },
    });
    setGlobalFilterValue('');
  };

  const formatDate = (value) => {
    return value.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
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
        <Button type="button" icon="pi pi-filter-slash" label="Clear" outlined onClick={initFilters} />
        <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Buscar..." />
      </div>
    );
  };

  const responsableFilterTemplate = (options) => {
    return <MultiSelect value={options.value} options={responsables} onChange={(e) => options.filterCallback(e.value)} optionLabel="name" placeholder="Seleccionar responsable" />;
  };

  const dateBodyTemplate = (rowData) => {
    return formatDate(rowData.fecha);
  };

  const dateFilterTemplate = (options) => {
    return <Calendar value={options.value} onChange={(e) => options.filterCallback(e.value, options.index)} dateFormat="dd/mm/yy" />;
  };

  const header = renderHeader();

  return (
    <>
        <NavMenuPublic />
        <div className="datatable-filter">
        <h1 className="title">CompromisoSE</h1>
        <DataTable value={data} paginator rows={10} dataKey="codigo" filters={filters} globalFilterFields={['proceso', 'procedimiento', 'documento']} header={header} loading={loading}>
            <Column field="proceso" header="Proceso" filter filterPlaceholder="Buscar proceso" />
            <Column field="procedimiento" header="Procedimiento" filter filterPlaceholder="Buscar procedimiento" />
            <Column field="documento" header="Documento" filter filterPlaceholder="Buscar documento" />
            <Column field="archivo" header="Archivo" body={(rowData) => <a href="#">{rowData.archivo}</a>} filter filterPlaceholder="Buscar archivo" />
            <Column field="tipoDocumento" header="Tipo de Documento" filter filterPlaceholder="Buscar tipo de documento" />
            <Column field="codigo" header="Código" filter filterPlaceholder="Buscar código" />
            <Column field="version" header="Versión" filter filterPlaceholder="Buscar versión" />
            <Column field="fecha" header="Fecha de Elaboración" body={dateBodyTemplate} filter filterElement={dateFilterTemplate} />
            <Column field="responsable" header="Responsable" filter filterElement={responsableFilterTemplate} />
        </DataTable>
        </div>
    </>
  );
};

export default TableComponent;
