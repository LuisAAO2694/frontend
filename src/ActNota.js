import React, { useState, useEffect } from 'react';
import { Navigation } from './Navigation';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';
import validateForm from './ActNotaValidation'; // Importa la función de validación

function ActNota() {
  const [titulo, setTitulo] = useState('');
  const [informacion, setInformacion] = useState('');
  const [errors, setErrors] = useState({}); // Estado para almacenar los errores de validación
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    // Recuperar los datos existentes
    axios.get(`http://localhost:8081/actnota/${id}`)
      .then(res => {
        setTitulo(res.data.titulo);
        setInformacion(res.data.informacion);
      })
      .catch(err => console.log(err));
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validateForm({ titulo, informacion }); // Validar el formulario
    if (Object.keys(validationErrors).length === 0) {
      // Si no hay errores de validación, enviar los datos al servidor
      axios.put(`http://localhost:8081/actnota/${id}`, { titulo, informacion })
        .then(res => {
          navigate('/bitacora');
        })
        .catch(err => console.log(err));
    } else {
      // Si hay errores de validación, establecer los errores en el estado
      setErrors(validationErrors);
    }
  };

  const styles = {
    color: 'white',
    margin: '10px',
    padding: '0px',
  };

  const tableStyles = {
    color: 'white', // Cambia el color del texto de la tabla aquí
    backgroundColor: '#223971'
  };

  return (
    <div>
      <Navigation />
      <div style={{ textAlign: 'center' }}>
        <div style={{ ...styles, marginBottom: '30px' }}></div>
      </div>
      <div className="d-flex vh-120 justify-content-center align-items-center">
        <div className="rounded w-50 p-4" style={tableStyles}>
          <h2>Actualizar Nota</h2>
          <form onSubmit={handleSubmit}>
            <div className='mb-2'>
              <label htmlFor="" style={{color: "white"}}>Titulo</label>
              <input type='text' placeholder='Ingresa un titulo' className='form-control'
                value={titulo} onChange={e => setTitulo(e.target.value)} />
              {errors.titulo && <div style={{color: 'red'}}>{errors.titulo}</div>} {/* Muestra el mensaje de error si existe */}
            </div>
            <div className='mb-2'>
              <label htmlFor="" style={{color: "white"}}>Contenido de la nota</label>
              <textarea type='text' placeholder='Ingresa tus datos' className='form-control' style={{ height: '100px' }}
                value={informacion} onChange={e => setInformacion(e.target.value)} />
              {errors.informacion && <div style={{color: 'red'}}>{errors.informacion}</div>} {/* Muestra el mensaje de error si existe */}
            </div>
            <div style={{ ...styles, marginBottom: '30px' }}></div>
            <button className='btn btn-success' >Actualizar Nota</button>
            <Link to="/bitacora" className="btn btn-success" style={{ marginLeft: '0.5rem' }}>Cancelar</Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ActNota;
