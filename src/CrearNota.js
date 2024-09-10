import React, {useState} from 'react'
import { Navigation } from './Navigation';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import validateForm from './CrearNotaValidation';

function CrearNota() {
    const [titulo, setTitulo] = useState('')
    const [informacion, setInformacion] = useState('')
    // const [idlogin, setIdlogin] = useState('')
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    // const handleSubmit = (event) => {
    //     event.preventDefault();

    //     // Validar el formulario antes de enviar la solicitud
    //     const validationErrors = validateForm({ titulo, informacion, idlogin });

    //     if (Object.keys(validationErrors).length === 0) 
    //     {
    //         axios.post('http://localhost:8081/crearnota', {titulo, informacion, idlogin})
    //         .then(res => {
    //             navigate('/bitacora');
    //         }).catch(err => console.log(err))
    //     } else {
    //         // Si hay errores de validación, actualizar el estado de los errores
    //         setErrors(validationErrors);
    // }
    
    // const checkIdExistence = async () => {
    //     try {
    //       const response = await axios.get(`http://localhost:8081/checkid/${idlogin}`);
    //       return response.data.exists;
    //     } catch (error) {
    //       console.error(error);
    //       return false;
    //     }
    //   };
  
      const handleSubmit = async (event) => {
        event.preventDefault();
  
        // Validar el formulario antes de enviar la solicitud
        const validationErrors = validateForm({ titulo, informacion });
  
        if (Object.keys(validationErrors).length === 0) {
          // Verificar la existencia del idlogin en la base de datos
          // const idExists = await checkIdExistence();
  
          if (true) {
            // El idlogin existe, realizar la inserción
            axios.post('http://localhost:8081/crearnota', { titulo, informacion })
              .then((res) => {
                navigate('/bitacora');
              })
              .catch((err) => console.log(err));
          } else {
            // El idlogin no existe, mostrar advertencia
            // setErrors({ idlogin: 'El registro del usuario no existe en la base de datos' });
          }
        } else {
          // Si hay errores de validación, actualizar el estado de los errores
          setErrors(validationErrors);
        }
    }
    
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
                <div style={{ ...styles, marginBottom: '30px' }}></div>
            </div>

            <div className="d-flex vh-120 justify-content-center align-items-center">
                <div className="rounded w-50 p-4" style={tableStyles}>
                    <h2>Crear Nota</h2>
                    <form onSubmit={handleSubmit}>
                        <div className='mb-2'>
                            <label htmlFor="" style={{color: "white"}}>Titulo</label>
                            <input type='text' placeholder='Ingresa un titulo' className={`form-control ${errors.titulo ? 'is-invalid' : ''}`}
                            onChange={e => setTitulo(e.target.value)}/>
                            {errors.titulo && <div className="invalid-feedback">{errors.titulo}</div>}
                        </div>
                        <div className='mb-2'>
                            <label htmlFor="" style={{color: "white"}}>Contenido de la nota</label>
                            <textarea type='text' placeholder='Ingresa tus datos' className={`form-control ${errors.informacion ? 'is-invalid' : ''}`} style={{height: '100px' }}
                            onChange={e => setInformacion(e.target.value)}/>
                            {errors.informacion && <div className="invalid-feedback">{errors.informacion}</div>}
                        </div>
                        {/* <div className='mb-2'>
                            <label htmlFor="">Registro</label>
                            <input type='number' placeholder='Ingresa tu registro' className={`form-control ${errors.idlogin ? 'is-invalid' : ''}`}
                            onChange={e => setIdlogin(e.target.value)}/>
                            {errors.idlogin && <div className="invalid-feedback">{errors.idlogin}</div>}
                        </div> */}
                        <div style={{ ...styles, marginBottom: '30px' }}></div>
                        <button className='btn btn-success'>Guardar Nota</button>
                        <Link to="/bitacora" className="btn btn-success" style={{ marginLeft: '0.5rem' }}>Cancelar</Link>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CrearNota