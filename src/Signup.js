import React, { useState, useEffect } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import Validation from './SignupValidation';
import axios from 'axios';

function Signup() {
    const [values, setValues] = useState({
        teamName: '',
        email: '',
        password: ''
    });

    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    useEffect(() => {
        if (errors.teamName === '' && errors.email === '' && errors.password === '') {
            axios.post('http://localhost:8081/ThePitstop', values)
                .then(res => {
                    setShowSuccessMessage(true); // Mostrar mensaje de éxito
                    setTimeout(() => {
                        setShowSuccessMessage(false); // Ocultar mensaje después de 6 segundos
                        navigate('/');
                    }, 2000);
                })
                .catch(err => console.log(err));
        }
    }, [errors, navigate, values]);

    const handleInput = (event) => {
        setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(Validation(values));
    };

    return (
        <div className='d-flex justify-content-center align-items-center vh-100 login-container'>
            <div className='bg-white p-3 rounded w-25'>
                <h2>Crear cuenta</h2>
                <form action="" onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor='teamName'><strong>Escuderia:</strong></label>
                        <input type="text" placeholder='Ingresa el nombre de tu escuderia' name='teamName'
                            onChange={handleInput} className='form-control rounded-0' />
                        {errors.teamName && <span className='text-danger'>{errors.teamName}</span>}
                    </div>

                    <div className='mb-3'>
                        <label htmlFor='email'><strong>Correo electronico:</strong></label>
                        <input type="email" placeholder='Ingresa tu correo electronico' name='email'
                            onChange={handleInput} className='form-control rounded-0' />
                        {errors.email && <span className='text-danger'>{errors.email}</span>}
                    </div>

                    <div className='mb-3'>
                        <label htmlFor='password'><strong>Contraseña:</strong></label>
                        <input type="password" placeholder='Ingresa tu contraseña' name='password'
                            onChange={handleInput} className='form-control rounded-0' />
                        {errors.password && <span className='text-danger'>{errors.password}</span>}
                    </div>
                    <button type='submit' style={{ backgroundColor: "#ea1d2d" }} className='btn login-button w-100'>Crear cuenta</button>
                    <p>©ThePitstop©</p>
                    <Link to="/" style={{ backgroundColor: "#f7f9fb", borderColor: "#001a30" }} className='btn btn-default border create-account-button w-100 bg-light text-decoration-none'>Ingresar</Link>
                </form>
                {showSuccessMessage && (
                    <div className="success-message" style={{ backgroundColor: "#223971", color: "white", textAlign: "center", marginbottom: "5px", marginTop: "5px", borderRadius: "5px", padding: "4px" }}>
                        <p style={{ color: "white", marginTop: "5px" }}>Cuenta creada con éxito</p>
                    </div>
                    )}
            </div>
        </div>
    )
}

export default Signup;
