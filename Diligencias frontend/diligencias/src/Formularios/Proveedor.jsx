import React from 'react'
import '../assets/Formularios/Proveedor.css'

function Proveedor({openModal, setOpenModal}) {

  const tituloModal = 'Crear nuevo proveedor'
  return (
    <form className='principal-proveedor'>
      <h2>{tituloModal}</h2>
      <div className='bloque-datos'>
        <div className='label-input'>
          <label>Razón social</label>
          <input type='text'/>
        </div>
        <div className='label-input'>
          <label>Nombre comercial</label>
          <input type='text'/>
        </div>
        <div className='label-input'>
          <label>Identificación tributaria</label>
          <input type='text'/>
        </div>
        <div className='label-input'>
          <label>Número telefónico</label>
          <input type='text'/>
        </div>
        <div className='label-input'>
          <label>Correo electrónico</label>
          <input type='text'/>
        </div>
        <div className='label-input'>
          <label>País</label>
          <input type='text'/>
        </div>
        <div className='label-input'>
          <label>Dirección física</label>
          <input type='text'/>
        </div>
        <div className='label-input'>
          <label>Sitio web</label>
          <input type='text'/>
        </div>
        <div className='label-input'>
          <label>Facturación anual ($)</label>
          <input type='text'/>
        </div>
      </div>
      <div className='footer'>
        <span>Última actualización: </span>
        <div className='botones'>
          <button type='submit' onClick={()=>setOpenModal(false)}>Guardar</button>
          <button type='button' onClick={()=>setOpenModal(false)}>Cancelar</button>
        </div>
      </div>
    </form>
  )
}

export {Proveedor}