import React from 'react';
import { Navigation } from './Navigation';

function Ayuda() {
    // Función para descargar un archivo PDF
    function downloadPDF(filename) {
        const url = process.env.PUBLIC_URL + `/pdf/${filename}`;
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', '');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    const buttonStyles = {
        backgroundColor: '#ffc906',
        color: 'black',
        borderRadius: '10px',
        margin: '5px',
        padding: '8px 12px',
        border: 'none',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: 'bold',
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <Navigation />
            <h1 style={{ marginBottom: '20px', color: 'white' }}>Ayuda</h1>
            <div style={{ marginBottom: '10px' }}>
                <h3 style={{ color: 'white' }}>Reglamentos Relacionados</h3>
                <button style={buttonStyles} onClick={() => downloadPDF('fia_2024_1.pdf')}>Descargar PDF</button>
            </div>
            <div style={{ marginBottom: '10px' }}>
                <h3 style={{ color: 'white' }}>Reglamentos Deportivos</h3>
                <button style={buttonStyles} onClick={() => downloadPDF('fia_2024_2.pdf')}>Descargar PDF</button>
                <button style={buttonStyles} onClick={() => downloadPDF('fia_2026_5.pdf')}>Descargar PDF</button>
            </div>
            <div style={{ marginBottom: '10px' }}>
                <h3 style={{ color: 'white' }}>Reglamentos Técnicos</h3>
                <button style={buttonStyles} onClick={() => downloadPDF('fia_2024_3.pdf')}>Descargar PDF</button>
                <button style={buttonStyles} onClick={() => downloadPDF('fia_2026_6.pdf')}>Descargar PDF</button>
            </div>
            <div style={{ marginBottom: '10px' }}>
                <h3 style={{ color: 'white' }}>Reglamentos Financieros</h3>
                <button style={buttonStyles} onClick={() => downloadPDF('fia_2024_4.pdf')}>Descargar PDF</button>
                <button style={buttonStyles} onClick={() => downloadPDF('fia_2026_7.pdf')}>Descargar PDF</button>
            </div>
        </div>
    );
}

export default Ayuda;
