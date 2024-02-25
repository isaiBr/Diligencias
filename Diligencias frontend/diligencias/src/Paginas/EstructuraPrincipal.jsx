import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from '../Componentes/Header'
import '../assets/Paginas/EstructuraPrincipal.css'

function EstructuraPrincipal() {
  return (
    <div className='principal-estructura'>
      <Header/>
      <Outlet/>
    </div>
  )
}

export {EstructuraPrincipal}