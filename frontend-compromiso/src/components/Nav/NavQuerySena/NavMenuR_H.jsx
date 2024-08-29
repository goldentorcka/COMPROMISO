import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NavMenuPublic from '../NavMenuPublic.jsx';
import reseñaImage from '../../../Public/images/logos/logoSE.png';

const NavMenuReseña = () => {
    const [hoverDirection, setHoverDirection] = useState(null);

    const handleMouseEnter = (direction) => {
        setHoverDirection(direction);
    };

    const handleMouseLeave = () => {
        setHoverDirection(null);
    };

    const styles = {
        container: {
            marginTop: '2rem',
            padding: '2rem',
            backgroundColor: '#f9f9f9',
            borderRadius: '15px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            animation: 'slideIn 1s ease-out',
            maxWidth: '1200px',
            margin: '2rem auto',
        },
        title: {
            fontSize: '2.5rem',
            color: '#343a40',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '2rem',
            animation: 'fadeInDown 1s ease-in-out',
            letterSpacing: '1.5px',
        },
        section: {
            marginBottom: '2rem',
            animation: 'fadeInUp 1s ease-in-out',
        },
        paragraph: {
            fontSize: '1.2rem',
            lineHeight: '1.6',
            color: '#555',
            animation: 'fadeInRight 1s ease-in-out',
            marginBottom: '1rem',
        },
        imageContainer: {
            display: 'flex',
            justifyContent: 'center',
            marginTop: '2rem',
            perspective: '1000px',
        },
        image: {
            width: '50%',
            height: 'auto',
            transition: 'transform 0.6s ease, box-shadow 0.6s ease',
            transformStyle: 'preserve-3d',
            cursor: 'pointer',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
            borderRadius: '10px',
            animation: 'zoomIn 1s ease-in-out',
        },
        imageHoveredLeft: {
            transform: 'rotateY(20deg) rotateX(10deg) scale(1.05)',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
        },
        imageHoveredRight: {
            transform: 'rotateY(-20deg) rotateX(-10deg) scale(1.05)',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
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
        '@keyframes fadeInDown': {
            from: {
                opacity: 0,
                transform: 'translateY(-50px)',
            },
            to: {
                opacity: 1,
                transform: 'translateY(0)',
            }
        },
        '@keyframes fadeInUp': {
            from: {
                opacity: 0,
                transform: 'translateY(50px)',
            },
            to: {
                opacity: 1,
                transform: 'translateY(0)',
            }
        },
        '@keyframes slideIn': {
            from: {
                opacity: 0,
                transform: 'translateY(100px)',
            },
            to: {
                opacity: 1,
                transform: 'translateY(0)',
            }
        },
        '@keyframes zoomIn': {
            from: {
                transform: 'scale(0.8)',
                opacity: 0,
            },
            to: {
                transform: 'scale(1)',
                opacity: 1,
            }
        }
    };

    return (
        <>
            <NavMenuPublic />
            <div className="container my-5" style={styles.container}>
                <h1 style={styles.title}>Reseña Histórica</h1>
                <div style={styles.imageContainer}>
                    <img 
                        src={reseñaImage} 
                        alt="Reseña Histórica" 
                        style={{
                            ...styles.image,
                            ...(hoverDirection === 'left' && styles.imageHoveredRight),
                            ...(hoverDirection === 'right' && styles.imageHoveredLeft),
                        }} 
                        onMouseEnter={e => {
                            const direction = e.nativeEvent.offsetX < e.target.clientWidth / 2 ? 'left' : 'right';
                            handleMouseEnter(direction);
                        }}
                        onMouseLeave={handleMouseLeave}
                    />
                </div>
                <div className="section" style={styles.section}>
                    <p style={styles.paragraph}>
                        El modelo de formación mediante la estrategia de Sena Empresa, nace en el año 2005 en el Centro de Formación La Granja en el Espinal - Tolima...
                    </p>
                    
                    <p style={styles.paragraph}>
                    Un año después el Centro Agroindustrial del Meta, conformó unos grupos de trabajo para visitar y conocer este modelo en los Centros Agropecuario "La Granja" en el Tolima, La Angostura y Yamboró en el Huila.

                    Con estas experiencias se debatió y se diseñó una propuesta de modelo de Sena Empresa con base en la logística y especialidades que tenía el centro, por ello se formaron las Sena empresas de: Agrícola, Pecuaria, Agroindustria, Gestión y de Mecanización.

                    La Sena empresa Agrícola, desarrolla diferentes proyectos para hacer las practicas requeridas de las especialidades de Producción Agrícola, Administración de Empresas Agropecuarias y otras especialidades que tienen competencias en estas áreas. Las unidades que actualmente maneja el proceso Sena Empresa son: Anón, Bioinsumos, Cacao, Guadua, Guanábana, Guayaba, Hortalizas, Laboratorio de Biotecnología, Pasifloras, Piña, Postcosecha, Vivero y Yuca.

                    La Sena empresa Pecuaria, desarrolla diferentes proyectos para hacer las practicas requeridas de las especialidades de Producción Pecuaria, Administración de Empresas Agropecuarias y otras especialidades que tienen competencias en estas áreas. Las unidades que actualmente maneja el proceso Sena Empresa son: Apicultura, Avicultura, Especies Menores, Ganadería, Laboratorio de Reproducción Animal, Ovinos, Piscicultura y Porcinos.

                    La Sena empresa Agroindustria, desarrolla diferentes proyectos para hacer las practicas requeridas de las especialidades de Producción Agroindustria, Control y Calidad y otras especialidades que tienen competencias en estas áreas. Las unidades que actualmente maneja el proceso Sena Empresa son las plantas de: Aguas, Almacén, Cárnicos, Control y Calidad, Frutas, Lácteos y Panificación.

                    La Sena empresa Gestión, desarrolla diferentes proyectos para hacer las practicas requeridas de las especialidades de Administración de Empresas Agropecuarias. Las Divisiones que actualmente maneja el proceso Sena Empresa son: Gerente Administrativo y Líder del Sistema de Gestión de la Calidad, Gerente Técnico y Lideres de Producción (Agrícola, Pecuaria, Agroindustria, Mecanización), Líder de Talento Humano y sus Gestores de Talento Humano (Agrícola, Pecuaria, Agroindustria, Mecanización), Líder de Contabilidad y Finanzas, Líder de Mercadeo y De Ventas.

                    La Sena empresa Mecanización, desarrolla diferentes proyectos para hacer las practicas requeridas de las especialidades de Mecanización Agrícola. Las unidades que actualmente maneja el proceso Sena Empresa son: Cultivo y Transporte.

                    </p>
                </div>
            </div>
        </>
    );
}

export default NavMenuReseña;
