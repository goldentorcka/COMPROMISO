import React, { useState } from 'react';
import { RiEdit2Line, RiDeleteBinLine } from 'react-icons/ri';

const ActionButtons = ({ onEdit, onDelete }) => {
  const [hoveredButton, setHoveredButton] = useState(null);
  const [clickedButton, setClickedButton] = useState(null);

  const handleMouseEnter = (button) => {
    setHoveredButton(button);
  };

  const handleMouseLeave = () => {
    setHoveredButton(null);
  };

  const handleMouseDown = (button) => {
    setClickedButton(button);
  };

  const handleMouseUp = () => {
    setClickedButton(null);
  };

  const isEditingHovered = hoveredButton === 'edit';
  const isDeletingHovered = hoveredButton === 'delete';
  const isEditingClicked = clickedButton === 'edit';
  const isDeletingClicked = clickedButton === 'delete';

  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
      <button
        style={{
          padding: '10px',
          fontSize: '1.5rem',
          cursor: 'pointer',
          border: 'none',
          borderRadius: '50%',
          backgroundColor: '#ffa500',
          transform: isEditingHovered ? 'translateY(-5px) scale(1.1)' : isEditingClicked ? 'scale(0.9)' : 'none',
          boxShadow: isEditingHovered ? '0px 8px 12px rgba(0, 0, 0, 0.2)' : '0px 4px 6px rgba(0, 0, 0, 0.1)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        }}
        onClick={onEdit}
        onMouseEnter={() => handleMouseEnter('edit')}
        onMouseLeave={handleMouseLeave}
        onMouseDown={() => handleMouseDown('edit')}
        onMouseUp={handleMouseUp}
      >
        <RiEdit2Line />
      </button>
      <button
        style={{
          padding: '10px',
          fontSize: '1.5rem',
          cursor: 'pointer',
          border: 'none',
          borderRadius: '50%',
          backgroundColor: '#f44336',
          transform: isDeletingHovered ? 'translateY(-5px) scale(1.1)' : isDeletingClicked ? 'scale(0.9)' : 'none',
          boxShadow: isDeletingHovered ? '0px 8px 12px rgba(0, 0, 0, 0.2)' : '0px 4px 6px rgba(0, 0, 0, 0.1)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        }}
        onClick={onDelete}
        onMouseEnter={() => handleMouseEnter('delete')}
        onMouseLeave={handleMouseLeave}
        onMouseDown={() => handleMouseDown('delete')}
        onMouseUp={handleMouseUp}
      >
        <RiDeleteBinLine />
      </button>
    </div>
  );
};

export default ActionButtons;
