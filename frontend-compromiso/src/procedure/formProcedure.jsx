import { useState, useEffect } from "react";
import clienteAxios from "../config/axios.jsx";
import { ReactSession } from 'react-client-session';
import Swal from "sweetalert2";

const FormProcedure = ({ procedure, setProcedure, updateTextButton, buttonForm, getAllProcedures, setStateAddProcedure }) => {
  const [alerta, setAlerta] = useState({});
  
  const handleChange = (e) => {
    setProcedure({
      ...procedure,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = ReactSession.get("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const responseApi = buttonForm === "Enviar"
        ? await clienteAxios.post("procedimientos", procedure, config)
        : await clienteAxios.put(`procedimientos/${procedure.Id_Procedimiento}`, procedure, config);

      if (responseApi.status === 200 || responseApi.status === 201) {
        Swal.fire({
          title: buttonForm === "Enviar" ? "Creado!" : "Actualizado!",
          text: "El procedimiento ha sido guardado.",
          icon: "success",
        });
        getAllProcedures();
        setStateAddProcedure(false);
      } else {
        setAlerta({
          msg: responseApi.data.message,
          error: true,
        });
      }
    } catch (error) {
      setAlerta({
        msg: "Error al guardar el procedimiento.",
        error: true,
      });
      console.error(error);
    }
  };

  useEffect(() => {
    updateTextButton(buttonForm);
  }, [buttonForm]);

  return (
    <div className="p-4 border rounded bg-gray-100">
      <h2 className="font-bold text-lg mb-4">
        {buttonForm === "Enviar" ? "Agregar Procedimiento" : "Actualizar Procedimiento"}
      </h2>
      {alerta.msg && <Alerta alerta={alerta} />}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Nombre del Procedimiento:</label>
          <input
            type="text"
            name="Nom_Procedimiento"
            value={procedure.Nom_Procedimiento}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">ID del Proceso:</label>
          <input
            type="text"
            name="Id_Proceso"
            value={procedure.Id_Proceso}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Estado:</label>
          <select
            name="estado"
            value={procedure.estado}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          >
            <option value="">Selecciona un estado</option>
            <option value="Activo">Activo</option>
            <option value="Inactivo">Inactivo</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800"
        >
          {buttonForm}
        </button>
      </form>
    </div>
  );
};

export default FormProcedure;