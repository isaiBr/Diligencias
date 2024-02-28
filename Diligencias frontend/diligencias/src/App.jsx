import './App.css'
import { Route, Routes } from 'react-router-dom'
import { EstructuraPrincipal } from './Paginas/EstructuraPrincipal'
import { ProtectedRoute } from './Componentes/ProtectedRoute'
import { Login } from './Paginas/Login'
import { useContext } from 'react'
import { userContext } from './Context/UserContext'

function App() {

  const {
    user
  }= useContext(userContext);

  return (
    <div className='principal'>
      <Routes>
        {/* Ruta para el login de la aplicacion */}
        <Route path='/' element={<Login/>}/>

        {/* Ruta para cuando ya esta logueado el usuario  */}
        <Route element={<ProtectedRoute isAllowed={!!user}/>}>
          <Route path='/proveedores' element={<EstructuraPrincipal/>}/>
        </Route>
        <Route path='/*' element={<h1>NOT FOUND</h1>}/>
      </Routes>
    </div>
  )
}

export default App
