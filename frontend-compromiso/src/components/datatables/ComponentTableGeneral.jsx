import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'datatables.net';
import '../../components/styles/stylesDatatables.css'

const TableComponent = ({ data, columns, form, onSearch }) => {
  const [dataTable, setDataTable] = useState(null);

  useEffect(() => {
    if (dataTable) {
      dataTable.destroy();
    }

    if (data && columns) {
      const newDataTable = $('#table').DataTable({
        data: data,
        columns: columns,
        language: {
          url: 'https://cdn.datatables.net/plug-ins/1.10.20/i18n/Spanish.json'
        }
      });
      setDataTable(newDataTable);
    }

    return () => {
      if (dataTable) {
        dataTable.destroy();
      }
    };
  }, [data, columns]);

  const handleSearch = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    onSearch(formData);
  };

  return (
    <div className="table-responsive">
      <form onSubmit={handleSearch}>
        {form}
        <button type="submit" className="btn btn-primary">Buscar</button>
      </form>
      <table id="table" className="table table-striped table-bordered">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index}>{column.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {columns.map((column, columnIndex) => (
                <td key={columnIndex}>{row[column.data]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
