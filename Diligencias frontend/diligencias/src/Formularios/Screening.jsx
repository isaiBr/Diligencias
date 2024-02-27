import React, { useEffect, useState } from 'react'
import '../assets/Formularios/Screening.css'
import { axiosGetScrapperWorldBank } from '../Api/Scrapper';
import { DataGrid } from '@mui/x-data-grid';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';

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
    { field: 'entity', headerName: 'Entity', width: 200, editable:false, align:'center',
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
    { field: 'firmName', headerName: 'Firm Name', width: 200, editable:false, align:'center',
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
      field: 'address',
      headerName: 'Address',
      align:'center',
      headerAlign:'center',
      width: 200,
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
      width: 200,
      editable: false,
    }
  ];

  const [datosWorldBank, setDatosWorldBank] = useState([{
    'id':'',
    'firmName':'',
    'jurisdiction':'',
    'address':'',
    'country':'',
    'fromDate':'',
    'toDate':'',
    'grounds':'',
  }]);

  useEffect(()=>{
    if(fuentes.includes('The World Bank')){

      // axiosGetScrapperWorldBank(name)
      // .then(response =>{
      //   console.log(response.data);
      //   setDatosWorldBank(response.data);
      // })
      // .catch(error=>{
      //   console.log(error);
      // })
    }
  },[])

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className='principal-screening'>
        <h3>Resultados del cruce</h3>

        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="OffShore Leaks DB" {...a11yProps(0)} />
            <Tab label="The World Bank" {...a11yProps(1)} />
            <Tab label="OFAC" {...a11yProps(2)} />
          </Tabs>
        </Box>
        {
          value==0 && 
          <div className='fuente offshore'>
            <DataGrid
              rows={datosOffshore}
              columns={columnsOffshore}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 1,
                  },
                },
              }}
              pageSizeOptions={[1]}
              disableRowSelectionOnClick
            />
          </div>
        }
        {
          value==1 && 
          <div className='fuente worldBank'>
            <DataGrid
              rows={datosWorldBank}
              columns={columnsWorldBank}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 1,
                  },
                },
              }}
              pageSizeOptions={[1]}
              disableRowSelectionOnClick
            />
          </div>
        }
        {
          value==2 && 
          <div className='fuente ofac'>
            <DataGrid
              rows={datosWorldBank}
              columns={columnsWorldBank}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 1,
                  },
                },
              }}
              pageSizeOptions={[1]}
              disableRowSelectionOnClick
            />
          </div>
        }
        <button onClick={()=>setOpenModal(false)}>Cerrar</button>
    </div>
  )
}

export {Screening}