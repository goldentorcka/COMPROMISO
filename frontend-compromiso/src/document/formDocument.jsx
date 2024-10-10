import React, { useState, useEffect } from 'react';

const FormDocumentos = ({
  documento,
  handleSubmit,
  buttonForm,
  responsables = [],
  procedimientos = []
}) => {
  const [id_documento, setIdDocumento] = useState(null);
  const [nombre_documento, setNombreDocumento] = useState('');
  const [nombre_documento_magnetico, setNombreDocumentoMagnetico] = useState('');
  const [nombre_documento_visualizacion, setNombreDocumentoVisualizacion] = useState('');
  const [tipo_documento, setTipoDocumento] = useState('Formato');
  const [codigo, setCodigo] = useState('');
  const [version, setVersion] = useState(1);
  const [fecha_elaboracion, setFechaElaboracion] = useState('');
  const [id_procedimiento, setIdProcedimiento] = useState('');
  const [id_responsable, setIdResponsable] = useState('');
  const [estado, setEstado] = useState('Activo');
  const [errors, setErrors] = useState({});

  // Efecto para cargar los datos del documento cuando se recibe uno nuevo
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

  // Validar el formulario
  const validateForm = () => {
    const newErrors = {};
    if (!codigo || codigo.length < 3) {
      newErrors.codigo = 'El código del documento es obligatorio y debe tener al menos 3 caracteres.';
    }
    if (!nombre_documento) {
      newErrors.nombre_documento = 'El nombre del documento es obligatorio.';
    }
    if (!id_procedimiento) {
      newErrors.id_procedimiento = 'Debes seleccionar un procedimiento.';
    }
    if (!id_responsable) {
      newErrors.id_responsable = 'Debes seleccionar un responsable.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Formulario válido si no hay errores
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'codigo':
        setCodigo(value);
        break;
      case 'nombre_documento':
        setNombreDocumento(value);
        break;
      case 'nombre_documento_magnetico':
        setNombreDocumentoMagnetico(value);
        break;
      case 'nombre_documento_visualizacion':
        setNombreDocumentoVisualizacion(value);
        break;
      case 'tipo_documento':
        setTipoDocumento(value);
        break;
      case 'version':
        setVersion(value);
        break;
      case 'fecha_elaboracion':
        setFechaElaboracion(value);
        break;
      case 'id_procedimiento':
        setIdProcedimiento(value);
        break;
      case 'id_responsable':
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
        id_documento,
        nombre_documento,
        nombre_documento_magnetico,
        nombre_documento_visualizacion,
        tipo_documento,
        codigo,
        version,
        fecha_elaboracion,
        id_procedimiento,
        id_responsable,
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
          <label>Código del Documento:</label>
          <input
            type="text"
            name="codigo"
            value={codigo}
            onChange={handleChange}
            required
          />
          {errors.codigo && <span className="error">{errors.codigo}</span>}
        </div>

        {/* Nombre del Documento */}
        <div className="form-group">
          <label>Nombre del Documento:</label>
          <input
            type="text"
            name="nombre_documento"
            value={nombre_documento}
            onChange={handleChange}
            required
          />
          {errors.nombre_documento && <span className="error">{errors.nombre_documento}</span>}
        </div>

        {/* Nombre Magnético del Documento */}
        <div className="form-group">
          <label>Nombre Magnético del Documento:</label>
          <input
            type="text"
            name="nombre_documento_magnetico"
            value={nombre_documento_magnetico}
            onChange={handleChange}
          />
        </div>

        {/* Nombre de Visualización del Documento */}
        <div className="form-group">
          <label>Nombre de Visualización del Documento:</label>
          <input
            type="text"
            name="nombre_documento_visualizacion"
            value={nombre_documento_visualizacion}
            onChange={handleChange}
          />
        </div>

        {/* Versión del Documento */}
        <div className="form-group">
          <label>Versión del Documento:</label>
          <input
            type="number"
            name="version"
            value={version}
            onChange={handleChange}
            min="1"
          />
        </div>

        {/* Fecha de Elaboración */}
        <div className="form-group">
          <label>Fecha de Elaboración:</label>
          <input
            type="date"
            name="fecha_elaboracion"
            value={fecha_elaboracion}
            onChange={handleChange}
          />
        </div>

        {/* Selección de Procedimiento */}
        <div className="form-group">
          <label htmlFor="idProcedimiento">Procedimiento:</label>
          <select
            id="idProcedimiento"
            name="id_procedimiento"
            value={id_procedimiento}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione un procedimiento</option>
            {procedimientos.map((procedimiento) => (
              <option key={procedimiento.id_procedimiento} value={procedimiento.id_procedimiento}>
                {procedimiento.nombre_procedimiento}
              </option>
            ))}
          </select>
          {errors.id_procedimiento && (
            <span className="error">{errors.id_procedimiento}</span>
          )}
        </div>

        {/* Selección de Responsable */}
        <div className="form-group">
          <label htmlFor="idResponsable">Responsable:</label>
          <select
            id="idResponsable"
            name="id_responsable"
            value={id_responsable}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione un responsable</option>
            {responsables.map((responsable) => (
              <option key={responsable.id_responsable} value={responsable.id_responsable}>
                {responsable.nombre_responsable}
              </option>
            ))}
          </select>
          {errors.id_responsable && (
            <span className="error">{errors.id_responsable}</span>
          )}
        </div>

        {/* Estado */}
        <div className="form-group">
          <label htmlFor="estado">Estado:</label>
          <select
            id="estado"
            name="estado"
            value={estado}
            onChange={handleChange}
          >
            <option value="Activo">Activo</option>
            <option value="Inactivo">Inactivo</option>
          </select>
        </div>

        {/* ID del Documento (oculto) */}
        {id_documento && (
          <input type="hidden" name="id_documento" value={id_documento} />
        )}

        <button type="submit" className="btn-submit">
          {buttonForm}
        </button>
      </form>
    </div>
  );
};

export default FormDocumentos;
