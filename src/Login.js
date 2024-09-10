import React, {useState, useEffect } from 'react'
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import Validation from './LoginValidation';
import axios from 'axios';
import Cookies from 'js-cookie';

function Login() {
  const [values, setValues] = useState({
    email: '',
    password: ''
  })

  const navigate = useNavigate();
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (errors.email === '' && errors.password === '') {
      axios.post('http://localhost:8081/login', values)
        .then(res => {
          if(res.data === "Success")
          {
            Cookies.set('token', 'token_de_autenticacion');
            navigate('/home');
          }
          else
          {
            if (res.data.message === "No existe el registro") {
              alert("El correo electrónico no coincide");
            } else {
              alert(res.data.message);
            }
          }
        })
        .catch(err => console.log(err));
    } // eslint-disable-next-line
  }, [errors]);

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(Validation(values));
  }

  return (
    <div className='d-flex justify-content-center align-items-center vh-100 login-container'>
      <div className='bg-white p-3 rounded w-25'>
        <h2>Iniciar Sesión</h2>
        <form action="" onSubmit={handleSubmit}>

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

          <button type='submit' style={{ backgroundColor: "#ea1d2d" }} className='btn login-button w-100'>Ingresar</button>
          <p>©ThePitstop©</p>
          <Link to="/signup" style={{ backgroundColor: "#f7f9fb", borderColor: "#001a30" }} className='btn btn-default border create-account-button w-100 bg-light text-decoration-none'>Crear cuenta</Link>
          <p></p>
          {/* <button style={{ backgroundColor: "#f7f9fb", borderColor: "#001a30" }} className='btn btn-default border create-account-button w-100 bg-light'>Recuperar contraseña</button> */}
          <Link to="/forgotpassword" style={{ backgroundColor: "#f7f9fb", borderColor: "#001a30" }} className='btn btn-default border create-account-button w-100 bg-light'>¿Has olvidado tu contraseña?</Link>
        </form>
      </div>
    </div>
  )
}

export default Login