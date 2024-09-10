//import React, { useState, useEffect } from 'react';
//import { Navigation } from './Navigation';
//import Simulation from './Simulation';
import './FloatingAnalytics.css';
import React, { useState, useEffect } from 'react';


function AnalyticsNoView({ cargaAerodinamica, momentoAerodinamico, downforce, momentoAerodinamico2,
    alturaSuspension, rigidezSuspension, potencia, rendimientoTermico, relacionTransmision,
    potenciaFrenado, distanciaFrenado, onClose,
    rendimientoSinAfectacion,
    rendimientoLluvia,
    rendimientoCalor,
    rendimientoFrio}) {

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


    const [showAlert, setShowAlert] = useState(true);

    useEffect(() => {
        if (showAlert) {
            setTimeout(() => {
                setShowAlert(false);
            }, 900); // Ocultar la alerta después de 3 segundos
        }
    }, [showAlert]);

    

    return (
        <div className="floating-analytics">
            <div className="analytics-content">
            <h2 style={{ color: 'black' }}>Analiticas de los cálculos del monoplaza:</h2>
            <p style={{ color: 'black' }}>Carga aerodinámica: {cargaAerodinamica} N</p>
            <p style={{ color: 'black' }}>Momento aerodinámico: {momentoAerodinamico} N*m</p>
            <p style={{ color: 'black' }}>Downforce: {downforce} N</p>
            <p style={{ color: 'black' }}>Momento aerodinámico 2: {momentoAerodinamico2} N*m</p>
            <p style={{ color: 'black' }}>Altura de la Suspensión {alturaSuspension} m</p>
            <p style={{ color: 'black' }}>Rigidez de la Suspensión: {rigidezSuspension} N*m</p>
            <p style={{ color: 'black' }}>Potencia: {potencia} CV</p>
            <p style={{ color: 'black' }}>Rendimiento Térmico: {rendimientoTermico} %</p>
            <p style={{ color: 'black' }}>Relación de transmisión: {relacionTransmision}</p>
            <p style={{ color: 'black' }}>Potencia de frenado: {potenciaFrenado} W</p>
            <p style={{ color: 'black' }}>Distancia de frenado: {distanciaFrenado} m</p>
            <p style={{ color: 'black' }}>Rendimiento sin afectación: {formatPercentage(rendimientoSinAfectacion)}</p>
            <p style={{ color: 'black' }}>Rendimiento en lluvia: {formatPercentage(rendimientoLluvia)}</p>
            <p style={{ color: 'black' }}>Rendimiento en calor: {formatPercentage(rendimientoCalor)}</p>
            <p style={{ color: 'black' }}>Rendimiento en frío: {formatPercentage(rendimientoFrio)}</p>
            </div>
            <div>

            <div className={`alert-success ${showAlert ? 'show' : ''}`}>
                <h3>Resultados guardados exitosamente</h3>
            </div>

            </div>
            <button className="close-button" onClick={onClose}>Cerrar</button>
        </div> 
    );
}

export default AnalyticsNoView;