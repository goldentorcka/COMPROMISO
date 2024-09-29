import React, { useState, useEffect } from 'react';

const FormDocumentos = ({
  documento,
  handleSubmit,
  buttonForm,
  responsables = [],
  procedimientos = []
}) => {
  const [Cod_Documento, setCod_Documento] = useState('');
  const [Nom_Documento, setNom_Documento] = useState('');
  const [Nom_Documento_Magnetico, setNom_Documento_Magnetico] = useState('');
  const [Ver_Documento, setVer_Documento] = useState('');
  const [Fec_Elaboracion_Documento, setFec_Elaboracion_Documento] = useState('');
  const [Id_Procedimiento, setId_Procedimiento] = useState('');
  const [Id_Responsable, setId_Responsable] = useState('');
  const [estado, setEstado] = useState('Activo');
  const [Tip_Documento] = useState('Formato');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (documento) {
      setCod_Documento(documento.Cod_Documento || '');
      setNom_Documento(documento.Nom_Documento || '');
      setNom_Documento_Magnetico(documento.Nom_Documento_Magnetico || '');
      setVer_Documento(documento.Ver_Documento || '');
      setFec_Elaboracion_Documento(documento.Fec_Elaboracion_Documento || '');
      setId_Procedimiento(documento.Id_Procedimiento || '');
      setId_Responsable(documento.Id_Responsable || '');
      setEstado(documento.estado || 'Activo');
    } else {
      resetForm(); // Resetear si no hay documento
    }
  }, [documento]);

  const validateForm = () => {
    const newErrors = {};
    if (!Cod_Documento || Cod_Documento.length < 3) {
      newErrors.Cod_Documento = 'El código del documento es obligatorio y debe tener al menos 3 caracteres.';
    }
    if (!Nom_Documento) {
      newErrors.Nom_Documento = 'El nombre del documento es obligatorio.';
    }
    if (!Id_Procedimiento) {
      newErrors.Id_Procedimiento = 'Debes seleccionar un procedimiento.';
    }
    if (!Id_Responsable) {
      newErrors.Id_Responsable = 'Debes seleccionar un responsable.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Si no hay errores, el formulario es válido
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'Cod_Documento') {
      setCod_Documento(value);
    } else if (name === 'Nom_Documento') {
      setNom_Documento(value);
    } else if (name === 'Nom_Documento_Magnetico') {
      setNom_Documento_Magnetico(value);
    } else if (name === 'Ver_Documento') {
      setVer_Documento(value);
    } else if (name === 'Fec_Elaboracion_Documento') {
      setFec_Elaboracion_Documento(value);
    } else if (name === 'Id_Procedimiento') {
      setId_Procedimiento(value);
    } else if (name === 'Id_Responsable') {
      setId_Responsable(value);
    } else if (name === 'estado') {
      setEstado(value);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      handleSubmit(e, {
        Cod_Documento,
        Nom_Documento,
        Nom_Documento_Magnetico,
        Ver_Documento,
        Fec_Elaboracion_Documento,
        Id_Procedimiento,
        Id_Responsable,
        estado,
        Tip_Documento
      });
      resetForm(); // Resetea el formulario después de enviar
    }
  };

  const resetForm = () => {
    setCod_Documento('');
    setNom_Documento('');
    setNom_Documento_Magnetico('');
    setVer_Documento('');
    setFec_Elaboracion_Documento('');
    setId_Procedimiento('');
    setId_Responsable('');
    setEstado('Activo');
    setErrors({}); // Limpiar errores
  };

  return (
    <div className="form-container">
      <form onSubmit={onSubmit}>
        <div>
          <label>Código del Documento:</label>
          <input
            type="text"
            name="Cod_Documento"
            value={Cod_Documento}
            onChange={handleChange}
            required
          />
          {errors.Cod_Documento && <span className="error">{errors.Cod_Documento}</span>}
        </div>

        <div>
          <label>Nombre del Documento:</label>
          <input
            type="text"
            name="Nom_Documento"
            value={Nom_Documento}
            onChange={handleChange}
            required
          />
          {errors.Nom_Documento && <span className="error">{errors.Nom_Documento}</span>}
        </div>

        <div>
          <label>Nombre Magnético del Documento:</label>
          <input
            type="text"
            name="Nom_Documento_Magnetico"
            value={Nom_Documento_Magnetico}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Versión del Documento:</label>
          <input
            type="number"
            name="Ver_Documento"
            value={Ver_Documento}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Fecha de Elaboración:</label>
          <input
            type="date"
            name="Fec_Elaboracion_Documento"
            value={Fec_Elaboracion_Documento}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Estado:</label>
          <select name="estado" value={estado} onChange={handleChange}>
            <option value="Activo">Activo</option>
            <option value="Inactivo">Inactivo</option>
          </select>
        </div>

        <div>
          <label>Procedimiento:</label>
          <select
            name="Id_Procedimiento"
            value={Id_Procedimiento}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione un procedimiento</option>
            {procedimientos.map((proc) => (
              <option key={proc.Id_Procedimiento} value={proc.Id_Procedimiento}>
                {proc.Nombre}
              </option>
            ))}
          </select>
          {errors.Id_Procedimiento && <span className="error">{errors.Id_Procedimiento}</span>}
        </div>

        <div>
          <label>Responsable:</label>
          <select
            name="Id_Responsable"
            value={Id_Responsable}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione un responsable</option>
            {responsables.map((resp) => (
              <option key={resp.Id_Responsable} value={resp.Id_Responsable}>
                {resp.Nombre}
              </option>
            ))}
          </select>
          {errors.Id_Responsable && <span className="error">{errors.Id_Responsable}</span>}
        </div>

        <button type="submit">{buttonForm}</button>
      </form>
    </div>
  );
};

export default FormDocumentos;
