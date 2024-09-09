import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles.css'
import { CalendarApp } from './CalendarApp.jsx'
import { AppRouter } from './Router/AppRouter.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>,
)
