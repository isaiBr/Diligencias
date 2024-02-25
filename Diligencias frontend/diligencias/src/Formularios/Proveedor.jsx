import React, { useContext, useEffect } from 'react'
import '../assets/Formularios/Proveedor.css'
import { proveedorContext } from '../Context/ProveedorContext';

function Proveedor({openModal, setOpenModal,tipo}) {


  const tituloModal = 
    tipo=='nuevo'?'Crear nuevo proveedor'
    :tipo=='ver'?'Datos del proveedor'
    :tipo='editar'?'Editar información':'';

  //Variables para cargar la información
  const {id, setId,
    razonSocial, setRazonSocial,
    NombreComercial, setNombreComercial,
    identificacionTributaria, setIdentificacionTributaria,
    numeroTelefonico, setNumeroTelefonico,
    correo, setCorreo,
    web, setWeb,
    direccion, setDireccion,
    pais, setPais,
    facturacion, setFacturacion,
    fechaActualizacion, setFechaActualizacions,
    limpiarCampos
    } = useContext(proveedorContext);

    
    //Debe ejecutarse siempre que se cargue la pagina
    useEffect(()=>{
      if(tipo=='nuevo'){
        //Limpiar todos los campos que se van a utilizar
        limpiarCampos();

      }
      else if(tipo=='editar' || tipo=='ver'){
      }
    },[])

    


  return (
    <form className='principal-proveedor'>
      <h2>{tituloModal}</h2>
      <div className='bloque-datos'>
        <div className='label-input'>
          <label>Razón social</label>
          <input type='text' 
          defaultValue={tipo=='nuevo'?null:razonSocial}
          onChange={(event)=>setRazonSocial(event.target.value)}/>
        </div>
        <div className='label-input'>
          <label>Nombre comercial</label>
          <input type='text' readOnly={tipo==='ver'}
          defaultValue={tipo=='nuevo'?null:NombreComercial}
          onChange={(event)=>setNombreComercial(event.target.value)}/>
        </div>
        <div className='label-input'>
          <label>Identificación tributaria</label>
          <input type='text' readOnly={tipo==='ver'}
          defaultValue={tipo=='nuevo'?null:identificacionTributaria}
          onChange={(event)=>setIdentificacionTributaria(event.target.value)}/>
        </div>
        <div className='label-input'>
          <label>Número telefónico</label>
          <input type='text' readOnly={tipo==='ver'}
          defaultValue={tipo=='nuevo'?null:numeroTelefonico}
          onChange={(event)=>setNumeroTelefonico(event.target.value)}/>
        </div>
        <div className='label-input'>
          <label>Correo electrónico</label>
          <input type='text' readOnly={tipo==='ver'}
          defaultValue={tipo=='nuevo'?null:correo}
          onChange={(event)=>setCorreo(event.target.value)}/>
        </div>
        <div className='label-input'>
          <label>País</label>
          <input type='text' readOnly={tipo==='ver'}
          defaultValue={tipo=='nuevo'?null:pais}
          onChange={(event)=>setPais(event.target.value)}/>
        </div>
        <div className='label-input'>
          <label>Dirección física</label>
          <input type='text' readOnly={tipo==='ver'}
          defaultValue={tipo=='nuevo'?null:direccion}
          onChange={(event)=>setDireccion(event.target.value)}/>
        </div>
        <div className='label-input'>
          <label>Sitio web</label>
          <input type='text' readOnly={tipo==='ver'}
          defaultValue={tipo=='nuevo'?null:web}
          onChange={(event)=>setWeb(event.target.value)}/>
        </div>
        <div className='label-input'>
          <label>Facturación anual ($)</label>
          <input type='text' readOnly={tipo==='ver'}
          defaultValue={tipo=='nuevo'?null:facturacion}
          onChange={(event)=>setFacturacion(event.target.value)}/>
        </div>
      </div>
      <div className='footer'>
        <span>Última actualización: {fechaActualizacion}</span>
        <div className='botones'>
          <button type='submit' onClick={()=>setOpenModal(false)}>Guardar</button>
          <button type='button' onClick={()=>setOpenModal(false)}>Cancelar</button>
        </div>
      </div>
    </form>
  )
}

export {Proveedor}