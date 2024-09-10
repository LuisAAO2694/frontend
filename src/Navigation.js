import React from 'react';
import Logo from './images/LogoThePitstop.png';
import { Navbar, Nav } from 'react-bootstrap';
//import Cookies from 'js-cookie';
import { useNavigate, NavLink } from 'react-router-dom';

export const Navigation = ({ children }) => {

  const navigate = useNavigate();

  const handleLogout = () => {
    // Elimina la cookie de autenticación o cualquier otra información de sesión
    //Cookies.remove('token');
  
    // Redirige a la ruta de inicio de sesión
    navigate('/', { replace: true });
  
    // Agrega un estado al historial del navegador
    window.history.go(1);
  };
  
  // Agrega un evento 'popstate' al objeto window
  window.onpopstate = function(event) {
    // Reemplaza el estado actual con el nuevo estado
    window.history.go(1);
  };
  
  return (
    <>
      <Navbar expand='lg' bg='light' variant='light'>
        <NavLink to="/home">
          <img src={Logo} height={110} alt='No encontrado' />
        </NavLink>

        <Navbar.Toggle aria-controls='navbarCollapse' />

        <Navbar.Collapse id='navbarCollapse'>
          <Nav className='ms-auto'>
            <NavLink to="/home" className="nav-itme nav-link text-center">Inicio</NavLink>
            <NavLink to="/simulation" className="nav-itme nav-link text-center">Simulación de carreras</NavLink>
            <NavLink to="/analyticsview" className="nav-itme nav-link text-center">Análisis de resultados</NavLink>
            <NavLink to="/dibujof1" className="nav-itme nav-link text-center">Diseñador de autos</NavLink>
            <NavLink to="/bitacora" className="nav-itme nav-link text-center">Bitácora</NavLink>
            <NavLink to="/historial" className="nav-itme nav-link text-center">Historial de simulaciones</NavLink>
            <NavLink to="/registry" className="nav-itme nav-link text-center">ID</NavLink>
            <NavLink to="/ayuda" className="nav-itme nav-link text-center">Ayuda</NavLink>
          </Nav>

          {/* Botón para cerrar sesión */}
          <button
            type="button"
            onClick={handleLogout}
            style={{ backgroundColor: '#f8f9fa' }}
            className="btn login-button"
          >
            <strong>Cerrar sesión</strong>
          </button>
        </Navbar.Collapse>
      </Navbar>

      {children}
    </>
  );
};