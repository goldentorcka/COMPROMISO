import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NavMenuPublic from '../NavMenuPublic.jsx';

const NavMenuSE = () => {
    const imageBasePath = '/src/Public/images/imagenM-V/';
    const images = [
        `${imageBasePath}ImagenM-VSE.jpg`,
        `${imageBasePath}ImagenM-VSE2.jpg`,
        `${imageBasePath}ImagenM-VSE3.jpg`
    ];

    const [hoveredImage, setHoveredImage] = useState(null);

    const handleMouseEnter = (index, direction) => {
        setHoveredImage({ index, direction });
    };

    const handleMouseLeave = () => {
        setHoveredImage(null);
    };

    const styles = {
        container: {
            marginTop: '2rem',
            padding: '2rem',
            backgroundColor: '#f9f9f9',
            borderRadius: '15px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            animation: 'slideIn 1s ease-out'
        },
        title: {
            fontSize: '2.5rem',
            color: '#343a40',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '2rem',
            animation: 'fadeInDown 1s ease-in-out'
        },
        section: {
            marginBottom: '2rem'
        },
        heading: {
            fontSize: '2rem',
            color: '#343a40',
            marginBottom: '1rem',
            animation: 'fadeInLeft 1s ease-in-out'
        },
        paragraph: {
            fontSize: '1.2rem',
            lineHeight: '1.6',
            color: '#555',
            animation: 'fadeInRight 1s ease-in-out'
        },
        imageContainer: {
            display: 'flex',
            justifyContent: 'space-around',
            marginTop: '2rem',
            perspective: '1000px'
        },
        image: {
            width: '250px',
            height: 'auto',
            transition: 'transform 0.6s ease, box-shadow 0.6s ease',
            transformStyle: 'preserve-3d',
            cursor: 'pointer',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
        },
        imageHoveredLeft: {
            transform: 'rotateY(20deg) rotateX(10deg) scale(1.2)',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
        },
        imageHoveredRight: {
            transform: 'rotateY(-20deg) rotateX(-10deg) scale(1.2)',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
        }
    };

    return (
        <>
            <NavMenuPublic />
            <div className="container my-5" style={styles.container}>
                <h1 style={styles.title}>Misión y Visión</h1>
                <div className="section" style={styles.section}>
                    <h2 style={styles.heading}>MISIÓN</h2>
                    <p style={styles.paragraph}>
                        Somos una estrategia didáctica empresarial para los aprendices del SENA, garantizando el fortalecimiento
                        de su formación integral mediante procesos de innovación y aprendizaje permanente, contribuyendo al
                        mejoramiento de la calidad del servicio que el SENA ofrece a los colombianos.
                    </p>
                </div>
                <div className="section" style={styles.section}>
                    <h2 style={styles.heading}>VISIÓN</h2>
                    <p style={styles.paragraph}>
                        Para el año 2030, Sena Empresa continuará siendo el eje integrador de los procesos productivos y
                        administrativos del Centro Agropecuario La Granja, fundamentada en la interacción entre el
                        Aprender–Aprender, Aprender–Hacer y Aprender–Ser y la formación por proyectos.
                        El Ciclo de Fortalecimiento Empresarial, propenderá por el desarrollo y fortalecimiento de las
                        actividades que conduzcan a generar mentalidad emprendedora en los aprendices, buscando con esto 
                        aportar a sus comunidades de origen los conocimientos adquiridos, generando un impacto positivo y
                        un mayor desarrollo económico en las regiones.
                    </p>
                </div>
                <div style={styles.imageContainer}>
                    {images.map((src, index) => (
                        <img
                            key={index}
                            src={src}
                            alt={`Imagen ${index + 1}`}
                            style={{
                                ...styles.image,
                                ...(hoveredImage?.index === index && hoveredImage?.direction === 'left' && styles.imageHoveredRight),
                                ...(hoveredImage?.index === index && hoveredImage?.direction === 'right' && styles.imageHoveredLeft),
                            }}
                            onMouseEnter={(e) => {
                                const direction = e.nativeEvent.offsetX < e.target.clientWidth / 2 ? 'left' : 'right';
                                handleMouseEnter(index, direction);
                            }}
                            onMouseLeave={handleMouseLeave}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}

export default NavMenuSE;
