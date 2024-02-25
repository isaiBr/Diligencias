import React, { useState } from 'react'
import '../assets/Paginas/GestionProveedores.css'
import { ModalBg } from '../Modales/ModalBg';
import { Proveedor } from '../Formularios/Proveedor';
import Eliminar from '../Formularios/Eliminar';

function GestionProveedores() {

  const listaDeElementos = [
    { id: 1, nombre: 'ZETA', ultimaActualizacion: '25/02/2024' },
    { id: 2, nombre: 'LIMITED', ultimaActualizacion: '25/02/2024' },
    { id: 3, nombre: 'OTRA', ultimaActualizacion: '25/02/2024' },
    { id: 4, nombre: 'ZETA', ultimaActualizacion: '25/02/2024' },
    { id: 5, nombre: 'LIMITED', ultimaActualizacion: '25/02/2024' },
    { id: 6, nombre: 'OTRA', ultimaActualizacion: '25/02/2024' },
    
    // Agrega más elementos según sea necesario
  ];

  const [tipo, setTipo] = useState('nuevo');

  const [openModalProveedor, setOpenModalProveedor] = useState(false);
  const [openModalEliminar, setOpenModalEliminar] = useState(false);

  const abrirModalProveedores = (tipo) =>{
    setTipo(tipo);
    setOpenModalProveedor(true);
  }

  return (
    <div className='principal-proveedores'>
      <div className='superior'>
        <input type='text' className='buscador' placeholder='Ingresar proveedor'/>
        <button style={{ width: '150px'}}
          onClick={()=>abrirModalProveedores('nuevo')}>Nuevo proveedor</button>
      </div>
      <div className='lista-proveedores'>
        <table className='tabla-proveedores'>
          <thead className='encabezados'>
            <tr>
              <th style={{ width: '5%', minWidth:'10px'}}>id</th>
              <th style={{ width: '35%', minWidth:'200px'}}>Nombre</th>
              <th style={{ width: '20%', minWidth:'150px'}}>Última edición</th>
              <th style={{ width: '40%', minWidth:'300px'}}>Opciones</th>
            </tr>
          </thead>
          <tbody className='informacion'>
            {
              listaDeElementos.map((elemento) => (
                <tr key={elemento.id} className='elemento'>
                  <td className='id' >{elemento.id}</td>
                  <td className='nombre'>{elemento.nombre}</td>
                  <td className='ultima-edicion'>{elemento.ultimaActualizacion}</td>
                  <td className='opciones'>
                    <button onClick={()=>abrirModalProveedores('ver',elemento)}
                      style={{ width: '50px'}}>Ver</button>
                    <button onClick={()=>abrirModalProveedores('editar',elemento)}
                      style={{ width: '70px'}}>Editar</button>
                    <button onClick={()=>setOpenModalEliminar(true)}
                      style={{ width: '80px'}}>Eliminar</button>
                    <button onClick={()=>setOpenModal(true)}
                      style={{ width: '90px'}}>Screening</button>
                  </td>
                </tr>
              ))  
            }
          </tbody>
        </table>
      </div>
      {
        openModalProveedor &&
        <ModalBg>
          <Proveedor openModal={openModalProveedor} setOpenModal={setOpenModalProveedor} tipo={tipo}/>
        </ModalBg>
      }
      {
        openModalEliminar &&
        <ModalBg>
          <Eliminar openModal={openModalEliminar} setOpenModal={setOpenModalEliminar}/>
        </ModalBg>
      }
    </div>
  )
}

export {GestionProveedores}