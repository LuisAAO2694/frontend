
const isSimilar = (value1, value2, threshold) => {
    // Calcula la diferencia relativa entre los valores
    const relativeDifference = Math.abs(value1 - value2) / value1;
    // Comprueba si la diferencia relativa es menor o igual al umbral
    return relativeDifference <= threshold; //true si la diferencia relativa entre los valores es menor o igual al umbral, false en caso contrario.
};


// Filtrado de registros similares
const generateRecommendationForParameter = (param, simulationData, historicalData) => {
    console.log(`Generando recomendación para el parámetro ${param}`);
    // Obtener el valor de simulación y los datos históricos para el parámetro actual
    const { simulationValue, historicalData: paramHistoricalData } = getDataForParameter(param, simulationData, historicalData);
  
    // RQNF82: Filtrar los registros similares utilizando la función isSimilar
    const similarRecords = paramHistoricalData.filter((record) =>
      isSimilar(record[param], simulationValue, 10)
    );
    console.log(`Registros similares (umbral inicial 10%): ${JSON.stringify(similarRecords)}`);
  
    // Si no hay registros similares, devuelve un valor recomendado "N/A"
    if (similarRecords.length === 0) {
      return {
        parameter: param,
        calculatedValue: simulationValue,
        recommendedValue: 'N/A',
        recommendationText: 'No hay suficientes datos históricos similares para generar una recomendación.',
        confidence: 0,
      };
    }
    
    // Selección de hasta 10 registros más similares
    let selectedRecords = similarRecords.slice(0, 10);
    console.log(`Selección de hasta 10 registros más similares: ${JSON.stringify(selectedRecords)}`);
  
    // Reducción del umbral de similitud si hay más de 10 registros similares
    selectedRecords = reduceSimularityThreshold(simulationValue, paramHistoricalData, param);
    console.log(`Registros después de reducir el umbral de similitud: ${JSON.stringify(selectedRecords)}`);
  
    // Generación de la recomendación final
    // (código de generación de recomendación omitido por brevedad)
  };
  
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
  



//Metodo de ordenacion, que ordena y como lo ordena
/*
  El método de ordenación utilizado ordena los registros históricos 
  según su similitud con el valor de simulación dado, donde los 
  registros más similares se colocan primero en el array ordenado. 
*/

