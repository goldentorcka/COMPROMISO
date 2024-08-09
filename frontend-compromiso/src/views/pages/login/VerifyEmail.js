import './style.css';

const Login = () => {
  return (
    <div class="login-box">
        <div className="login-header">
            <header>Recuperacion del Email</header>
            <p>Bienvenido a la recuperacion del Email</p>
        </div>
        <div className="input-box">
            <input type="text" className="input-field" placeholder="Ingresa tu email" autocomplete="off" required />
        </div>
        <div className="input-box">
            <input type="password" className="input-field" placeholder="Ingresa tu contraseña" autocomplete="off" required />
        </div>
        <div className="input-submit">
            <button className="submit-btn" id="submit">Recuperar Email</button>
        </div>
    </div>
  )
}

export default Login
