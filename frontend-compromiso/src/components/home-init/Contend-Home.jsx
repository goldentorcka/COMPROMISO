import React, { useState, useEffect } from 'react';
import '../styles/stylesContenHome.css'


const Home_init = () => {
    const imageBasePath = '/src/Public/images/imagenHome-Init/';
    const images = [
        `${imageBasePath}imagen1.jpeg`,
        `${imageBasePath}imagen2.jpeg`,
        `${imageBasePath}imagen3.jpeg`
    ];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [transitioning, setTransitioning] = useState(false);

    // Agrega más animaciones futuristas y 3D
    const getRandomAnimation = () => {
        const animations = ['rotateIn', 'slideIn', 'flipIn', 'zoomIn', 'spinIn', 'floatIn', 'circleIn', 'zoomRotateIn'];
        return animations[Math.floor(Math.random() * animations.length)];
    };

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

    return (
        <>
            <div className="container my-5">
                <div className="position-relative p-5 text-muted bg-body rounded-5">
                    <svg className="bi mt-5 mb-3" width="48" height="48">
                        <use xlinkHref="#check2-circle"></use>
                    </svg>
                    <h1 className="text-title">¡BIENVENIDOS!</h1>
                    <p className="description">
                        Este es el aplicativo que se desea implementar para tener la opción de descarga de los formatos que se utilizan en las unidades del Centro Agropecuario La Granja.
                    </p>
                    <div className="image-container">
                        <img 
                            src={images[currentImageIndex]} 
                            alt={`Imagen ${currentImageIndex + 1}`} 
                            className={`image ${transitioning ? getRandomAnimation() : ''}`} // Aplica la animación aleatoria
                            onMouseOver={e => e.currentTarget.style.transform = 'scale(1.4) rotateY(30deg) rotateX(20deg) translateZ(30px)'}
                            onMouseOut={e => e.currentTarget.style.transform = 'scale(1.2) rotateY(10deg) rotateX(10deg)'}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home_init;