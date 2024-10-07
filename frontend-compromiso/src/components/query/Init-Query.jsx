import React, { useState, useEffect } from 'react';
import clienteAxios from '../../api.js';
import Swal from 'sweetalert2';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import NavMenuPublic from "../Nav/NavMenuPublic.jsx";
import '../styles/tablecomponentes.css'; // Importar el CSS para el estilo
import 'primeicons/primeicons.css'; // Asegúrate de que los estilos de PrimeIcons están importados

const TableComponent = ({ onSelectDocument }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState(null);
  const [globalFilterValue, setGlobalFilterValue] = useState('');

  useEffect(() => {
    fetchData();
    initFilters();
  }, []);

  const fetchData = async () => {
    try {
      const response = await clienteAxios.get('/api/documentos');
      // Mapear los procedimientos y responsables para los nombres
      const documentosConNombres = response.data.map(doc => {
        const procedimiento = doc.Nom_Procedimiento || 'No definido';
        const responsable = doc.Nom_Responsable || 'No definido';
        return {
          ...doc,
          Nom_Procedimiento: procedimiento,
          Nom_Responsable: responsable,
        };
      });
      setData(documentosConNombres);
    } catch (error) {
      console.error("Error al obtener los documentos:", error);
      Swal.fire('Error', 'No se pudieron obtener los documentos', 'error');
    } finally {
      setLoading(false);
    }
  };

  const initFilters = () => {
    setFilters({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      Cod_Documento: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
      Nom_Documento: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
      Nom_Procedimiento: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
      Nom_Responsable: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
      estado: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
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
        <div className="flex align-items-center">
          <i className="pi pi-search search-icon" />
          <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Buscar Registro..."
            className="search-input"
          />
          <Button type="button" icon="pi pi-filter-slash" label="Limpiar Filtros" onClick={clearFilter} />
        </div>
      </div>
    );
  };

  return (
    <>
      <NavMenuPublic />
      <div className="datatable-filter">
        <h1 className="title">CompromisoSE - Gestión de Documentos</h1>
        <DataTable
          value={data}
          paginator
          loading={loading}
          filters={filters}
          globalFilterFields={['Cod_Documento', 'Nom_Documento', 'Nom_Procedimiento', 'Nom_Responsable', 'estado']}
          header={renderHeader()}
          rows={10}
          dataKey="Id_Documento"
          emptyMessage="No se encontraron documentos."
        >
          <Column field="Cod_Documento" header="Código" filter filterPlaceholder="Buscar por código" className="codigo-column" />
          <Column field="Nom_Documento" header="Nombre" filter filterPlaceholder="Buscar por nombre" className="nombre-column" />
          <Column field="Nom_Procedimiento" header="Procedimiento" filter filterPlaceholder="Buscar por procedimiento" className="procedimiento-column" />
          <Column field="Nom_Responsable" header="Responsable" filter filterPlaceholder="Buscar por responsable" className="responsable-column" />
          <Column field="estado" header="Estado" filter filterPlaceholder="Buscar por estado" className="estado-column" />
        </DataTable>
      </div>
    </>
  );
};

export default TableComponent;
