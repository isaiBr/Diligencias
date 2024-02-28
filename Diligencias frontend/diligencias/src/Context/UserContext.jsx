import React, { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from './UseLocalStorage';
import { axiosGetUser } from '../Api/Usuario';


const userContext = createContext();
function UserProvider({children}) {

	const {item:user, saveItem:saveUser} = useLocalStorage('USER_V1', null);

	const [usuario, setUsuario] = useState({
		'correo':'',
		'password':''
	})

	const [openAlert, setOpenAlert] = useState(false);

	const [correoValido, setCorreoValido] = useState(true);

	const navigate = useNavigate();
	//Funciones para inicio y cierre de sesion
	const login = () =>{
		// axiosGetUser(usuario.correo, usuario.password)
		// .then(response=>{
		// 	console.log(response.data); 
		saveUser(usuario)
		navigate('/proveedores');
		// })
		// .catch(error=>{
		// 	console.log('errrrrrorrrr'); 
		// 	if(error.response.status==404){
		// 		setOpenAlert(true);
		// 	}
		// })
		
	}
	const logout = () =>{
		saveUser(null)
		navigate('/');
	}
  return (
    <userContext.Provider
        value={{
            login,
            logout,
			usuario, setUsuario,
			correoValido, setCorreoValido,
			openAlert, setOpenAlert
        }}
    >
        {children}
    </userContext.Provider>
  )
}

export {userContext, UserProvider}