import React from 'react';

const FormAreas = ({ area, setArea, handleSubmit, buttonForm }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setArea((prevArea) => ({
      ...prevArea,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <div style={styles.formGroup}>
        <label htmlFor="Nom_Area">Nombre del Área:</label>
        <input
          type="text"
          id="Nom_Area"
          name="Nom_Area"
          value={area.Nom_Area}
          onChange={handleChange}
          required
        />
      </div>
      <div style={styles.formGroup}>
        <label htmlFor="estado">Estado:</label>
        <select
          id="estado"
          name="estado"
          value={area.estado}
          onChange={handleChange}
          required
        >
          <option value="Sí">Sí</option>
          <option value="No">No</option>
        </select>
      </div>
      <button type="submit" style={styles.submitButton}>
        {buttonForm}
      </button>
    </form>
  );
};

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '500px',
    margin: '0 auto',
  },
  formGroup: {
    marginBottom: '15px',
  },
  submitButton: {
    padding: '10px 20px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#3085d6',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default FormAreas;
