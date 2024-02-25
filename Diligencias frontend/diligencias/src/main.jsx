import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import {ProveedorProvider} from './Context/ProveedorContext.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ProveedorProvider>
        <App />
    </ProveedorProvider>
  </BrowserRouter>
)
