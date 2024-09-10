import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import './Login.css';
import axios from 'axios';
import Validation from './ForgotPWValidation';


function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({})
  const values = { email };
  
  const handleDownload = async () => {
    try {
      // Verificar si el campo de correo está vacío
      if (email.trim() === '') {
        return;
      }

      const response = await axios.get(`http://localhost:8081/forgotpassword/${email}`,
        {
          responseType: 'blob',
        });

      const blob = new Blob([response.data]);
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'contrasena.txt';
      link.click();
      setEmail(' ');
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // Si la respuesta es 404 (correo no encontrado)
        alert('La direccion de correo electrónico proporcionada es incorercta');
      } else {
        // Otros errores
        console.error('Error al descargar la contraseña:', error.message);
        alert('Error al descargar la contraseña. Por favor, inténtalo de nuevo.');
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(Validation(values));
  }

  return (
    <div className='d-flex justify-content-center align-items-center vh-100 login-container'>
      <div className='bg-white p-3 rounded w-25'>
        <h2>Recupera tu contraseña</h2>
        <form action="" onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor='email'><strong>Correo electronico:</strong></label>
            <input type="email" placeholder='Ingresa tu correo electronico' name='email'
              value={email} onChange={(e) => setEmail(e.target.value)}
              className='form-control rounded-0' />
            {errors.email && <span className='text-danger'>{errors.email}</span>}
          </div>

          <button type='submit' style={{ backgroundColor: "#ea1d2d" }} className='btn login-button w-100' onClick={handleDownload}>Descargar Contraseña</button>
          <p>©ThePitstop©</p>
          <Link to="/" style={{ backgroundColor: "#f7f9fb", borderColor: "#001a30" }} className='btn btn-default border create-account-button w-100 bg-light text-decoration-none'>Ingresar</Link>
        </form>
      </div>
    </div>

  )
}

export default ForgotPassword