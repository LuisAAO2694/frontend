import { useState, useEffect } from 'react';
import axios from 'axios';
import './Historial.css';
import imagenIzquierda from './images/Fialogo.png';
import imagenDerecha from './images/F1logo.png';
import { Navigation } from './Navigation';

function Historial() {

  const [historialSimulaciones, setHistorialSimulaciones] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const simulacionesPorPagina = 5;

  // Función para calcular el índice inicial y final de las simulaciones en la página actual
  const indiceInicial = (paginaActual - 1) * simulacionesPorPagina;
  const indiceFinal = paginaActual * simulacionesPorPagina;

  // Función para cambiar de página
  const cambiarPagina = (numeroPagina) => {
    setPaginaActual(numeroPagina);
  };

  // Realizar la solicitud GET al servidor para obtener los datos de simulación
  useEffect(() => {
    axios.get('http://localhost:8081/historialSimulaciones')
      .then(response => {
        const historialOrdenado = response.data.reverse();
        setHistorialSimulaciones(historialOrdenado);
      })
      .catch(error => {
        console.error("Error al obtener datos de simulaciones:", error);
      });
  }, []);

  // Simulaciones a mostrar en la página actual
  const simulacionesEnPagina = historialSimulaciones.slice(indiceInicial, indiceFinal);

  // Función auxiliar para formatear el rendimiento como porcentaje
  const formatPercentage = (value) => {
    if (value !== null && !isNaN(value)) {
      const percentage = value * 100;
      const formattedPercentage = percentage.toFixed(4);
      const integerPart = formattedPercentage.slice(0, 2);
      const decimalPart = formattedPercentage.slice(1, 5);
      return `${integerPart}.${decimalPart} %`;
    }
    return 'N/A';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <Navigation />
      <h1 style={{marginBottom: '10px', color: 'white'  }}>Historial de Simulaciones</h1>
      {/* Mostrar las simulaciones en la página actual */}
      {simulacionesEnPagina.map((simulacion, index) => (
        <div key={index} className="simulacion-container">
          <p>Fecha de simulación: {formatDate(simulacion.fecha)}</p>
          <p>Rendimiento sin afectación: {formatPercentage(simulacion.rendimiento)}</p>
          <p>Rendimiento en lluvia: {formatPercentage(simulacion.rendimiento_Lluvia)}</p>
          <p>Rendimiento en calor: {formatPercentage(simulacion.rendimiento_Calor)}</p>
          <p>Rendimiento en frío: {formatPercentage(simulacion.rendimiento_Frio)}</p>
          <p>Carga Aerodinámica: {simulacion.carga_A} N</p>
          <p>Momento aerodinámico: {simulacion.momento_A} N*m</p>
          <p>Downforce: {simulacion.downforce} N</p>
          <p>Momento aerodinámico 2: {simulacion.momento_A2} N*m</p>
          <p>Altura de la Suspensión {simulacion.altura_S} m</p>
          <p>Rigidez de la Suspensión: {simulacion.rigidez_S} N*m</p>
          <p>Potencia: {simulacion.potencia} CV</p>
          <p>Rendimiento Térmico: {simulacion.rendimiento_T} %</p>
          <p>Relación de transmisión: {simulacion.relacion_T}</p>
          <p>Potencia de frenado: {simulacion.potencia_F} W</p>
          <p>Distancia de frenado: {simulacion.distancia_F} m</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '-99px' }}>
            <img src={imagenIzquierda} alt="Imagen izquierda" style={{ width: '100px', height: 'auto' }} />
            <img src={imagenDerecha} alt="Imagen derecha" style={{ width: '100px', height: 'auto' }} />
          </div>
        </div>
      ))}
      {/* Implementar controles de paginación */}
      <div className="paginacion-container">
        {Array.from({ length: Math.ceil(historialSimulaciones.length / simulacionesPorPagina) }, (_, i) => (
          <button key={i} className={`paginacion-button ${i + 1 === paginaActual ? 'active' : ''}`} onClick={() => cambiarPagina(i + 1)}>{i + 1}</button>
        ))}
      </div>
    </div>
  );
}

export default Historial;
