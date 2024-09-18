import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const VirtualAssistant = () => {
  const location = useLocation();

  useEffect(() => {
    // Función para sintetizar voz
    const speakText = (message) => {
      const synth = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(message);
      utterance.lang = 'es-ES'; // Español
      synth.speak(utterance);
    };

    // Función para mostrar el modal con SweetAlert2
    const showModal = (message) => {
      Swal.fire({
        title: 'Asistente Virtual',
        text: message,
        icon: 'info',
        background: '#f5f5f5',
        backdrop: `
          rgba(0,0,123,0.4)
          url("https://sweetalert2.github.io/images/nyan-cat.gif")
          left top
          no-repeat
        `,
        confirmButtonText: '¡Entendido!',
        customClass: {
          popup: 'animated tada', // Clase de animación
        },
      });
    };

    // Mensajes por cada ruta
    let message;
    switch (location.pathname) {
      case '/':
        message = 'Bienvenido a la página de inicio.';
        break;
      case '/login-admin':
        message = 'Accede a la plataforma de administración desde esta página.';
        break;
      case '/manuals':
        message = 'Aquí puedes descargar los manuales técnicos y de usuario.';
        break;
      case '/Administrator':
        message = 'Estás en el módulo de administración.';
        break;
      default:
        message = 'Navegas por una sección de la página.';
    }

    // Llamar las funciones cuando cambie la ruta
    showModal(message);  // Muestra el modal
    speakText(message);  // Habla el asistente

  }, [location]);

  return null; // Este componente no tiene UI, solo lógica.
};

export default VirtualAssistant;
