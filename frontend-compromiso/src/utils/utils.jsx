export const autoTypeMessage = (message, setMessages, speakMessage) => {
    let index = 0;
    const typingSpeed = 50; // Velocidad de tipeo en milisegundos
  
    // Iniciar el intervalo de tipeo
    const typeInterval = setInterval(() => {
      if (index < message.length) {
        setMessages(prevMessages => {
          const newMessages = [...prevMessages];
          newMessages[newMessages.length - 1] = { role: 'assistant', content: message.slice(0, index + 1) };
          return newMessages;
        });
        index++;
      } else {
        clearInterval(typeInterval); // Detener el intervalo cuando el mensaje esté completo
        setMessages(prevMessages => [
          ...prevMessages,
          { role: 'assistant', content: '¿Hay algo más en lo que pueda ayudarte?' }
        ]);
        speakMessage(message); // Leer el mensaje en voz alta
      }
    }, typingSpeed);
  };
  