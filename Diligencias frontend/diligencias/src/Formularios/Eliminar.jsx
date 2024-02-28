import React, { useContext } from 'react'
import '../assets/Formularios/Eliminar.css'
import LogoAdvertencia from '../Imagenes/advertencia.png'
import { axiosDeleteProveedor } from '../Api/Proveedor';
import { proveedorContext } from '../Context/ProveedorContext';


function Eliminar({openModal, setOpenModal,proveedorId,setOpenAlert,setMensajeAlerta}) {
  const {
    actualizado, setActualizado,
    limpiarCampos
    } = useContext(proveedorContext);

  const eliminarProveedor = () =>{
    axiosDeleteProveedor(proveedorId)
    .then((response)=>{
      setActualizado(!actualizado);
      setMensajeAlerta('Proveedor eliminado correctamente')
      setOpenAlert(true)
      cerrarModal();
    })
    .catch((error)=>{
      console.log(error);
    })
  }

  const cerrarModal = () =>{
    limpiarCampos();
    setOpenModal(false);
  }
  return (
    <div className='principal-eliminar'>
      <img className='logo-advertencia' src={LogoAdvertencia} alt='logo advertencia'/>
      <h2>¿Seguro que desea eliminar este proveedor?</h2>
      <p>Una vez eliminado no se podrá recuperar la información</p>
      <button  className='confirmar' onClick={()=>{eliminarProveedor()}}>Eliminar</button>
      <button className='cancelar' onClick={()=>{cerrarModal()}}>Cancelar</button>

    </div>
  )
}

export default Eliminar