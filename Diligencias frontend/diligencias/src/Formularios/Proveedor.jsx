import React, { useState, useContext, useEffect } from 'react'
import '../assets/Formularios/Proveedor.css'
import { proveedorContext } from '../Context/ProveedorContext';
import { axiosGetProveedorPorId, axiosPostProveedor, axiosUpdateProveedor } from '../Api/Proveedor';
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
    paises,
    actualizado, setActualizado
    } = useContext(proveedorContext);

    
    //Debe ejecutarse siempre que se cargue la pagina
    useEffect(()=>{
      limpiarCampos();
      if(tipo=='nuevo'){
        //Limpiar todos los campos que se van a utilizar
        limpiarCampos();
      }
      else if(tipo=='editar' || tipo=='ver'){
        // console.log(proveedorId);
        axiosGetProveedorPorId(proveedorId)
        .then((response)=>{
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

  const[camposValidos, setCamposValidos] = useState(true);
  const[camposVacios, setCamposVacios] = useState(false);
  
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
    else if(campo=="numeroTelefonico"){
      if(!soloNumerosRegex.test(valor)) setTelefonoValido(false)
      else setTelefonoValido(true);
    }
    else if(campo=="correoElectronico"){
      if(!correoElectronicoRegex.test(valor)) setCorreoValido(false)
      else setCorreoValido(true);
    }
    else if(campo=="facturacionAnual"){
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

    setCamposValidos(true);

    if(!validarCampos()){
      setCamposValidos(false);
      return;
    }
    setCamposValidos(true);
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString();
    const body = {
      "razonSocial": proveedor.razonSocial,
      "nombreComercial": proveedor.nombreComercial,
      "identificacionTributaria": proveedor.identificacionTributaria,
      "numeroTelefonico":proveedor.numeroTelefonico,
      "correoElectronico": proveedor.correoElectronico,
      "sitioWeb": proveedor.sitioWeb,
      "direccionFisica": proveedor.direccionFisica,
      "pais": proveedor.pais,
      "facturacionAnual": parseFloat(proveedor.facturacionAnual.replace(/,/g, '')),
      "fechaEdicion": formattedDate
    }

    if(tipo==='nuevo'){
      axiosPostProveedor(body)
        .then((response)=>{
          setActualizado(!actualizado);
        })
        .catch((error)=>{
          console.log(error);
        })
    }
    else if(tipo==='editar'){
      axiosUpdateProveedor(proveedorId, body)
      .then((response)=>{
        setActualizado(!actualizado);
      })
      .catch((error)=>{
        console.log(error);
      })
    }
    cerrarModal();
  }

  const cerrarModal = () =>{
    limpiarCampos();
    setOpenModal(false);
  }

  const validarCampos = () => {
    // if(proveedor.razonSocial=='' || proveedor.nombreComercialValido==''){
    //   setCamposVacios(true);
    //   return false;
    // };
    // if(!(razonSocialValida && nombreComercialValido && identificacionValida
    // && telefonoValido && correoValido && direccionFisicaValida && sitioWebValido
    // && facturacionValida)){
    //   setCamposValidos(false);
    //   return false;
    // } 
    
    // return true;

    return (razonSocialValida && nombreComercialValido && identificacionValida
      && telefonoValido && correoValido && direccionFisicaValida && sitioWebValido
      && facturacionValida)
      &&
      (proveedor.razonSocial!='' && proveedor.nombreComercialValido!='')
  };


  return (
    <form className='principal-proveedor' onSubmit={onSubmit}>
      <h2>{tituloModal}</h2>
      <div className='bloque-datos'>
        <div className='label-input'>
          <label>Razón social*</label>
          <input type='text' disabled={tipo==='ver'}
          value={proveedor.razonSocial}
          onChange={(event)=>handleInputChange("razonSocial",event.target.value)}/>
          {!razonSocialValida && <p>El campo solo admite letras y números*</p>}
        </div>
        <div className='label-input'>
          <label>Nombre comercial*</label>
          <input type='text' disabled={tipo==='ver'}
          value={proveedor.nombreComercial}
          onChange={(event)=>handleInputChange("nombreComercial",event.target.value)}/>
          {!nombreComercialValido && <p>El campo solo admite letras y números*</p>}
        </div>
        <div className='label-input'>
          <label>Identificación tributaria</label>
          <input type='text' disabled={tipo==='ver'}
          value={proveedor.identificacionTributaria}
          onChange={(event)=>handleInputChange("identificacionTributaria",event.target.value)}/>
          {!identificacionValida && <p>El campo es numérico y debe ser de 11 dígitos*</p>}
        </div>
        <div className='label-input'>
          <label>Número telefónico</label>
          <input type='text' disabled={tipo==='ver'}
          value={proveedor.numeroTelefonico}
          onChange={(event)=>handleInputChange("numeroTelefonico",event.target.value)}/>
          {!telefonoValido && <p>El campo debe ser un número de teléfono*</p>}
        </div>
        <div className='label-input'>
          <label>Correo electrónico</label>
          <input type='text' disabled={tipo==='ver'}
          value={proveedor.correoElectronico}
          onChange={(event)=>handleInputChange("correoElectronico",event.target.value)}/>
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
          value={proveedor.direccionFisica}
          onChange={(event)=>handleInputChange("direccionFisica",event.target.value)}/>
          {!direccionFisicaValida && <p>EL campo solo admite letras y números</p>}
        </div>
        <div className='label-input'>
          <label>Sitio web</label>
          <input type='text' disabled={tipo==='ver'}
          value={proveedor.sitioWeb}
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
          value={proveedor.facturacionAnual}
          onChange={(event)=>handleInputChange("facturacionAnual",event.target.value)}/>
          {!facturacionValida && <p>El campo debe estar en formato contable*</p>}
        </div>
      </div>
      <div className='footer'>
        <span>Última actualización: {formatDate(proveedor.fechaEdicion)}</span>
        <div className='botones'>
          {!camposValidos && <p>Corregir campos inválidos o vacíos</p>}
          {tipo!='ver' && <button type='submit'>{tipo=='editar'?'Actualizar':'Guardar'}</button>}
          <button type='button' onClick={()=>cerrarModal()}>Cancelar</button>
        </div>
      </div>
    </form>
  )
}

export {Proveedor}