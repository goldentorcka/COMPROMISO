// src/components/AsistenteVirtual/ActionProvider.jsx
import axios from 'axios';

class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }

  handleInfoCentro = () => {
    const message = this.createChatBotMessage(
      "El Centro Agropecuario La Granja del SENA está ubicado en el Espinal, Tolima. Es reconocido por su enfoque en el desarrollo rural y la formación técnica agrícola."
    );
    this.updateChatbotState(message);
  };

  handleConsultaIA = async (pregunta) => {
    try {
      const response = await axios.post('http://localhost:3001/ai/consulta', { pregunta });
      const message = this.createChatBotMessage(response.data.respuesta);
      this.updateChatbotState(message);
    } catch (error) {
      const message = this.createChatBotMessage("Hubo un error al obtener la respuesta.");
      this.updateChatbotState(message);
    }
  };

  handleDefault = () => {
    const message = this.createChatBotMessage(
      "No entiendo tu solicitud. ¿Puedes ser más claro?"
    );
    this.updateChatbotState(message);
  };

  updateChatbotState(message) {
    this.setState((prev) => ({
      ...prev,
      messages: [...prev.messages, message],
    }));
  }
}

export default ActionProvider;
