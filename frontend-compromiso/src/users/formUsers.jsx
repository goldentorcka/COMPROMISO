import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faIdCard, faEnvelope, faCalendarAlt, faLock } from '@fortawesome/free-solid-svg-icons';

const FormUser = ({ handleSubmit, buttonForm }) => {
  const [Nombre, setNombre] = useState('');
  const [Apellido, setApellido] = useState('');
  const [Codigo, setCodigo] = useState('');
  const [Correo, setCorreo] = useState('');
  const [FechaNacimiento, setFechaNacimiento] = useState('');
  const [Estado, setEstado] = useState('Sí');
  const [Rol, setRol] = useState('Administrador');
  const [Password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const nombreRegex = /^[A-Za-z\s]+$/;
  const codigoRegex = /^[0-9]+$/;
  const correoRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const validateForm = () => {
    const newErrors = {};

    if (!Nombre) {
      newErrors.Nombre = 'El nombre es obligatorio.';
    } else if (!nombreRegex.test(Nombre)) {
      newErrors.Nombre = 'El nombre solo puede contener letras.';
    }

    if (!Apellido) {
      newErrors.Apellido = 'El apellido es obligatorio.';
    } else if (!nombreRegex.test(Apellido)) {
      newErrors.Apellido = 'El apellido solo puede contener letras.';
    }

    if (!Codigo) {
      newErrors.Codigo = 'El código es obligatorio.';
    } else if (!codigoRegex.test(Codigo)) {
      newErrors.Codigo = 'El código solo puede contener números.';
    }

    if (!Correo) {
      newErrors.Correo = 'El correo es obligatorio.';
    } else if (!correoRegex.test(Correo)) {
      newErrors.Correo = 'El correo electrónico no es válido.';
    }

    if (!FechaNacimiento) {
      newErrors.FechaNacimiento = 'La fecha de nacimiento es obligatoria.';
    }

    if (!Password) {
      newErrors.Password = 'La contraseña es obligatoria.';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      handleSubmit({
        Nom_Usuario: Nombre,
        Ape_Usuario: Apellido,
        Cod_Usuario: Codigo,
        Cor_Usuario: Correo,
        Fec_Usuario: FechaNacimiento,
        estado: Estado,
        rol: Rol,
        password: Password,
      });
    }
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

        {/* Apellido */}
        <div className="form-group">
          <label><FontAwesomeIcon icon={faUser} /> Apellido</label>
          <input
            type="text"
            value={Apellido}
            onChange={(e) => setApellido(e.target.value)}
            required
          />
          {errors.Apellido && <span className="error">{errors.Apellido}</span>}
        </div>

        {/* Código */}
        <div className="form-group">
          <label><FontAwesomeIcon icon={faIdCard} /> Código</label>
          <input
            type="text"
            value={Codigo}
            onChange={(e) => setCodigo(e.target.value)}
            required
          />
          {errors.Codigo && <span className="error">{errors.Codigo}</span>}
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

        {/* Fecha de Nacimiento */}
        <div className="form-group">
          <label><FontAwesomeIcon icon={faCalendarAlt} /> Fecha de Nacimiento</label>
          <input
            type="date"
            value={FechaNacimiento}
            onChange={(e) => setFechaNacimiento(e.target.value)}
            required
          />
          {errors.FechaNacimiento && <span className="error">{errors.FechaNacimiento}</span>}
        </div>

        {/* Estado */}
        <div className="form-group">
          <label><FontAwesomeIcon icon={faUser} /> Estado</label>
          <select
            value={Estado}
            onChange={(e) => setEstado(e.target.value)}
          >
            <option value="Sí">Sí</option>
            <option value="No">No</option>
          </select>
        </div>

        {/* Rol */}
        <div className="form-group">
          <label><FontAwesomeIcon icon={faUser} /> Rol</label>
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
