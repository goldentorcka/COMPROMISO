import React, { useState, useEffect } from 'react';
import NavBarAdministrator from "../Admin/NavBarAdmin.jsx";

const Home_init = () => {
    const imageBasePath = '/src/Public/images/imagenHome-Init/';
    const images = [
        `${imageBasePath}imagen1.jpeg`,
        `${imageBasePath}imagen2.jpeg`,
        `${imageBasePath}imagen3.jpeg`
    ];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [transitioning, setTransitioning] = useState(false);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTransitioning(true); // Inicia la transición
            setTimeout(() => {
                setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
                setTransitioning(false); // Termina la transición
            }, 1500); // Tiempo que dura la animación de transición (1.5 segundos)
        }, 6000); // Cambia la imagen cada 6 segundos

        return () => clearInterval(intervalId);
    }, [images.length]);

    const styles = {
        imageContainer: {
            display: 'flex',
            justifyContent: 'center',
            marginTop: '1.5rem',
            perspective: '1200px',
            position: 'relative',
            overflow: 'hidden',
        },
        image: {
            width: '300px', // Tamaño más grande
            height: 'auto',
            transition: 'transform 1.5s ease-in-out, opacity 1.5s ease-in-out',
            transformStyle: 'preserve-3d',
            cursor: 'pointer',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
            opacity: transitioning ? 0 : 1, // Maneja la opacidad para el efecto de desvanecimiento
        },
        imageHover: {
            transform: 'scale(1.3) rotateY(20deg) rotateX(15deg)', // Efecto 3D al pasar el cursor
            boxShadow: '0 30px 60px rgba(0, 0, 0, 0.4)',
        },
        imageActive: {
            transform: 'scale(1.2) rotateY(15deg) rotateX(10deg)',
            boxShadow: '0 30px 60px rgba(0, 0, 0, 0.4)',
        },
        fadeIn: {
            animationName: 'fadeIn',
            animationDuration: '1.5s',
            animationTimingFunction: 'ease-in-out',
            animationFillMode: 'forwards',
        },
        '@keyframes fadeIn': {
            from: {
                opacity: 0,
                transform: 'translateY(30px) rotateY(-30deg)',
            },
            to: {
                opacity: 1,
                transform: 'translateY(0) rotateY(0deg)',
            }
        },
        '@keyframes rotateIn': {
            from: {
                opacity: 0,
                transform: 'rotateY(180deg) scale(0.8)',
            },
            to: {
                opacity: 1,
                transform: 'rotateY(0deg) scale(1)',
            }
        },
        textContainer: {
            textAlign: 'center',
            marginTop: '2rem',
        },
    };

    return (
        <>
            <div className="container my-5">
                <div className="position-relative p-5 text-muted bg-body border border-dashed rounded-5">
                    <svg className="bi mt-5 mb-3" width="48" height="48">
                        <use xlinkHref="#check2-circle"></use>
                    </svg>
                    <h1 className="text-body-emphasis">¡Bienvenidos!</h1>
                    <div style={styles.imageContainer}>
                        <img 
                            src={images[currentImageIndex]} 
                            alt={`Imagen ${currentImageIndex + 1}`} 
                            style={{ 
                                ...styles.image, 
                                ...(transitioning ? {animation: 'rotateIn 1.5s ease-in-out'} : {}) // Aplica la animación 3D al cambiar de imagen
                            }} 
                            onMouseOver={e => e.currentTarget.style.transform = styles.imageHover.transform}
                            onMouseOut={e => e.currentTarget.style.transform = styles.imageActive.transform}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home_init;
