// src/ErrorBoundary.jsx
import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Actualiza el estado para que la siguiente renderización muestre la interfaz de repuesto.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // También puedes registrar el error en un servicio de reporte de errores.
    console.error('Error capturado en ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Puedes renderizar cualquier interfaz de repuesto personalizada aquí.
      return <h1>Algo salió mal. Por favor, inténtalo de nuevo más tarde.</h1>;
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
