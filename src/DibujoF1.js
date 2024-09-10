import React, { useState, useRef } from 'react';
import { Navigation } from './Navigation';
import CanvasDraw from 'react-canvas-draw';

const colors = [
    { label: 'Negro', rgba: 'rgba(0, 0, 0, 1)', opacity: 100 },
    { label: 'Blanco', rgba: 'rgba(255, 255, 255, 1)', opacity: 100 },
    { label: 'Rojo', rgba: 'rgba(255, 0, 0, 1)', opacity: 100 },
    { label: 'Verde', rgba: 'rgba(0, 255, 0, 1)', opacity: 100 },
    { label: 'Azul', rgba: 'rgba(0, 0, 255, 1)', opacity: 100 },
    { label: 'Amarillo', rgba: 'rgba(255, 255, 0, 1)', opacity: 100 },
    { label: 'Magenta', rgba: 'rgba(255, 0, 255, 1)', opacity: 100 },
    { label: 'Cian', rgba: 'rgba(0, 255, 255, 1)', opacity: 100 },
    { label: 'Naranja', rgba: 'rgba(255, 165, 0, 1)', opacity: 100 },
    { label: 'Marrón', rgba: 'rgba(165, 42, 42, 1)', opacity: 100 },
    // Agrega más colores con diferentes niveles de transparencia según sea necesario
];

function DibujoF1() {
    const [strokeColor, setStrokeColor] = useState(colors[0].rgba);
    const [opacity, setOpacity] = useState(colors[0].opacity);
    const [brushRadius, setBrushRadius] = useState(10);
    const firstCanvas = useRef(null);
    const secondCanvas = useRef(null);
    const [backgroundImg] = useState("https://upload.wikimedia.org/wikipedia/commons/3/3a/Coche-de-f1v2.jpg");

    const handleClick = () => {
        const data = firstCanvas.current.getSaveData();
        console.log(data);
        secondCanvas.current.loadSaveData(data);
    };

    const handleColorChange = (color) => {
        setStrokeColor(color.rgba);
        setOpacity(color.opacity);
    };

    const handleOpacityChange = (event) => {
        const newOpacity = event.target.value;
        setOpacity(newOpacity);
        const rgbaColor = strokeColor.replace(/[^,]+(?=\))/, newOpacity / 100);
        setStrokeColor(rgbaColor);
    };

    const handleBrushRadiusChange = (event) => {
        setBrushRadius(Number(event.target.value));
    };

    const clear = () => {
        firstCanvas.current.clear();
    }

    const undo = () => {
        firstCanvas.current.undo();
    }

    const [backgroundImgA] = useState(require('./images/CochePlan.jpg'));
    const handleDownload = () => {
        // Crear un nuevo canvas con el mismo tamaño que el lienzo principal
        const canvas = document.createElement('canvas');
        canvas.width = 900; // Ancho del lienzo principal
        canvas.height = 600; // Alto del lienzo principal
        const ctx = canvas.getContext('2d');
      
        // Cargar la imagen de fondo
        const img = new Image();
        img.src = backgroundImgA;
        img.onload = () => {
          // Dibujar la imagen de fondo en el nuevo canvas
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      
          // Dibujar los trazos del primer canvas en el nuevo canvas
          const firstCanvasElement = firstCanvas.current.canvasContainer.children[1];
          ctx.drawImage(firstCanvasElement, 0, 0, canvas.width, canvas.height);
      
          // Crear un enlace y descargar la imagen
          const dataURL = canvas.toDataURL();
          const link = document.createElement('a');
          link.href = dataURL;
          link.download = 'mi_dibujo.png'; // Nombre del archivo a descargar
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        };
      };
    
    //BLANCO EL PINCEL, Y ESPACIOS ENTRE COMPONENTES Y QUE SE DESCARGUE EL  DIBUJO AL CLICKAR.
    return (
        <div>
            <Navigation />
            <h1 style={{textAlign: 'center', marginBottom: '10px', color: 'white'  }}>Diseñador de Monoplaza</h1>
            <div style={{ marginTop: '20px' }}></div>
            <div style={{ display: 'flex', gap: '300px' }}></div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {/* Primer CanvasDraw */}
                <CanvasDraw
                    brushRadius={brushRadius}
                    brushColor={strokeColor}
                    ref={firstCanvas}
                    imgSrc={backgroundImg}
                    hideGrid //Quitar la cuadricula del lienzo
                    enablePanAndZoom
                    canvasHeight={600}
                    canvasWidth={900}
                    style={{ marginBottom: '20px' }}
                />

                {/* Controles en el lado derecho del primer dibujo */}
                <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <input type="range" min="0" max="100" value={opacity} onChange={handleOpacityChange} />
                    <span style={{ marginLeft: '10px', marginRight: '10px', color: 'white' }}>Opacidad: {opacity}%</span>
                    <br />
                    <input type="range" min="1" max="100" value={brushRadius} onChange={handleBrushRadiusChange} />
                    <span style={{ marginLeft: '10px', marginRight: '10px', color: 'white' }}>Grosor: {brushRadius}</span>
                </div>

                {/* Botones */}
                <div style={{ marginTop: '20px' }}></div>
                <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                    <button style={{ padding: '10px 20px', fontSize: '16px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px' }} 
                    onClick={handleClick}>Ver dibujo</button>
                    <button style={{ padding: '10px 20px', fontSize: '16px', background: '#FF3333', color: 'white', border: 'none', borderRadius: '5px' }} 
                    onClick={clear}>Borrar trazos</button>
                    <button style={{ padding: '10px 20px', fontSize: '16px', background: '#3377FF', color: 'white', border: 'none', borderRadius: '5px' }} 
                    onClick={undo}>Deshacer</button>

<button style={{ padding: '10px 20px', fontSize: '16px', background: '#333333', color: 'white', border: 'none', borderRadius: '5px' }}
                        onClick={handleDownload}>Descargar</button>
                </div>

                {/* Colores */}
                <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center' }}>
                    {colors.map((color) => (
                        <div
                            key={color.label}
                            style={{
                                backgroundColor: color.rgba,
                                width: '30px',
                                height: '30px',
                                margin: '0 5px',
                                cursor: 'pointer',
                            }}
                            onClick={() => handleColorChange(color)}
                        ></div>
                    ))}
                </div>

                <div style={{ marginTop: '20px' }}></div>

                {/* Segundo CanvasDraw */}
                <CanvasDraw
                    ref={secondCanvas}
                    disabled={true}
                    imgSrc={backgroundImg}
                    canvasHeight={600}
                    canvasWidth={900}
                />
            </div>
        </div>
    );
}

export default DibujoF1;