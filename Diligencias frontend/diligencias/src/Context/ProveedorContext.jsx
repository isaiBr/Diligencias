import { format } from 'date-fns';
import React, { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const proveedorContext = createContext();
function ProveedorProvider ({children}){

  const currentDate = new Date();
  // const fechaFormateada = currentDate.toISOString();
  const fechaFormateada = format(currentDate, 'yyyy-MM-dd HH:mm:ss', { timeZone: 'America/Lima' });

  const [proveedores, setProveedores] = useState([]);
  const [proveedor, setProveedor] = useState({
    id:'',
    razonSocial: '',
    nombreComercial: '',
    identificacionTributaria: '',
    numeroTelefonico: '',
    correoElectronico: '',
    sitioWeb: '',
    direccionFisica: '',
    pais: '',
    facturacionAnual: '',
    fechaEdicion: fechaFormateada,
  });

  const limpiarCampos = () =>{
    setProveedor({
      id:'',
      razonSocial: '',
      nombreComercial: '',
      identificacionTributaria: '',
      numeroTelefonico: '',
      correoElectronico: '',
      sitioWeb: '',
      direccionFisica: '',
      pais: '',
      facturacionAnual: '',
      fechaEdicion: fechaFormateada,
    })
  }

  const [actualizado, setActualizado] = useState(1);

  const paises = [
    { id: 1, nombre: "Perú" },
    { id: 2, nombre: "Argentina" },
    { id: 3, nombre: "Brasil" },
    { id: 4, nombre: "Colombia" },
    { id: 5, nombre: "España" },
    { id: 6, nombre: "Estados Unidos" },
    { id: 7, nombre: "México" },
  ];

  //Lógica para el buscador
  const [textProveedorBuscar, setTextProveedorBuscar] = useState('');

  const provedoresEncontrados = proveedores.filter(
    (proveedor)=>{
      return proveedor.nombreComercial.toLowerCase().includes(textProveedorBuscar.toLocaleLowerCase());
    }
  )

  return (
    <proveedorContext.Provider
        value={{
          proveedor, setProveedor,
          limpiarCampos,
          proveedores, setProveedores,
          textProveedorBuscar, setTextProveedorBuscar,
          provedoresEncontrados,
          paises,
          actualizado, setActualizado
        }}
    >
        {children}
    </proveedorContext.Provider>
  )
}

export {proveedorContext, ProveedorProvider}