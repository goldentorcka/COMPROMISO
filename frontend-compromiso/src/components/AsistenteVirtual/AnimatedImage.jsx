import React from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import assistantImage from '../../../Public/images/logos/logoSE.png'; // Asegúrate de tener una imagen futurista

const ImageWrapper = styled(animated.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 200px;
  perspective: 1000px;
  cursor: pointer;
`;

const Image = styled(animated.img)`
  width: 100%;
  height: auto;
  border-radius: 50%;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
  transform-style: preserve-3d;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: rotateY(20deg) rotateX(20deg) scale(1.05);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.8);
  }
`;

const AnimatedImage = ({ onClick, isListening }) => {
  const springProps = useSpring({
    transform: isListening ? 'rotateY(360deg)' : 'rotateY(0deg)',
    config: { tension: 300, friction: 10 },
  });

  return (
    <ImageWrapper onClick={onClick}>
      <Image src={assistantImage} style={springProps} alt="Assistant" />
    </ImageWrapper>
  );
};

export default AnimatedImage;
