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

  return (
    <div className='principal-proveedores'>
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
            <button onClick={()=>setOpenModalEliminar(true)}
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
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            disableRowSelectionOnClick
          />
        </div>
      </div>
      <div className='screening'>
        <h2>Screening</h2>
        <label>Proveedor seleccionado</label>
        <textarea className='prov' 
        value={nombreSelected?nombreSelected:'Selecciona un proveedor'} readOnly/>
        <label>Seleccione una o mas fuentes</label>
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
        <button onClick={()=>setOpenModalScreening(true)}
            style={{ width: '90px'}}className='opcion'>Screening</button>
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
          <Eliminar openModal={openModalEliminar} setOpenModal={setOpenModalEliminar}
          proveedorId={proveedorSelected}/>
        </ModalBg>
      }
      {
        openModalScreening &&
        <ModalBg>
          <Screening openModal={openModalScreening} setOpenModal={setOpenModalScreening}
          name={nombreSelected} fuentes={fuentes}/>
        </ModalBg>
      }
    </div>
  )
}

export {GestionProveedores}