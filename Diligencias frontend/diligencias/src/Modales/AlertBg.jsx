import React from 'react'
import {createPortal} from 'react-dom'
import '../assets/Modales/Alert.css'

function AlertBg({children}) {
  return createPortal(
    <div className='alert-bg'>
      {children}
    </div>,
    document.getElementById('modal')
  )
}

export {AlertBg}