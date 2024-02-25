import React, { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const proveedorContext = createContext();
function ProveedorProvider ({children}){

  const [id, setId] = useState('');
  const [razonSocial, setRazonSocial] = useState('');
  const [NombreComercial, setNombreComercial] = useState('ZETA LIMITED');
  const [identificacionTributaria, setIdentificacionTributaria] = useState('');
  const [numeroTelefonico, setNumeroTelefonico] = useState('');
  const [correo, setCorreo] = useState('');
  const [web, setWeb] = useState('');
  const [direccion, setDireccion] = useState('');
  const [pais, setPais] = useState('');
  const [facturacion, setFacturacion] = useState('');
  const [fechaActualizacion, setFechaActualizacion] = useState('');


  const limpiarCampos = () =>{
    setId(null);
    setRazonSocial(null);
    setNombreComercial(null);
    setIdentificacionTributaria(null);
    setNumeroTelefonico(null);
    setCorreo(null);
    setWeb(null);
    setDireccion(null);
    setPais(null);
    setFacturacion(0.00);
    setFechaActualizacion('25/02/2024');
  }

  return (
    <proveedorContext.Provider
        value={{
          id, setId,
          razonSocial, setRazonSocial,
          NombreComercial, setNombreComercial,
          identificacionTributaria, setIdentificacionTributaria,
          numeroTelefonico, setNumeroTelefonico,
          correo, setCorreo,
          web, setWeb,
          direccion, setDireccion,
          pais, setPais,
          facturacion, setFacturacion,
          fechaActualizacion, setFechaActualizacion,
          limpiarCampos
        }}
    >
        {children}
    </proveedorContext.Provider>
  )
}

export {proveedorContext, ProveedorProvider}