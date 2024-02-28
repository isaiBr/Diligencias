import React, { useEffect, useState } from 'react'
import '../assets/Alertas/Alerta.css'

function Alerta({openAlert,setOpenAlert, mensajeAlerta}) {

	const [vanish, setVanish] = useState(false);

	useEffect(() => {
		let timeoutId1;
    let timeoutId2;
    if (openAlert) {
      timeoutId1 = setTimeout(() => {
        setVanish(true);
      }, 3000);

			timeoutId2 = setTimeout(() => {
        setOpenAlert(false);
			}, 3500);
      return () => {
				clearTimeout(timeoutId1);
      	clearTimeout(timeoutId2);
			}
    }
  }, []);
  return (
    <div className={`principal-alerta ${vanish?'desaparece':''}`}>
			<div className='contenido'>
        <div className='loading-bar'></div>
        <div className='content-alert'>
            <p>{mensajeAlerta}</p>
            <button className='cerrar' onClick={()=>setOpenAlert(false)}>x</button>
        </div>
			</div>
    </div>
  )
}

export {Alerta}