import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { AuthContextProvider } from './context/AuthContext'
import { LocationsContextProvider } from './context/LocationContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <LocationsContextProvider>
        <App />
      </LocationsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
)
