import React, { useContext, useEffect, useState } from 'react'
import '../assets/Paginas/GestionProveedores.css'
import { ModalBg } from '../Modales/ModalBg';
import { Proveedor } from '../Formularios/Proveedor';
import Eliminar from '../Formularios/Eliminar';
import { axiosGetProveedores } from '../Api/Proveedor';
import { proveedorContext } from '../Context/ProveedorContext';
import { DataGrid } from '@mui/x-data-grid';
import { formatDate } from '../Componentes/DateUtils';


function GestionProveedores() {

  const {proveedores, setProveedores,
    textProveedorBuscar, setTextProveedorBuscar,
    provedoresEncontrados
    } = useContext(proveedorContext);

  const [tipo, setTipo] = useState('nuevo');
  const [proveedorSelected, setProveedorSelected] = useState(0);

  const [openModalProveedor, setOpenModalProveedor] = useState(false);
  const [openModalEliminar, setOpenModalEliminar] = useState(false);


  const abrirModalProveedores = (tipo, idRow) =>{
    setTipo(tipo);
    setProveedorSelected(idRow);
    setOpenModalProveedor(true);
  }

  useEffect(()=>{
    axiosGetProveedores()
    .then((response)=>{
      setProveedores(response.data);
    })
    .catch((error)=>{
      console.error(error);
    })
  },[])

  //Logica para la tabla de proveedores
  const columns = [
    { field: 'id', headerName: 'Id', width: 90, editable:false},
    {
      field: 'nombreComercial',
      headerName: 'Nombre',
      align:'center',
      headerAlign:'center',
      width: 400,
      editable: false,
    },
    {
      field: 'fechaEdicion',
      headerName: 'Fecha de edición',
      valueFormatter:(params) =>formatDate(params.value),
      align:'center',
      headerAlign:'center',
      width: 200,
      editable: false,
    },
    {
      field:'buttonColumn',
      headerName:'Opciones',
      align:'center',
      headerAlign:'center',
      width:690,
      renderCell:ButtonCell
    }
  ];

  function ButtonCell(params) {
    // Aquí puedes personalizar el contenido de la celda
    return (
      <div className='opciones'>
        <button onClick={()=>abrirModalProveedores('ver', params.row.id)}
          style={{ width: '50px'}}className='opcion'>Ver</button>
        <button onClick={()=>abrirModalProveedores('editar',params.row.id)}
          style={{ width: '70px'}}className='opcion'>Editar</button>
        <button onClick={()=>setOpenModalEliminar(true)}
          style={{ width: '80px'}}className='opcion'>Eliminar</button>
        <button onClick={()=>setOpenModal(true)}
          style={{ width: '90px'}}className='opcion'>Screening</button>
      </div>
    );
  }

  return (
    <div className='principal-proveedores'>
      <div className='superior'>
        <h2>Lista de proveedores</h2>
        <button style={{ width: '150px'}}
          onClick={()=>abrirModalProveedores('nuevo')} className='opcion'>Nuevo proveedor</button>
      </div>
      <div className='lista-proveedores'>
        <DataGrid
          rows={proveedores}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          disableRowSelectionOnClick
        />
      </div>
      {
        openModalProveedor &&
        <ModalBg>
          <Proveedor openModal={openModalProveedor} setOpenModal={setOpenModalProveedor} 
          tipo={tipo} proveedorId={proveedorSelected}/>
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