import React from 'react';
import NavBarAdministrator from "../Admin/NavBarAdmin.jsx"
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
        }
    };

    return (
        <>
        <NavBarAdministrator />
            <div className="container my-5">
                <div className="position-relative p-5 text-muted bg-body border border-dashed rounded-5">
                    <svg className="bi mt-5 mb-3" width="48" height="48">
                        <use xlinkHref="#check2-circle"></use>
                    </svg>
                    <h1 className="text-body-emphasis">¡Bienvenidos!</h1>
                    <p className="col-lg-6 mx-auto mb-4">
                        El centro agropecuario “la granja” del SENA Espinal Regional Tolima maneja una gran variedad de formatos para la gestión de la información. Al interior de todas las unidades productivas del centro para los diferentes procesos que maneja. Cuenta con 6 áreas, cada una de estas áreas para la contabilización de la información. Trabaja con subcentros de costos.
                        En el marco de la estrategia de Sena empresa a la cual convergen todas (ver cuadro No.1) las áreas y unidades productivas del centro en fuente propia, donde cada unidad para sus procesos utiliza formatos, han generado inconvenientes debido a que se maneja de forma aislada e independiente, ocasionando que muchas veces se utilicen formatos desactualizados o 
                        varias versiones de un mismo formato, por ejemplo cuando una persona del centro requiere un formato tiene que dirigirse a Sena empresa y si no está la persona encargada, no puede obtenerlo, generando que si utiliza un formato a su criterio sin tener cuidado de verificar si es el correcto o la última versión. Otro problema es que hay formatos que se usan en 
                        físico y otros digital, ocasionando confusión a la hora de requerirlos y usarlos. Por tal razón se decide desarrollar el software “CALGDOCS” en el marco de proyecto formativo del programa Análisis y desarrollo de Software, de la ficha 2671143, como una herramienta que permita dar solución a esta problemática, permitiendo contar con formatos actualizados y 
                        en línea para que estén disponibles para toda la comunidad del centro.
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
