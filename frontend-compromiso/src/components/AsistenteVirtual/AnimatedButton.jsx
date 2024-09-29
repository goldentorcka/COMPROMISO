import React from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';

const Button = styled(animated.button)`
  background: linear-gradient(45deg, #6a11cb, #2575fc);
  border: none;
  border-radius: 10px;
  color: white;
  padding: 15px 30px;
  font-size: 1.5em;
  cursor: pointer;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  transform-style: preserve-3d;
  transition: transform 0.2s;
  &:hover {
    transform: translateZ(10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
  }
`;

const AnimatedButton_Init = ({ onClick, isListening }) => {
  const springProps = useSpring({
    transform: isListening ? 'scale(1.1)' : 'scale(1)',
    config: { tension: 200, friction: 12 },
  });

  return (
    <Button style={springProps} onClick={onClick}>
      {isListening ? 'Detener' : 'Activar Asistente'}
    </Button>
  );
};

export default AnimatedButton_Init;
