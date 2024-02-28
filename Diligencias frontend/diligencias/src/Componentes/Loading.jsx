import React from 'react'
import '../assets/Componentes/Loading.css'
import LogoCargando from '../Imagenes/cargando.png'

function Loading() {
  return (
    <div className='principal-loading'>
        <img alt='loading' className='loading' src={LogoCargando}/>
        <h2>Recuperando informacion</h2>
        <h3>espere unos segundos</h3>
    </div>
  )
}

export default Loading