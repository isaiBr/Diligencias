import React, { useContext } from 'react'
import '../assets/Componentes/Header.css'
import Logo from '../Imagenes/logo-ey.png'
import { userContext } from '../Context/UserContext';

function Header() {

  const {
    logout
  }= useContext(userContext); 
  return (
    <div className='principal-header'>
      <img className='logo-ey' alt='logo EY' src={Logo}/>
      <h1 className='titulo-header'>GESTIÓN DE PROVEEDORES</h1>
      <button onClick={logout}>Cerrar sesión</button>
    </div>
  )
}

export {Header}