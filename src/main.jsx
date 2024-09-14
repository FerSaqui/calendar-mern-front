import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles.css'
import { AppRouter } from './Router/AppRouter.jsx'
import { Provider } from 'react-redux'
import { store } from './store/store.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <AppRouter />
    </Provider>
  </React.StrictMode>,
)
