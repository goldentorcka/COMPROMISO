import React, { useState, useEffect } from 'react';
import clienteAxios from '../../api.js';
import Swal from 'sweetalert2';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { FaDownload, FaEye } from 'react-icons/fa'; // Importamos los íconos
import NavMenuPublic from "../Nav/NavMenuPublic.jsx";
import '../styles/tablecomponentes.css'; // Importar el CSS para el estilo
import 'primeicons/primeicons.css'; // Asegúrate de que los estilos de PrimeIcons están importados

const TableComponent = () => {
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
      const documentosConNombres = response.data.map(doc => {
        const proceso = doc.Nom_Proceso || 'No definido';
        const procedimiento = doc.Nom_Procedimiento || 'No definido';
        const responsable = doc.Nom_Responsable || 'No definido';
        return {
          ...doc,
          Nom_Proceso: proceso,
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
      Nom_Proceso: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
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

  // Función que genera los botones de descarga y visualización para cada fila
  const actionBodyTemplate = (rowData) => {
    const handleDownload = () => {
      const link = document.createElement('a');
      link.href = rowData.url; // Suponiendo que `url` contiene el enlace del documento
      link.download = rowData.Nom_Documento; // Nombre del archivo a descargar
      link.click();
    };

    const handleView = () => {
      window.open(rowData.url, '_blank'); // Abre el documento en una nueva ventana
    };

    return (
      <div style={{ display: 'flex', gap: '10px' }}>
        <button onClick={handleDownload} style={buttonStyle}>
          <FaDownload style={iconStyle} /> Descargar
        </button>
        <button onClick={handleView} style={buttonStyle}>
          <FaEye style={iconStyle} /> Ver
        </button>
      </div>
    );
  };

  // Estilos para los botones e íconos
  const buttonStyle = {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    padding: '10px',
    borderRadius: '5px',
    cursor: 'pointer',
  };

  const iconStyle = {
    marginRight: '5px',
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
          globalFilterFields={['Cod_Documento', 'Nom_Documento', 'Nom_Proceso', 'Nom_Procedimiento', 'Nom_Responsable', 'estado']}
          header={renderHeader()}
          rows={10}
          dataKey="Id_Documento"
          emptyMessage="No se encontraron documentos."
        >
          <Column header="Acciones" body={actionBodyTemplate} className="acciones-column" /> {/* Columna de acciones */}
          <Column field="Cod_Documento" header="Código" filter filterPlaceholder="Buscar por código" className="codigo-column" />
          <Column field="Nom_Documento" header="Nombre" filter filterPlaceholder="Buscar por nombre" className="nombre-column" />
          <Column field="Nom_Proceso" header="Proceso" filter filterPlaceholder="Buscar por proceso" className="proceso-column" />
          <Column field="Nom_Procedimiento" header="Procedimiento" filter filterPlaceholder="Buscar por procedimiento" className="procedimiento-column" />
          <Column field="Nom_Responsable" header="Responsable" filter filterPlaceholder="Buscar por responsable" className="responsable-column" />
          <Column field="estado" header="Estado" filter filterPlaceholder="Buscar por estado" className="estado-column" />
        </DataTable>
      </div>
    </>
  );
};

export default TableComponent;
