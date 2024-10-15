import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaFacebook, FaInstagram, FaTiktok, FaBloggerB } from "react-icons/fa";
import NavMenuPublic from '../NavMenuPublic.jsx';
import '../../styles/stylesNavR_H.css';

const NavMenuReseña = () => {
    return (
        <>
            <NavMenuPublic />
            <div className="container my-5">
                <div className="content-container">
                    <img src="/images/logoSE.png" alt="Logo" className="logo" />
                    <h1 className="title">Reseña Histórica</h1>

                    <p className="paragraph">
                    El modelo de formación mediante la estrategia de Sena empresa, nace en el año 2005 en el centro de formación La Granja en el Espinal - Tolima. Un año después el Centro Agroindustrial del Meta, conformó unos grupos de trabajo para visitar y conocer este modelo en los Centros Agropecuario "La Granja" en el Tolima, La Angostura y Yamboró en el Huila.

                    Con estas experiencias se debatió y se diseñó una propuesta de modelo de Sena Empresa con base en la logística y especialidades que tenía el centro, por ello se formaron las Sena empresas de: Agrícola, Pecuaria, Agroindustria, Gestión y de Mecanización.

                    La Sena empresa Agrícola, desarrolla diferentes proyectos para hacer las practicas requeridas de las especialidades de Producción Agrícola, Administración de Empresas Agropecuarias y otras especialidades que tienen competencias en estas áreas. Las unidades que actualmente maneja el proceso Sena Empresa son: Anón, Bioinsumos, Cacao, Guadua, Guanábana, Guayaba, Hortalizas, Laboratorio de Biotecnología, Pasifloras, Piña, Postcosecha, Vivero y Yuca.

                    La Sena empresa Pecuaria, desarrolla diferentes proyectos para hacer las practicas requeridas de las especialidades de Producción Pecuaria, Administración de Empresas Agropecuarias y otras especialidades que tienen competencias en estas áreas. Las unidades que actualmente maneja el proceso Sena Empresa son: Apicultura, Avicultura, Especies Menores, Ganadería, Laboratorio de Reproducción Animal, Ovinos, Piscicultura y Porcinos.

                    La Sena empresa Agroindustria, desarrolla diferentes proyectos para hacer las practicas requeridas de las especialidades de Producción Agroindustria, Control y Calidad y otras especialidades que tienen competencias en estas áreas. Las unidades que actualmente maneja el proceso Sena Empresa son las plantas de: Aguas, Almacén, Cárnicos, Control y Calidad, Frutas, Lácteos y Panificación.

                    La Sena empresa Gestión, desarrolla diferentes proyectos para hacer las practicas requeridas de las especialidades de Administración de Empresas Agropecuarias. Las Divisiones que actualmente maneja el proceso Sena Empresa son: Gerente Administrativo y Líder del Sistema de Gestión de la Calidad, Gerente Técnico y Lideres de Producción (Agrícola, Pecuaria, Agroindustria, Mecanización), Líder de Talento Humano y sus Gestores de Talento Humano (Agrícola, Pecuaria, Agroindustria, Mecanización), Líder de Contabilidad y Finanzas, Líder de Mercadeo y De Ventas.

                    La Sena empresa Mecanización, desarrolla diferentes proyectos para hacer las practicas requeridas de las especialidades de Mecanización Agrícola. Las unidades que actualmente maneja el proceso Sena Empresa son: Cultivo y Transporte.
                    </p>
                    {/* Contenido adicional */}

                    <div className="social-icons">
                        <a href="https://www.instagram.com/senaempresalagranja/" target="_blank" rel="noopener noreferrer" className="social-icon">
                            <FaInstagram />
                        </a>
                        <a href="https://www.facebook.com/senaempresa?mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer" className="social-icon">
                            <FaFacebook />
                        </a>
                        <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                            <FaTiktok />
                        </a>
                        <a href="https://senaempresalagranja.blogspot.com/" target="_blank" rel="noopener noreferrer" className="social-icon">
                            <FaBloggerB />
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}

export default NavMenuReseña;
