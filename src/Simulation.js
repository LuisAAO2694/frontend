import React, { useState, useEffect } from 'react';
import { Navigation } from './Navigation';
//import WeatherConfiguration from './climaSimulation'; // Importa el componente de configuración del clima
import Analytics from './AnalyticsNoView'; // Importar el componente Analytics
import './SimulationEstilos.css';
import axios from 'axios';

function Simulation() {
    const [showAnalytics, setShowAnalytics] = useState(false);
    // Define la función para cerrar el componente flotante
    const handleCloseAnalytics = () => {
        setShowAnalytics(false);
    };
//----CLIMA---------------------------------------------------------------------------------------------
// Definimos el estado para cada tipo de clima y su temperatura
const [temperaturaLluvia, setTemperaturaLluvia] = useState(0);
const [temperaturaCalor, setTemperaturaCalor] = useState(20);
const [temperaturaFrio, setTemperaturaFrio] = useState(10);

// Definimos las temperaturas mínimas y máximas para cada tipo de clima
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

// Función para manejar el cambio de temperatura para cada tipo de clima
const handleCambioTemperatura = (event, tipoClima) => {
    const nuevaTemperatura = parseInt(event.target.value);
    // Verificar si la nueva temperatura es un número válido dentro del rango permitido y no tiene decimales
    if (!isNaN(nuevaTemperatura) && Number.isInteger(nuevaTemperatura) &&
        nuevaTemperatura >= temperaturaMinima[tipoClima] &&
        nuevaTemperatura <= temperaturaMaxima[tipoClima]) {
        // Dependiendo del tipo de clima, actualizamos la temperatura correspondiente
        switch (tipoClima) {
            case 'Lluvia':
                setTemperaturaLluvia(nuevaTemperatura);
                break;
            case 'Calor':
                setTemperaturaCalor(nuevaTemperatura);
                break;
            case 'Frío':
                setTemperaturaFrio(nuevaTemperatura);
                break;
            default:
                break;
        }
    }
};
//----------------------------------------------------------------------------------------------------
    const [rendimientoSinAfectacion, setRendimientoSinAfectacion] = useState(null);
    const [rendimientoLluvia, setRendimientoLluvia] = useState(null);
    const [rendimientoCalor, setRendimientoCalor] = useState(null);
    const [rendimientoFrio, setRendimientoFrio] = useState(null);
    
    // // Función para calcular el rendimiento sin afectación
    // const calcularRendimientoSinAfectacion = () => {
    //     // Realizar cálculos según la fórmula proporcionada
    //     const rendimientoSinAfectacion = (cargaAerodinamica * momentoAerodinamico * alturaSuspension * rigidezSuspension * potencia * rendimientoTermico * relacionTransmision * potenciaFrenado * distanciaFrenado) / 1.225;
    //     setRendimientoSinAfectacion(rendimientoSinAfectacion);
    // };

    // // Función para calcular el rendimiento en lluvia
    // const calcularRendimientoLluvia = () => {
    //     // Realizar cálculos según la fórmula proporcionada para lluvia
    //     const densidadAire = 1.225 * (1 - (0.001 * temperaturaLluvia));
    //     const rendimientoLluvia = (cargaAerodinamica * momentoAerodinamico * alturaSuspension * rigidezSuspension * potencia * rendimientoTermico * relacionTransmision * potenciaFrenado * distanciaFrenado) / densidadAire;
    //     setRendimientoLluvia(rendimientoLluvia);
    // };

    // // Función para calcular el rendimiento en calor
    // const calcularRendimientoCalor = () => {
    //     // Realizar cálculos según la fórmula proporcionada para calor
    //     const densidadAire = 1.225 * (1 - (0.0001 * temperaturaCalor));
    //     const rendimientoCalor = (cargaAerodinamica * momentoAerodinamico * alturaSuspension * rigidezSuspension * potencia * rendimientoTermico * relacionTransmision * potenciaFrenado * distanciaFrenado) / densidadAire;
    //     setRendimientoCalor(rendimientoCalor);
    // };

    // // Función para calcular el rendimiento en frío
    // const calcularRendimientoFrio = () => {
    //     // Realizar cálculos según la fórmula proporcionada para frío
    //     const densidadAire = 1.225 * (1 + (0.0001 * temperaturaFrio));
    //     const rendimientoFrio = (cargaAerodinamica * momentoAerodinamico * alturaSuspension * rigidezSuspension * potencia * rendimientoTermico * relacionTransmision * potenciaFrenado * distanciaFrenado) / densidadAire;
    //     setRendimientoFrio(rendimientoFrio);
    // };

    const calcularRendimientoSinAfectacion = () => {
        const numerador = (
          cargaAerodinamica * 100000000 +
          momentoAerodinamico * alturaSuspension * rigidezSuspension * 100000000 +
          potencia * 100000000 +
          rendimientoTermico * relacionTransmision * 100000000 +
          potenciaFrenado * distanciaFrenado * 100000000
        );
        const denominador = 122500000;
        const rendimientoSinAfectacion = (numerador / denominador) * 100;
        setRendimientoSinAfectacion(rendimientoSinAfectacion);
      };
      
      const calcularRendimientoLluvia = () => {
        const densidadAire = 122500000 - (temperaturaLluvia * 100);
        const numerador = (
          cargaAerodinamica * 100000000 +
          momentoAerodinamico * alturaSuspension * rigidezSuspension * 100000000 +
          potencia * 99000000 + // Reducir la potencia en un 1% para simular el efecto de la lluvia
          rendimientoTermico * relacionTransmision * 100000000 +
          potenciaFrenado * distanciaFrenado * 99000000 // Reducir la potencia de frenado en un 1% para simular el efecto de la lluvia
        );
        const rendimientoLluvia = (numerador / densidadAire) * 100;
        setRendimientoLluvia(rendimientoLluvia);
      };
      
      const calcularRendimientoCalor = () => {
        const densidadAire = 122500000 - (temperaturaCalor * 10);
        const numerador = (
          cargaAerodinamica * 100000000 +
          momentoAerodinamico * alturaSuspension * rigidezSuspension * 100000000 +
          potencia * 98000000 + // Reducir la potencia en un 2% para simular el efecto del calor
          rendimientoTermico * relacionTransmision * 99000000 + // Reducir el rendimiento térmico en un 1% para simular el efecto del calor
          potenciaFrenado * distanciaFrenado * 100000000
        );
        const rendimientoCalor = (numerador / densidadAire) * 100;
        setRendimientoCalor(rendimientoCalor);
      };
      
      const calcularRendimientoFrio = () => {
        const densidadAire = 122500000 + (temperaturaFrio * 10);
        const numerador = (
          cargaAerodinamica * 100000000 +
          momentoAerodinamico * alturaSuspension * rigidezSuspension * 100000000 +
          potencia * 101000000 + // Aumentar la potencia en un 1% para simular el efecto del frío
          rendimientoTermico * relacionTransmision * 100000000 +
          potenciaFrenado * distanciaFrenado * 101000000 // Aumentar la potencia de frenado en un 1% para simular el efecto del frío
        );
        const rendimientoFrio = (numerador / densidadAire) * 100;
        setRendimientoFrio(rendimientoFrio);
      };
//----------------------------------------------------------------------------------------------------
    // Estados para almacenar los valores de las variables de carga aerodinámica
    const [CdCarga, setCdCarga] = useState();
    const [SCarga, setSCarga] = useState();
    const [rhoCarga, setRhoCarga] = useState();
    const [VCarga, setVCarga] = useState();
    const [cargaAerodinamica, setCargaAerodinamica] = useState(null);

    // Función para calcular la carga aerodinámica
    const calcularCargaAerodinamica = () => {
        const cargaAerodinamicaCalculada = CdCarga * SCarga * 0.5 * rhoCarga * Math.pow(VCarga, 2);
        setCargaAerodinamica(cargaAerodinamicaCalculada);
    };
    //----------------------------------------------------------------------------------------------------
    // Estados para almacenar los valores de las variables de momento aerodinámico
    const [CmMomento, setCmMomento] = useState();
    const [SMomento, setSMomento] = useState();
    const [rhoMomento, setRhoMomento] = useState();
    const [VMomento, setVMomento] = useState();
    const [xMomento, setXMomento] = useState();
    const [momentoAerodinamico, setMomentoAerodinamico] = useState(null);

    // Función para calcular el momento aerodinámico
    const calcularMomentoAerodinamico = () => {
        const momentoAerodinamicoCalculado = CmMomento * SMomento * 0.5 * rhoMomento * Math.pow(VMomento, 2) * xMomento;
        setMomentoAerodinamico(momentoAerodinamicoCalculado);
    };
    //----------------------------------------------------------------------------------------------------
    // Estados para almacenar los valores de las variables de downforce
    const [deltaP, setDeltaP] = useState();
    const [SDownforce, setSDownforce] = useState();
    const [rhoDownforce, setRhoDownforce] = useState();
    const [VDownforce, setVDownforce] = useState();
    const [downforce, setDownforce] = useState(null);

    // Función para calcular el downforce
    const calcularDownforce = () => {
        const downforceCalculado = deltaP * SDownforce * rhoDownforce * Math.pow(VDownforce, 2);
        setDownforce(downforceCalculado);
    };
    //----------------------------------------------------------------------------------------------------
    // Estados para almacenar los valores de las variables del segundo momento aerodinámico
    const [Cm, setCm] = useState();
    const [S, setS] = useState();
    const [rho, setRho] = useState();
    const [V, setV] = useState();
    const [x, setX] = useState();
    const [momentoAerodinamico2, setMomentoAerodinamico2] = useState(null);

    // Función para calcular el segundo momento aerodinámico (Difusor)
    const calcularMomentoAerodinamico2 = () => {
        const momentoAerodinamicoCalculado = Cm * S * 0.5 * rho * Math.pow(V, 2) * x;
        setMomentoAerodinamico2(momentoAerodinamicoCalculado);
    };
    //----------------------------------------------------------------------------------------------------
    // Estados para almacenar los valores de las variables de altura de la suspensión
    const [largoCoche, setLargoCoche] = useState();
    const [distanciaCentroGravedadSuelo, setDistanciaCentroGravedadSuelo] = useState();
    const [alturaSuspension, setAlturaSuspension] = useState(null);

    // Función para calcular la altura de la suspensión
    const calcularAlturaSuspension = () => {
        const alturaSuspensionCalculada = (largoCoche - distanciaCentroGravedadSuelo) / 2;
        setAlturaSuspension(alturaSuspensionCalculada);
    };
    //----------------------------------------------------------------------------------------------------
    // Estados para almacenar los valores de las variables de rigidez de la suspensión
    const [fuerzaCompresion, setFuerzaCompresion] = useState();
    const [distanciaCompresion, setDistanciaCompresion] = useState();
    const [rigidezSuspension, setRigidezSuspension] = useState(null);

    // Función para calcular la rigidez de la suspensión
    const calcularRigidezSuspension = () => {
        const rigidezSuspensionCalculada = fuerzaCompresion / distanciaCompresion;
        setRigidezSuspension(rigidezSuspensionCalculada);
    };
    //----------------------------------------------------------------------------------------------------
    // Estados para almacenar los valores de potencia
    const [potencia, setPotencia] = useState(null);
    const [parMotor, setParMotor] = useState();
    const [velocidadMotor, setVelocidadMotor] = useState();

    // Función para calcular la potencia
    const calcularPotencia = () => {
        const potenciaCalculada = (parMotor * velocidadMotor) / 745.7;
        setPotencia(potenciaCalculada);
    };
    //----------------------------------------------------------------------------------------------------
    // Estados para almacenar los valores de rendimiento térmico
    const [rendimientoTermico, setRendimientoTermico] = useState(null);
    const [trabajo, setTrabajo] = useState();
    const [energia, setEnergia] = useState();

    // Función para calcular el rendimiento térmico
    const calcularRendimientoTermico = () => {
        const rendimientoCalculado = 1 - (trabajo / energia);
        setRendimientoTermico(rendimientoCalculado * 100); // Multiplicamos por 100 para obtener el resultado en porcentaje
    };
    //----------------------------------------------------------------------------------------------------
    // Estados para almacenar los valores de la relación de transmisión
    const [dientesRuedaEntrada, setDientesRuedaEntrada] = useState();
    const [dientesRuedaSalida, setDientesRuedaSalida] = useState();
    const [relacionTransmision, setRelacionTransmision] = useState(null);

    // Función para calcular la relación de transmisión
    const calcularRelacionTransmision = () => {
        const relacionTransmisionCalculada = dientesRuedaEntrada / dientesRuedaSalida;
        setRelacionTransmision(relacionTransmisionCalculada);
    };
    //----------------------------------------------------------------------------------------------------
    // Estados para almacenar los valores de la potencia de frenado
    const [fuerzaFrenado, setFuerzaFrenado] = useState();
    const [velocidadFrenado, setVelocidadFrenado] = useState();
    const [potenciaFrenado, setPotenciaFrenado] = useState(null);

    // Función para calcular la potencia de frenado
    const calcularPotenciaFrenado = () => {
        const potenciaFrenadoCalculada = fuerzaFrenado * velocidadFrenado;
        setPotenciaFrenado(potenciaFrenadoCalculada);
    };
    //----------------------------------------------------------------------------------------------------
    // Estados para almacenar los valores de la distancia de frenado
    const [velocidadInicial, setVelocidadInicial] = useState();
    const [velocidadFrenado2, setVelocidadFrenado2] = useState();
    const [aceleracionFrenado, setAceleracionFrenado] = useState();
    const [distanciaFrenado, setDistanciaFrenado] = useState(null);

    // Función para calcular la distancia de frenado
    const calcularDistanciaFrenado = () => {
        const distanciaFrenadoCalculada = (velocidadInicial * velocidadFrenado2) / (2 * aceleracionFrenado);
        setDistanciaFrenado(distanciaFrenadoCalculada);
    };
    //----------------------------------------------------------------------------------------------------
    //Esto es para que see calculen al mismo timepo los rendimientos
    useEffect(() => {
        calcularRendimientoSinAfectacion();
        calcularRendimientoLluvia();
        calcularRendimientoCalor();
        calcularRendimientoFrio();
    })

    // Función para manejar el evento de clic en el botón de calcular
    const handleCalcularClick = () => {
    if(validationCargaAerodinamica() && validationMomentoAerodinamico() && validationDownforce()
    && validationMomentoAerodinamico2() && validationAlturaSuspension() && validationRigidezSuspension()
    && validationPotencia() && validationRendimientoTermico() && validationRelacionTransmision()
    && validationPotenciaFrenado() && validationDistanciaFrenado()){

        calcularCargaAerodinamica();
        calcularMomentoAerodinamico();
        calcularDownforce();
        calcularMomentoAerodinamico2();
        calcularAlturaSuspension();
        calcularRigidezSuspension();
        calcularPotencia();
        calcularRendimientoTermico();
        calcularRelacionTransmision();
        calcularPotenciaFrenado();
        calcularDistanciaFrenado();

        calcularRendimientoSinAfectacion();
        calcularRendimientoLluvia();
        calcularRendimientoCalor();
        calcularRendimientoFrio();

        setShowAnalytics(true);
        
        // axios.post('http://localhost:8081/simulation', {
        //     rendimientoSinAfectacion: rendimientoSinAfectacion,
        //     rendimientoLluvia: rendimientoLluvia,
        //     rendimientoCalor: rendimientoCalor,
        //     rendimientoFrio: rendimientoFrio
        //     //cargaAerodinamica: cargaAerodinamica,
        //     //falta poner los demas endpoints como momentoAerodinamico: momentoAerodinamico,
        // })
        // .then(response => {
        //     console.log(response.data); // Mensaje de éxito o error desde el servidor
        // })
        // .catch(error => {
        //     console.error("Error al enviar la solicitud al servidor:", error);
        // });
    }
    };

    // Coloca esto en el nivel superior de tu componente de función de React
useEffect(() => {
    if (rendimientoSinAfectacion !== null &&
        rendimientoSinAfectacion !== 0 &&
        rendimientoLluvia !== null &&
        rendimientoLluvia !== 0 &&
        rendimientoCalor !== null &&
        rendimientoCalor !== 0 &&
        rendimientoFrio !== null &&
        rendimientoFrio !== 0) {
      axios.post('http://localhost:8081/simulation', {
        rendimientoSinAfectacion: rendimientoSinAfectacion,
        rendimientoLluvia: rendimientoLluvia,
        rendimientoCalor: rendimientoCalor,
        rendimientoFrio: rendimientoFrio,
        cargaAerodinamica: cargaAerodinamica,
        momentoAerodinamico: momentoAerodinamico,
        downforce: downforce,
        momentoAerodinamico2: momentoAerodinamico2,
        alturaSuspension: alturaSuspension,
        rigidezSuspension: rigidezSuspension,
        potencia: potencia,
        rendimientoTermico: rendimientoTermico,
        relacionTransmision: relacionTransmision,
        potenciaFrenado: potenciaFrenado,
        distanciaFrenado: distanciaFrenado
      })
      .then(response => {
        console.log(response.data); // Mensaje de éxito o error desde el servidor
      })
      .catch(error => {
        console.error("Error al enviar la solicitud al servidor:", error);
      });
    }
  }, [rendimientoSinAfectacion, rendimientoLluvia, rendimientoCalor, rendimientoFrio, cargaAerodinamica, 
    momentoAerodinamico, downforce, momentoAerodinamico2, alturaSuspension, rigidezSuspension, potencia,
    rendimientoTermico, relacionTransmision, potenciaFrenado, distanciaFrenado]);
//----------------------------------------------------------------------------------------------------

    // Estado para almacenar la fecha actual
    const [fechaActual, setFechaActual] = useState('');

    // Función para obtener la fecha actual
    const obtenerFechaActual = () => {
        // Crear un objeto de fecha para la fecha actual
        const fecha = new Date();
        
        // Formatear la fecha en el formato deseado (por ejemplo, DD/MM/AAAA)
        const formatoFecha = `${fecha.getDate()}/${fecha.getMonth() + 1}/${fecha.getFullYear()}`;

        // Actualizar el estado con la fecha actual
        setFechaActual(formatoFecha);
    };

    // UseEffect para obtener la fecha actual al montar el componente
    useEffect(() => {
        obtenerFechaActual();
    }, []); // El segundo argumento es un array vacío para que se ejecute solo una vez al montar el componente

//----------------------------------------------------------------------------------------------------VALIDACIONES
    const validationCargaAerodinamica = () => {
        // Validaciones para Cd
    if (CdCarga === '' || isNaN(CdCarga)) {
        alert('El campo Cd no puede estar vacío.');
        return;
    } else if (CdCarga < 0 || CdCarga > 1.2) {
        alert('El valor de Cd debe ser un número entre 0 y 1.2.');
        return;
    } else if (!/^(\d*\.)?\d{1,2}$/.test(CdCarga)) {
        alert('El valor de Cd no puede tener más de dos decimales.');
        return;
    }

    // Validaciones para S
    if (SCarga === '' || isNaN(SCarga)) {
        alert('El campo S no puede estar vacío.');
        return;
    } else if (SCarga < 0.1 || SCarga > 2.0) {
        alert('El valor de S debe ser un número entre 0.1 y 2.0.');
        return;
    } else if (!/^(\d*\.)?\d{1,2}$/.test(CdCarga)) {
        alert('El valor de Cd no puede tener más de dos decimales.');
        return;
    }
    

    // Validaciones para rho
    if (rhoCarga === '' || isNaN(rhoCarga)) {
        alert('El campo ρ no puede estar vacío.');
        return;
    } else if (rhoCarga < 1.2 || rhoCarga > 1.4) {
        alert('El valor de ρ debe ser un número entre 1.2 y 1.4.');
        return;
    } else if (!/^(\d*\.)?\d{1,2}$/.test(CdCarga)) {
        alert('El valor de Cd no puede tener más de dos decimales.');
        return;
    }

    // Validaciones para V
    if (VCarga === '' || isNaN(VCarga) || VCarga % 1 !== 0) {
        alert('El campo V no puede estar vacío y debe ser un número entero.');
        return;
    } else if (VCarga < 10 || VCarga > 300) {
        alert('El valor de V debe ser un número entero entre 10 y 300.');
        return;
    }
    return true // este return es para que pase el if de arriba y lance los valores.
    }
    const validationMomentoAerodinamico = () => {
        // Validaciones para Cm
    if (CmMomento === '') {
        alert('El campo Cd no puede estar vacío.');
        return false;
    } else if (isNaN(CmMomento) || CmMomento < -1 || CmMomento > 10) {
        alert('Por favor, ingrese un valor válido para Cm (entre -1 y 10).');
        return false;
    } else if (!/^(\d*\.)?\d{1,2}$/.test(CdCarga)) {
        alert('El valor de Cd no puede tener más de dos decimales.');
        return;
    }

    // Validaciones para S
    if (SMomento === '') {
        alert('El campo S no puede estar vacío.');
        return false;
    } else if (isNaN(SMomento) || SMomento < 0.1 || SMomento > 2.0) {
        alert('Por favor, ingrese un valor válido para S (entre 0.1 y 2.0).');
        return false;
    } else if (!/^(\d*\.)?\d{1,2}$/.test(CdCarga)) {
        alert('El valor de Cd no puede tener más de dos decimales.');
        return;
    }

    // Validaciones para rho
    if (rhoMomento === '') {
        alert('El campo ρ no puede estar vacío.');
        return false;
    } else if (isNaN(rhoMomento) || rhoMomento < 1.2 || rhoMomento > 1.4) {
        alert('Por favor, ingrese un valor válido para ρ (entre 1.2 y 1.4).');
        return false;
    }

    // Validaciones para V
    if (VMomento === '') {
        alert('El campo V no puede estar vacío.');
        return false;
    } else if (isNaN(VMomento) || VMomento < 10 || VMomento > 300 || VMomento % 1 !== 0) {
        alert('Por favor, ingrese un valor válido para V (entero entre 10 y 300).');
        return false;
    }

    // Validaciones para x
    if (xMomento === '') {
        alert('El campo x no puede estar vacío.');
        return false;
    } else if (isNaN(xMomento) || xMomento < 0.5 || xMomento > 2.0) {
        alert('Por favor, ingrese un valor válido para x (entre 0.5 y 2.0).');
        return false;
    }

    // Si todas las validaciones pasan, retornar true
    return true;
    }
    const validationDownforce = () => {
        // Validaciones para ΔP
    if (deltaP === '') {
        alert('El campo ΔP no puede estar vacío.');
        return false;
    } else if (isNaN(deltaP) || deltaP < 0 || deltaP > 1000 || deltaP % 1 !== 0) {
        alert('Por favor, ingrese un valor válido para ΔP (entero entre 0 y 1000).');
        return false;
    }

    // Validaciones para S
    if (SDownforce === '') {
        alert('El campo S no puede estar vacío.');
        return false;
    } else if (isNaN(SDownforce) || SDownforce < 0.1 || SDownforce > 2.0) {
        alert('Por favor, ingrese un valor válido para S (entre 0.1 y 2.0).');
        return false;
    } else if (!/^(\d*\.)?\d{1,2}$/.test(CdCarga)) {
        alert('El valor de Cd no puede tener más de dos decimales.');
        return;
    }

    // Validaciones para ρ
    if (rhoDownforce === '') {
        alert('El campo ρ no puede estar vacío.');
        return false;
    } else if (isNaN(rhoDownforce) || rhoDownforce < 1.2 || rhoDownforce > 1.4) {
        alert('Por favor, ingrese un valor válido para ρ (entre 1.2 y 1.4).');
        return false;
    }

    // Validaciones para V
    if (VDownforce === '') {
        alert('El campo V no puede estar vacío.');
        return false;
    } else if (isNaN(VDownforce) || VDownforce < 10 || VDownforce > 300 || VDownforce % 1 !== 0) {
        alert('Por favor, ingrese un valor válido para V (entero entre 10 y 300).');
        return false;
    }

    // Si todas las validaciones pasan, retornar true
    return true;
    }
    const validationMomentoAerodinamico2 = () => {
        // Validaciones para Cm
    if (Cm === '') {
        alert('El campo Cd no puede estar vacío.');
        return false;
    } else if (isNaN(Cm) || Cm < -1 || Cm > 10) {
        alert('Por favor, ingrese un valor válido para Cm (entre -1 y 10).');
        return false;
    } else if (!/^(\d*\.)?\d{1,2}$/.test(CdCarga)) {
        alert('El valor de Cd no puede tener más de dos decimales.');
        return;
    }

    // Validaciones para S
    if (S === '') {
        alert('El campo S no puede estar vacío.');
        return false;
    } else if (isNaN(S) || S < 0.1 || S > 2.0) {
        alert('Por favor, ingrese un valor válido para S (entre 0.1 y 2.0).');
        return false;
    } else if (!/^(\d*\.)?\d{1,2}$/.test(CdCarga)) {
        alert('El valor de Cd no puede tener más de dos decimales.');
        return;
    }

    // Validaciones para rho
    if (rho === '') {
        alert('El campo ρ no puede estar vacío.');
        return false;
    } else if (isNaN(rho) || rho < 1.2 || rho > 1.4) {
        alert('Por favor, ingrese un valor válido para ρ (entre 1.2 y 1.4).');
        return false;
    } else if (!/^(\d*\.)?\d{1,2}$/.test(CdCarga)) {
        alert('El valor de Cd no puede tener más de dos decimales.');
        return;
    }

    // Validaciones para V
    if (V === '') {
        alert('El campo V no puede estar vacío.');
        return false;
    } else if (isNaN(V) || V < 10 || V > 300 || V % 1 !== 0) {
        alert('Por favor, ingrese un valor válido para V (entero entre 10 y 300).');
        return false;
    }

    // Validaciones para x
    if (x === '') {
        alert('El campo x no puede estar vacío.');
        return false;
    } else if (isNaN(x) || x < 0.5 || x > 2.0) {
        alert('Por favor, ingrese un valor válido para x (entre 0.5 y 2.0).');
        return false;
    } else if (!/^(\d*\.)?\d{1,2}$/.test(CdCarga)) {
        alert('El valor de Cd no puede tener más de dos decimales.');
        return;
    }

    // Si todas las validaciones pasan, retornar true
    return true;
    }
    const validationAlturaSuspension = () => {
        // Validaciones para Largo del coche
    if (largoCoche === '') {
        alert('El campo Largo del coche no puede estar vacío.');
        return false;
    } else if (isNaN(largoCoche) || largoCoche < 4.5 || largoCoche > 5.0) {
        alert('Por favor, ingrese un valor válido para Largo del coche (entre 4.5 y 5.0).');
        return false;
    } else if (!/^(\d*\.)?\d{1,2}$/.test(CdCarga)) {
        alert('El valor de Cd no puede tener más de dos decimales.');
        return;
    }

    // Validaciones para Distancia desde el centro de gravedad del coche al suelo
    if (distanciaCentroGravedadSuelo === '') {
        alert('El campo Distancia centro de gravedad al suelo no puede estar vacío.');
        return false;
    } else if (isNaN(distanciaCentroGravedadSuelo) || distanciaCentroGravedadSuelo < 0.25 || distanciaCentroGravedadSuelo > 0.40) {
        alert('Por favor, ingrese un valor válido para Distancia centro de gravedad al suelo (entre 0.25 y 0.40).');
        return false;
    }

    // Si todas las validaciones pasan, retornar true
    return true; 
    }
    const validationRigidezSuspension = () => {
        // Validaciones para Fuerza necesaria para comprimir la suspensión
    if (fuerzaCompresion === '') {
        alert('El campo Fuerza necesaria para comprimir la suspensión no puede estar vacío.');
        return false;
    } else if (isNaN(fuerzaCompresion) || fuerzaCompresion < 1000 || fuerzaCompresion > 10000 || !/^\d+(\.\d{1,2})?$/.test(fuerzaCompresion.toString())) {
        alert('Por favor, ingrese un valor válido para Fuerza necesaria para comprimir la suspensión (entero entre 1000 y 10000 con hasta 2 decimales).');
        return false;
    } else if (!/^(\d*\.)?\d{1,2}$/.test(CdCarga)) {
        alert('El valor de Cd no puede tener más de dos decimales.');
        return;
    }

    // Validaciones para Distancia de compresión
    if (distanciaCompresion === '') {
        alert('El campo Distancia de compresión no puede estar vacío.');
        return false;
    } else if (isNaN(distanciaCompresion) || distanciaCompresion < 5 || distanciaCompresion > 25 || !/^\d+(\.\d{1,2})?$/.test(distanciaCompresion.toString())) {
        alert('Por favor, ingrese un valor válido para Distancia de compresión (entre 5 y 25 con hasta 2 decimales).');
        return false;
    } else if (!/^(\d*\.)?\d{1,2}$/.test(CdCarga)) {
        alert('El valor de Cd no puede tener más de dos decimales.');
        return;
    }

    // Si todas las validaciones pasan, retornar true
    return true;
    }
    const validationPotencia = () => {
        // Validaciones para Par del motor
    if (parMotor === '') {
        alert('El campo Par del motor no puede estar vacío.');
        return false;
    } else if (isNaN(parMotor) || parMotor < 100 || parMotor > 1000 || !/^\d+(\.\d{1,2})?$/.test(parMotor.toString())) {
        alert('Por favor, ingrese un valor válido para Par del motor (entero entre 100 y 1000 con hasta 2 decimales).');
        return false;
    } else if (!/^(\d*\.)?\d{1,2}$/.test(CdCarga)) {
        alert('El valor de Cd no puede tener más de dos decimales.');
        return;
    }

    // Validaciones para Velocidad del motor
    if (velocidadMotor === '') {
        alert('El campo Velocidad del motor no puede estar vacío.');
        return false;
    } else if (isNaN(velocidadMotor) || velocidadMotor < 1000 || velocidadMotor > 10000 || !/^\d+(\.\d{1,2})?$/.test(velocidadMotor.toString())) {
        alert('Por favor, ingrese un valor válido para Velocidad del motor (entero entre 1000 y 10000 con hasta 2 decimales).');
        return false;
    } else if (!/^(\d*\.)?\d{1,2}$/.test(CdCarga)) {
        alert('El valor de Cd no puede tener más de dos decimales.');
        return;
    }

    // Si todas las validaciones pasan, retornar true
    return true;
    }
    const validationRendimientoTermico = () => {
        // Validaciones para Trabajo
        // Validación de que los campos no sean el mismo valor
    if (trabajo === energia) {
        alert('Los campos Trabajo y Energía no pueden tener el mismo valor.');
        return false;
    }
    if (trabajo === '') {
        alert('El campo Trabajo no puede estar vacío.');
        return false;
    } else if (isNaN(trabajo) || trabajo < 0 || trabajo % 1 !== 0) {
        alert('Por favor, ingrese un valor válido para Trabajo (entero mayor o igual a 0).');
        return false;
    }

    // Validaciones para Energía
    if (energia === '') {
        alert('El campo Energía no puede estar vacío.');
        return false;
    } else if (isNaN(energia) || energia < 0 || energia % 1 !== 0) {
        alert('Por favor, ingrese un valor válido para Energía (entero mayor o igual a 0).');
        return false;
    }

    

    // Si todas las validaciones pasan, retornar true
    return true;

    }
    const validationRelacionTransmision = () => {
        // Validaciones para Número de dientes de la rueda de entrada
    if (dientesRuedaEntrada === '') {
        alert('El campo Número de dientes de la rueda de entrada no puede estar vacío.');
        return false;
    } else if (isNaN(dientesRuedaEntrada) || dientesRuedaEntrada < 10 || dientesRuedaEntrada > 100 || !/^\d+(\.\d{1,2})?$/.test(dientesRuedaEntrada.toString())) {
        alert('Por favor, ingrese un valor válido para Número de dientes de la rueda de entrada (entero entre 10 y 100 con hasta 2 decimales).');
        return false;
    } else if (!/^(\d*\.)?\d{1,2}$/.test(CdCarga)) {
        alert('El valor de Cd no puede tener más de dos decimales.');
        return;
    }

    // Validaciones para Número de dientes de la rueda de salida
    if (dientesRuedaSalida === '') {
        alert('El campo Número de dientes de la rueda de salida no puede estar vacío.');
        return false;
    } else if (isNaN(dientesRuedaSalida) || dientesRuedaSalida < 10 || dientesRuedaSalida > 100 || !/^\d+(\.\d{1,2})?$/.test(dientesRuedaSalida.toString())) {
        alert('Por favor, ingrese un valor válido para Número de dientes de la rueda de salida (entero entre 10 y 100 con hasta 2 decimales).');
        return false;
    } else if (!/^(\d*\.)?\d{1,2}$/.test(CdCarga)) {
        alert('El valor de Cd no puede tener más de dos decimales.');
        return;
    }

    // Si todas las validaciones pasan, retornar true
    return true;
    }
    const validationPotenciaFrenado = () => {
        // Validaciones para Fuerza de frenado
    if (fuerzaFrenado === '') {
        alert('El campo Fuerza de frenado no puede estar vacío.');
        return false;
    } else if (isNaN(fuerzaFrenado) || fuerzaFrenado < 100 || fuerzaFrenado > 10000 || !/^\d+(\.\d{1,2})?$/.test(fuerzaFrenado.toString())) {
        alert('Por favor, ingrese un valor válido para Fuerza de frenado (entero entre 100 y 10000 con hasta 2 decimales).');
        return false;
    } else if (!/^(\d*\.)?\d{1,2}$/.test(CdCarga)) {
        alert('El valor de Cd no puede tener más de dos decimales.');
        return;
    }

    // Validaciones para Velocidad de frenado
    if (velocidadFrenado === '') {
        alert('El campo Velocidad de frenado no puede estar vacío.');
        return false;
    } else if (isNaN(velocidadFrenado) || velocidadFrenado < 1 || velocidadFrenado > 30 || !/^\d+(\.\d{1,2})?$/.test(velocidadFrenado.toString())) {
        alert('Por favor, ingrese un valor válido para Velocidad de frenado (entero entre 1 y 30 con hasta 2 decimales).');
        return false;
    } else if (!/^(\d*\.)?\d{1,2}$/.test(CdCarga)) {
        alert('El valor de Cd no puede tener más de dos decimales.');
        return;
    }

    // Si todas las validaciones pasan, retornar true
    return true;
    }
    const validationDistanciaFrenado = () => {
        // Validaciones para Velocidad inicial
    if (velocidadInicial === '') {
        alert('El campo Velocidad inicial no puede estar vacío.');
        return false;
    } else if (isNaN(velocidadInicial) || velocidadInicial < 10 || velocidadInicial > 30 || !/^\d+(\.\d{1,2})?$/.test(velocidadInicial.toString())) {
        alert('Por favor, ingrese un valor válido para Velocidad inicial (entero entre 10 y 30 con hasta 2 decimales).');
        return false;
    } else if (!/^(\d*\.)?\d{1,2}$/.test(CdCarga)) {
        alert('El valor de Cd no puede tener más de dos decimales.');
        return;
    }

    // Validaciones para Velocidad de frenado
    if (velocidadFrenado2 === '') {
        alert('El campo Velocidad de frenado no puede estar vacío.');
        return false;
    } else if (isNaN(velocidadFrenado2) || velocidadFrenado2 < 1 || velocidadFrenado2 > 10 || !/^\d+(\.\d{1,2})?$/.test(velocidadFrenado2.toString())) {
        alert('Por favor, ingrese un valor válido para Velocidad de frenado (entero entre 1 y 10 con hasta 2 decimales).');
        return false;
    } else if (!/^(\d*\.)?\d{1,2}$/.test(CdCarga)) {
        alert('El valor de Cd no puede tener más de dos decimales.');
        return;
    }

    // Validaciones para Aceleración de frenado
    if (aceleracionFrenado === '') {
        alert('El campo Aceleración de frenado no puede estar vacío.');
        return false;
    } else if (isNaN(aceleracionFrenado) || aceleracionFrenado < 2 || aceleracionFrenado > 10 || !/^\d+(\.\d{1,2})?$/.test(aceleracionFrenado.toString())) {
        alert('Por favor, ingrese un valor válido para Aceleración de frenado (entero entre 2 y 10 con hasta 2 decimales).');
        return false;
    } else if (!/^(\d*\.)?\d{1,2}$/.test(CdCarga)) {
        alert('El valor de Cd no puede tener más de dos decimales.');
        return;
    }

    // Si todas las validaciones pasan, retornar true
    return true;
    }
    

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }    
    
//----------------------------------------------------------------------------------------------------
    return (
        <div>
            <Navigation />
            <div class="main-container">
                <div class="simulation-container">
                    <h1 class="title">Simulación de Monoplaza</h1>
                    <h2 class="subtitle">Fecha Actual: {fechaActual}</h2>
                </div>
                <div class="weather-container">
                    <div class="weather-config">
                        <h4 class="section-title">Configuración del Clima</h4>
                        {/* <!-- Recuadros para el clima --> */}
                        {/* <!-- Recuadro para el clima de Lluvia --> */}
                        <div class="weather-box">
                            <p class="label" htmlFor="temperaturaLluvia">Temperatura en Lluvia (°C):</p>
                            <input
                                type="number"
                                id="temperaturaLluvia"
                                value={temperaturaLluvia}
                                onChange={(event) => handleCambioTemperatura(event, 'Lluvia')}
                                class="input-field"
                            />
                            <span class="temperature-range">{`(${temperaturaMinima['Lluvia']}°C - ${temperaturaMaxima['Lluvia']}°C)`}</span>
                        </div>
                        {/* <!-- Recuadro para el clima de Calor --> */}
                        <div class="weather-box">
                            <p class="label" htmlFor="temperaturaCalor">Temperatura en Calor (°C):</p>
                            <input
                                type="number"
                                id="temperaturaCalor"
                                value={temperaturaCalor}
                                onChange={(event) => handleCambioTemperatura(event, 'Calor')}
                                class="input-field"
                            />
                            <span class="temperature-range">{`(${temperaturaMinima['Calor']}°C - ${temperaturaMaxima['Calor']}°C)`}</span>
                        </div>
                        {/* <!-- Recuadro para el clima de Frío --> */}
                        <div class="weather-box">
                            <p class="label" htmlFor="temperaturaFrio">Temperatura en Frío (°C):</p>
                            <input
                                type="number"
                                id="temperaturaFrio"
                                value={temperaturaFrio}
                                onChange={(event) => handleCambioTemperatura(event, 'Frío')}
                                class="input-field"
                            />
                            <span class="temperature-range">{`(${temperaturaMinima['Frío']}°C - ${temperaturaMaxima['Frío']}°C)`}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="aerodynamics-container">
                <h1 class="aerodynamics-title">Aerodinámica</h1>
                <div></div>
                <h2 class="aerodynamics-subtitle">Alerón delantero y Alerón trasero</h2>
                <div></div>
                <h4 class="aerodynamics-section-title">Carga aerodinámica</h4>
                <p class="aerodynamics-description">Carga aerodinámica (N) = (Cd * S * 1/2 * ρ * V<sup>2</sup>)</p>
                {/* <!-- Inputs para ingresar los valores de las variables de carga aerodinámica --> */}
                <div class="aerodynamics-input">
                    <label for="CdCarga">Cd:</label>
                    <input
                        type="number"
                        step="0.01"
                        id="CdCarga"
                        value={CdCarga}
                        onChange={(e) => setCdCarga(parseFloat(e.target.value))}
                        class="input-field2"
                        placeholder='(0 - 1.2) y 2 decimales'
                    />
                </div>
                <div class="aerodynamics-input">
                    <label for="SCarga">S:</label>
                    <input
                        type="number"
                        step="0.01"
                        id="SCarga"
                        value={SCarga}
                        onChange={(e) => setSCarga(parseFloat(e.target.value))}
                        class="input-field2"
                        placeholder='(0.1 - 2.0) y 2 decimales'
                    />
                </div>
                <div class="aerodynamics-input">
                    <label for="rhoCarga">ρ:</label>
                    <input
                        type="number"
                        step="0.01"
                        id="rhoCarga"
                        value={rhoCarga}
                        onChange={(e) => setRhoCarga(parseFloat(e.target.value))}
                        class="input-field2"
                        placeholder='(1.2 - 1.4) y 2 decimales'
                    />
                </div>
                <div class="aerodynamics-input">
                    <label for="VCarga">V:</label>
                    <input
                        type="number"
                        step="1"
                        id="VCarga"
                        value={VCarga}
                        onChange={(e) => setVCarga(parseInt(e.target.value))}
                        class="input-field2"
                        placeholder='(10 - 300)'
                    />
                    <span></span>
                </div>
                {/* <!-- Mostrar el resultado del cálculo de la carga aerodinámica --> */}
                {cargaAerodinamica !== null && <p class="aerodynamics-result">Carga aerodinámica: {cargaAerodinamica} N</p>}
            </div>
            {/*---------------------------------------------------------------------------------------------------------------------*/}

            <div class="moment-container">
                <h4 class="moment-title">Momento Aerodinámico</h4>
                <p class="moment-description">Momento aerodinámico (N*m) = (Cm * S * 1/2 * ρ * V<sup>2</sup> * x)</p>
                {/* <!-- Inputs para ingresar los valores de las variables de momento aerodinámico --> */}
                <div class="moment-input">
                    <label for="CdMomento">Cm:</label>
                    <input
                        type="number"
                        id="CdMomento"
                        value={CmMomento}
                        onChange={(e) => setCmMomento(parseFloat(e.target.value))}
                        class="input-field2"
                        placeholder='(-1 - 10) y 2 decimales'
                    />
                </div>
                <div class="moment-input">
                    <label for="SMomento">S:</label>
                    <input
                        type="number"
                        id="SMomento"
                        value={SMomento}
                        onChange={(e) => setSMomento(parseFloat(e.target.value))}
                        class="input-field2"
                        placeholder='(0.1 - 2.0) y 2 decimales'
                    />
                </div>
                <div class="moment-input">
                    <label for="rhoMomento">ρ:</label>
                    <input
                        type="number"
                        id="rhoMomento"
                        value={rhoMomento}
                        onChange={(e) => setRhoMomento(parseFloat(e.target.value))}
                        class="input-field2"
                        placeholder='(1.2 - 1.4)'
                    />
                </div>
                <div class="moment-input">
                    <label for="VMomento">V:</label>
                    <input
                        type="number"
                        id="VMomento"
                        value={VMomento}
                        onChange={(e) => setVMomento(parseFloat(e.target.value))}
                        class="input-field2"
                        placeholder='(10 - 300)'
                    />
                </div>
                <div class="moment-input">
                    <label for="XMomento">x:</label>
                    <input
                        type="number"
                        id="XMomento"
                        value={xMomento}
                        onChange={(e) => setXMomento(parseFloat(e.target.value))}
                        class="input-field2"
                        placeholder='(0.5 - 2.0) y 2 decimales'
                    />
                </div>
                {/* <!-- Mostrar el resultado del cálculo del momento aerodinámico --> */}
                {momentoAerodinamico !== null && <p class="moment-result">Momento aerodinámico: {momentoAerodinamico} N*m</p>}
            </div>
            {/*---------------------------------------------------------------------------------------------------------------------*/}

            <div class="difusor-container">
                <h2 class="difusor-title">Difusor</h2>
                <h4 class="downforce-section-title">Downforce</h4>
                <p class="downforce-description">Downforce (N) = (ΔP * S * ρ * V<sup>2</sup>)</p>
                {/* <!-- Inputs para ingresar los valores de las variables de downforce --> */}
                <div class="downforce-input">
                    <label for="deltaP">ΔP:</label>
                    <input
                        type="number"
                        id="deltaP"
                        value={deltaP}
                        onChange={(e) => setDeltaP(parseFloat(e.target.value))}
                        class="input-field2"
                        placeholder='(0 - 1000)'
                    />
                </div>
                <div class="downforce-input">
                    <label for="SDownforce">S:</label>
                    <input
                        type="number"
                        id="SDownforce"
                        value={SDownforce}
                        onChange={(e) => setSDownforce(parseFloat(e.target.value))}
                        class="input-field2"
                        placeholder='(0.1 - 2.0) y 2 decimales'
                    />
                </div>
                <div class="downforce-input">
                    <label for="rhoDownforce">ρ:</label>
                    <input
                        type="number"
                        id="rhoDownforce"
                        value={rhoDownforce}
                        onChange={(e) => setRhoDownforce(parseFloat(e.target.value))}
                        class="input-field2"
                        placeholder='(1.2 - 1.4)'
                    />
                </div>
                <div class="downforce-input">
                    <label for="VDownforce">V:</label>
                    <input
                        type="number"
                        id="VDownforce"
                        value={VDownforce}
                        onChange={(e) => setVDownforce(parseFloat(e.target.value))}
                        class="input-field2"
                        placeholder='(10 - 300)'
                    />
                </div>
                {/* <!-- Mostrar el resultado del cálculo del downforce --> */}
                {downforce !== null && <p class="downforce-result">Downforce: {downforce} N</p>}
            </div>
            {/*---------------------------------------------------------------------------------------------------------------------*/}

            <div class="momento-container">
                <h4 class="momento-title">Momento Aerodinámico</h4>
                <p class="momento-description">Momento aerodinámico (N*m) = (Cm * S * 1/2 * ρ * V<sup>2</sup> * x)</p>
                {/* <!-- Inputs para ingresar los valores de las variables del segundo momento aerodinámico --> */}
                <div class="momento-input">
                    <label for="Cm">Cm:</label>
                    <input
                        type="number"
                        id="Cm"
                        value={Cm}
                        onChange={(e) => setCm(parseFloat(e.target.value))}
                        class="input-field2"
                        placeholder='(-1 - 10) y 2 decimales'
                    />
                </div>
                <div class="momento-input">
                    <label for="S">S:</label>
                    <input
                        type="number"
                        id="S"
                        value={S}
                        onChange={(e) => setS(parseFloat(e.target.value))}
                        class="input-field2"
                        placeholder='(0.1 - 2.0) y 2 decimales'
                    />
                </div>
                <div class="momento-input">
                    <label for="rho">ρ:</label>
                    <input
                        type="number"
                        id="rho"
                        value={rho}
                        onChange={(e) => setRho(parseFloat(e.target.value))}
                        class="input-field2"
                        placeholder='(1.2 - 1.4) y 2 decimales'
                    />
                </div>
                <div class="momento-input">
                    <label for="V">V:</label>
                    <input
                        type="number"
                        id="V"
                        value={V}
                        onChange={(e) => setV(parseFloat(e.target.value))}
                        class="input-field2"
                        placeholder='(10 - 300)'
                    />
                </div>
                <div class="momento-input">
                    <label for="x">x:</label>
                    <input
                        type="number"
                        id="x"
                        value={x}
                        onChange={(e) => setX(parseFloat(e.target.value))}
                        class="input-field2"
                        placeholder='(0.5 - 2.0) y 2 decimales'
                    />
                </div>
                {/* <!-- Mostrar el resultado del cálculo del segundo momento aerodinámico --> */}
                {momentoAerodinamico2 !== null && <p class="momento-result">Segundo Momento aerodinámico: {momentoAerodinamico2} N*m</p>}
            </div>

            {/*---------------------------------------------------------------------------------------------------------------------*/}

            <div class="suspension-container">
                <h1 class="suspension-title">Suspensión</h1>
                <h2 class="pull-road-subtitle">Pull Road</h2>
                <h4 class="suspension-section-title">Altura de la suspensión</h4>
                <p class="suspension-description">Altura de la suspensión (m) = (Largo del coche - Distancia desde el centro de gravedad del coche al suelo) / 2</p>
                {/* <!-- Inputs para ingresar los valores de las variables de altura de la suspensión --> */}
                <div class="suspension-input">
                    <label for="largoCoche">Largo del coche (m):</label>
                    <input
                        type="number"
                        id="largoCoche"
                        value={largoCoche}
                        onChange={(e) => setLargoCoche(parseFloat(e.target.value))}
                        class="input-field2"
                        placeholder='(4.5 - 5.0) y 2 decimales'
                    />
                </div>
                <div class="suspension-input">
                    <label for="distanciaCentroGravedadSuelo">Distancia centro de gravedad al suelo (m):</label>
                    <input
                        type="number"
                        id="distanciaCentroGravedadSuelo"
                        value={distanciaCentroGravedadSuelo}
                        onChange={(e) => setDistanciaCentroGravedadSuelo(parseFloat(e.target.value))}
                        class="input-field2"
                        placeholder='(0.25 - 0.40)'
                    />
                </div>
                {/* <!-- Mostrar el resultado del cálculo de la altura de la suspensión --> */}
                {alturaSuspension !== null && <p class="suspension-result">Altura de la suspensión: {alturaSuspension} m</p>}
            </div>
            {/*---------------------------------------------------------------------------------------------------------------------*/}

            <div class="rigidez-suspension-container">
                <h4 class="rigidez-suspension-title">Rigidez de la suspensión</h4>
                <p class="rigidez-suspension-description">Rigidez de la suspensión (N*m) = (Fuerza necesaria para comprimir la suspensión) / (Distancia de compresión)</p>
                <div class="rigidez-suspension-input">
                    <label for="fuerzaCompresion">Fuerza necesaria para comprimir la suspensión (N):</label>
                    <input
                        type="number"
                        id="fuerzaCompresion"
                        value={fuerzaCompresion}
                        onChange={(e) => setFuerzaCompresion(parseFloat(e.target.value))}
                        class="input-field2"
                        placeholder='(1000 - 10000) y 2 decimales'
                    />
                </div>
                <div class="rigidez-suspension-input">
                    <label for="distanciaCompresion">Distancia de compresión (mm):</label>
                    <input
                        type="number"
                        id="distanciaCompresion"
                        value={distanciaCompresion}
                        onChange={(e) => setDistanciaCompresion(parseFloat(e.target.value))}
                        class="input-field2"
                        placeholder='(5 - 25) y 2 decimales'
                    />
                </div>
                {/* <!-- Mostrar el resultado del cálculo de la rigidez de la suspensión --> */}
                {rigidezSuspension !== null && <p class="rigidez-suspension-result">Rigidez de la suspensión: {rigidezSuspension} N*m</p>}
            </div>
            {/*---------------------------------------------------------------------------------------------------------------------*/}

            <div class="motor-container">
                <h1 class="motor-title">Motor</h1>
                <h4 class="motor-section-title">Potencia</h4>
                <p class="motor-description">Potencia (CV) = (Par) * (Velocidad) / (745,7)</p>
                {/* <!-- Inputs para ingresar los valores de par y velocidad del motor --> */}
                <div class="motor-input">
                    <label for="parMotor">Par del motor (Nm):</label>
                    <input
                        type="number"
                        id="parMotor"
                        value={parMotor}
                        onChange={(e) => setParMotor(parseFloat(e.target.value))}
                        class="input-field2"
                        placeholder='(100 - 1000) y 2 decimales'
                    />
                </div>
                <div class="motor-input">
                    <label for="velocidadMotor">Velocidad del motor (rpm):</label>
                    <input
                        type="number"
                        id="velocidadMotor"
                        value={velocidadMotor}
                        onChange={(e) => setVelocidadMotor(parseFloat(e.target.value))}
                        class="input-field2"
                        placeholder='(1000 - 10000) y 2 decimales'
                    />
                </div>
                {/* <!-- Mostrar el resultado del cálculo de la potencia --> */}
                {potencia !== null && <p class="motor-result">Potencia: {potencia} CV</p>}
            </div>
            {/*---------------------------------------------------------------------------------------------------------------------*/}

            <div class="rendimiento-termico-container">
                <h4 class="rendimiento-termico-title">Rendimiento térmico</h4>
                <p class="rendimiento-termico-description">Rendimiento térmico (%) = (1 - Trabajo) / (Energía)</p>
                {/* <!-- Inputs para ingresar los valores de trabajo y energía --> */}
                <div class="rendimiento-termico-input">
                    <label for="trabajo">Trabajo (J):</label>
                    <input
                        type="number"
                        id="trabajo"
                        value={trabajo}
                        onChange={(e) => setTrabajo(parseFloat(e.target.value))}
                        class="input-field2"
                        placeholder='(1 - ∞)'
                    />
                </div>
                <div class="rendimiento-termico-input">
                    <label for="energia">Energía (J):</label>
                    <input
                        type="number"
                        id="energia"
                        value={energia}
                        onChange={(e) => setEnergia(parseFloat(e.target.value))}
                        class="input-field2"
                        placeholder='(1 - ∞)'
                    />
                </div>
                {/* <!-- Mostrar el resultado del cálculo del rendimiento térmico --> */}
                {rendimientoTermico !== null && <p class="rendimiento-termico-result">Rendimiento térmico: {rendimientoTermico.toFixed(2)}%</p>}
            </div>
            {/*---------------------------------------------------------------------------------------------------------------------*/}

            <div class="transmision-container">
                <h1 class="transmision-title">Transmisión</h1>
                <h4 class="transmision-section-title">Relación de transmisión</h4>
                <p class="transmision-description">Relación de transmisión = (Número de dientes de la rueda de entrada) / (Número de dientes de la rueda de salida)</p>
                {/* <!-- Inputs para ingresar los valores de los dientes de las ruedas de entrada y salida --> */}
                <div class="transmision-input">
                    <label for="dientesRuedaEntrada">Número de dientes de la rueda de entrada:</label>
                    <input
                        type="number"
                        id="dientesRuedaEntrada"
                        value={dientesRuedaEntrada}
                        onChange={(e) => setDientesRuedaEntrada(parseFloat(e.target.value))}
                        class="input-field2"
                        placeholder='(10 - 100) y 2 decimales'
                    />
                </div>
                <div class="transmision-input">
                    <label for="dientesRuedaSalida">Número de dientes de la rueda de salida:</label>
                    <input
                        type="number"
                        id="dientesRuedaSalida"
                        value={dientesRuedaSalida}
                        onChange={(e) => setDientesRuedaSalida(parseFloat(e.target.value))}
                        class="input-field2"
                        placeholder='(10 - 100) y 2 decimales'
                    />
                </div>
                {/* <!-- Mostrar el resultado de la relación de transmisión --> */}
                {relacionTransmision !== null && <p class="transmision-result">Relación de transmisión: {relacionTransmision}</p>}
            </div>
            {/*---------------------------------------------------------------------------------------------------------------------*/}

            <div class="frenos-container">
                <h1 class="frenos-title">Frenos</h1>
                <h4 class="frenos-section-title">Potencia de frenado</h4>
                <p class="frenos-description">Potencia de frenado (W) = (Fuerza de frenado) * (Velocidad de frenado)</p>
                {/* <!-- Inputs para ingresar los valores de la fuerza y velocidad de frenado --> */}
                <div class="frenos-input">
                    <label for="fuerzaFrenado">Fuerza de frenado (N):</label>
                    <input
                        type="number"
                        id="fuerzaFrenado"
                        value={fuerzaFrenado}
                        onChange={(e) => setFuerzaFrenado(parseFloat(e.target.value))}
                        class="input-field2"
                        placeholder='(1000 - 10000) y 2 decimales'
                    />

                </div>
                <div class="frenos-input">
                    <label for="velocidadFrenado">Velocidad de frenado (m/s):</label>
                    <input
                        type="number"
                        id="velocidadFrenado"
                        value={velocidadFrenado}
                        onChange={(e) => setVelocidadFrenado(parseFloat(e.target.value))}
                        class="input-field2"
                        placeholder='(1 - 30) y 2 decimales'
                    />
                </div>
                {/* <!-- Mostrar el resultado de la potencia de frenado --> */}
                {potenciaFrenado !== null && <p class="frenos-result">Potencia de frenado: {potenciaFrenado} W</p>}
            </div>
            {/*---------------------------------------------------------------------------------------------------------------------*/}

            <div class="distancia-frenado-container">
                <h4 class="distancia-frenado-section-title">Distancia de frenado</h4>
                <p class="distancia-frenado-description">Distancia de frenado (m) = (Velocidad inicial) * (Velocidad de frenado) / (2 * Aceleración de frenado)</p>
                {/* <!-- Inputs para ingresar los valores de la velocidad inicial y la aceleración de frenado --> */}
                <div class="distancia-frenado-input">
                    <label for="velocidadInicial">Velocidad inicial (m/s):</label>
                    <input
                        type="number"
                        id="velocidadInicial"
                        value={velocidadInicial}
                        onChange={(e) => setVelocidadInicial(parseFloat(e.target.value))}
                        class="input-field2"
                        placeholder='(10 - 30) y 2 decimales'
                    />
                </div>
                <div class="distancia-frenado-input">
                    <label for="aceleracionFrenado">Aceleración de frenado (m/s²):</label>
                    <input
                        type="number"
                        id="aceleracionFrenado"
                        value={aceleracionFrenado}
                        onChange={(e) => setAceleracionFrenado(parseFloat(e.target.value))}
                        class="input-field2"
                        placeholder='(2 - 10) y 2 decimales'
                    />
                </div>
                <div class="distancia-frenado-input">
                    <label for="velocidadFrenado">Velocidad de frenado (m/s):</label>
                    <input
                        type="number"
                        id="velocidadFrenado"
                        value={velocidadFrenado2}
                        onChange={(e) => setVelocidadFrenado2(parseFloat(e.target.value))}
                        class="input-field2"
                        placeholder='(1 - 10) y 2 decimales'
                    />
                </div>
                {/* <!-- Mostrar el resultado de la distancia de frenado --> */}
                {distanciaFrenado !== null && <p class="distancia-frenado-result">Distancia de frenado: {distanciaFrenado} m</p>}
            </div>

            {showAnalytics && (
            <Analytics
            cargaAerodinamica={cargaAerodinamica}
            momentoAerodinamico={momentoAerodinamico}
            downforce={downforce}
            momentoAerodinamico2={momentoAerodinamico2}
            alturaSuspension={alturaSuspension}
            rigidezSuspension={rigidezSuspension}
            potencia={potencia}
            rendimientoTermico={rendimientoTermico}
            relacionTransmision={relacionTransmision}
            potenciaFrenado={potenciaFrenado}
            distanciaFrenado={distanciaFrenado}
            rendimientoSinAfectacion={rendimientoSinAfectacion}
            rendimientoLluvia={rendimientoLluvia}
            rendimientoCalor={rendimientoCalor}
            rendimientoFrio={rendimientoFrio}
            onClose={handleCloseAnalytics}
            />
        )}
            <div style={{ textAlign: 'center', marginTop: '20px', marginBottom: '20px' }}>
                <button onClick={handleCalcularClick} style={{ padding: '15px 30px', fontSize: '18px', background: '#ffc906', color: 'black', border: 'none', borderRadius: '5px', fontWeight: 'bold'}}>Calcular</button>
            </div>
            <button onClick={scrollToTop} style={{ position: 'fixed', bottom: '20px', right: '20px', padding: '10px 20px', fontSize: '16px', background: '#ffc906', color: 'black', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>Ir Arriba</button>
        </div>
    );
}

export default Simulation;
