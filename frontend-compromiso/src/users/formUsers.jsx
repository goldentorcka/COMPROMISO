import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';

const FormUser = ({ handleSubmit, buttonForm }) => {
  const [Nombre, setNombre] = useState('');
  const [Usuario, setUsuario] = useState('');
  const [Correo, setCorreo] = useState('');
  const [Password, setPassword] = useState('');
  const [Estado, setEstado] = useState('Activo');
  const [Rol, setRol] = useState('Administrador');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const correoRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const validateForm = () => {
    const newErrors = {};
    if (!Nombre) newErrors.Nombre = 'El nombre es obligatorio.';
    if (!Usuario) newErrors.Usuario = 'El usuario es obligatorio.';
    if (!Correo) {
      newErrors.Correo = 'El correo es obligatorio.';
    } else if (!correoRegex.test(Correo)) {
      newErrors.Correo = 'El correo electrónico no es válido.';
    }
    if (!Password) newErrors.Password = 'La contraseña es obligatoria.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      handleSubmit({
        Nom_Usuario: Nombre,
        Usuario: Usuario,
        Correo_Usuario: Correo,
        Contraseña_Usuario: Password,
        estado: Estado,
        Rol_Usuario: Rol,
      });
      resetForm(); // Resetea el formulario después de enviar
    }
  };

  const resetForm = () => {
    setNombre('');
    setUsuario('');
    setCorreo('');
    setPassword('');
    setEstado('Activo');
    setRol('Administrador');
    setErrors({});
  };

  return (
    <div className="form-container">
      <form onSubmit={onSubmit}>
        {/* Nombre */}
        <div className="form-group">
          <label><FontAwesomeIcon icon={faUser} /> Nombre</label>
          <input
            type="text"
            value={Nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
          {errors.Nombre && <span className="error">{errors.Nombre}</span>}
        </div>

        {/* Usuario */}
        <div className="form-group">
          <label><FontAwesomeIcon icon={faUser} /> Usuario</label>
          <input
            type="text"
            value={Usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
          />
          {errors.Usuario && <span className="error">{errors.Usuario}</span>}
        </div>

        {/* Correo */}
        <div className="form-group">
          <label><FontAwesomeIcon icon={faEnvelope} /> Correo</label>
          <input
            type="email"
            value={Correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />
          {errors.Correo && <span className="error">{errors.Correo}</span>}
        </div>

        {/* Estado */}
        <div className="form-group">
          <label>Estado</label>
          <select
            value={Estado}
            onChange={(e) => setEstado(e.target.value)}
          >
            <option value="Activo">Activo</option>
            <option value="Inactivo">Inactivo</option>
          </select>
        </div>

        {/* Rol */}
        <div className="form-group">
          <label>Rol</label>
          <select
            value={Rol}
            onChange={(e) => setRol(e.target.value)}
            disabled
          >
            <option value="Administrador">Administrador</option>
          </select>
        </div>

        {/* Contraseña */}
        <div className="form-group">
          <label><FontAwesomeIcon icon={faLock} /> Contraseña</label>
          <div className="input-group">
            <input
              type={showPassword ? 'text' : 'password'}
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <i
              className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}
              onClick={togglePasswordVisibility}
            ></i>
          </div>
          {errors.Password && <span className="error">{errors.Password}</span>}
        </div>

        <button type="submit" className="btn-submit">
          {buttonForm}
        </button>
      </form>
    </div>
  );
};

export default FormUser;
