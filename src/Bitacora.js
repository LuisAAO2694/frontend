import React, { useEffect, useState } from 'react';
import './Bitacora.css';
import { Navigation } from './Navigation';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Bitacora() {

    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8081/bitacora')
            .then(res => setData(res.data.reverse()))
            .catch(err => console.log(err));
    }, []);
    

    const navigate = useNavigate();

    const handleDelete = (id) => {
        const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar esta nota?');
        if (confirmDelete) {
            axios.delete('http://localhost:8081/delete/' + id)
                .then(res => {
                    setData(prevData => prevData.filter(item => item.id !== id));
                    navigate('/bitacora');
                })
                .catch(err => {
                    console.log('Error al intentar eliminar la nota:', err);
                });
        }
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredData = data.filter(
        (d) =>
            d.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            d.informacion.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const containerStyles = {
         // Cambia el color de fondo aquí
        minHeight: '100vh', // Ajusta la altura del contenedor principal según sea necesario
    };

    const tableStyles = {
        color: 'white', // Cambia el color del texto de la tabla aquí
        backgroundColor: '#223971'
    };

    return (
        <div style={containerStyles}>
            <Navigation />
            <div style={{ textAlign: 'center' }}>
                <h1 style={{ color: 'white', margin: '10px', padding: '0px', marginBottom: '30px' }}>Bitácora</h1>
            </div>

            <div className="d-flex justify-content-center align-items-center vh-120">
                <div className="rounded w-50 p-4" style={tableStyles}>
                    <h2>Bitácora</h2>
                    <input
                        type="text"
                        placeholder="Buscar..."
                        value={searchTerm}
                        onChange={handleSearch}
                        className="form-control mb-2"
                    />
                    <Link to="/crearnota" className='btn btn-success' style={{marginBottom: '30px', marginTop:'30px' }}>Crear nota</Link>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Titulo</th>
                                <th>Nota</th>
                                {/* <th>Registro</th> */}
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(filteredData) && filteredData.map((d, i) => (
                                <tr key={i}>
                                    <td>{d.titulo}</td>
                                    <td>{d.informacion}</td>
                                    {/* <td>{d.idlogin}</td> */}
                                    <td>
                                        <td>
                                            <Link to={`/actnota/${d.id}`} className='btn btn-sm btn-primary px-2 py-1'>Actualizar</Link>
                                            <div className='mt-2'></div>
                                            <button onClick={e => handleDelete(d.id)} className='btn btn-sm btn-danger px-2 py-1'>Eliminar</button>
                                        </td>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Bitacora;
