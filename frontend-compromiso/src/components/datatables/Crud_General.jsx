import React, { useState, useEffect } from 'react';

const FormGeneral = ({ initialValues, fields, onSubmit, onCancel, buttonText }) => {
  const [formData, setFormData] = useState(initialValues);

  useEffect(() => {
    setFormData(initialValues);
  }, [initialValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (fields.some(field => field.required && !formData[field.name])) {
      alert('Por favor, complete todos los campos requeridos');
      return;
    }
    if (fields.some(field => field.type === 'select' && !formData[field.name])) {
      alert('Por favor, seleccione un valor para el campo');
      return;
    }
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {fields.map(({ name, label, type, placeholder, required, options }) => (
        <div className="mb-3" key={name}>
          <label htmlFor={name} className="form-label">{label}</label>
          {type === 'select' ? (
            <select
              className="form-select"
              id={name}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              required={required}
            >
              {options.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={type}
              className="form-control"
              id={name}
              name={name}
              value={formData[name] || ''}
              onChange={handleChange}
              placeholder={placeholder}
              required={required}
            />
          )}
        </div>
      ))}
      <button type="submit" className="btn btn-primary">{buttonText}</button>
      <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancelar</button>
    </form>
  );
};

export default FormGeneral;