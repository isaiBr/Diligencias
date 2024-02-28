import React, { useContext, useState } from 'react'
import '../assets/Paginas/Login.css'
import { userContext } from '../Context/UserContext';
import LogoLogin from '../Imagenes/ey_logo_black.png'
import { Alert } from '@mui/material';
import { AlertBg } from '../Modales/AlertBg';
import { Alerta } from '../Alertas/Alerta';

function Login() {

	const {
			login,
      usuario, setUsuario,
      openAlert, setOpenAlert
	}= useContext(userContext);

	const [signIn, setSignIn] = useState(false);

  const changeLogin = () =>{
    setSignIn(!signIn);
  }

  const handleLogin = (campo,valor) =>{
    setUsuario({
      ...usuario,
      [campo] : valor
    })
  }

  return (
    <div className='mainbox-login'>
      <div className={`main-container ${signIn?'active':''}`}>
        <div className='form-container sign-in'>
          <form onSubmit={login}>
            <img src={LogoLogin} alt='mono-login' className='mono-login'/>
            <h1 className='title-form'>Inicio de sesión</h1>
            <p className='label-form'>Correo electrónico</p>
            <input type='text' value={usuario.correo} 
              onChange={(event)=>handleLogin('correo',event.target.value)}
              autoComplete="username"/>
            <p className='label-form'>Contraseña</p>
            <input type='password' value={usuario.password} 
              onChange={(event)=>handleLogin('password',event.target.value)}
              autoComplete="current-password"/>
            <button className='btn-signin' type='submit'>Iniciar sesión</button>
          </form>
        </div>
        <div className='form-container sign-up'>
          <form onSubmit={()=>console.log('hola')}>
            <img src={LogoLogin} alt='mono-login' className='mono-login'/>
            <h1 className='title-form'>Nueva cuenta</h1>
            <p className='label-form'>Correo electrónico</p>
            <input type='text'/>
            <p className='label-form'>Contraseña</p>
            <input type='text'/>
            <p className='label-form'>Confirmar contraseña</p>
            <input type='text'/>
            <button className='btn-signup' type='submit' disabled={true}>Siguiente</button>
          </form>
        </div>
        <div className='overlay-container'>
          <div className='overlay'>
            <div className='overlay-panel overlay-left'>
              <h1>¿Ya tienes una cuenta?</h1>
              <p>Ingresa tus credenciales para acceder al sistema</p>
              <button onClick={changeLogin}>Iniciar sesion</button>
            </div>
            <div className='overlay-panel overlay-right'>
              <h1>¿Eres un nuevo usuario?</h1>
              <p>Crea tu cuenta para realizar las diligencias</p>
              <button onClick={changeLogin}>Crear cuenta</button>
            </div>
          </div>
        </div>
      </div>
      {
        openAlert &&
        <AlertBg>
          <Alerta openAlert={openAlert}
          setOpenAlert={setOpenAlert}
          mensajeAlerta={'Credenciales incorrectas'}/>
        </AlertBg>
      }
    </div>
  )
}

export {Login}