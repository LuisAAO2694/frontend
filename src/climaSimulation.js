import React, { useState } from 'react';

function WeatherConfiguration() {
    const [climaSeleccionado, setClimaSeleccionado] = useState('Lluvia');
    const [temperatura, setTemperatura] = useState(0);

    const opcionesClima = ['Lluvia', 'Calor', 'Frío'];
    const temperaturaMinima = {
        Lluvia: 0,
        Calor: 20,
        Frío: 10
    };
    const temperaturaMaxima = {
        Lluvia: 20,
        Calor: 40,
        Frío: 15
    };

    const handleSeleccionClima = (event) => {
        setClimaSeleccionado(event.target.value);
        // Asegurar que la temperatura seleccionada esté dentro del rango permitido para el nuevo clima seleccionado
        if (temperatura < temperaturaMinima[event.target.value]) {
            setTemperatura(temperaturaMinima[event.target.value]);
        } else if (temperatura > temperaturaMaxima[event.target.value]) {
            setTemperatura(temperaturaMaxima[event.target.value]);
        }
    };

    const handleCambioTemperatura = (event) => {
        const nuevaTemperatura = parseInt(event.target.value);
        // Verificar si la nueva temperatura es un número válido dentro del rango permitido y no tiene decimales
        if (!isNaN(nuevaTemperatura) && Number.isInteger(nuevaTemperatura) &&
            nuevaTemperatura >= temperaturaMinima[climaSeleccionado] &&
            nuevaTemperatura <= temperaturaMaxima[climaSeleccionado]) {
            setTemperatura(nuevaTemperatura);
        }
    };
    

    return (
        <div>
            <h4 style={{marginTop: '20px', color: 'white'}}>Configuración del Clima</h4>
            <div>
                <p htmlFor="clima" style={{ color: 'white' }}>Tipo de Clima</p>
                <select id="clima" value={climaSeleccionado} onChange={handleSeleccionClima}>
                    {opcionesClima.map((clima, index) => (
                        <option key={index} value={clima}>{clima}</option>
                    ))}
                </select>
            </div>
            <div>
                <p htmlFor="temperatura" style={{ color: 'white' }}>Temperatura (°C):</p>
                <input
                    type="number"
                    id="temperatura"
                    value={temperatura}
                    onChange={handleCambioTemperatura}
                />
                <span style={{ color: 'white' }}>{`(${temperaturaMinima[climaSeleccionado]}°C - ${temperaturaMaxima[climaSeleccionado]}°C)`}</span>
                <div style={{ marginBottom: '20px' }}></div>

            </div>
        </div>
    );
}

export default WeatherConfiguration;
