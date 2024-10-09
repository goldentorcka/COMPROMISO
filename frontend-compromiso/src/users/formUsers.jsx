import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faKey } from '@fortawesome/free-solid-svg-icons';

const FormUser = ({ user, handleSubmit, buttonForm }) => {
  const [nomUsuario, setNomUsuario] = useState('');
  const [usuario, setUsuario] = useState('');
  const [correoUsuario, setCorreoUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [estado, setEstado] = useState('Activo');
  const [rolUsuario, setRolUsuario] = useState('Administrador');
  const [permisos, setPermisos] = useState('');
  const [errors, setErrors] = useState({});
  const [id, setId] = useState(null);

  // Efecto para cargar los datos del usuario cuando se recibe uno nuevo
  useEffect(() => {
    if (user) {
      setNomUsuario(user.Nom_Usuario || '');
      setUsuario(user.Usuario || '');
      setCorreoUsuario(user.Correo_Usuario || '');
      setContraseña(user.Contraseña_Usuario || '');
      setEstado(user.estado || 'Activo');
      setRolUsuario(user.Rol_Usuario || 'Administrador');
      setPermisos(user.permisos || '');
      setId(user.Id_Usuario || null);
    } else {
      resetForm(); // Resetear si no hay usuario
    }
  }, [user]);

  const validateForm = () => {
    const newErrors = {};
    if (!nomUsuario || nomUsuario.length < 3) {
      newErrors.nomUsuario = 'El nombre es obligatorio y debe tener al menos 3 caracteres.';
    }
    if (!usuario) {
      newErrors.usuario = 'El nombre de usuario es obligatorio.';
    }
    if (!correoUsuario || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(correoUsuario)) {
      newErrors.correoUsuario = 'El correo electrónico es obligatorio y debe ser válido.';
    }
    if (!contraseña || contraseña.length < 6) {
      newErrors.contraseña = 'La contraseña debe tener al menos 6 caracteres.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      handleSubmit(e, {
        id, // Incluir el ID en el objeto de envío
        Nom_Usuario: nomUsuario,
        Usuario: usuario,
        Correo_Usuario: correoUsuario,
        Contraseña_Usuario: contraseña,
        estado,
        Rol_Usuario: rolUsuario,
        permisos
      });
      resetForm();
    }
  };

  const resetForm = () => {
    setNomUsuario('');
    setUsuario('');
    setCorreoUsuario('');
    setContraseña('');
    setEstado('Activo');
    setRolUsuario('Administrador');
    setPermisos('');
    setId(null); // Resetear ID
    setErrors({});
  };

  return (
    <div className="form-container">
      <form onSubmit={onSubmit}>
        {/* Nombre del Usuario */}
        <div className="form-group">
          <label htmlFor="nomUsuario">
            <FontAwesomeIcon icon={faUser} /> Nombre del Usuario
          </label>
          <input
            id="nomUsuario"
            type="text"
            value={nomUsuario}
            onChange={(e) => setNomUsuario(e.target.value)}
            required
            aria-describedby="nomUsuarioError"
          />
          {errors.nomUsuario && (
            <span id="nomUsuarioError" className="error">
              {errors.nomUsuario}
            </span>
          )}
        </div>

        {/* Usuario */}
        <div className="form-group">
          <label htmlFor="usuario">
            <FontAwesomeIcon icon={faUser} /> Usuario
          </label>
          <input
            id="usuario"
            type="text"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
            aria-describedby="usuarioError"
          />
          {errors.usuario && (
            <span id="usuarioError" className="error">
              {errors.usuario}
            </span>
          )}
        </div>

        {/* Correo del Usuario */}
        <div className="form-group">
          <label htmlFor="correoUsuario">
            <FontAwesomeIcon icon={faEnvelope} /> Correo Electrónico
          </label>
          <input
            id="correoUsuario"
            type="email"
            value={correoUsuario}
            onChange={(e) => setCorreoUsuario(e.target.value)}
            required
            aria-describedby="correoUsuarioError"
          />
          {errors.correoUsuario && (
            <span id="correoUsuarioError" className="error">
              {errors.correoUsuario}
            </span>
          )}
        </div>

        {/* Contraseña */}
        <div className="form-group">
          <label htmlFor="contraseña">
            <FontAwesomeIcon icon={faKey} /> Contraseña
          </label>
          <input
            id="contraseña"
            type="password"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            required
            aria-describedby="contraseñaError"
          />
          {errors.contraseña && (
            <span id="contraseñaError" className="error">
              {errors.contraseña}
            </span>
          )}
        </div>

        {/* Estado */}
        <div className="form-group">
          <label htmlFor="estado">Estado</label>
          <select
            id="estado"
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
          >
            <option value="Activo">Activo</option>
            <option value="Inactivo">Inactivo</option>
          </select>
        </div>

        {/* Rol del Usuario */}
        <div className="form-group">
          <label htmlFor="rolUsuario">Rol de Usuario</label>
          <select
            id="rolUsuario"
            value={rolUsuario}
            onChange={(e) => setRolUsuario(e.target.value)}
          >
            <option value="Administrador">Administrador</option>
            <option value="Super Administrador">Super Administrador</option>
          </select>
        </div>

        {/* Permisos */}
        <div className="form-group">
          <label htmlFor="permisos">Permisos</label>
          <textarea
            id="permisos"
            value={permisos}
            onChange={(e) => setPermisos(e.target.value)}
          />
        </div>

        {/* ID del Usuario (oculto) */}
        {id && (
          <input type="hidden" value={id} />
        )}

        <button type="submit" className="btn-submit">
          {buttonForm}
        </button>
      </form>
    </div>
  );
};

export default FormUser;
