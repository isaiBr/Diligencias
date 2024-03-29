import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from '../Componentes/Header'
import '../assets/Paginas/EstructuraPrincipal.css'
import { GestionProveedores } from './GestionProveedores'

function EstructuraPrincipal() {
  return (
    <div className='principal-estructura'>
      <Header/>
      <GestionProveedores/>
    </div>
  )
}

export {EstructuraPrincipal}