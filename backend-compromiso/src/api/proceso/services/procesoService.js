// services/ProcesoService.js
import ProcesoModels from '../models/procesoModel.js'; // Importa el modelo

export async function create(data) {
  try {
    const proceso = await ProcesoModels.create(data);
    return proceso;
  } catch (error) {
    throw new Error(`Error creating process: ${error.message}`);
  }
}
