import { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import Alerta from "../components/Alert/Alerta.jsx";
import clienteAxios from "../config/axios.jsx";

const ConfirmarCuenta = () => {
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [alerta, setAlerta] = useState({});
  const effectRan = useRef(false);

  const { token } = useParams(); // Asegúrate de que tu URL use 'token' o el parámetro correspondiente

  useEffect(() => {
    if (effectRan.current) {
      return;
    }
    effectRan.current = true;

    const confirmarCuenta = async () => {
      try {
        // Asegúrate de que la URL sea correcta según tu configuración de API
        const url = `/api/user/confirmar/${token}`;
        const { data } = await clienteAxios.get(url);
        setCuentaConfirmada(true);
        setAlerta({
          msg: data.msg,
          error: false,
        });
      } catch (error) {
        setAlerta({
          msg: error.response?.data?.msg || "Hubo un error al confirmar la cuenta.",
          error: true,
        });
      }
      setCargando(false);
    };

    confirmarCuenta();
  }, [token]);

  return (
    <>
      <div className="container mx-auto md:grid md:grid-cols-2 gap-10 p-5 items-center">
        <div>
          <h1 className="text-stone-400 font-black text-5xl">
            Confirma tu Cuenta y Comienza a Gestionar{" "}
            <span className="text-green-700">tus Datos</span>
          </h1>
        </div>
        <div className="mt-20 md:mt-5 shadow-2xl px-7 py-10 rounded-xl bg-white">
          {/* Mostrar la alerta solo cuando la carga ha terminado */}
          {!cargando && <Alerta alerta={alerta} />}

          {/* Mostrar el enlace para iniciar sesión si la cuenta ha sido confirmada */}
          {cuentaConfirmada && (
            <Link to="/login" className="block text-center my-5 text-gray-500">
              Iniciar Sesión
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default ConfirmarCuenta;
