const ProtectedComponent = () => {
    return (
      <div className="container mt-5">
        <h2>Contenido Protegido</h2>
        <p>Este contenido solo es visible para usuarios autenticados.</p>
      </div>
    );
  };
  
  export default ProtectedComponent;