import React from 'react';
import { RiEdit2Line, RiDeleteBinLine } from 'react-icons/ri';

const styles = {
  actionButtons: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
  },
  button: {
    padding: '10px',
    fontSize: '1.5rem',
    cursor: 'pointer',
    border: 'none',
    borderRadius: '50%',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease', // Animación de transformación y sombra
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Sombra para darle efecto 3D
  },
  editButton: {
    backgroundColor: '#ffa500', // Color para el botón de editar
  },
  deleteButton: {
    backgroundColor: '#f44336', // Color para el botón de eliminar
  },
  buttonHover: {
    transform: 'translateY(-5px) scale(1.1)', // Movimiento y escalado al hacer hover
    boxShadow: '0px 8px 12px rgba(0, 0, 0, 0.2)', // Sombra más pronunciada al hacer hover
  },
  buttonClick: {
    transform: 'scale(0.9)', // Efecto de "rebote" al hacer clic
  },
};

const ActionButtons = ({ onEdit, onDelete }) => {
  const handleMouseEnter = (e) => {
    e.target.style.transform = styles.buttonHover.transform;
    e.target.style.boxShadow = styles.buttonHover.boxShadow;
  };

  const handleMouseLeave = (e) => {
    e.target.style.transform = '';
    e.target.style.boxShadow = '';
  };

  const handleMouseDown = (e) => {
    e.target.style.transform = styles.buttonClick.transform;
  };

  const handleMouseUp = (e) => {
    e.target.style.transform = styles.buttonHover.transform;
  };

  return (
    <div style={styles.actionButtons}>
      <button
        style={{ ...styles.button, ...styles.editButton }}
        onClick={onEdit}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        <RiEdit2Line />
      </button>
      <button
        style={{ ...styles.button, ...styles.deleteButton }}
        onClick={onDelete}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        <RiDeleteBinLine />
      </button>
    </div>
  );
};

export default ActionButtons;
