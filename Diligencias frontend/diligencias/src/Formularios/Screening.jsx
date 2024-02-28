import React, { useEffect, useState } from 'react'
import '../assets/Formularios/Screening.css'
import { axiosGetScrapperOfac, axiosGetScrapperOffShore, axiosGetScrapperWorldBank } from '../Api/Scrapper';
import { DataGrid } from '@mui/x-data-grid';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import Loading from '../Componentes/Loading';
import { Error } from '../Componentes/Error';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function Screening({openModal, setOpenModal,name, fuentes}) {

  const columnsOffshore = [
    { field: 'entity', headerName: 'Entity', width: 300, editable:false, align:'center',
      headerAlign:'center',},
    {
      field: 'jurisdiction',
      headerName: 'Jurisdiction',
      align:'center',
      headerAlign:'center',
      width: 200,
      editable: false,
    },
    {
      field: 'linkedTo',
      headerName: 'Linked To',
      align:'center',
      headerAlign:'center',
      width: 200,
      editable: false,
    },
    {
      field: 'dataFrom',
      headerName: 'Data From',
      align:'center',
      headerAlign:'center',
      width: 200,
      editable: false,
    }
  ];

  const [datosOffshore, setDatosOffShore] = useState([{
    'id':'',
    'entity':'',
    'jurisdiction':'',
    'linkedTo':'',
    'dataFrom':''
  }]);

  const columnsWorldBank = [
    { field: 'firmName', 
      headerName: 'Firm Name', 
      width: 400, 
      editable:false, 
      align:'center',
      headerAlign:'center',
    },
    {
      field: 'address',
      headerName: 'Address',
      align:'center',
      headerAlign:'center',
      width: 400,
      editable: false,
    },
    {
      field: 'country',
      headerName: 'Country',
      align:'center',
      headerAlign:'center',
      width: 200,
      editable: false,
    },
    {
      field: 'fromDate',
      headerName: 'From Date',
      align:'center',
      headerAlign:'center',
      width: 200,
      editable: false,
    },
    {
      field: 'toDate',
      headerName: 'To Date',
      align:'center',
      headerAlign:'center',
      width: 200,
      editable: false,
    },
    {
      field: 'grounds',
      headerName: 'Grounds',
      align:'center',
      headerAlign:'center',
      width: 400,
      editable: false,
    }
  ];

  const [datosWorldBank, setDatosWorldBank] = useState([{
    'id':'',
    'firmName':'',
    'address':'',
    'country':'',
    'fromDate':'',
    'toDate':'',
    'grounds':'',
  }]);

  const columnsOfac = [
    { field: 'name', 
      headerName: 'Name',
      width: 300, 
      editable:false, 
      align:'center',
      headerAlign:'center',},
    {
      field: 'address',
      headerName: 'Address',
      align:'center',
      headerAlign:'center',
      width: 400,
      editable: false,
    },
    {
      field: 'type',
      headerName: 'Type',
      align:'center',
      headerAlign:'center',
      width: 200,
      editable: false,
    },
    {
      field: 'programs',
      headerName: 'Program(s)',
      align:'center',
      headerAlign:'center',
      width: 200,
      editable: false,
    },
    {
      field: 'list',
      headerName: 'List',
      align:'center',
      headerAlign:'center',
      width: 200,
      editable: false,
    },
    {
      field: 'score',
      headerName: 'Score',
      align:'center',
      headerAlign:'center',
      width: 200,
      editable: false,
    }
  ];

  const [datosOfac, setDatosOfac] = useState([{
    'id':'',
    'name':'',
    'address':'',
    'type':'',
    'programs ':'',
    'list':'',
    'score':'',
  }]);

  const [offshore, setOffshore] = useState(fuentes.includes('Offshore Leaks'));
  const [worldBank, setWorldBank] = useState(fuentes.includes('The World Bank'));
  const [ofac, setOfac] = useState(fuentes.includes('OFAC'));

  const [offshorLoading, setOffshoreLoading] = useState(false)
  const [worldBankLoading, setWorldBankLoading] = useState(false)
  const [ofacLoading, setOfacLoading] = useState(false)

  const [offshorError, setOffshoreError] = useState(false)
  const [worldBankError, setWorldBankError] = useState(false)
  const [ofacError, setOfacError] = useState(false)
  const [mensajeError, setMensajeError] = useState('');

  const [hitsOffShore, setHitsOffShore] = useState(0);
  const [hitsWorldBank, setHitsWorldBank] = useState(0);
  const [hitsOfac, setHitsOfac] = useState(0);

  useEffect(()=>{
    if(offshore){
      setOffshoreLoading(true)
      setOffshoreError(false);
      axiosGetScrapperOffShore(name)
      .then(response =>{
        setHitsOffShore(response.data.hits)
        setDatosOffShore(response.data.proveedores);
      })
      .catch(error=>{
        if(error.response){
          setMensajeError('Se produjo un error con codigo: ',error.response.status)
        }
        else if(error.request){
          setMensajeError('No hubo respuesta del servidor')
        }
        setOffshoreError(true);
      })
      .finally(()=>{
        setOffshoreLoading(false)
      })
    }
    if(worldBank){
      setWorldBankLoading(true)
      setWorldBankError(false);
      axiosGetScrapperWorldBank(name)
      .then(response =>{
        setHitsWorldBank(response.data.hits)
        setDatosWorldBank(response.data.proveedores);
      })
      .catch(error=>{
        if(error.response){
          setMensajeError('Se produjo un error con codigo: ',error.response.status)
        }
        else if(error.request){
          setMensajeError('No hubo respuesta del servidor')
        }
        setWorldBankError(true);
      })
      .finally(()=>{
        setWorldBankLoading(false)
      })
    }
    if(ofac){
      setOfacLoading(true)
      setOfacError(false);
      axiosGetScrapperOfac(name)
      .then(response =>{
        setHitsOfac(response.data.hits)
        setDatosOfac(response.data.proveedores);
      })
      .catch(error=>{
        if(error.response){
          setMensajeError('Se produjo un error con codigo: ',error.response.status)
        }
        else if(error.request){
          setMensajeError('No hubo respuesta del servidor')
        }
        setOfacError(true);
      })
      .finally(()=>{
        setOfacLoading(false)
      })
    }
  },[])

  const [value, setValue] = useState(offshore?0:worldBank?1:2);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className='principal-screening'>
        <h1>Resultados del cruce</h1>
        {(offshorLoading || worldBankLoading || ofacLoading) ?
          <Loading/>
          :
          (offshorError|| worldBankError || ofacError)?
            <Error mensaje={mensajeError} setOpenModal={setOpenModal}/>
          :
          <>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                {<Tab label="OffShore Leaks DB" {...a11yProps(0)} disabled={!offshore}/>}
                {<Tab label="The World Bank" {...a11yProps(1)} disabled={!worldBank}/>}
                {<Tab label="OFAC" {...a11yProps(2)} disabled={!ofac}/>}
              </Tabs>
            </Box>
            {
              value==0 &&
              <div className='fuente offshore'>
                <p>Numero de Hits: {datosOffshore.length}</p>
                <div className='resultados-fuente'>
                  <DataGrid
                    rows={datosOffshore}
                    columns={columnsOffshore}
                    initialState={{
                      pagination: {
                        paginationModel: {
                          pageSize: 7,
                        },
                      },
                    }}
                    pageSizeOptions={[7]}
                    disableRowSelectionOnClick
                    autoHeight
                  />
                </div>
              </div>
            }
            {
              value==1  && 
              <div className='fuente worldBank'>
                <p>Numero de Hits: {datosWorldBank.length}</p>
                <div className='resultados-fuente'>
                  <DataGrid
                    rows={datosWorldBank}
                    columns={columnsWorldBank}
                    initialState={{
                      pagination: {
                        paginationModel: {
                          pageSize: 7,
                        },
                      },
                    }}
                    pageSizeOptions={[7]}
                    disableRowSelectionOnClick
                    autoHeight
                  />
                </div>
              </div>
            }
            {
              value==2 && 
              <div className='fuente ofac'>
                <p>Numero de Hits: {datosOfac.length}</p>
                <div className='resultados-fuente'>
                  <DataGrid
                    rows={datosOfac}
                    columns={columnsOfac}
                    initialState={{
                      pagination: {
                        paginationModel: {
                          pageSize: 7,
                        },
                      },
                    }}
                    pageSizeOptions={[7]}
                    disableRowSelectionOnClick
                    autoHeight
                  />
                </div>
              </div>
            }
            <button className='cerrar' onClick={()=>setOpenModal(false)}>Cerrar</button>
          </>
        }
        
    </div>
  )
}

export {Screening}