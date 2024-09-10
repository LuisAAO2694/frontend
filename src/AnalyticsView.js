import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { PieChart, Pie, ResponsiveContainer } from 'recharts';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,} from 'recharts';
import html2pdf from 'html2pdf.js';
import './AnalyticsView.css';
import { Navigation } from './Navigation';


function AnalyticsView(){

  const [simulaciones, setSimulaciones] = useState([]);
  const [selectedSimulacion, setSelectedSimulacion] = useState(null);
 
  //Este es para las graficas: son los hooks
  const [dataCargaAerodinamica, setDataCargaAerodinamica] = useState([]);
  const [dataMomentoAerodinamico, setDataMomentoAerodinamico] = useState([]);
  const [downforceData, setDownforceData] = useState([]);
  const [momentoAerodinamico2Data, setMomentoAerodinamico2Data] = useState([]);
  const [alturaSuspensionData, setAlturaSuspensionData] = useState([]);
  const [rigidezSuspensionData, setRigidezSuspensionData] = useState([]);
  //--
  const [scatterDataPotencia, setScatterDataPotencia] = useState([]);
  const [scatterDataRendimientoT, setScatterDataRendimientoT] = useState([]);
  const [scatterDataPotenciaFrenado, setScatterDataPotenciaFrenado] = useState([]);
  const [scatterDataDistanciaFrenado, setScatterDataDistanciaFrenado] = useState([]);
  //--
  const [RelacionTransmicionData, setRelacionTransmicionData] = useState([]);

  useEffect(() => {
    // Realizar la solicitud GET al servidor para obtener los datos de la tabla de simulación
    axios.get('http://localhost:8081/simulacionVista')
      .then(response => {
        setSimulaciones(response.data);
      })
      .catch(error => {
        console.error("Error al obtener datos de simulaciones:", error);
      });
  }, []);

  const handleSimulacionSelect = (e) => {
    const simulacionId = e.target.value;
    const selected = simulaciones.find(simulacion => simulacion.id === parseInt(simulacionId));
    setSelectedSimulacion(selected);
  };
  

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

//Use´sEffect de graficas----------------------------------------------------------------------------------
//-Carga Aerodinamica--------------------------------------------------------------------------------------
  useEffect(() => {
    if (selectedSimulacion) {
      // Filtrar las simulaciones pasadas excluyendo la simulación seleccionada actualmente
      const index = simulaciones.findIndex(simulacion => simulacion.id === selectedSimulacion.id);
      // Tomar las últimas 4 simulaciones pasadas
      const simulacionesOrdenadas = [];
      for (let i = 0; i < 5; i++) {
        const newIndex = (index - i + simulaciones.length) % simulaciones.length;
        simulacionesOrdenadas.push(simulaciones[newIndex]);
      }
      // Obtener la carga aerodinámica de la simulación seleccionada
      // Obtener las fechas de las simulaciones ordenadas
      const fechas = simulacionesOrdenadas.map(simulacion => new Date(simulacion.fecha).toLocaleDateString());
      // Crear los datos para el gráfico utilizando las fechas
      const chartData = fechas.map((fecha, index) => ({ name: fecha, carga_A: simulacionesOrdenadas[index].carga_A }));
      setDataCargaAerodinamica(chartData);
    }
  }, [selectedSimulacion, simulaciones]);
//-Momento Aerodinamico-------------------------------------------------------------------------------------
  useEffect(() => {
    if (selectedSimulacion) {
      const index = simulaciones.findIndex(simulacion => simulacion.id === selectedSimulacion.id);
      const simulacionesOrdenadas = [];
      for (let i = 0; i < 5; i++) {
        const newIndex = (index - i + simulaciones.length) % simulaciones.length;
        simulacionesOrdenadas.push(simulaciones[newIndex]);
      }
      const fechas = simulacionesOrdenadas.map(simulacion => new Date(simulacion.fecha).toLocaleDateString());
      const chartData = fechas.map((fecha, index) => ({ name: fecha, momento_A: simulacionesOrdenadas[index].momento_A }));
      setDataMomentoAerodinamico(chartData);
    }
  }, [selectedSimulacion, simulaciones]);
//-Downforce-------------------------------------------------------------------------------------
  useEffect(() => {
    if (selectedSimulacion) {
      const index = simulaciones.findIndex(simulacion => simulacion.id === selectedSimulacion.id);
      const simulacionesOrdenadas = [];
      for (let i = 0; i < 5; i++) {
        const newIndex = (index - i + simulaciones.length) % simulaciones.length;
        simulacionesOrdenadas.push(simulaciones[newIndex]);
      }
      const fechas = simulacionesOrdenadas.map(simulacion => new Date(simulacion.fecha).toLocaleDateString());
      const chartData = fechas.map((fecha, index) => ({ name: fecha, downforce: simulacionesOrdenadas[index].downforce }));
      setDownforceData(chartData);
    }
  }, [selectedSimulacion, simulaciones]);
//-Momento Aerodinamico 2-------------------------------------------------------------------------
  useEffect(() => {
    if (selectedSimulacion) {
      const index = simulaciones.findIndex(simulacion => simulacion.id === selectedSimulacion.id);
      const simulacionesOrdenadas = [];
      for (let i = 0; i < 5; i++) {
        const newIndex = (index - i + simulaciones.length) % simulaciones.length;
        simulacionesOrdenadas.push(simulaciones[newIndex]);
      }
      const fechas = simulacionesOrdenadas.map(simulacion => new Date(simulacion.fecha).toLocaleDateString());
      const chartData = fechas.map((fecha, index) => ({ name: fecha, momento_A2: simulacionesOrdenadas[index].momento_A2 }));
      setMomentoAerodinamico2Data(chartData);
    }
  }, [selectedSimulacion, simulaciones]);
//-Altura de la suspension-------------------------------------------------------------------------
  useEffect(() => {
    if (selectedSimulacion) {
      const index = simulaciones.findIndex(simulacion => simulacion.id === selectedSimulacion.id);
      const simulacionesOrdenadas = [];
      for (let i = 0; i < 5; i++) {
        const newIndex = (index - i + simulaciones.length) % simulaciones.length;
        simulacionesOrdenadas.push(simulaciones[newIndex]);
      }
      const fechas = simulacionesOrdenadas.map(simulacion => new Date(simulacion.fecha).toLocaleDateString());
      const chartData = fechas.map((fecha, index) => ({ name: fecha, altura_S: simulacionesOrdenadas[index].altura_S }));
      setAlturaSuspensionData(chartData);
    }
  }, [selectedSimulacion, simulaciones]);
//-Rigidez de la suspension-------------------------------------------------------------------------
  useEffect(() => {
    if (selectedSimulacion) {
      const index = simulaciones.findIndex(simulacion => simulacion.id === selectedSimulacion.id);
      const simulacionesOrdenadas = [];
      for (let i = 0; i < 5; i++) {
        const newIndex = (index - i + simulaciones.length) % simulaciones.length;
        simulacionesOrdenadas.push(simulaciones[newIndex]);
      }
      const fechas = simulacionesOrdenadas.map(simulacion => new Date(simulacion.fecha).toLocaleDateString());
      const chartData = fechas.map((fecha, index) => ({ name: fecha, rigidez_S: simulacionesOrdenadas[index].rigidez_S }));
      setRigidezSuspensionData(chartData);
    }
  }, [selectedSimulacion, simulaciones]);
//-Potencia-------------------------------------------------------------------------
  useEffect(() => {
    if (selectedSimulacion) {
      const index = simulaciones.findIndex(simulacion => simulacion.id === selectedSimulacion.id);
      const simulacionesOrdenadas = [];
      for (let i = 0; i < 5; i++) {
        const newIndex = (index - i + simulaciones.length) % simulaciones.length;
        simulacionesOrdenadas.push(simulaciones[newIndex]);
      }
    const fechas = simulacionesOrdenadas.map(simulacion => new Date(simulacion.fecha).toLocaleDateString());
    const potenciaData = fechas.map((fecha, i) => ({
      name: fecha,
      value: simulacionesOrdenadas[i].potencia
    }));
    setScatterDataPotencia(potenciaData);
    }
  }, [selectedSimulacion, simulaciones]);
//-Rendimiento Termico-------------------------------------------------------------------------
  useEffect(() => {
    if (selectedSimulacion) {
      const index = simulaciones.findIndex(simulacion => simulacion.id === selectedSimulacion.id);
      const simulacionesOrdenadas = [];
      for (let i = 0; i < 5; i++) {
        const newIndex = (index - i + simulaciones.length) % simulaciones.length;
        simulacionesOrdenadas.push(simulaciones[newIndex]);
      }
      const fechas = simulacionesOrdenadas.map(simulacion => new Date(simulacion.fecha).toLocaleDateString());
      const rendimientoTData = fechas.map((fecha, i) => ({
        name: fecha,
        value: simulacionesOrdenadas[i].rendimiento_T
      }));
      setScatterDataRendimientoT(rendimientoTData);
    }
  }, [selectedSimulacion, simulaciones]);
//-Potencia de Frenado-------------------------------------------------------------------------
  useEffect(() => {
    if (selectedSimulacion) {
      const index = simulaciones.findIndex(simulacion => simulacion.id === selectedSimulacion.id);
      const simulacionesOrdenadas = [];
      for (let i = 0; i < 5; i++) {
        const newIndex = (index - i + simulaciones.length) % simulaciones.length;
        simulacionesOrdenadas.push(simulaciones[newIndex]);
      }
      const fechas = simulacionesOrdenadas.map(simulacion => new Date(simulacion.fecha).toLocaleDateString());
      const potenciaFrenadoData = fechas.map((fecha, i) => ({
        name: fecha,
        value: simulacionesOrdenadas[i].potencia_F
      }));
      setScatterDataPotenciaFrenado(potenciaFrenadoData);
    }
  }, [selectedSimulacion, simulaciones]);
//-Distancia de Frenado-------------------------------------------------------------------------
  useEffect(() => {
    if (selectedSimulacion) {
      const index = simulaciones.findIndex(simulacion => simulacion.id === selectedSimulacion.id);
      const simulacionesOrdenadas = [];
      for (let i = 0; i < 5; i++) {
        const newIndex = (index - i + simulaciones.length) % simulaciones.length;
        simulacionesOrdenadas.push(simulaciones[newIndex]);
      }
      const fechas = simulacionesOrdenadas.map(simulacion => new Date(simulacion.fecha).toLocaleDateString());
      const distanciaFrenadoData = fechas.map((fecha, i) => ({
        name: fecha,
        value: simulacionesOrdenadas[i].distancia_F
      }));
      setScatterDataDistanciaFrenado(distanciaFrenadoData);
    }
  }, [selectedSimulacion, simulaciones]);
//-Relacion de transmicion-------------------------------------------------------------------------
useEffect(() => {
  if (selectedSimulacion) {
    const index = simulaciones.findIndex(simulacion => simulacion.id === selectedSimulacion.id);
    const simulacionesOrdenadas = [];
    for (let i = 0; i < 5; i++) {
      const newIndex = (index - i + simulaciones.length) % simulaciones.length;
      simulacionesOrdenadas.push(simulaciones[newIndex]);
    }
    const relacionTData = simulacionesOrdenadas.map((simulacion, i) => ({
      subject: `${i + 1} - ${new Date(simulacion.fecha).toLocaleDateString()}`,
      value: simulacion.relacion_T
    }));
    setRelacionTransmicionData(relacionTData);
  }
}, [selectedSimulacion, simulaciones]);
//--------------------------------------------------------------------------------------------------
//-PDF----------------------------------------------------------------------------------------------  
const applyStylesForPDF = () => {
  // Obtener los elementos que necesitan estilos específicos para el PDF
  const elements = document.querySelectorAll('#page-content [style]');

  // Aplicar estilos específicos para el PDF
  elements.forEach((element, index) => {
    // Agregar estilo para cambiar el color del texto a negro
    element.style.color = 'black';

    // Después de un cierto tiempo, cambiar el color del texto a blanco
    setTimeout(() => {
      element.style.color = 'white';
    }, (index + 1) * 10); // Cambia el color del texto a blanco después de 10 milisegundos, aumentando gradualmente el tiempo para cada elemento
  });

  // Seleccionar y cambiar el color de los elementos de los ejes X e Y
  const axisElements = document.querySelectorAll('#page-content .recharts-cartesian-axis-tick text');
  axisElements.forEach((element, index) => {
    // Agregar estilo para cambiar el color del texto a negro
    element.style.fill = 'black';

    // Después de un cierto tiempo, cambiar el color del texto a blanco
    setTimeout(() => {
      element.style.fill = 'white';
    }, (index + elements.length + 1) * 10); // Cambia el color del texto a blanco después de 10 milisegundos, aumentando gradualmente el tiempo para cada elemento
  });
};
const generatePDF = () => {
  // Ocultar el contenido que no quieres que aparezca en el PDF
  const hiddenContent = document.getElementById('encuesta-content');
  hiddenContent.style.display = 'none';
  const hiddenContent2 = document.getElementById('verificacion-fia');
  hiddenContent2.style.display = 'none';
  const hiddenContent3 = document.getElementById('estrategias');
  hiddenContent3.style.display = 'none';
  const hiddenContent4 = document.getElementById('recomendaciones');
  hiddenContent4.style.display = 'none';
  const hiddenContent11 = document.getElementById('porcentaje-content');
  hiddenContent11.style.display = 'none';
  

  //Titulos
  const hiddenContent5 = document.getElementById('encuesta-content-titulo');
  hiddenContent5.style.display = 'none';
  const hiddenContent6 = document.getElementById('verificacion-fia-titulo');
  hiddenContent6.style.display = 'none';
  const hiddenContent7 = document.getElementById('estrategias-titulo');
  hiddenContent7.style.display = 'none';
  const hiddenContent8 = document.getElementById('recomendaciones-titulo');
  hiddenContent8.style.display = 'none';
  const hiddenContent9 = document.getElementById('graficas-titulo');
  hiddenContent9.style.display = 'none';
  const hiddenContent10 = document.getElementById('botones-graficas');
  hiddenContent10.style.display = 'none';
  
  

  // Obtener el botón de descarga del PDF
  const downloadButton = document.getElementById('download-button');
  const bitacoraButton = document.getElementById('bitacora-button');
  const encuestaButton = document.getElementById('encuesta-button');
  const irArribaButton = document.getElementById('irArriba');
  // Guardar el color original del texto del botón
  const originalColor = downloadButton.style.color;
  const originalColor2 = bitacoraButton.style.color;
  const originalColor3 = encuestaButton.style.color;
  const originalColor4 = irArribaButton.style.color;

  // Ocultar el botón de descarga del PDF
  downloadButton.style.display = 'hidden';
  bitacoraButton.style.display  = 'hidden';

  const opt = {
    margin: 1,
    filename: 'analytics-report.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
  };

  // Aplicar estilos específicos para el PDF
  applyStylesForPDF();

  const element = document.getElementById('page-content');
  html2pdf().from(element).set(opt).save()
    .then(() => {
      // Mostrar nuevamente el botón de descarga del PDF después de que se complete la generación
      downloadButton.style.display = 'visible';
      bitacoraButton.style.display = 'visible';
      hiddenContent.style.display  = 'block';
      hiddenContent2.style.display = 'block';
      hiddenContent3.style.display = 'block';
      hiddenContent4.style.display = 'block';
      hiddenContent5.style.display = 'block';
      hiddenContent6.style.display = 'block';
      hiddenContent7.style.display = 'block';
      hiddenContent8.style.display = 'block';
      hiddenContent9.style.display = 'block';
      hiddenContent10.style.display = 'block';
      hiddenContent11.style.display = 'block';

      // Restaurar el color original del texto del botón
      downloadButton.style.color = originalColor;
      bitacoraButton.style.color = originalColor2;
      encuestaButton.style.color = originalColor3;
      irArribaButton.style.color = originalColor4;

    });
};
//--------------------------------------------------------------------------------------------------
//-InsertarBitacora-------------------------------------------------------------------------------------------------
const [showAlert2, setShowAlert2] = useState(false);
const insertarEnBitacora = () => {
  if (selectedSimulacion) {
    // Formatear los datos de la simulación
    const titulo = `Simulación: ${new Date(selectedSimulacion.fecha).toLocaleDateString()}`;
    const informacion = `Rendimiento sin afectación: ${selectedSimulacion.rendimiento}\n
      Rendimiento en lluvia: ${selectedSimulacion.rendimiento_Lluvia}\n
      Rendimiento en calor: ${selectedSimulacion.rendimiento_Calor}\n
      Rendimiento en frío: ${selectedSimulacion.rendimiento_Frio}\n
      Carga Aerodinámica: ${selectedSimulacion.carga_A} N\n
      Momento aerodinámico: ${selectedSimulacion.momento_A} N*m\n
      Downforce: ${selectedSimulacion.downforce} N\n
      Momento aerodinámico 2: ${selectedSimulacion.momento_A2} N*m\n
      Altura de la Suspensión: ${selectedSimulacion.altura_S} m\n
      Rigidez de la Suspensión: ${selectedSimulacion.rigidez_S} N*m\n
      Potencia: ${selectedSimulacion.potencia} CV\n
      Rendimiento Térmico: ${selectedSimulacion.rendimiento_T} %\n
      Relación de transmisión: ${selectedSimulacion.relacion_T}\n
      Potencia de frenado: ${selectedSimulacion.potencia_F} W\n
      Distancia de frenado: ${selectedSimulacion.distancia_F} m`;

    // Enviar los datos a la bitácora en el servidor
    axios.post('http://localhost:8081/crearnota', { titulo, informacion })
      .then(response => {
        console.log('Datos insertados en la bitácora:', response.data);
        // Aquí puedes manejar cualquier acción adicional después de la inserción
      })
      .catch(error => {
        console.error('Error al insertar en la bitácora:', error);
      });
  }
  setShowAlert2(true);
    setTimeout(() => {
      setShowAlert2(false);
    }, 3000); // Ocultar la alerta después de 3 segundos 
};
//--------------------------------------------------------------------------------------------------
//-Encuesta-----------------------------------------------------------------------------------------
const [respuestas, setRespuestas] = useState({
  aerodinamica1: '',
  aerodinamica2: '',
  aerodinamica3: '',
  aerodinamica4: '',
  difusor1: '',
  difusor2: '',
  suspension1: '',
  suspension2: '',
  motor1: '',
  motor2: '',
  transmision1: '',
  transmision2: '',
  frenos1: '',
  frenos2: '',
  clima1: '',
  clima2: '',
  comportcoche1: '',
  comportcoche2: '',
});

const [showAlert, setShowAlert] = useState(false);

const handleRespuestaChange = (pregunta, valor) => {
  setRespuestas({ ...respuestas, [pregunta]: valor });
};

const handleGuardarClick = () => {
  // Verificar si se ha seleccionado alguna opción en todas las preguntas
  if (
      respuestas.aerodinamica1 === '' ||
      respuestas.aerodinamica2 === '' ||
      respuestas.aerodinamica3 === '' ||
      respuestas.aerodinamica4 === '' ||
      respuestas.difusor1 === '' ||
      respuestas.difusor2 === '' ||
      respuestas.suspension1 === '' ||
      respuestas.suspension2 === '' ||
      respuestas.motor1 === '' ||
      respuestas.motor2 === '' ||
      respuestas.transmision1 === '' ||
      respuestas.transmision2 === '' ||
      respuestas.frenos1 === '' ||
      respuestas.frenos2 === '' ||
      respuestas.clima1 === '' ||
      respuestas.clima2 === '' ||
      respuestas.comportcoche1 === '' ||
      respuestas.comportcoche2 === ''
  ) {
      // Mostrar una alerta indicando que se deben completar todas las respuestas
      alert('Por favor, completa todas las preguntas antes de guardar la encuesta.');
  } else {
      // Calcular puntaje total
      const puntajeTotal = calcularPuntajeTotal(respuestas);

      // Enviar datos al backend
      axios.post('http://localhost:8081/guardarEncuesta', { respuestas, puntajeTotal})
          .then(response => {
              console.log('Datos de la encuesta guardados:', response.data);
              // Aquí puedes manejar cualquier acción adicional después de guardar los datos
          })
          .catch(error => {
              console.error('Error al guardar datos de la encuesta:', error);
          });

      setShowAlert(true);
      setTimeout(() => {
          setShowAlert(false);
      }, 3000); // Ocultar la alerta después de 3 segundos
  }
};


const calcularPuntajeTotal = (respuestas) => {
  let puntajeTotal = 0;
  for (const pregunta in respuestas) {
    if (respuestas[pregunta] !== '') {
      puntajeTotal += parseInt(respuestas[pregunta]);
    }
  }
  return puntajeTotal;
};
//--------------------------------------------------------------------------------------------------
//-Parametros de la FIA-------------------------------------------------------------------------------------------------
// Función para verificar si un valor está dentro de los rangos establecidos por la FIA
const dentroDeRangosFIA = (valor, maximo) => {
  return valor < maximo; // Cambiado para marcar como dentro del rango si es menor
};

// Función para renderizar el mensaje junto al parámetro según si está dentro de los rangos de la FIA
const renderizarMensaje = (parametro, valor, maximo, unidad) => {
  if (dentroDeRangosFIA(valor, maximo)) {
    return <p style={{ color: 'white' }}>{parametro}: {valor} {unidad} - ✓ Dentro de los rangos de la FIA</p>;
  } else {
    return <p style={{ color: 'red', fontWeight: 'bold' }}>{parametro}: {valor} {unidad} - ✗ Fuera de los rangos de la FIA</p>;
  }
};
//--------------------------------------------------------------------------------------------------
//-Estrategias-------------------------------------------------------------------------------------------------
// Función para determinar si un valor está dentro de un rango dado
const dentroDeRango = (valor, minimo, maximo) => {
  return valor >= minimo && valor <= maximo;
};

// Función para determinar la estrategia recomendada
const determinarEstrategia = (simulacion) => {
  const valores = {
    carga_A: simulacion.carga_A,
    momento_A: simulacion.momento_A,
    altura_S: simulacion.altura_S,
    rigidez_S: simulacion.rigidez_S,
    potencia: simulacion.potencia,
    rendimiento_T: simulacion.rendimiento_T,
    relacion_T: simulacion.relacion_T,
    potencia_F: simulacion.potencia_F,
    distancia_F: simulacion.distancia_F
  };

  const agresiva = {
    carga_A: [800, Infinity],
    momento_A: [600, Infinity],
    altura_S: [-Infinity, 50],
    rigidez_S: [500, Infinity],
    potencia: [800, Infinity],
    rendimiento_T: [70, 85],
    relacion_T: [5, Infinity],
    potencia_F: [800, Infinity],
    distancia_F: [-Infinity, 30]
  };

  const conservadora = {
    carga_A: [600, 800],
    momento_A: [400, 600],
    altura_S: [50, 70],
    rigidez_S: [300, 500],
    potencia: [600, 800],
    rendimiento_T: [80, Infinity],
    relacion_T: [4, 5],
    potencia_F: [600, 800],
    distancia_F: [30, 40]
  };

  const undercut = {
    carga_A: [-Infinity, 600],
    momento_A: [-Infinity, 400],
    altura_S: [-Infinity, 50],
    rigidez_S: [500, Infinity],
    potencia: [800, Infinity],
    rendimiento_T: [70, 85],
    relacion_T: [-Infinity, 4],
    potencia_F: [600, 800],
    distancia_F: [-Infinity, 30]
  };

  const contarCoincidencias = (valores, estrategia) => {
    let coincidencias = 0;
    for (const parametro in valores) {
      const valor = valores[parametro];
      const [min, max] = estrategia[parametro];
      if (dentroDeRango(valor, min, max)) {
        coincidencias++;
      }
    }
    return coincidencias;
  };

  const coincidenciasAgresiva = contarCoincidencias(valores, agresiva);
  const coincidenciasConservadora = contarCoincidencias(valores, conservadora);
  const coincidenciasUndercut = contarCoincidencias(valores, undercut);

  const maxCoincidencias = Math.max(coincidenciasAgresiva, coincidenciasConservadora, coincidenciasUndercut);

  if (maxCoincidencias === coincidenciasAgresiva) {
    return {
      estrategia: "Estrategia Agresiva",
      objetivo: "Maximizar el rendimiento del coche en las curvas y la velocidad máxima.",
      descripcion: "Esta estrategia busca obtener el máximo potencial del coche en términos de velocidad y agarre en las curvas. Se recomienda para usuarios experimentados que buscan batir récords o competir en carreras de alta velocidad."
    };
  } else if (maxCoincidencias === coincidenciasConservadora) {
    return {
      estrategia: "Estrategia Conservadora",
      objetivo: "Maximizar la estabilidad del coche y la eficiencia del combustible.",
      descripcion: "Esta estrategia busca priorizar la seguridad y la eficiencia del coche sobre la velocidad y el rendimiento. Se recomienda para usuarios principiantes o para carreras de larga distancia donde la gestión del combustible es importante."
    };
  } else if (maxCoincidencias === coincidenciasUndercut) {
    return {
      estrategia: "Estrategia Undercut",
      objetivo: "Maximizar la velocidad en las rectas y adelantar a los rivales.",
      descripcion: "Esta estrategia busca aprovechar la potencia del motor y la aerodinámica para adelantar a los rivales en las rectas. Se recomienda para usuarios que buscan realizar adelantamientos y mejorar su posición en la carrera."
    };
  } else {
    return {
      estrategia: "No se pudo determinar una estrategia adecuada",
      objetivo: "",
      descripcion: ""
    };
  }
};

// Luego de definir las funciones, podemos integrarlas en tu código existente
// Agregamos la siguiente línea dentro del componente donde se muestra la simulación seleccionada
const estrategiaRecomendada = selectedSimulacion ? determinarEstrategia(selectedSimulacion) : null;
//--------------------------------------------------------------------------------------------------
//-Recomendaciones-------------------------------------------------------------------------------------------------
// // Definición de estados utilizando useState
// const [historicalData, setHistoricalData] = useState([]); // Almacena los datos históricos de la simulación
// const [recommendations, setRecommendations] = useState([]); // Almacena las recomendaciones generadas
// // eslint-disable-next-line
// const [showRecommendations, setShowRecommendations] = useState(false); // Controla la visibilidad de las recomendaciones


// //Y este de aqui es para que salga asi siin usar el boton
// useEffect(() => {
//   // Fetch historical data from the database
//   fetchHistoricalData();
// }, [selectedSimulacion]); // Agrega selectedSimulacion a la lista de dependencias

// useEffect(() => {
//   // Generate recommendations when historical data or selected simulation changes
//   if (historicalData.length > 0 && selectedSimulacion !== null) {
//     generateRecommendations();
//     setShowRecommendations(true);
//   }// eslint-disable-next-line
// }, [historicalData, selectedSimulacion]); // Agrega historicalData y selectedSimulacion a la lista de dependencias


// // Función asíncrona para obtener los datos históricos de la base de datos
// const fetchHistoricalData = async () => {
//   try {
//     // Realiza una solicitud GET para obtener los datos históricos utilizando axios
//     const response = await axios.get('http://localhost:8081/historicosSimulacion');
//     setHistoricalData(response.data); // Almacena los datos históricos en el estado
//   } catch (error) {
//     console.error('Error fetching historical data:', error); // Muestra un mensaje de error en caso de falla
//   }
// }; 
// // Función para generar las recomendaciones
// const generateRecommendations = () => {
//   const newRecommendations = []; // Crea un nuevo array para almacenar las recomendaciones
//   // Itera sobre los parámetros de simulación para generar recomendaciones para cada uno
//   for (const param of [
//     'carga_A',
//     'momento_A',
//     'downforce',
//     'momento_A2',
//     'altura_S',
//     'rigidez_S',
//     'potencia',
//     'rendimiento_T',
//     'relacion_T',
//     'potencia_F',
//     'distancia_F',
//   ]) {
//     // Genera una recomendación para el parámetro actual y la agrega al array de recomendaciones
//     const recommendation = generateRecommendationForParameter(param, selectedSimulacion, historicalData);
//     newRecommendations.push(recommendation);
//   }
//   // Actualiza el estado de las recomendaciones con el nuevo array generado
//   setRecommendations(newRecommendations);
// };
// // eslint-disable-next-line
// const handleGenerateRecommendations = () => {
//   generateRecommendations();
//   setShowRecommendations(true); // Muestra las recomendaciones cuando se generan
// };
// //ME QUEDE AQUI-----------------
// const generateRecommendationForParameter = (param, simulationData, historicalData) => {
//   console.log(`Generando recomendación para el parámetro ${param}`);
//   const { simulationValue, historicalData: paramHistoricalData } = getDataForParameter(param, simulationData, historicalData);

//   // RQNF82: Compare parameters with 10% similarity threshold
//   const similarRecords = paramHistoricalData.filter((record) =>
//     isSimilar(record[param], simulationValue, 10)
//   );
//   console.log(`Registros similares (umbral inicial 10%): ${JSON.stringify(similarRecords)}`);

//   // RQNF83: Select up to 10 most similar records
//   let selectedRecords = reduceSimularityThreshold(simulationValue, paramHistoricalData, param);

//   // Comprobar si se encontraron registros similares
//   if (selectedRecords && selectedRecords.length > 0) {
//     // Si hay registros similares, continuar con el procesamiento
//     if (selectedRecords.length === 2) {
//       selectedRecords = [getClosestRecord(simulationValue, selectedRecords, param)];
//       console.log(`Registro más cercano después de aplicar suma de diferencias: ${JSON.stringify(selectedRecords)}`);
//     }

//     // Generar recomendación y texto
//     let recommendedValue, recommendationText;
//     let confidence = 0;
//     recommendedValue = selectedRecords[0][param];
//     if (recommendedValue === simulationValue) {
//       recommendedValue = 'N/A';
//       recommendationText = 'Los parámetros indican que no se requiere ninguna recomendación adicional.';
//     } else {
//       recommendationText = generateRecommendationText(
//         param,
//         simulationValue,
//         recommendedValue,
//         historicalData
//       );
//     }
//     // Calcular el porcentaje de confianza
//     confidence = (similarRecords.length / historicalData.length) * 100;

//     return {
//       parameter: param,
//       calculatedValue: simulationValue,
//       recommendedValue,
//       recommendationText,
//       confidence,
//     };
//   } else {
//     // Si no hay registros similares, devolver valores predeterminados
//     const recommendedValue = 'N/A';
//     const recommendationText = 'Los parámetros indican que no se requiere ninguna recomendación adicional.';
//     const confidence = 0;
//     return {
//       parameter: param,
//       calculatedValue: simulationValue,
//       recommendedValue,
//       recommendationText,
//       confidence,
//     };
//   }
// };


// const reduceSimularityThreshold = (simulationValue, paramHistoricalData, param) => {
//   let similarityThreshold = 0.1;
//   console.log(`Umbral de similitud inicial: ${similarityThreshold}`);
//   const filterSimilarRecords = (record) =>
//     isSimilar(record[param], simulationValue, similarityThreshold);

//   let selectedRecords = paramHistoricalData.filter(filterSimilarRecords);
//   console.log(`Registros similares con umbral inicial: ${JSON.stringify(selectedRecords)}`);

//   // Agrupar registros por fecha
//   let recordsByDate = groupByDate(selectedRecords); // Declarar como let

//   while (Object.keys(recordsByDate).length > 1) {
//     similarityThreshold *= 0.5;
//     console.log(`Nuevo umbral de similitud: ${similarityThreshold}`);
//     selectedRecords = paramHistoricalData.filter(filterSimilarRecords);
//     recordsByDate = groupByDate(selectedRecords); // Ahora se puede reasignar
//     console.log(`Registros similares con nuevo umbral: ${JSON.stringify(Object.values(recordsByDate))}`);
//   }

//   // Obtener el conjunto de registros de la fecha restante
//   const selectedDate = Object.keys(recordsByDate)[0];
//   const selectedRecordsWithSameDate = recordsByDate[selectedDate];

//   return selectedRecordsWithSameDate;
// };

// // Función auxiliar para agrupar registros por fecha
// const groupByDate = (records) => {
//   return records.reduce((acc, record) => {
//     const date = record.fecha_Sim;
//     if (!acc[date]) {
//       acc[date] = [];
//     }
//     acc[date].push(record);
//     return acc;
//   }, {});
// };

//   const isSimilar = (value1, value2, threshold) => {
//     return Math.abs(value1 - value2) / value1 <= threshold;
//   };

//   const getClosestRecord = (value, records, param) => {
//     return records.reduce((closest, record) =>
//       Math.abs(record[param] - value) < Math.abs(closest[param] - value)
//         ? record
//         : closest
//     );
//   };

//   const getDataForParameter = (param, simulationData, historicalData) => {
//     const simulationValue = simulationData[param];
//     const paramHistoricalData = historicalData.map((record) => ({
//       ...record,
//       [param]: record[param],
//     }));
//     return { simulationValue, historicalData: paramHistoricalData };
//   };

//   const generateRecommendationText = (param, calculatedValue, recommendedValue, historicalData) => {
//     const isLow = calculatedValue < recommendedValue;
//     const historicalRecord = historicalData.find(record => record[param] === recommendedValue);
//     const formattedDate = formatDate(historicalRecord.fecha_Sim);
  
//     let paramName;
//     let unit;
//     switch (param) {
//       case 'carga_A':
//         paramName = 'La carga aerodinámica';
//         unit = 'N';
//         break;
//       case 'momento_A':
//         paramName = 'El momento aerodinámico';
//         unit = 'N*m';
//         break;
//       case 'downforce':
//         paramName = 'El downforce';
//         unit = 'N';
//         break;
//       case 'momento_A2':
//         paramName = 'El momento aerodinámico 2';
//         unit = 'N*m';
//         break;
//       case 'altura_S':
//         paramName = 'La altura de la suspensión';
//         unit = 'metros';
//         break;
//       case 'rigidez_S':
//         paramName = 'La rigidez de la suspensión';
//         unit = 'N*m';
//         break;
//       case 'potencia':
//         paramName = 'La potencia';
//         unit = 'CV';
//         break;
//       case 'rendimiento_T':
//         paramName = 'El rendimiento térmico';
//         unit = '%';
//         break;
//       case 'relacion_T':
//         paramName = 'La relación de transmisión';
//         unit = '';
//         break;
//       case 'potencia_F':
//         paramName = 'La potencia de frenado';
//         unit = 'W';
//         break;
//       case 'distancia_F':
//         paramName = 'La distancia de frenado';
//         unit = 'm';
//         break;
//       default:
//         paramName = param;
//         unit = '';
//     }
  
//     return `${paramName} que se calculó ${calculatedValue} ${unit} es un poco ${isLow ? 'baja' : 'alta'} para la carrera. Revisando el histórico se encontró que en ${formattedDate} se usó una ${paramName} más ${isLow ? 'alta' : 'baja'} (${recommendedValue} ${unit}) en circunstancias similares. Con una ${paramName} de ${recommendedValue} ${unit}, el coche tendrá un mejor rendimiento y aumentarán las posibilidades de ganar la carrera.`;
//   };

//   const getParameterName = (param) => {
//     switch (param) {
//       case 'carga_A':
//         return 'Carga aerodinámica';
//       case 'momento_A':
//         return 'Momento aerodinámico';
//       case 'downforce':
//         return 'Downforce';
//       case 'momento_A2':
//         return 'Momento aerodinámico 2';
//       case 'altura_S':
//         return 'Altura de la suspensión';
//       case 'rigidez_S':
//         return 'Rigidez de la suspensión';
//       case 'potencia':
//         return 'Potencia';
//       case 'rendimiento_T':
//         return 'Rendimiento térmico';
//       case 'relacion_T':
//         return 'Relación de transmisión';
//       case 'potencia_F':
//         return 'Potencia de frenado';
//       case 'distancia_F':
//         return 'Distancia de frenado';
//       default:
//         return param;
//     }
//   };
  
//   const getParameterUnit = (param) => {
//     switch (param) {
//       case 'carga_A':
//         return 'CV';
//       case 'momento_A':
//         return 'N*m';
//       case 'downforce':
//         return 'N';
//       case 'momento_A2':
//         return 'N*m';
//       case 'altura_S':
//         return 'metros';
//       case 'rigidez_S':
//         return 'N*m';
//       case 'potencia':
//         return 'CV';
//       case 'rendimiento_T':
//         return '%';
//       case 'relacion_T':
//         return '';
//       case 'potencia_F':
//         return 'W';
//       case 'distancia_F':
//         return 'm';
//       default:
//         return '';
//     }
//   };
  
//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     const day = date.getDate();
//     const month = date.getMonth() + 1;
//     const year = date.getFullYear();
//     return `${day}/${month}/${year}`;
//   };

//   function scrollToTop() {
//     window.scrollTo({
//         top: 0,
//         behavior: 'smooth'
//     });

// Definición de estados utilizando useState
const [historicalData, setHistoricalData] = useState([]); // Almacena los datos históricos de la simulación
const [recommendations, setRecommendations] = useState([]); // Almacena las recomendaciones generadas
// eslint-disable-next-line
const [showRecommendations, setShowRecommendations] = useState(false); // Controla la visibilidad de las recomendaciones


//Y este de aqui es para que salga asi siin usar el boton
useEffect(() => {
  // Fetch historical data from the database
  fetchHistoricalData();
}, [selectedSimulacion]); // Agrega selectedSimulacion a la lista de dependencias

useEffect(() => {
  // Generate recommendations when historical data or selected simulation changes
  if (historicalData.length > 0 && selectedSimulacion !== null) {
    generateRecommendations();
    setShowRecommendations(true);
  }// eslint-disable-next-line
}, [historicalData, selectedSimulacion]); // Agrega historicalData y selectedSimulacion a la lista de dependencias


// Función asíncrona para obtener los datos históricos de la base de datos
const fetchHistoricalData = async () => {
  try {
    // Realiza una solicitud GET para obtener los datos históricos utilizando axios
    const response = await axios.get('http://localhost:8081/historicosSimulacion');
    setHistoricalData(response.data); // Almacena los datos históricos en el estado
  } catch (error) {
    console.error('Error fetching historical data:', error); // Muestra un mensaje de error en caso de falla
  }
}; 
// Función para generar las recomendaciones
// const generateRecommendations = () => {
//   const newRecommendations = []; // Crea un nuevo array para almacenar las recomendaciones
//   // Itera sobre los parámetros de simulación para generar recomendaciones para cada uno
//   for (const param of [
//     'carga_A',
//     'momento_A',
//     'downforce',
//     'momento_A2',
//     'altura_S',
//     'rigidez_S',
//     'potencia',
//     'rendimiento_T',
//     'relacion_T',
//     'potencia_F',
//     'distancia_F',
//   ]) {
//     // Genera una recomendación para el parámetro actual y la agrega al array de recomendaciones
//     const recommendation = generateRecommendationForParameter(param, selectedSimulacion, historicalData);
//     newRecommendations.push(recommendation);
//   }
//   // Actualiza el estado de las recomendaciones con el nuevo array generado
//   setRecommendations(newRecommendations);
// };
const generateRecommendations = () => {
  const newRecommendations = []; // Crea un nuevo array para almacenar las recomendaciones
  let selectedDate = null; // Inicialmente, no hay fecha seleccionada

  // Itera sobre los parámetros de simulación para generar recomendaciones para cada uno
  for (const param of [
    'carga_A',
    'momento_A',
    'downforce',
    'momento_A2',
    'altura_S',
    'rigidez_S',
    'potencia',
    'rendimiento_T',
    'relacion_T',
    'potencia_F',
    'distancia_F',
  ]) {
    // Genera una recomendación para el parámetro actual y la agrega al array de recomendaciones
    const recommendation = generateRecommendationForParameter(param, selectedSimulacion, historicalData);
    
    // Si aún no se ha seleccionado una fecha y la recomendación tiene una fecha válida, selecciona esa fecha
    if (!selectedDate && recommendation.recommendedValue !== 'N/A') {
      const historicalRecord = historicalData.find(record => record[param] === recommendation.recommendedValue);
      selectedDate = historicalRecord.fecha_Sim;
    }

    // Agrega la recomendación al array, ajustando el texto si es necesario
    const adjustedRecommendation = adjustRecommendationText(recommendation, selectedDate);
    newRecommendations.push(adjustedRecommendation);
  }

  // Actualiza el estado de las recomendaciones con el nuevo array generado
  setRecommendations(newRecommendations);
};

const adjustRecommendationText = (recommendation, selectedDate) => {
  if (recommendation.recommendedValue === 'N/A') {
    return recommendation;
  }

  const historicalRecord = historicalData.find(record => record[recommendation.parameter] === recommendation.recommendedValue);

  if (historicalRecord.fecha_Sim === selectedDate) {
    return recommendation;
  }

  const formattedDate = formatDate(selectedDate);
  const isLow = recommendation.calculatedValue < recommendation.recommendedValue;
  const paramName = getParameterName(recommendation.parameter);
  const unit = getParameterUnit(recommendation.parameter);

  const adjustedRecommendationText = `${paramName} que se calculó ${recommendation.calculatedValue} ${unit} es un poco ${isLow ? 'baja' : 'alta'} para la carrera. Revisando el histórico se encontró que en ${formattedDate} se usó una ${paramName} más ${isLow ? 'alta' : 'baja'} (${recommendation.recommendedValue} ${unit}) en circunstancias similares. Con una ${paramName} de ${recommendation.recommendedValue} ${unit}, el coche tendrá un mejor rendimiento y aumentarán las posibilidades de ganar la carrera.`;

  return {
    ...recommendation,
    recommendationText: adjustedRecommendationText,
  };
};
// eslint-disable-next-line
const handleGenerateRecommendations = () => {
  generateRecommendations();
  setShowRecommendations(true); // Muestra las recomendaciones cuando se generan
};
//ME QUEDE AQUI-----------------
const generateRecommendationForParameter = (param, simulationData, historicalData) => {
  console.log(`Generando recomendación para el parámetro ${param}`);
  const { simulationValue, historicalData: paramHistoricalData } = getDataForParameter(param, simulationData, historicalData);

  // RQNF82: Compare parameters with 10% similarity threshold
  const similarRecords = paramHistoricalData.filter((record) =>
    isSimilar(record[param], simulationValue, 10)
  );
  console.log(`Registros similares (umbral inicial 10%): ${JSON.stringify(similarRecords)}`);

  const closestRecord = getClosestRecord(simulationValue, paramHistoricalData, param);
  
  // Si no hay registros similares, devuelve un valor recomendado "N/A"
  if (similarRecords.length === 0) {
    return {
      parameter: param,
      calculatedValue: simulationValue,
      recommendedValue: closestRecord[param],
      recommendationText: 'No hay suficientes datos históricos similares para generar una recomendación.',
      confidence: 0,
    };
  }

  // RQNF83: Select up to 10 most similar records
  let selectedRecords = similarRecords.slice(0, 10);
  console.log(`Selección de hasta 10 registros más similares: ${JSON.stringify(selectedRecords)}`);

  // RQNF84: Reduce similarity threshold if there are multiple matches
  selectedRecords = reduceSimularityThreshold(simulationValue, paramHistoricalData, param);
  console.log(`Registros después de reducir el umbral de similitud: ${JSON.stringify(selectedRecords)}`);

  // If there are still multiple records, apply sum of differences
  if (selectedRecords.length === 2) {
    selectedRecords = [getClosestRecord(simulationValue, selectedRecords, param)];
    console.log(`Registro más cercano después de aplicar suma de diferencias: ${JSON.stringify(selectedRecords)}`);
  }

  // Generate the recommendation text
  let recommendedValue, recommendationText;
  let confidence = 0; 
  if (selectedRecords.length > 0) {
    recommendedValue = selectedRecords[0][param];
    if (recommendedValue === simulationValue) {
      recommendedValue = 'N/A';
      recommendationText = 'Los parámetros indican que no se requiere ninguna recomendación adicional.';
    } else {
      recommendationText = generateRecommendationText(
        param,
        simulationValue,
        recommendedValue,
        historicalData
      );
    }
    // Calculate the confidence percentage
    confidence = (similarRecords.length / historicalData.length) * 100;
  } else {
    recommendedValue = 'N/A';
    recommendationText = 'Los parámetros indican que no se requiere ninguna recomendación adicional.';
    confidence = 0;
  }

  return {
    parameter: param,
    calculatedValue: simulationValue,
    recommendedValue,
    recommendationText,
    confidence,
  };
};


// const reduceSimularityThreshold = (simulationValue, paramHistoricalData, param) => {
//   let similarityThreshold = 0.1;
//   console.log(`Umbral de similitud inicial: ${similarityThreshold}`);
//   const filterSimilarRecords = (record) =>
//     isSimilar(record[param], simulationValue, similarityThreshold);

//   let selectedRecords = paramHistoricalData.filter(filterSimilarRecords);
//   console.log(`Registros similares con umbral inicial: ${JSON.stringify(selectedRecords)}`);

//   while (selectedRecords.length > 1) {
//     similarityThreshold *= 0.5;
//     console.log(`Nuevo umbral de similitud: ${similarityThreshold}`);
//     selectedRecords = paramHistoricalData.filter(filterSimilarRecords);
//     console.log(`Registros similares con nuevo umbral: ${JSON.stringify(selectedRecords)}`);
//   }

//   return selectedRecords;
// };

// Función para reducir el umbral de similitud y encontrar registros similares
const reduceSimularityThreshold = (simulationValue, paramHistoricalData, param) => {
  // Función para comparar registros y ordenarlos en función de la diferencia absoluta entre el valor del parámetro y el valor de la simulación
  const compareRecords = (a, b) => {
    const aDiff = Math.abs(a[param] - simulationValue); // Diferencia absoluta entre el valor del parámetro 'a' y el valor de la simulación
    const bDiff = Math.abs(b[param] - simulationValue); // Diferencia absoluta entre el valor del parámetro 'b' y el valor de la simulación
    return aDiff - bDiff; // Devuelve la diferencia entre 'a' y 'b' para ordenar los registros
  };

  console.log(`[${param}] Iniciando búsqueda de registros similares con umbral de similitud inicial de 0.1`);

  // Ordena los registros históricos por similitud utilizando la función de comparación definida anteriormente
  const sortedRecords = paramHistoricalData.slice().sort(compareRecords);
  console.log(`[${param}] Registros ordenados por similitud con umbral inicial:`, sortedRecords);

  // Comprueba si se encontraron registros similares
  if (sortedRecords.length > 0) {
    const closestRecord = sortedRecords[0]; // Toma el registro más similar (el primero después de ordenar)
    console.log(`[${param}] Registro más similar encontrado:`, closestRecord);
    return [closestRecord]; // Devuelve el registro más similar encontrado
  } else {
    console.log(`[${param}] No se encontraron registros similares`);
    return []; // Devuelve un array vacío si no se encontraron registros similares
  }
};


  const isSimilar = (value1, value2, threshold) => {
    return Math.abs(value1 - value2) / value1 <= threshold;
  };

  const getClosestRecord = (value, records, param) => {
    return records.reduce((closest, record) =>
      Math.abs(record[param] - value) < Math.abs(closest[param] - value)
        ? record
        : closest
    );
  };

  const getDataForParameter = (param, simulationData, historicalData) => {
    const simulationValue = simulationData[param];
    const paramHistoricalData = historicalData.map((record) => ({
      ...record,
      [param]: record[param],
    }));
    return { simulationValue, historicalData: paramHistoricalData };
  };

  const generateRecommendationText = (param, calculatedValue, recommendedValue, historicalData) => {
    const isLow = calculatedValue < recommendedValue;
    const historicalRecord = historicalData.find(record => record[param] === recommendedValue);
    const formattedDate = formatDate(historicalRecord.fecha_Sim);
  
    let paramName;
    let unit;
    switch (param) {
      case 'carga_A':
        paramName = 'La carga aerodinámica';
        unit = 'N';
        break;
      case 'momento_A':
        paramName = 'El momento aerodinámico';
        unit = 'N*m';
        break;
      case 'downforce':
        paramName = 'El downforce';
        unit = 'N';
        break;
      case 'momento_A2':
        paramName = 'El momento aerodinámico 2';
        unit = 'N*m';
        break;
      case 'altura_S':
        paramName = 'La altura de la suspensión';
        unit = 'metros';
        break;
      case 'rigidez_S':
        paramName = 'La rigidez de la suspensión';
        unit = 'N*m';
        break;
      case 'potencia':
        paramName = 'La potencia';
        unit = 'CV';
        break;
      case 'rendimiento_T':
        paramName = 'El rendimiento térmico';
        unit = '%';
        break;
      case 'relacion_T':
        paramName = 'La relación de transmisión';
        unit = '';
        break;
      case 'potencia_F':
        paramName = 'La potencia de frenado';
        unit = 'W';
        break;
      case 'distancia_F':
        paramName = 'La distancia de frenado';
        unit = 'm';
        break;
      default:
        paramName = param;
        unit = '';
    }
  
    return `${paramName} que se calculó ${calculatedValue} ${unit} es un poco ${isLow ? 'baja' : 'alta'} para la carrera. Revisando el histórico se encontró que en ${formattedDate} se usó una ${paramName} más ${isLow ? 'alta' : 'baja'} (${recommendedValue} ${unit}) en circunstancias similares. Con una ${paramName} de ${recommendedValue} ${unit}, el coche tendrá un mejor rendimiento y aumentarán las posibilidades de ganar la carrera.`;
  };

  const getParameterName = (param) => {
    switch (param) {
      case 'carga_A':
        return 'Carga aerodinámica';
      case 'momento_A':
        return 'Momento aerodinámico';
      case 'downforce':
        return 'Downforce';
      case 'momento_A2':
        return 'Momento aerodinámico 2';
      case 'altura_S':
        return 'Altura de la suspensión';
      case 'rigidez_S':
        return 'Rigidez de la suspensión';
      case 'potencia':
        return 'Potencia';
      case 'rendimiento_T':
        return 'Rendimiento térmico';
      case 'relacion_T':
        return 'Relación de transmisión';
      case 'potencia_F':
        return 'Potencia de frenado';
      case 'distancia_F':
        return 'Distancia de frenado';
      default:
        return param;
    }
  };
  
  const getParameterUnit = (param) => {
    switch (param) {
      case 'carga_A':
        return 'CV';
      case 'momento_A':
        return 'N*m';
      case 'downforce':
        return 'N';
      case 'momento_A2':
        return 'N*m';
      case 'altura_S':
        return 'metros';
      case 'rigidez_S':
        return 'N*m';
      case 'potencia':
        return 'CV';
      case 'rendimiento_T':
        return '%';
      case 'relacion_T':
        return '';
      case 'potencia_F':
        return 'W';
      case 'distancia_F':
        return 'm';
      default:
        return '';
    }
  };
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}   

//--------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------
  return (
    <div>
      <Navigation />
      <h1 style={{textAlign: 'center', marginBottom: '20px', color: 'white'  }}>Simulación de Monoplaza</h1>
      <select style={{ display: 'block', margin: '0 auto', marginTop: '20px' }} onChange={handleSimulacionSelect}>
        <option value="">Selecciona una simulación</option>
        {simulaciones.map(simulacion => (
          <option key={simulacion.id} value={simulacion.id}>{new Date(simulacion.fecha).toLocaleDateString()}</option>
        ))}
      </select>
      {selectedSimulacion && (
        <div id="page-content">
          <h2 style={{marginTop: '10px', color: 'white' }}>Detalles de la simulación seleccionada:</h2>
          <p style={{ color: 'white' }}>Rendimiento sin afectación: {formatPercentage(selectedSimulacion.rendimiento)}</p>
          <p style={{ color: 'white' }}>Rendimiento en lluvia: {formatPercentage(selectedSimulacion.rendimiento_Lluvia)}</p>
          <p style={{ color: 'white' }}>Rendimiento en calor: {formatPercentage(selectedSimulacion.rendimiento_Calor)}</p>
          <p style={{ color: 'white' }}>Rendimiento en frío: {formatPercentage(selectedSimulacion.rendimiento_Frio)}</p>
          <p style={{ color: 'white' }}>Carga Aerodinámica: {selectedSimulacion.carga_A} N</p>
          <p style={{ color: 'white' }}>Momento aerodinámico: {selectedSimulacion.momento_A} N*m</p>
          <p style={{ color: 'white' }}>Downforce: {selectedSimulacion.downforce} N</p>
          <p style={{ color: 'white' }}>Momento aerodinámico 2: {selectedSimulacion.momento_A2} N*m</p>
          <p style={{ color: 'white' }}>Altura de la Suspensión {selectedSimulacion.altura_S} m</p>
          <p style={{ color: 'white' }}>Rigidez de la Suspensión: {selectedSimulacion.rigidez_S} N*m</p>
          <p style={{ color: 'white' }}>Potencia: {selectedSimulacion.potencia} CV</p>
          <p style={{ color: 'white' }}>Rendimiento Térmico: {selectedSimulacion.rendimiento_T} %</p>
          <p style={{ color: 'white' }}>Relación de transmisión: {selectedSimulacion.relacion_T}</p>
          <p style={{ color: 'white' }}>Potencia de frenado: {selectedSimulacion.potencia_F} W</p>
          <p style={{ color: 'white' }}>Distancia de frenado: {selectedSimulacion.distancia_F} m</p>
{/*-------------------------------------------------------------------------------------------------------------- */}
{/*-Recomendaciones------------------------------------------------------------------------------------------------------------- */}
{/* <button onClick={handleGenerateRecommendations}>Generate Recommendations</button> */}
<div id='recomendaciones-titulo'>
<h2 style={{marginTop: '80px', color: 'white' }}>Recomendaciones:</h2>
</div>
<div id='recomendaciones'>
  {recommendations.map((recommendation, index) => (
    <div key={index}>
      <h3 style={{ color: 'white' }}>{getParameterName(recommendation.parameter)}</h3>
      <p style={{ color: 'white' }}>Valor Calculado: {recommendation.calculatedValue} {getParameterUnit(recommendation.parameter)}</p>
      <p style={{ color: 'white' }}>Valor Recomendado: {recommendation.recommendedValue} {getParameterUnit(recommendation.parameter)}</p>
      <p style={{ color: 'white' }}>{recommendation.recommendationText}</p>
      <p style={{ color: 'white' }}>Porcentaje Confianza: {recommendation.confidence.toFixed(2)}%</p>
    </div>
  ))}
</div>
{/*-------------------------------------------------------------------------------------------------------------- */}
<div id='porcentaje-content'>
  <div id='P1'>
    <h2 style={{ color: 'white' }}>¿Como se calcula el Porcentaje de confianza?</h2>
    <div style={{ color: 'white' }}>
      <div style={{padding: '10px'}}>
        <b>Porcentaje de Confianza</b> = (<b>Total de Registros Históricos</b> / <b>Número de Registros Similares</b>) × 100%
      </div>
    </div>
  </div>
</div>

{/*-Estrategias------------------------------------------------------------------------------------------------------------- */}
<div id='estrategias-titulo'>
<h2 style={{marginTop: '80px', color: 'white' }}>{estrategiaRecomendada.estrategia}</h2>
</div>
  <div id='estrategias'>
    <p style={{ color: 'white' }}><strong>Objetivo:</strong> {estrategiaRecomendada.objetivo}</p>
    <p style={{ color: 'white' }}><strong>Descripción:</strong> {estrategiaRecomendada.descripcion}</p>
  </div>
{/*-Parametros de la FIA-------------------------------------------------------------------------------------------------------------*/}
<div id='verificacion-fia-titulo'>
<h2 style={{marginTop: '80px', color: 'white' }}>Verificación de FIA:</h2>
</div>
<div id='verificacion-fia'>
{renderizarMensaje("Momento Aerodinámico", selectedSimulacion.momento_A, 2520000, "Nm")}
  {renderizarMensaje("Downforce", selectedSimulacion.downforce, 252000, "N")}
  {renderizarMensaje("Momento Aerodinámico 2", selectedSimulacion.momento_A2, 2520000, "Nm")}
  {renderizarMensaje("Altura de la Suspensión", selectedSimulacion.altura_S, 2.30, "m")}
  {renderizarMensaje("Rigidez de la Suspensión", selectedSimulacion.rigidez_S, 400, "N/mm")}
  {renderizarMensaje("Potencia", selectedSimulacion.potencia, 13000, "CV")}
  {renderizarMensaje("Potencia de frenado", selectedSimulacion.potencia_F, 300000, "N")}
  {renderizarMensaje("Distancia de frenado", selectedSimulacion.distancia_F, 15, "m")}
</div>
{/*-------------------------------------------------------------------------------------------------------------- */}
{/*-Graficas------------------------------------------------------------------------------------------------------------- */}
<div class="mi-area-especifica">
          <h2 id='graficas-titulo' style={{marginTop: '70px', color: 'white' }}>Graficas de la simulación seleccionada:</h2>
          </div>
          {/*1. Grafica de barras
                *Carga aerodinamica
                *Momento aerodinamico
                *Downforce
                *Momento aerodinamico 2
                *Altura de la suspension
                *Rigidez de la suspension
                
              2. Grafica circular
                *Potencia
                *Rendimiento termico
                *Potencia de frenado
                *Distancia de frenado
              
              3. Grafica de radar
                Relacion de transmision*/}
          <h3 style={{marginTop: '109px', color: 'white' }}>Carga Aerodinámica</h3>
          <div className="chart-container">
          <BarChart
          width={600}
          height={300}
          data={dataCargaAerodinamica}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{ fill: 'white' }} />
          <YAxis tick={{ fill: 'white' }} />
          <Tooltip />
          <Legend />
          <Bar dataKey="carga_A" fill="#ffc40c" activeBar={<Rectangle fill="pink" stroke="blue" />} />
        </BarChart>
        </div>

        <h3 style={{marginTop: '20px', color: 'white' }}>Momento Aerodinámico</h3>
        <div className="chart-container">
          <BarChart
          width={600}
          height={300}
          data={dataMomentoAerodinamico}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{ fill: 'white' }} />
          <YAxis tick={{ fill: 'white' }} />
          <Tooltip />
          <Legend />
          <Bar dataKey="momento_A" fill="#cb2821" activeBar={<Rectangle fill="pink" stroke="blue" />} />
        </BarChart>
        </div>
                
        <h3 style={{marginTop: '160px', color: 'white' }}>Downforce</h3>
        <div className="chart-container">
        <BarChart
          width={600}
          height={300}
          data={downforceData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{ fill: 'white' }} />
          <YAxis tick={{ fill: 'white' }} />
          <Tooltip />
          <Legend />
          <Bar dataKey="downforce" fill="#a25e2a" activeBar={<Rectangle fill="pink" stroke="blue" />} />
        </BarChart>
        </div>

        <h3 style={{marginTop: '20px', color: 'white' }}>Momento Aerodinámico 2</h3>
        <div className="chart-container">
        <BarChart
          width={600}
          height={300}
          data={momentoAerodinamico2Data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{ fill: 'white' }} />
          <YAxis tick={{ fill: 'white' }} />
          <Tooltip />
          <Legend />
          <Bar dataKey="momento_A2" fill="#14b8b8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
        </BarChart>
        </div>

        <h3 style={{marginTop: '70px', color: 'white' }}>Altura de la suspensión</h3>
        <div className="chart-container">
        <BarChart
          width={600}
          height={300}
          data={alturaSuspensionData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={{ fill: 'white' }} />
            <YAxis tick={{ fill: 'white' }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="altura_S" fill="#00913f" activeBar={<Rectangle fill="pink" stroke="blue" />} />
          </BarChart>
          </div>

          <h3 style={{marginTop: '20px', color: 'white' }}>Rigidez de la suspensión</h3>
          <div className="chart-container">
          <BarChart
          width={600}
          height={300}
          data={rigidezSuspensionData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={{ fill: 'white' }} />
            <YAxis tick={{ fill: 'white' }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="rigidez_S" fill="#9c8e74" activeBar={<Rectangle fill="pink" stroke="blue" />} />
          </BarChart>
          </div>

          <h3 style={{marginTop: '40px', color: 'white' }}>Potencia</h3>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={scatterDataPotencia}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value} CV`}
                outerRadius={80}
                fill="#f5d033"
                dataKey="value"
              />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>

          <h3 style={{marginTop: '20px', color: 'white' }}>Rendimiento termico</h3>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={scatterDataRendimientoT}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={80}
                fill="#cb2821"
                dataKey="value"
              />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>

          <h3 style={{marginTop: '1px', color: 'white' }}>Potencia de frenado</h3>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={scatterDataPotenciaFrenado}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value} W`}
                outerRadius={80}
                fill="#a25e2a"
                dataKey="value"
              />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>

          <h3 style={{marginTop: '230px', color: 'white' }}>Distancia de frenado</h3>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={scatterDataDistanciaFrenado}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value} m`}
                outerRadius={80}
                fill="#14b8b8"
                dataKey="value"
              />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>

          <h3 style={{marginTop: '20px', color: 'white' }}>Relación de transmisión</h3>
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={RelacionTransmicionData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis />
              <Radar name="Relación de Transmisión" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
            </RadarChart>
          </ResponsiveContainer>

          <div id='botones-graficas'>
            <button style={{ marginTop: '20px', marginRight: '10px', fontWeight: 'bold', backgroundColor: '#ffc906', border: 'none', borderRadius: '5px', padding: '10px 20px', color: '#333' }} id="download-button" onClick={generatePDF}>Descargar PDF</button>
            
            <div
            className={`alert ${showAlert2 ? 'show' : ''}`}
            style={{
              position: 'absolute',
              top: '1499%',
              left: '42%',
              transform: 'translateX(-50%, -50%)',
              backgroundColor: '#223971',
              color: 'white',
              padding: '20px',
              borderRadius: '5px',
              zIndex: '999',
              textAlign: 'center'
            }}>Datos guardados en bitacora</div>
            <button style={{ marginTop: '20px', fontWeight: 'bold', backgroundColor: '#ffc906', border: 'none', borderRadius: '5px', padding: '10px 20px', color: '#333' }} id="bitacora-button" onClick={insertarEnBitacora}>Insertar en Bitácora</button>
            <style>
          {`
            .alert {
              opacity: 0;
              transition: opacity 0.5s ease-in-out;
            }
            .alert.show {
              opacity: 1;
            }
          `}
          </style>
        </div>
{/*-------------------------------------------------------------------------------------------------------------- */}
{/*-Encuesta------------------------------------------------------------------------------------------------------------- */}
          <div id='encuesta-content-titulo'>
          <h2 style={{marginTop: '20px', color: 'white' }}>Retroalimentación de resultados</h2>   
          </div>
          
          <div id='encuesta-content'>       
            <h3 style={{marginTop: '20px', color: 'white' }}>Aerodinámica: Alerón delantero y Alerón trasero</h3>
            <div id='P1'>
              <label style={{ color: 'white' }}>
                ¿Experimentó subviraje en las curvas?
                <select style={{marginLeft: '10px' }} value={respuestas.aerodinamica1} onChange={(e) => handleRespuestaChange('aerodinamica1', e.target.value)}>
                  <option value="">Seleccionar</option>
                  <option value="3">Leve</option>
                  <option value="2">Moderado</option>
                  <option value="1">Severo</option>
                </select>
              </label>
            </div>

            <div id='P2' style={{ marginTop: '20px' }}>
              <label style={{ color: 'white' }}>
                ¿Experimentó sobreviraje en las curvas?
                <select style={{marginLeft: '10px' }} value={respuestas.aerodinamica2} onChange={(e) => handleRespuestaChange('aerodinamica2', e.target.value)}>
                  <option value="">Seleccionar</option>
                  <option value="3">Leve</option>
                  <option value="2">Moderado</option>
                  <option value="1">Severo</option>
                </select>
              </label>
            </div>

            <div id='P3' style={{ marginTop: '20px' }}>
              <label style={{ color: 'white' }}>
                ¿El coche se sintió estable a altas velocidades?
                <select style={{marginLeft: '10px' }} value={respuestas.aerodinamica3} onChange={(e) => handleRespuestaChange('aerodinamica3', e.target.value)}>
                  <option value="">Seleccionar</option>
                  <option value="3">Muy estable</option>
                  <option value="2">Estable</option>
                  <option value="1">Poco estable</option>
                </select>
              </label>
            </div>

            <div id='P4' style={{ marginTop: '20px' }}>
              <label style={{ color: 'white' }}>
              	¿Hubo alguna diferencia notable en el comportamiento del coche al entrar o salir de las curvas?
                <select style={{marginLeft: '10px' }} value={respuestas.aerodinamica4} onChange={(e) => handleRespuestaChange('aerodinamica4', e.target.value)}>
                  <option value="">Seleccionar</option>
                  <option value="3">Sin diferencia notable</option>
                  <option value="2">Leve diferencia</option>
                  <option value="1">Diferencia significativa</option>
                </select>
              </label>
            </div>

            <h3 style={{marginTop: '20px', color: 'white' }}>Difusor</h3>
            <div id='P2.1'>
              <label style={{ color: 'white' }}>
              	¿Se sintió el coche "pegado" al suelo en las curvas?
                <select style={{marginLeft: '10px' }} value={respuestas.difusor1} onChange={(e) => handleRespuestaChange('difusor1', e.target.value)}>
                  <option value="">Seleccionar</option>
                  <option value="3">Muy adherido</option>
                  <option value="2">Adherido</option>
                  <option value="1">Poco adherido</option>
                </select>
              </label>
            </div>

            <div id='P2.2' style={{ marginTop: '20px' }}>
              <label style={{ color: 'white' }}>
              	¿Hubo alguna diferencia notable en la tracción del coche al acelerar o frenar?
                <select style={{marginLeft: '10px' }} value={respuestas.difusor2} onChange={(e) => handleRespuestaChange('difusor2', e.target.value)}>
                  <option value="">Seleccionar</option>
                  <option value="3">Sin diferencia notable</option>
                  <option value="2">Leve diferencia</option>
                  <option value="1">Diferencia significativa</option>
                </select>
              </label>
            </div>

            <h3 style={{marginTop: '20px', color: 'white' }}>Suspensión</h3>
            <div id='P3.1'>
              <label style={{ color: 'white' }}>
              	¿El coche se sintió demasiado rígido o demasiado suave sobre los baches?
                <select style={{marginLeft: '10px' }} value={respuestas.suspension1} onChange={(e) => handleRespuestaChange('suspension1', e.target.value)}>
                  <option value="">Seleccionar</option>
                  <option value="3">Demasiado rígido</option>
                  <option value="2">Adecuado</option>
                  <option value="1">Demasiado suave</option>
                </select>
              </label>
            </div>

            <div id='P3.2' style={{ marginTop: '20px' }}>
              <label style={{ color: 'white' }}>
              	¿Hubo algún problema con el control de la carrocería en las curvas o bajo frenada?
                <select style={{marginLeft: '10px' }} value={respuestas.suspension2} onChange={(e) => handleRespuestaChange('suspension2', e.target.value)}>
                  <option value="">Seleccionar</option>
                  <option value="3">Muy buen control</option>
                  <option value="2">Buen control</option>
                  <option value="1">Control deficiente</option>
                </select>
              </label>
            </div>

            <h3 style={{marginTop: '20px', color: 'white' }}>Motor</h3>
            <div id='P4.1'>
              <label style={{ color: 'white' }}>
              	¿El motor respondió correctamente al acelerador?
                <select style={{marginLeft: '10px' }} value={respuestas.motor1} onChange={(e) => handleRespuestaChange('motor1', e.target.value)}>
                  <option value="">Seleccionar</option>
                  <option value="3">Inmediata</option>
                  <option value="2">Leve retardo</option>
                  <option value="1">Retardo significativo</option>
                </select>
              </label>
            </div>

            <div id='P4.2' style={{ marginTop: '20px' }}>
              <label style={{ color: 'white' }}>
              	¿Hubo alguna pérdida de potencia o problemas con el rendimiento del motor?
                <select style={{marginLeft: '10px' }} value={respuestas.motor2} onChange={(e) => handleRespuestaChange('motor2', e.target.value)}>
                  <option value="">Seleccionar</option>
                  <option value="3">Sin problemas</option>
                  <option value="2">Leve problema</option>
                  <option value="1">Problema significativo</option>
                </select>
              </label>
            </div>

            <h3 style={{marginTop: '20px', color: 'white' }}>Transmisión</h3>
            <div id='P5.1'>
              <label style={{ color: 'white' }}>
              	¿Funcionó correctamente la caja de cambios?
                <select style={{marginLeft: '10px' }} value={respuestas.transmision1} onChange={(e) => handleRespuestaChange('transmision1', e.target.value)}>
                  <option value="">Seleccionar</option>
                  <option value="3">Perfecto</option>
                  <option value="2">Leve problema</option>
                  <option value="1">Problema significativo</option>
                </select>
              </label>
            </div>

            <div id='P5.2' style={{ marginTop: '20px' }}>
              <label style={{ color: 'white' }}>
              	¿Hubo algún problema con la selección de la marcha o el cambio de marchas?
                <select style={{marginLeft: '10px' }} value={respuestas.transmision2} onChange={(e) => handleRespuestaChange('transmision2', e.target.value)}>
                  <option value="">Seleccionar</option>
                  <option value="3">Sin problemas</option>
                  <option value="2">Leve problema</option>
                  <option value="1">Problema significativo</option>
                </select>
              </label>
            </div>

            <h3 style={{marginTop: '20px', color: 'white' }}>Frenos</h3>
            <div id='P6.1'>
              <label style={{ color: 'white' }}>
              	¿Los frenos respondieron correctamente al pedal?
                <select style={{marginLeft: '10px' }} value={respuestas.frenos1} onChange={(e) => handleRespuestaChange('frenos1', e.target.value)}>
                  <option value="">Seleccionar</option>
                  <option value="3">Inmediata</option>
                  <option value="2">Leve retardo</option>
                  <option value="1">Retardo significativo</option>
                </select>
              </label>
            </div>

            <div id='P6.2' style={{ marginTop: '20px' }}>
              <label style={{ color: 'white' }}>
              	¿La potencia de frenado fue adecuada y hubo desvanecimiento?
                <select style={{marginLeft: '10px' }} value={respuestas.frenos2} onChange={(e) => handleRespuestaChange('frenos2', e.target.value)}>
                  <option value="">Seleccionar</option>
                  <option value="3">Potencia excelente, sin desvanecimiento</option>
                  <option value="2">Potencia adecuada, leve desvanecimiento</option>
                  <option value="1">Potencia deficiente, desvanecimiento significativo</option>
                </select>
              </label>
            </div>

            <h3 style={{marginTop: '20px', color: 'white' }}>Clima</h3>
            <div id='P7.1'>
              <label style={{ color: 'white' }}>
              	¿Las condiciones climáticas afectaron el comportamiento del coche?
                <select style={{marginLeft: '10px' }} value={respuestas.clima1} onChange={(e) => handleRespuestaChange('clima1', e.target.value)}>
                  <option value="">Seleccionar</option>
                  <option value="3">Sin efecto notable</option>
                  <option value="2">Leve efecto</option>
                  <option value="1">Efecto significativo</option>
                </select>
              </label>
            </div>

            <div id='P7.2' style={{ marginTop: '20px' }}>
              <label style={{ color: 'white' }}>
              	¿Fue necesario realizar algún ajuste en la configuración del coche para adaptarse a las condiciones climáticas?
                <select style={{marginLeft: '10px' }} value={respuestas.clima2} onChange={(e) => handleRespuestaChange('clima2', e.target.value)}>
                  <option value="">Seleccionar</option>
                  <option value="3">No se requieren ajustes</option>
                  <option value="2">Ajustes leves</option>
                  <option value="1">Ajustes significativos</option>
                </select>
              </label>
            </div>

            <h3 style={{marginTop: '20px', color: 'white' }}>Comportamiento general del coche</h3>
            <div id='P8.1'>
              <label style={{ color: 'white' }}>
              	¿El coche se sintió estable y predecible en la pista?
                <select style={{marginLeft: '10px' }} value={respuestas.comportcoche1} onChange={(e) => handleRespuestaChange('comportcoche1', e.target.value)}>
                  <option value="">Seleccionar</option>
                  <option value="3">Muy estable y predecible</option>
                  <option value="2">Estable y predecible</option>
                  <option value="1">Poco estable e impredecible</option>
                </select>
              </label>
            </div>

            <div id='P8.2' style={{ marginTop: '20px' }}>
              <label style={{ color: 'white' }}>
              	¿Hubo algún problema con el manejo o control del coche?
                <select style={{marginLeft: '10px' }} value={respuestas.comportcoche2} onChange={(e) => handleRespuestaChange('comportcoche2', e.target.value)}>
                  <option value="">Seleccionar</option>
                  <option value="3">Sin problemas</option>
                  <option value="2">Leve problema</option>
                  <option value="1">Problema significativo</option>
                </select>
              </label>
            </div>
            
          
              <div
            className={`alert ${showAlert ? 'show' : ''}`}
            style={{
              position: 'absolute',
              top: '1767%',
              left: '40%',
              transform: 'translateX(-50%, -50%)',
              backgroundColor: '#223971',
              color: 'white',
              padding: '20px',
              borderRadius: '5px',
              zIndex: '999',
              textAlign: 'center'
            }}>Datos guardados exitosamente</div>
              <button id='encuesta-button' style={{ marginTop: '20px', fontWeight: 'bold', backgroundColor: '#ffc906', border: 'none', borderRadius: '5px', padding: '10px 20px', color: '#333' }} onClick={handleGuardarClick}>Guardar Encuesta</button>
              <style>
            {`
              .alert {
                opacity: 0;
                transition: opacity 0.5s ease-in-out;
              }
              .alert.show {
                opacity: 1;
              }
            `}
              </style>
            </div>
            <button id='irArriba' onClick={scrollToTop} style={{ position: 'fixed', bottom: '20px', right: '20px', padding: '10px 20px', fontSize: '16px', background: '#ffc906', color: 'black', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>Ir Arriba</button>
        </div>
      )}
    </div>
  );
}

export default AnalyticsView; 