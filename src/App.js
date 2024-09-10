import React from 'react'
import Login from './Login'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Signup from './Signup'
import Home from './Home'
import ForgotPassword from './ForgotPassword'
import Simulation from './Simulation'
import Bitacora from './Bitacora'
import CrearNota from './CrearNota'
import ActNota from './ActNota'
import Registry from './Registry'
import DibujoF1 from './DibujoF1'
import AnalyticsView from  './AnalyticsView'
import Historial from  './Historial'
import Ayuda from  './Ayuda'
// import ProtectedRoute from './PrivateRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
      {/* <Route element={<ProtectedRoute />}> */}
        <Route path="/home" element={<Home />} />
        <Route path="/bitacora" element={<Bitacora />} />
        <Route path="/crearnota" element={<CrearNota />} />
        <Route path="/actnota/:id" element={<ActNota />} />
        <Route path="/registry" element={<Registry />} />
        <Route path="/dibujof1" element={<DibujoF1 />} />
        <Route path="/simulation" element={<Simulation />} />
        <Route path="/analyticsView" element={<AnalyticsView />} />
        <Route path="/historial" element={<Historial/>} />
        <Route path="/ayuda" element={<Ayuda/>} />
{/* </Route> */}

      </Routes>
    </BrowserRouter>
  )
}

export default App