import React, { useState } from 'react';
import ResponsableList from './ResponsableList';
import ResponsableForm from './ResponsableForm';

const ResponsablePage = () => {
  const [selectedResponsable, setSelectedResponsable] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const handleEdit = (responsable) => {
    setSelectedResponsable(responsable);
  };

  const handleSave = () => {
    setSelectedResponsable(null);
    setRefresh(!refresh);
  };

  return (
    <>
      <ResponsableList onEdit={handleEdit} />
      <ResponsableForm responsable={selectedResponsable} onSave={handleSave} />
    </>
  );
};

export default ResponsablePage;
