import React from 'react'
import '../assets/Componentes/Header.css'
import Logo from '../Imagenes/logo-ey.png'

function Header() {
  return (
    <div className='principal-header'>
      <img className='logo-ey' alt='logo EY' src={Logo}/>
      <h1 className='titulo-header'>GESTIÓN DE PROVEEDORES</h1>
    </div>
  )
}

export {Header}