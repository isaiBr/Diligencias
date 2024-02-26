import React, { useState, useContext, useEffect } from 'react'
import '../assets/Formularios/Proveedor.css'
import { proveedorContext } from '../Context/ProveedorContext';
import { axiosGetProveedorPorId, axiosUpdateProveedor } from '../Api/Proveedor';
import { formatDate } from '../Componentes/DateUtils';

function Proveedor({openModal, setOpenModal,tipo, proveedorId}) {


  const tituloModal = 
    tipo=='nuevo'?'Crear nuevo proveedor'
    :tipo=='ver'?'Datos del proveedor'
    :tipo=='editar'?'Editar información':'';

  //Variables para cargar la información
  const {
    proveedor, setProveedor,
    limpiarCampos,
    paises
    } = useContext(proveedorContext);

    
    //Debe ejecutarse siempre que se cargue la pagina
    useEffect(()=>{
      console.log(tipo)
      limpiarCampos();
      if(tipo=='nuevo'){
        //Limpiar todos los campos que se van a utilizar
        limpiarCampos();
      }
      else if(tipo=='editar' || tipo=='ver'){
        // console.log(proveedorId);
        axiosGetProveedorPorId(proveedorId)
        .then((response)=>{
          console.log(response.data);
          setProveedor(response.data);
        })
        .catch((error)=>{
          console.error(error);
        })
      }
    },[])

    

  //Lógica para poder realizar las validaciones correctas
  const [identificacionValida, setIdentificacionValida] = useState(true);
  const [razonSocialValida, setRazonSocialValida] = useState(true);
  const [nombreComercialValido, setNombreComercialValido] = useState(true);
  const [direccionFisicaValida, setDireccionFisicaValida] = useState(true);
  const [telefonoValido, setTelefonoValido] = useState(true);
  const [sitioWebValido, setSitioWebValido] = useState(true);
  const [correoValido, setCorreoValido] = useState(true);
  const [facturacionValida, setFacturacionValida] = useState(true);
  const [paisValido, setPaisValido] = useState(true);
  
  const handleInputChange = (campo, valor) =>{

    const numericoCantRegex = /^\d{11}$/
    const alfanumericoRegex =/^[a-zA-Z0-9]+$/;
    const alfanumericoConEspaciosRegex = /^[a-zA-Z0-9\s]+$/;
    const soloNumerosRegex = /^\d+$/;
    const correoElectronicoRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const enlaceSitioWebRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    const formatoContableRegex = /^\d{1,3}(,\d{3})*(\.\d{2})?$/;


    if(campo=="identificacionTributaria"){
      if(!numericoCantRegex.test(valor))setIdentificacionValida(false);
      else setIdentificacionValida(true);
    }
    else if(campo=="razonSocial"){
      if(!alfanumericoRegex.test(valor)) setRazonSocialValida(false)
      else setRazonSocialValida(true);
    }
    else if(campo=="nombreComercial"){
      if(!alfanumericoRegex.test(valor)) setNombreComercialValido(false)
      else setNombreComercialValido(true);
    }
    else if(campo=="direccionFisica"){
      if(!alfanumericoConEspaciosRegex.test(valor)) setDireccionFisicaValida(false)
      else setDireccionFisicaValida(true);
    }
    else if(campo=="sitioWeb"){
      if(!enlaceSitioWebRegex.test(valor)) setSitioWebValido(false)
      else setSitioWebValido(true);
    }
    else if(campo=="telefono"){
      if(!soloNumerosRegex.test(valor)) setTelefonoValido(false)
      else setTelefonoValido(true);
    }
    else if(campo=="correo"){
      if(!correoElectronicoRegex.test(valor)) setCorreoValido(false)
      else setCorreoValido(true);
    }
    else if(campo=="facturacion"){
      if(!formatoContableRegex.test(valor)) setFacturacionValida(false)
      else setFacturacionValida(true);
    }

    //Actualizar de todas maneras el campo para una posible modificación
    setProveedor({
      ...proveedor,
      [campo]: valor,
    });
  }


  //Funcion para manejar el Guardar del Form
  const onSubmit = (event) =>{
    event.preventDefault();

    axiosUpdateProveedor(proveedorId, proveedor)
    .then((response)=>{
      console.log("actualizado");
    })
    .catch((error)=>{
      console.log(error);
    })
    limpiarCampos();
    openModal(false);
  }


  return (
    <form className='principal-proveedor' onSubmit={onSubmit}>
      <h2>{tituloModal}</h2>
      <div className='bloque-datos'>
        <div className='label-input'>
          <label>Razón social</label>
          <input type='text' disabled={tipo==='ver'}
          defaultValue={tipo=='nuevo'?null:proveedor.razonSocial}
          onChange={(event)=>handleInputChange("razonSocial",event.target.value)}/>
          {!razonSocialValida && <p>El campo solo admite letras y números*</p>}
        </div>
        <div className='label-input'>
          <label>Nombre comercial</label>
          <input type='text' disabled={tipo==='ver'}
          defaultValue={tipo=='nuevo'?null:proveedor.nombreComercial}
          onChange={(event)=>handleInputChange("nombreComercial",event.target.value)}/>
          {!nombreComercialValido && <p>El campo solo admite letras y números*</p>}
        </div>
        <div className='label-input'>
          <label>Identificación tributaria</label>
          <input type='text' disabled={tipo==='ver'}
          defaultValue={tipo=='nuevo'?null:proveedor.identificacionTributaria}
          onChange={(event)=>handleInputChange("identificacionTributaria",event.target.value)}/>
          {!identificacionValida && <p>El campo es numérico y debe ser de 11 dígitos*</p>}
        </div>
        <div className='label-input'>
          <label>Número telefónico</label>
          <input type='text' disabled={tipo==='ver'}
          defaultValue={tipo=='nuevo'?null:proveedor.numeroTelefonico}
          onChange={(event)=>handleInputChange("telefono",event.target.value)}/>
          {!telefonoValido && <p>El campo debe ser un número de teléfono*</p>}
        </div>
        <div className='label-input'>
          <label>Correo electrónico</label>
          <input type='text' disabled={tipo==='ver'}
          defaultValue={tipo=='nuevo'?null:proveedor.correoElectronico}
          onChange={(event)=>handleInputChange("correo",event.target.value)}/>
          {!correoValido && <p>Ingrese un formato de correo válido*</p>}
        </div>
        <div className='label-input'>
          <label>País</label>
          <select disabled={tipo==='ver'}
            id="pais"
            name="pais"
            value={proveedor.pais?proveedor.pais:paises[0].nombre}
            onChange={(e) => handleInputChange("pais", e.target.value)}>
              {paises.map((pais) => (
                <option key={pais.id} value={pais.nombre}>
                  {pais.nombre}
                </option>
              ))}
          </select>
        </div>
        <div className='label-input'>
          <label>Dirección física</label>
          <input type='text' disabled={tipo==='ver'}
          defaultValue={tipo=='nuevo'?null:proveedor.direccionFisica}
          onChange={(event)=>handleInputChange("direccionFisica",event.target.value)}/>
          {!direccionFisicaValida && <p>EL campo solo admite letras y números</p>}
        </div>
        <div className='label-input'>
          <label>Sitio web</label>
          <input type='text' disabled={tipo==='ver'}
          defaultValue={tipo=='nuevo'?null:proveedor.sitioWeb}
          onChange={(event)=>handleInputChange("sitioWeb",event.target.value)}/>
          {!sitioWebValido && <p>EL campo debe ser un enlace válido</p>}
          {sitioWebValido && proveedor.sitioWeb && (
            <p className='enlace'>
              Enlace: <a href={proveedor.sitioWeb} target="_blank" rel="noopener noreferrer">{proveedor.sitioWeb}</a>
            </p>
          )}
        </div>
        <div className='label-input'>
          <label>Facturación anual ($)</label>
          <input type='text' disabled={tipo==='ver'}
          defaultValue={tipo=='nuevo'?null:proveedor.facturacionAnual}
          onChange={(event)=>handleInputChange("facturacion",event.target.value)}/>
          {!facturacionValida && <p>El campo debe estar en formato contable*</p>}
        </div>
      </div>
      <div className='footer'>
        <span>Última actualización: {formatDate(proveedor.fechaEdicion)}</span>
        <div className='botones'>
          <button type='submit' onClick={()=>setOpenModal(false)}>Guardar</button>
          <button type='button' onClick={()=>setOpenModal(false)}>Cancelar</button>
        </div>
      </div>
    </form>
  )
}

export {Proveedor}