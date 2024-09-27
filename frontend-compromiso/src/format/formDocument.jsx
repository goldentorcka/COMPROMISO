import React, { useState, useEffect } from 'react';

const FormDocumentos = ({
  documento,
  setDocumento,
  handleSubmit,
  buttonForm,
  responsables,
  procedimientos
}) => {
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (documento) {
      setDocumento({
        ...documento,
        Tip_Documento: 'Formato', // Asegúrate de que este valor sea siempre 'Formato'
        estado: documento.estado || 'Activo'
      });
    }
  }, [documento, setDocumento]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!documento.Cod_Documento || documento.Cod_Documento.length < 3) {
      newErrors.Cod_Documento = 'El código es obligatorio y debe tener al menos 3 caracteres.';
    }
    
    if (!documento.Nom_Documento) {
      newErrors.Nom_Documento = 'El nombre del documento es obligatorio.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      handleSubmit(e, documento);
      resetForm();
    }
  };

  const resetForm = () => {
    setDocumento({
      Cod_Documento: '',
      Nom_Documento: '',
      Nom_Documento_Magnetico: '',
      Ver_Documento: '',
      Fec_Elaboracion_Documento: '',
      Id_Procedimiento: '',
      Id_Responsable: '',
      estado: 'Activo',
      Tip_Documento: 'Formato'
    });
    setErrors({});
  };

  return (
    <form onSubmit={onSubmit} style={styles.form}>
      <div style={styles.formGroup}>
        <label htmlFor="Cod_Documento">Código:</label>
        <input
          type="text"
          id="Cod_Documento"
          value={documento.Cod_Documento}
          onChange={(e) => setDocumento({ ...documento, Cod_Documento: e.target.value })}
        />
        {errors.Cod_Documento && <span className="error">{errors.Cod_Documento}</span>}
      </div>

      <div style={styles.formGroup}>
        <label htmlFor="Fec_Elaboracion_Documento">Fecha de Elaboración:</label>
        <input
          type="date"
          id="Fec_Elaboracion_Documento"
          value={documento.Fec_Elaboracion_Documento}
          onChange={(e) => setDocumento({ ...documento, Fec_Elaboracion_Documento: e.target.value })}
        />
      </div>

      <div style={styles.formGroup}>
        <label htmlFor="Ver_Documento">Versión:</label>
        <input
          type="number"
          id="Ver_Documento"
          value={documento.Ver_Documento}
          onChange={(e) => setDocumento({ ...documento, Ver_Documento: e.target.value })}
        />
      </div>

      <div style={styles.formGroup}>
        <label htmlFor="estado">Estado:</label>
        <select
          id="estado"
          value={documento.estado}
          onChange={(e) => setDocumento({ ...documento, estado: e.target.value })}
        >
          <option value="Activo">Activo</option>
          <option value="Inactivo">Inactivo</option>
        </select>
      </div>

      <div style={styles.formGroup}>
        <label htmlFor="Id_Responsable">Responsable:</label>
        <select
          id="Id_Responsable"
          value={documento.Id_Responsable}
          onChange={(e) => setDocumento({ ...documento, Id_Responsable: e.target.value })}
        >
          <option value="">Seleccionar Responsable</option>
          {responsables.map((responsable) => (
            <option key={responsable.Id_Responsable} value={responsable.Id_Responsable}>
              {responsable.Nombre}
            </option>
          ))}
        </select>
      </div>

      <div style={styles.formGroup}>
        <label htmlFor="Nom_Documento">Nombre del Documento:</label>
        <input
          type="text"
          id="Nom_Documento"
          value={documento.Nom_Documento}
          onChange={(e) => setDocumento({ ...documento, Nom_Documento: e.target.value })}
        />
        {errors.Nom_Documento && <span className="error">{errors.Nom_Documento}</span>}
      </div>

      <div style={styles.formGroup}>
        <label htmlFor="Nom_Documento_Magnetico">Nombre Magnético:</label>
        <input
          type="text"
          id="Nom_Documento_Magnetico"
          value={documento.Nom_Documento_Magnetico}
          onChange={(e) => setDocumento({ ...documento, Nom_Documento_Magnetico: e.target.value })}
        />
      </div>

      <div style={styles.formGroup}>
        <label htmlFor="Id_Procedimiento">Procedimiento:</label>
        <select
          id="Id_Procedimiento"
          value={documento.Id_Procedimiento}
          onChange={(e) => setDocumento({ ...documento, Id_Procedimiento: e.target.value })}
        >
          <option value="">Seleccionar Procedimiento</option>
          {procedimientos.map((procedimiento) => (
            <option key={procedimiento.Id_Procedimiento} value={procedimiento.Id_Procedimiento}>
              {procedimiento.Nombre}
            </option>
          ))}
        </select>
      </div>

      <button type="submit" style={styles.submitButton}>{buttonForm}</button>
    </form>
  );
};



export default FormDocumentos;
