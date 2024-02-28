import React from 'react'
import '../assets/Componentes/Error.css'
import LogoError from '../Imagenes/error.png'



function Error({mensaje, setOpenModal}) {
  return (
    <div className='principal-error'>
        <img alt='error' className='error' src={LogoError}/>
        <h2>Ocurrio un error</h2>
        {mensaje}
        <button className='cerrar' onClick={()=>setOpenModal(false)}>Cerrar</button>
    </div>
  )
}

export {Error}