import './App.css'
import { Route, Routes } from 'react-router-dom'
import { EstructuraPrincipal } from './Paginas/EstructuraPrincipal'
import { GestionProveedores } from './Paginas/GestionProveedores'

function App() {

  return (
    <div className='principal'>
      <Routes>
        <Route path='/' element={<EstructuraPrincipal/>}>
          <Route path='/proveedores' element={<GestionProveedores/>}/>
        </Route>
        <Route path='/*' element={<h1>NOT FOUND</h1>}/>
      </Routes>
    </div>
  )
}

export default App
