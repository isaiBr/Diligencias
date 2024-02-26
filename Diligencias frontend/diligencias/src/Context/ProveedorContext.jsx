import React, { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const proveedorContext = createContext();
function ProveedorProvider ({children}){

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
    fechaUltimaEdicion: '',
  });

  const limpiarCampos = () =>{
    const fechaActual = new Date();
    // Formatea la fecha como dd/mm/yyyy
    const dia = fechaActual.getDate().toString().padStart(2, '0');
    const mes = (fechaActual.getMonth() + 1).toString().padStart(2, '0'); // Los meses son indexados desde 0
    const anio = fechaActual.getFullYear();
    const fechaFormateada = `${dia}/${mes}/${anio}`;

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
      fechaUltimaEdicion: fechaFormateada,
    })
  }

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
          paises
        }}
    >
        {children}
    </proveedorContext.Provider>
  )
}

export {proveedorContext, ProveedorProvider}