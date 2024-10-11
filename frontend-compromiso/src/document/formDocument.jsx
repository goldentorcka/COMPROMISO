import React, { useState, useEffect } from 'react';

const FormDocumentos = ({
  documento,
  handleSubmit,
  buttonForm,
  responsables = [],
  procedimientos = []
}) => {
  const [idDocumento, setIdDocumento] = useState(null);
  const [nombreDocumento, setNombreDocumento] = useState('');
  const [nombreDocumentoMagnetico, setNombreDocumentoMagnetico] = useState('');
  const [nombreDocumentoVisualizacion, setNombreDocumentoVisualizacion] = useState('');
  const [tipoDocumento, setTipoDocumento] = useState('Formato');
  const [codigo, setCodigo] = useState('');
  const [version, setVersion] = useState(1);
  const [fechaElaboracion, setFechaElaboracion] = useState('');
  const [idProcedimiento, setIdProcedimiento] = useState('');
  const [idResponsable, setIdResponsable] = useState('');
  const [estado, setEstado] = useState('Activo');
  const [errors, setErrors] = useState({});

  // Cargar los datos del documento cuando se recibe uno nuevo
  useEffect(() => {
    if (documento) {
      setIdDocumento(documento.id_documento || null);
      setNombreDocumento(documento.nombre_documento || '');
      setNombreDocumentoMagnetico(documento.nombre_documento_magnetico || '');
      setNombreDocumentoVisualizacion(documento.nombre_documento_visualizacion || '');
      setTipoDocumento(documento.tipo_documento || 'Formato');
      setCodigo(documento.codigo || '');
      setVersion(documento.version || 1);
      setFechaElaboracion(documento.fecha_elaboracion || '');
      setIdProcedimiento(documento.id_procedimiento || '');
      setIdResponsable(documento.id_responsable || '');
      setEstado(documento.estado || 'Activo');
    } else {
      resetForm(); // Resetear si no hay documento
    }
  }, [documento]);

  const validateForm = () => {
    const newErrors = {};
    if (!codigo || codigo.length < 3) {
      newErrors.codigo = 'El código del documento es obligatorio y debe tener al menos 3 caracteres.';
    }
    if (!nombreDocumento) {
      newErrors.nombreDocumento = 'El nombre del documento es obligatorio.';
    }
    if (!idProcedimiento) {
      newErrors.idProcedimiento = 'Debes seleccionar un procedimiento.';
    }
    if (!idResponsable) {
      newErrors.idResponsable = 'Debes seleccionar un responsable.';
    }
    if (!nombreDocumentoMagnetico) {
      newErrors.nombreDocumentoMagnetico = 'Debes subir un archivo Excel.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // El formulario es válido si no hay errores
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileName = file.name;
      const fileNameWithoutExtension = fileName.split('.').slice(0, -1).join('.');
      setNombreDocumentoMagnetico(fileName);
      setNombreDocumentoVisualizacion(`${fileNameWithoutExtension}.pdf`);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'codigo':
        setCodigo(value);
        break;
      case 'nombreDocumento':
        setNombreDocumento(value);
        break;
      case 'tipoDocumento':
        setTipoDocumento(value);
        break;
      case 'version':
        setVersion(value);
        break;
      case 'fechaElaboracion':
        setFechaElaboracion(value);
        break;
      case 'idProcedimiento':
        setIdProcedimiento(value);
        break;
      case 'idResponsable':
        setIdResponsable(value);
        break;
      case 'estado':
        setEstado(value);
        break;
      default:
        break;
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      handleSubmit(e, {
        id_documento: idDocumento,
        nombre_documento: nombreDocumento,
        nombre_documento_magnetico: nombreDocumentoMagnetico,
        nombre_documento_visualizacion: nombreDocumentoVisualizacion,
        tipo_documento: tipoDocumento,
        codigo,
        version,
        fecha_elaboracion: fechaElaboracion,
        id_procedimiento: idProcedimiento,
        id_responsable: idResponsable,
        estado,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      resetForm(); // Resetea el formulario después de enviar
    }
  };

  const resetForm = () => {
    setIdDocumento(null);
    setNombreDocumento('');
    setNombreDocumentoMagnetico('');
    setNombreDocumentoVisualizacion('');
    setTipoDocumento('Formato');
    setCodigo('');
    setVersion(1);
    setFechaElaboracion('');
    setIdProcedimiento('');
    setIdResponsable('');
    setEstado('Activo');
    setErrors({}); // Limpiar errores
  };

  return (
    <div className="form-container">
      <form onSubmit={onSubmit}>
        {/* Código del Documento */}
        <div className="form-group">
          <label htmlFor="codigo">Código del Documento:</label>
          <input
            type="text"
            name="codigo"
            id="codigo"
            value={codigo}
            onChange={handleChange}
            required
            aria-describedby="codigoError"
          />
          {errors.codigo && <span id="codigoError" className="error">{errors.codigo}</span>}
        </div>

        {/* Nombre del Documento */}
        <div className="form-group">
          <label htmlFor="nombreDocumento">Nombre del Documento:</label>
          <input
            type="text"
            name="nombreDocumento"
            id="nombreDocumento"
            value={nombreDocumento}
            onChange={handleChange}
            required
            aria-describedby="nombreDocumentoError"
          />
          {errors.nombreDocumento && (
            <span id="nombreDocumentoError" className="error">
              {errors.nombreDocumento}
            </span>
          )}
        </div>

        {/* Subida del Archivo Excel */}
        <div className="form-group">
          <label htmlFor="nombreDocumentoMagnetico">Subir Documento Excel:</label>
          <input
            type="file"
            name="nombreDocumentoMagnetico"
            id="nombreDocumentoMagnetico"
            onChange={handleFileChange}
            required
            aria-describedby="nombreDocumentoMagneticoError"
          />
          {errors.nombreDocumentoMagnetico && (
            <span id="nombreDocumentoMagneticoError" className="error">
              {errors.nombreDocumentoMagnetico}
            </span>
          )}
        </div>

        {/* Procedimiento */}
        <div className="form-group">
          <label htmlFor="idProcedimiento">Procedimiento:</label>
          <select
            name="idProcedimiento"
            id="idProcedimiento"
            value={idProcedimiento}
            onChange={handleChange}
            required
            aria-describedby="idProcedimientoError"
          >
            <option value="">Selecciona un procedimiento</option>
            {procedimientos.map((proc) => (
              <option key={proc.id_procedimiento} value={proc.id_procedimiento}>
                {proc.nombre_procedimiento}
              </option>
            ))}
          </select>
          {errors.idProcedimiento && (
            <span id="idProcedimientoError" className="error">
              {errors.idProcedimiento}
            </span>
          )}
        </div>

        {/* Responsable */}
        <div className="form-group">
          <label htmlFor="idResponsable">Responsable:</label>
          <select
            name="idResponsable"
            id="idResponsable"
            value={idResponsable}
            onChange={handleChange}
            required
            aria-describedby="idResponsableError"
          >
            <option value="">Selecciona un responsable</option>
            {responsables.map((resp) => (
              <option key={resp.id_responsable} value={resp.id_responsable}>
                {resp.nombre_responsable}
              </option>
            ))}
          </select>
          {errors.idResponsable && (
            <span id="idResponsableError" className="error">
              {errors.idResponsable}
            </span>
          )}
        </div>

        {/* Estado */}
        <div className="form-group">
          <label htmlFor="estado">Estado:</label>
          <select
            name="estado"
            id="estado"
            value={estado}
            onChange={handleChange}
          >
            <option value="Activo">Activo</option>
            <option value="Inactivo">Inactivo</option>
          </select>
        </div>

        {/* Botón de Enviar */}
        <button type="submit" className="btn-submit">
          {buttonForm}
        </button>
      </form>
    </div>
  );
};

export default FormDocumentos;
