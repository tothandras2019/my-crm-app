import React from 'react'
import ReactDOM from 'react-dom/client'
import './reset.css'
import './index.css'
import './App.css'

import App from './App'
import reportWebVitals from './reportWebVitals'
import { CustomerContextProvider } from './DATASTORE/contacts-reducer'
import { ProductContextProvider } from './DATASTORE/products-reducer'
import { BrowserRouter } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <ProductContextProvider>
      <CustomerContextProvider>
        <App />
      </CustomerContextProvider>
    </ProductContextProvider>
  </BrowserRouter>,
  // </React.StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
