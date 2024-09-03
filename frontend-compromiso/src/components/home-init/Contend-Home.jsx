import React from 'react';
import NavBarAdministrator from "../Admin/NavBarAdmin.jsx";

const Home_init = () => {
    const imageBasePath = '/src/Public/images/imagenHome-Init/';
    const images = [
        `${imageBasePath}imagen1.jpeg`,
        `${imageBasePath}imagen2.jpeg`,
        `${imageBasePath}imagen3.jpeg`
    ];

    const styles = {
        imageContainer: {
            display: 'flex',
            justifyContent: 'space-around',
            marginTop: '1.5rem',
            perspective: '1000px'
        },
        image: {
            width: '200px',
            height: 'auto',
            transition: 'transform 0.4s ease, box-shadow 0.4s ease',
            transformStyle: 'preserve-3d',
            cursor: 'pointer',
            boxShadow: '0 15px 30px rgba(0, 0, 0, 0.1)',
        },
        imageHover: {
            transform: 'rotateY(20deg) rotateX(10deg) scale(1.1)',
            boxShadow: '0 15px 30px rgba(0, 0, 0, 0.3)',
        },
        imageActive: {
            transform: 'rotateY(-20deg) rotateX(-10deg) scale(1.1)',
        },
        fadeIn: {
            animationName: 'fadeIn',
            animationDuration: '1s',
            animationTimingFunction: 'ease-in-out',
            animationFillMode: 'forwards',
        },
        '@keyframes fadeIn': {
            from: {
                opacity: 0,
                transform: 'translateY(20px)',
            },
            to: {
                opacity: 1,
                transform: 'translateY(0)',
            }
        },
        justifyText: {
            textAlign: 'justify',
        }
    };

    return (
        <>
            <div className="container my-5">
                <div className="position-relative p-5 text-muted bg-body border border-dashed rounded-5">
                    <svg className="bi mt-5 mb-3" width="48" height="48">
                        <use xlinkHref="#check2-circle"></use>
                    </svg>
                    <h1 className="text-body-emphasis">¡Bienvenidos!</h1>
                    <p className="col-lg-6 mx-auto mb-4" style={styles.justifyText}>
                        El centro agropecuario "La Granja" del SENA Espinal Regional Tolima maneja diversos formatos para la gestión de información en sus áreas y unidades productivas. Este manejo disperso genera problemas como el uso de formatos desactualizados y versiones múltiples. Para resolverlo, se ha desarrollado el software "CALGDOCS", una herramienta que centraliza y actualiza los formatos, asegurando su disponibilidad y correcta versión en línea para toda la comunidad del centro.
                    </p>
                    <div style={styles.imageContainer}>
                        {images.map((src, index) => (
                            <img 
                                key={index} 
                                src={src} 
                                alt={`Imagen ${index + 1}`} 
                                style={{ 
                                    ...styles.image, 
                                    ...styles.fadeIn, 
                                    animationDelay: `${0.2 * (index + 1)}s`
                                }} 
                                onMouseOver={e => e.currentTarget.style.transform = styles.imageHover.transform}
                                onMouseOut={e => e.currentTarget.style.transform = ''}
                                onMouseDown={e => e.currentTarget.style.transform = styles.imageActive.transform}
                                onMouseUp={e => e.currentTarget.style.transform = styles.imageHover.transform}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home_init;
