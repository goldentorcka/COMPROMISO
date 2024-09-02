import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Alerta from "../components/Alert/Alerta.jsx"; // Verifica que esta ruta sea correcta
import clienteAxios from "../config/axios.jsx"; // Asegúrate de que esta ruta también sea correcta
import { ReactSession } from "react-client-session"; // Verifica que esta importación esté correcta

const FormUnidades = ({ unidad, setUnidad, updateTextButton, buttonForm, getAllUnidades, setStateAddUnidad }) => {
  const [alerta, setAlerta] = useState({});

  const handleChange = (e) => {
    setUnidad({
      ...unidad,
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
        ? await clienteAxios.post("unidades", unidad, config)
        : await clienteAxios.put(`unidades/${unidad.Id_Unidad}`, unidad, config);

      if (responseApi.status === 200 || responseApi.status === 201) {
        Swal.fire({
          title: buttonForm === "Enviar" ? "Creado!" : "Actualizado!",
          text: "La unidad ha sido guardada.",
          icon: "success",
        });
        getAllUnidades();
        setStateAddUnidad(false);
      } else {
        setAlerta({
          msg: responseApi.data.message,
          error: true,
        });
      }
    } catch (error) {
      setAlerta({
        msg: "Error al guardar la unidad.",
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
        {buttonForm === "Enviar" ? "Agregar Unidad" : "Actualizar Unidad"}
      </h2>
      {alerta.msg && <Alerta alerta={alerta} />}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Nombre de la Unidad:</label>
          <input
            type="text"
            name="Nom_Unidad"
            value={unidad.Nom_Unidad}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Área:</label>
          <input
            type="number"
            name="Id_Area"
            value={unidad.Id_Area}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Estado:</label>
          <select
            name="estado"
            value={unidad.estado}
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

export default FormUnidades;
