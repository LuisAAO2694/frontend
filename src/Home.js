import React from 'react';
import './Home.css';
//import { useNavigate } from 'react-router-dom';
//import Cookies from 'js-cookie';
import { Navigation } from './Navigation';
import { TwitterTimelineEmbed } from 'react-twitter-embed';

function Home() {
  // const navigate = useNavigate();

  // const handleLogout = () => {
  //   // Elimina la cookie de autenticación o cualquier otra información de sesión
  //   Cookies.remove('token'); // Ajusta el nombre de la cookie según tu implementación

  //   // Reemplaza la entrada actual en el historial para evitar que el usuario vuelva atrás
  //   window.history.replaceState(null, '', '/');

  //   // Redirige al usuario a la página de inicio de sesión
  //   navigate('/');
  // };
  const styles = { //Para el color de los textos y movimiento
    color: 'white', // Cambia esto a 'white' para texto blanco
    margin: '10px auto', // Ajusta el valor según sea necesario
    padding: '10px', // Ajusta el valor según sea necesario
  };

  
  return (
    <div>
      <Navigation />
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ ...styles, marginBottom: '10px',  }}>Inicio</h1>
        <h2 style={{ ...styles, marginBottom: '20px' }}>Bienvenido a la página de inicio</h2>

        <div style={{ width: '40%', margin: 'auto', border: 'none', padding: '10px', marginBottom: '40px' }}>
          <h2 style={{ ...styles, marginBottom: '10px' }}>Linea del Tiempo Twitter</h2>
          <TwitterTimelineEmbed
            sourceType="profile"
            screenName="F1"  // Reemplaza con el nombre de usuario de la cuenta de Twitter que deseas mostrar
            options={{ height: 500, noScrollbar: true }}
            style={{ width: '100%', height: '100%' }}
          />
        </div>

        <h2 style={{ ...styles, marginBottom: '1px' }}>Lista de Carreras</h2>
        {/* eslint-disable-next-line jsx-a11y/iframe-has-title */}
        <iframe
          title=''
          className="iframe"
          style={{marginBottom: '40px', backgroundColor: 'white', borderRadius: '10px' }}
          src="https://f1-react.vercel.app/races" //https://f1-react.vercel.app/races http://localhost:3001/races
          width="700"
          height="500"
        ></iframe>

        <h2 style={{ ...styles, marginBottom: '1px' }}>Tabla de Posiciones Campeonato</h2>
        {/* eslint-disable-next-line jsx-a11y/iframe-has-title */}
        <iframe
          className="iframe"
          style={{ backgroundColor: 'white', borderRadius: '10px' }}
          src="https://f1-react.vercel.app/standings" //https://f1-react.vercel.app/standings  http://localhost:3001/standings
          width="700"
          height="500"
        ></iframe>

      </div>
    </div>

  );
}

export default Home;
