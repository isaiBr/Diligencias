import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import {ProveedorProvider} from './Context/ProveedorContext.jsx'
import './index.css'
import { UserProvider } from './Context/UserContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <UserProvider>
      <ProveedorProvider>
          <App />
      </ProveedorProvider>
    </UserProvider>
  </BrowserRouter>
)
