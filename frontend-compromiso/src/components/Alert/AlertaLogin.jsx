// src/components/Alert/CustomAlert.jsx
import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

const AlertContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
  width: 100%;
  height: 100%;
  pointer-events: none; /* Evita la interacción con la alerta */
`;

const AlertContent = styled(motion.div)`
  background: linear-gradient(145deg, #00b4d8, #0077b6);
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
  padding: 20px;
  text-align: center;
  display: flex;
  align-items: center;
  gap: 15px;
  color: #fff;
  font-family: 'Roboto', sans-serif;
  max-width: 90%;
  max-height: 90%;
  box-sizing: border-box;
  pointer-events: auto; /* Habilita la interacción con el contenido de la alerta */
`;

const AlertImage = styled.img`
  width: 60px;
  height: 60px;
  object-fit: contain;
`;

const AlertMessage = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
  margin: 0;
`;

const CustomAlert = ({ message }) => {
  return (
    <AlertContainer
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5 }}
    >
      <AlertContent
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <AlertImage src="/images/IconLogin/welcome.png" alt="Alerta" />
        <AlertMessage>{message}</AlertMessage>
      </AlertContent>
    </AlertContainer>
  );
};

export default CustomAlert;
