import React from 'react';

const FormProcedure = ({ procedure, setProcedure, handleSubmit, buttonForm }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProcedure({ ...procedure, [name]: value });
  };

  return (
    <div style={styles.formContainer}>
      <h2 style={styles.formTitle}>{procedure.Id_Procedimiento ? 'Editar Procedimiento' : 'Nuevo Procedimiento'}</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label htmlFor="Nom_Procedimiento" style={styles.label}>Nombre del Procedimiento:</label>
          <input
            type="text"
            id="Nom_Procedimiento"
            name="Nom_Procedimiento"
            value={procedure.Nom_Procedimiento}
            onChange={handleInputChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="Id_Proceso" style={styles.label}>ID del Proceso:</label>
          <input
            type="text"
            id="Id_Proceso"
            name="Id_Proceso"
            value={procedure.Id_Proceso}
            onChange={handleInputChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="estado" style={styles.label}>Estado:</label>
          <select
            id="estado"
            name="estado"
            value={procedure.estado}
            onChange={handleInputChange}
            required
            style={styles.select}
          >
            <option value="Sí">Sí</option>
            <option value="No">No</option>
          </select>
        </div>
        <button type="submit" style={styles.submitButton}>{buttonForm}</button>
      </form>
    </div>
  );
};

const styles = {
  formContainer: {
    backgroundColor: '#fff',
    padding: '20px', // Ajustado para coincidir con otros formularios
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    marginBottom: '20px',
    maxWidth: '500px',
    margin: '0 auto',
  },
  formTitle: {
    fontSize: '22px',
    fontWeight: 'bold',
    marginBottom: '20px', // Ajustado para espaciar más el título
    color: '#333',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formGroup: {
    marginBottom: '20px', // Ajustado para espaciar más los grupos de campos
  },
  label: {
    fontSize: '14px',
    fontWeight: '500',
    marginBottom: '8px',
    display: 'block',
    color: '#333',
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    fontSize: '14px',
  },
  select: {
    width: '100%',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    fontSize: '14px',
  },
  submitButton: {
    backgroundColor: '#3085d6',
    color: 'white',
    padding: '12px 20px', // Ajustado para coincidir con otros botones
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s',
    alignSelf: 'center',
  },
};

export default FormProcedure;
