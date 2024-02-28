import './App.css'
import { Route, Routes } from 'react-router-dom'
import { EstructuraPrincipal } from './Paginas/EstructuraPrincipal'
import { ProtectedRoute } from './Componentes/ProtectedRoute'
import { Login } from './Paginas/Login'

function App() {

  return (
    <div className='principal'>
      <Routes>
        {/* Ruta para el login de la aplicacion */}
        <Route path='/' element={<Login/>}/>

        {/* Ruta para cuando ya esta logueado el usuario  */}
        <Route element={<ProtectedRoute isAllowed={true}/>}>
          <Route path='/proveedores' element={<EstructuraPrincipal/>}/>
        </Route>
        <Route path='/*' element={<h1>NOT FOUND</h1>}/>
      </Routes>
    </div>
  )
}

export default App
