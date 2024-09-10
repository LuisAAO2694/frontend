import React, { useState } from 'react';
import { Navigation } from './Navigation';
import axios from 'axios';
import Validation from './RegistryValidation';

function Registry() {
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState({});
    const values = { email };

    const handleDownload = async () => {
        try {
            // Verificar si el campo de correo está vacío
            if (email.trim() === '') {
                return;
            }

            const response = await axios.get(`http://localhost:8081/registry/${email}`, {
                responseType: 'blob',
            });

            const blob = new Blob([response.data]);
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = 'Registro.txt';
            link.click();
            setEmail(' ');
        } catch (error) {
            if (error.response && error.response.status === 404) {
                // Si la respuesta es 404 (correo no encontrado)
                alert('La dirección de correo electrónico proporcionada es incorrecta');
            } else {
                // Otros errores
                console.error('Error al descargar tu registro:', error.message);
                alert('Error al descargar tu registro. Por favor, inténtalo de nuevo.');
            }
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(Validation(values));
    };

    const styles = { //Para el color de los textos y movimiento
        color: 'white', // Cambia esto a 'white' para texto blanco
        margin: '10px', // Ajusta el valor según sea necesario
        padding: '0px', // Ajusta el valor según sea necesario
    };

    const tableStyles = {
        color: 'white', // Cambia el color del texto de la tabla aquí
        backgroundColor: '#223971'
      };

    return (
        <div>
            <Navigation />
            <div style={{ textAlign: 'center' }}>
                <h1 style={{ ...styles, marginBottom: '30px' }}>ID de Afiliado</h1>
            </div>

            <div className='d-flex justify-content-center align-items-center vh-120'>
                <div className='rounded w-50 p-4' style={tableStyles}>
                    <h2>Conoce tu ID de Afiliado</h2>
                    <form action="" onSubmit={handleSubmit}>
                        <div className='mb-3'>
                            <label htmlFor='email' style={{color: "white"}}><strong>Correo electrónico:</strong></label>
                            <input
                                type="email"
                                placeholder='Ingresa tu correo electrónico'
                                name='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className='form-control rounded-0'
                            />
                            {errors.email && <span className='text-danger'>{errors.email}</span>}
                        </div>
                        <button
                            type='submit'
                            style={{ backgroundColor: "#ffc906", color: "black" }}
                            className='btn login-button w-100'
                            onClick={handleDownload}
                        >
                            <strong>Descargar ID Afiliado</strong>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Registry;
