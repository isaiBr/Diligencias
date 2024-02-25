import React from 'react'
import '../assets/Formularios/Eliminar.css'
import LogoAdvertencia from '../Imagenes/advertencia.png'


function Eliminar({openModal, setOpenModal}) {
  return (
    <div className='principal-eliminar'>
      <img className='logo-advertencia' src={LogoAdvertencia} alt='logo advertencia'/>
      <h2>¿Seguro que desea eliminar este proveedor?</h2>
      <p>Una vez eliminado no se podrá recuperar la información</p>
      <button  className='confirmar' onClick={()=>{setOpenModal(false)}}>Eliminar</button>
      <button className='cancelar' onClick={()=>{setOpenModal(false)}}>Cancelar</button>

    </div>
  )
}

export default Eliminar