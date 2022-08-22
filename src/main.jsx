import React from 'react'
import ReactDOM from 'react-dom/client'
import { Auth } from './Auth';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div className="contenedor">
      <Auth />
    </div>
  </React.StrictMode>
)
