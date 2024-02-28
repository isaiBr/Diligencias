import React, { useContext, useEffect, useState } from 'react'
import '../assets/Paginas/GestionProveedores.css'
import { ModalBg } from '../Modales/ModalBg';
import { Proveedor } from '../Formularios/Proveedor';
import Eliminar from '../Formularios/Eliminar';
import { axiosGetProveedores } from '../Api/Proveedor';
import { proveedorContext } from '../Context/ProveedorContext';
import { DataGrid } from '@mui/x-data-grid';
import { formatDate } from '../Componentes/DateUtils';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { Screening } from '../Formularios/Screening';
import { Alert } from '@mui/material';
import { AlertBg } from '../Modales/AlertBg';
import {Alerta} from '../Alertas/Alerta';
import Loading from '../Componentes/Loading';
import { Error } from '../Componentes/Error';


function GestionProveedores() {

  const {proveedores, setProveedores,
    textProveedorBuscar, setTextProveedorBuscar,
    provedoresEncontrados,
    actualizado, setActualizado
    } = useContext(proveedorContext);

  const [tipo, setTipo] = useState('nuevo');
  const [proveedorSelected, setProveedorSelected] = useState(0);

  const [openModalProveedor, setOpenModalProveedor] = useState(false);
  const [openModalEliminar, setOpenModalEliminar] = useState(false);
  const [openModalScreening, setOpenModalScreening] = useState(false);

  const[isLoading, setIsLoading] = useState(false);
  const[isError, setIsError] = useState(false);
  const [mensajeError, setMensajeError] = useState('');

  useEffect(()=>{
    setIsLoading(true)
    setIsError(false)
    axiosGetProveedores()
    .then((response)=>{
      const sortedRows = [...response.data].sort((a, b) => {
        const fechaA = new Date(a.fechaEdicion);
        const fechaB = new Date(b.fechaEdicion);
      
        return fechaB - fechaA; // Ordenar de mayor a menor
      });
      setProveedores(sortedRows)
    })
    .catch((error)=>{
      if(error.response){
        setMensajeError('Se produjo un error con codigo: ',error.response.status)
      }
      else if(error.request){
        setMensajeError('No hubo respuesta del servidor')
      }
      setIsError(true);
    })
    .finally(()=>{
      setIsLoading(false)
    })
  },[,actualizado])

  const [selectedRowId, setSelectedRowId] = useState(null);
  const [nombreSelected, setNombreSelected] = useState(null);

  const handleSelectionRow = (params) =>{
    setSelectedRowId(params.id);
    setNombreSelected(params.row.nombreComercial);
  }
  //Logica para la tabla de proveedores
  const columns = [
    {
      field: 'selection',
      headerName: '#',
      sortable: false,
      width: 60,
      align:'center',
      headerAlign:'center',
      renderCell: (params) => (
        <input
          type="radio"
          name="rowSelection"
          checked={params.id === selectedRowId}
          onChange={() => handleSelectionRow(params)}
        />
      ),
    },
    { field: 'id', headerName: 'Id', width: 90, editable:false, align:'center',
      headerAlign:'center',},
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
    }
  ];

  //Select Box de MUI
  const ITEM_HEIGHT = 40;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const names = [
    'Offshore Leaks',
    'The World Bank',
    'OFAC'
  ];

  function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }


    const theme = useTheme();
    const [fuentes, setFuentes] = useState([]);
  
    const handleChange = (event) => {
      const {
        target: { value },
      } = event;
      setFuentes(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
      );
    };

    const [openAlert, setOpenAlert] = useState(false);
    const [mensajeAlerta, setMensajeAlerta] = useState('');

    const abrirModalProveedores = (tipo, idRow) =>{
      if(idRow == null && tipo!='nuevo'){
        setMensajeAlerta('Debe seleccionar un proveedor')
        setOpenAlert(true);
        return
      }
      setTipo(tipo);
      setProveedorSelected(idRow);
      setOpenModalProveedor(true);
    }

    const realizarScreening = () =>{
      if(nombreSelected == null){
        setMensajeAlerta('Debe seleccionar un proveedor')
        setOpenAlert(true);
        return
      }
      if(fuentes.length<1){
        setMensajeAlerta('Debe seleccionar minimo una fuente')
        setOpenAlert(true);
        return
      }
      setOpenModalScreening(true);
    }

    const realizarEliminacion = (id) =>{
      if(id == null){
        setMensajeAlerta('Debe seleccionar un proveedor')
        setOpenAlert(true);
        return
      }
      setProveedorSelected(id);
      setOpenModalEliminar(true);
    }

  return (
    <div className='principal-proveedores'>
      {isLoading?
        <Loading/>
        :
        isError?
        <Error mensaje={mensajeError} boton={false}/>
        :
        <>
        <div className='lista'>
          <div className='superior'>
            <h2>Lista de proveedores</h2>
          </div>
          <div className='botoneria'>
            <div className='agregar'>
              <button style={{ width: '150px'}}
                onClick={()=>abrirModalProveedores('nuevo')} className='opcion'>Nuevo proveedor</button>
            </div>
            <div className='opciones'>
              <button onClick={()=>abrirModalProveedores('ver', selectedRowId)}
                style={{ width: '50px'}}className='opcion'>Ver</button>
              <button onClick={()=>abrirModalProveedores('editar',selectedRowId)}
                style={{ width: '70px'}}className='opcion'>Editar</button>
              <button onClick={()=>realizarEliminacion(selectedRowId)}
                style={{ width: '80px'}}className='opcion'>Eliminar</button>
              
            </div>
          </div>
          <div className='lista-proveedores'>
            <DataGrid
              rows={proveedores}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 10,
                  },
                },
              }}
              pageSizeOptions={[10]}
              disableRowSelectionOnClick
              autoHeight
            />
          </div>
        </div>
        <div className='screening'>
          <h2>Screening</h2>
          <label>Proveedor seleccionado</label>
          <textarea className='prov' 
          value={nombreSelected?nombreSelected:'Selecciona un proveedor'} readOnly/>
          <label>Seleccione una o más fuentes</label>
          <Select
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            multiple
            value={fuentes}
            onChange={handleChange}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
            sx={{width:'100%'}}
          >
            {names.map((name) => (
              <MenuItem
                key={name}
                value={name}
                style={getStyles(name, fuentes, theme)}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
          <button onClick={()=>realizarScreening()}
              style={{ width: '90px'}}className='opcion'>Screening</button>
        </div>
        </>
      }
      {
        openModalProveedor &&
        <ModalBg>
          <Proveedor openModal={openModalProveedor} setOpenModal={setOpenModalProveedor} 
          tipo={tipo} proveedorId={proveedorSelected} 
          setOpenAlert={setOpenAlert} setMensajeAlerta={setMensajeAlerta}/>
        </ModalBg>
      }
      {
        openModalEliminar &&
        <ModalBg>
          <Eliminar openModal={openModalEliminar} setOpenModal={setOpenModalEliminar}
          proveedorId={proveedorSelected} 
          setOpenAlert={setOpenAlert} setMensajeAlerta={setMensajeAlerta}/>
        </ModalBg>
      }
      {
        openModalScreening &&
        <ModalBg>
          <Screening openModal={openModalScreening} setOpenModal={setOpenModalScreening}
          name={nombreSelected} fuentes={fuentes}/>
        </ModalBg>
      }
      {
        openAlert &&
        <AlertBg>
          <Alerta openAlert={openAlert} setOpenAlert={setOpenAlert} 
          mensajeAlerta={mensajeAlerta}/>
        </AlertBg>
      }

    </div>
  )
}

export {GestionProveedores}