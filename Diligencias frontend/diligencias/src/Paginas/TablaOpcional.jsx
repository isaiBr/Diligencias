import React from 'react'
import { DataGrid } from '@mui/x-data-grid';


function TablaOpcional() {

  const rows = [
    { id: 1, nombre: 'ZETA', ultimaActualizacion: '25/02/2024' },
    { id: 2, nombre: 'LIMITED', ultimaActualizacion: '25/02/2024' },
    { id: 3, nombre: 'OTRA', ultimaActualizacion: '25/02/2024' },
    { id: 4, nombre: 'ZETA', ultimaActualizacion: '25/02/2024' },
    { id: 5, nombre: 'LIMITED', ultimaActualizacion: '25/02/2024' },
    { id: 6, nombre: 'OTRA', ultimaActualizacion: '25/02/2024' },
    { id: 7, nombre: 'ZETA', ultimaActualizacion: '25/02/2024' },
    { id: 8, nombre: 'LIMITED', ultimaActualizacion: '25/02/2024' },
    { id: 9, nombre: 'OTRA', ultimaActualizacion: '25/02/2024' },
    { id: 10, nombre: 'ZETA', ultimaActualizacion: '25/02/2024' },
    { id: 11, nombre: 'LIMITED', ultimaActualizacion: '25/02/2024' },
    { id: 12, nombre: 'OTRA', ultimaActualizacion: '25/02/2024' },
    { id: 13, nombre: 'ZETA', ultimaActualizacion: '25/02/2024' },
    { id: 14, nombre: 'LIMITED', ultimaActualizacion: '25/02/2024' },
    { id: 15, nombre: 'OTRA', ultimaActualizacion: '25/02/2024' },
    { id: 16, nombre: 'ZETA', ultimaActualizacion: '25/02/2024' },
    { id: 17, nombre: 'LIMITED', ultimaActualizacion: '25/02/2024' },
    { id: 18, nombre: 'OTRA', ultimaActualizacion: '25/02/2024' },
    // Agrega más elementos según sea necesario
  ];

  const columns = [
    { field: 'id', headerName: 'ID', width: 90, editable:false},
    {
      field: 'nombre',
      headerName: 'NOMBRE',
      width: 300,
      editable: false,
    },
    {
      field: 'ultimaActualizacion',
      headerName: 'ULTIMA ACTUALIZACIÓN',
      width: 200,
      editable: false,
    },
    {
      field:'buttonColumn',
      headerName:'OPCIONES',
      width:300,
      renderCell:ButtonCell
    }
  ];

  function ButtonCell(params) {
    // Aquí puedes personalizar el contenido de la celda
    return (
      <div>
        <button onClick={() => console.log('Ver',params.row.id)}>Ver</button>
        <button onClick={() => console.log('Editar',params.row.id)}>Editar</button>
        <button onClick={() => console.log('Eliminar',params.row.id)}>Eliminar</button>
        <button onClick={() => console.log('Screening',params.row.id)}>Screening</button>
      </div>
    );
  }

  return (
    <div>
      <DataGrid
        rows={rows}
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
  )
}

export {TablaOpcional}