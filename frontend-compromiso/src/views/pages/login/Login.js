import './style.css';

const Login = () => {
  return (
    <div class="login-box">
        <div className="login-header">
            <header>Inicio de Sesion</header>
            <p>Bienvenido Usuario Administrador</p>
        </div>
        <div className="input-box">
            <input type="text" className="input-field" placeholder="Ingresa tu email" autocomplete="off" required />
        </div>
        <div className="input-box">
            <input type="password" className="input-field" placeholder="Ingresa tu contraseña" autocomplete="off" required />
        </div>
        <div className="forgot">
            <section>
                <a href="">Olvidaste tu contraseña?</a>
            </section>
        </div>
        <div className="input-submit">
            <button className="submit-btn" id="submit">Iniciar Sesion</button>
        </div>
    </div>
  )
}

export default Login
