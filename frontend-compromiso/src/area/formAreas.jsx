import { useState, useEffect } from "react";
import clienteAxios from "../config/axios.jsx";
import { ReactSession } from 'react-client-session';
import Swal from "sweetalert2";

const FormArea = ({ area, setArea, updateTextButton, buttonForm, getAllAreas, setStateAddArea }) => {
  const [alerta, setAlerta] = useState({});
  
  const handleChange = (e) => {
    setArea({
      ...area,
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
        ? await clienteAxios.post("areas", area, config)
        : await clienteAxios.put(`areas/${area.Id_Area}`, area, config);

      if (responseApi.status === 200 || responseApi.status === 201) {
        Swal.fire({
          title: buttonForm === "Enviar" ? "Creado!" : "Actualizado!",
          text: "El área ha sido guardada.",
          icon: "success",
        });
        getAllAreas();
        setStateAddArea(false);
      } else {
        setAlerta({
          msg: responseApi.data.message,
          error: true,
        });
      }
    } catch (error) {
      setAlerta({
        msg: "Error al guardar el área.",
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
        {buttonForm === "Enviar" ? "Agregar Área" : "Actualizar Área"}
      </h2>
      {alerta.msg && <Alerta alerta={alerta} />}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Nombre del Área:</label>
          <input
            type="text"
            name="Nom_Area"
            value={area.Nom_Area}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Estado:</label>
          <select
            name="estado"
            value={area.estado}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          >
            <option value="">Selecciona un estado</option>
            <option value="Sí">Sí</option>
            <option value="No">No</option>
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

export default FormArea;
