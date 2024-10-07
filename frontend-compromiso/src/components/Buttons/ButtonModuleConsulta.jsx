import React, { useState, useEffect } from 'react'; 
import { classNames } from 'primereact/utils';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { MultiSelect } from 'primereact/multiselect';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import NavMenuPublic from "../Nav/NavMenuPublic.jsx";
import clienteAxios from '../config/axios'; // Asegúrate de que esta sea la ruta correcta para tu axios
import Swal from 'sweetalert2';

const TableComponent = () => {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState(null);
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [loading, setLoading] = useState(true);
  const [responsables, setResponsables] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await getDocuments();
      await getResponsables();
      initFilters();
      setLoading(false);
    };

    fetchData();
  }, []);

  const initFilters = () => {
    setFilters({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      // Añade aquí los filtros que necesites
    });
    setGlobalFilterValue('');
  };

  const getDocuments = async () => {
    try {
      const response = await clienteAxios.get('/api/documentos'); // Ajusta la URL según tu API
      setData(response.data); // Guardar los documentos en el estado
    } catch (error) {
      console.error("Error al obtener los documentos:", error);
      Swal.fire('Error', 'No se pudieron obtener los documentos', 'error');
    }
  };

  const getResponsables = async () => {
    try {
      const response = await clienteAxios.get('/api/responsables'); // Ajusta la URL según tu API
      setResponsables(response.data.map(responsable => ({ name: responsable.nombre }))); // Ajusta la propiedad según tu modelo
    } catch (error) {
      console.error("Error al obtener los responsables:", error);
      Swal.fire('Error', 'No se pudieron obtener los responsables', 'error');
    }
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

  const header = renderHeader();

  return (
    <>
      <NavMenuPublic />
      <div className="datatable-filter">
        <h1 className="title">CompromisoSE</h1>
        <DataTable value={data} paginator rows={10} dataKey="Id_Documento" filters={filters} globalFilterFields={['documento', 'tipoDocumento']} header={header} loading={loading}>
          <Column field="proceso" header="Proceso" filter filterPlaceholder="Buscar proceso" />
          <Column field="procedimiento" header="Procedimiento" filter filterPlaceholder="Buscar procedimiento" />
          <Column field="documento" header="Documento" filter filterPlaceholder="Buscar documento" />
          <Column field="archivo" header="Archivo" body={(rowData) => <a href="#">{rowData.archivo}</a>} filter filterPlaceholder="Buscar archivo" />
          <Column field="tipoDocumento" header="Tipo de Documento" filter filterPlaceholder="Buscar tipo de documento" />
          <Column field="codigo" header="Código" filter filterPlaceholder="Buscar código" />
          <Column field="version" header="Versión" filter filterPlaceholder="Buscar versión" />
          <Column field="fecha" header="Fecha de Elaboración" body={(rowData) => rowData.fecha.toLocaleDateString('es-ES')} filter filterElement={(options) => <Calendar value={options.value} onChange={(e) => options.filterCallback(e.value)} dateFormat="dd/mm/yy" />} />
          <Column field="responsable" header="Responsable" filter filterElement={responsableFilterTemplate} />
        </DataTable>
      </div>
    </>
  );
};

export default TableComponent;
