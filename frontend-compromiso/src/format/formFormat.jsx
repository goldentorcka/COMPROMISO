import React from 'react';

const FormFormatos = ({
  formato,
  setFormato,
  handleSubmit,
  buttonForm,
  responsables,
  procedimientos,
  unidades
}) => {
  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <div style={styles.formGroup}>
        <label htmlFor="Cod_Formato">Código:</label>
        <input
          type="text"
          id="Cod_Formato"
          value={formato.Cod_Formato}
          onChange={(e) => setFormato({ ...formato, Cod_Formato: e.target.value })}
        />
      </div>
      <div style={styles.formGroup}>
        <label htmlFor="Fec_Actualizacion">Fecha Actualización:</label>
        <input
          type="date"
          id="Fec_Actualizacion"
          value={formato.Fec_Actualizacion}
          onChange={(e) => setFormato({ ...formato, Fec_Actualizacion: e.target.value })}
        />
      </div>
      <div style={styles.formGroup}>
        <label htmlFor="Ver_Formato">Versión:</label>
        <input
          type="text"
          id="Ver_Formato"
          value={formato.Ver_Formato}
          onChange={(e) => setFormato({ ...formato, Ver_Formato: e.target.value })}
        />
      </div>
      <div style={styles.formGroup}>
        <label htmlFor="Est_Formato">Estado:</label>
        <select
          id="Est_Formato"
          value={formato.Est_Formato}
          onChange={(e) => setFormato({ ...formato, Est_Formato: e.target.value })}
        >
          <option value="Activo">Activo</option>
          <option value="Inactivo">Inactivo</option>
        </select>
      </div>
      <div style={styles.formGroup}>
        <label htmlFor="Id_Responsable">Responsable:</label>
        <select
          id="Id_Responsable"
          value={formato.Id_Responsable}
          onChange={(e) => setFormato({ ...formato, Id_Responsable: e.target.value })}
        >
          <option value="">Seleccionar Responsable</option>
          {responsables.map(responsable => (
            <option key={responsable.Id_Responsable} value={responsable.Id_Responsable}>
              {responsable.Nombre}
            </option>
          ))}
        </select>
      </div>
      <div style={styles.formGroup}>
        <label htmlFor="Nom_Formato">Nombre:</label>
        <input
          type="text"
          id="Nom_Formato"
          value={formato.Nom_Formato}
          onChange={(e) => setFormato({ ...formato, Nom_Formato: e.target.value })}
        />
      </div>
      <div style={styles.formGroup}>
        <label htmlFor="Nom_Magnetico">Nombre Magnético:</label>
        <input
          type="text"
          id="Nom_Magnetico"
          value={formato.Nom_Magnetico}
          onChange={(e) => setFormato({ ...formato, Nom_Magnetico: e.target.value })}
        />
      </div>
      <div style={styles.formGroup}>
        <label htmlFor="Id_Procedimiento">Procedimiento:</label>
        <select
          id="Id_Procedimiento"
          value={formato.Id_Procedimiento}
          onChange={(e) => setFormato({ ...formato, Id_Procedimiento: e.target.value })}
        >
          <option value="">Seleccionar Procedimiento</option>
          {procedimientos.map(procedimiento => (
            <option key={procedimiento.Id_Procedimiento} value={procedimiento.Id_Procedimiento}>
              {procedimiento.Nombre}
            </option>
          ))}
        </select>
      </div>
      <div style={styles.formGroup}>
        <label htmlFor="Id_Unidad">Unidad:</label>
        <select
          id="Id_Unidad"
          value={formato.Id_Unidad}
          onChange={(e) => setFormato({ ...formato, Id_Unidad: e.target.value })}
        >
          <option value="">Seleccionar Unidad</option>
          {unidades.map(unidad => (
            <option key={unidad.Id_Unidad} value={unidad.Id_Unidad}>
              {unidad.Nombre}
            </option>
          ))}
        </select>
      </div>
      <button type="submit" style={styles.submitButton}>{buttonForm}</button>
    </form>
  );
};

const styles = {
  form: {
    marginBottom: '20px',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#fff',
  },
  formGroup: {
    marginBottom: '10px',
  },
  submitButton: {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  }
};

export default FormFormatos;
