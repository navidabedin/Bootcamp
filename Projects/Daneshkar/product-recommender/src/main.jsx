import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { ProductsProvider } from './context/ProductsContext.jsx'
import { FilterProvider } from './context/FilterContext.jsx'
import { CartProvider } from './context/CartContext.jsx'

/**
 * BASE_URL در dev برابر "/" و در build برابر "/<repo-name>/" است.
 * این خط کلید کارکرد درست روتینگ روی GitHub Pages است.
 */
const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || '/'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <ProductsProvider>
        <FilterProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </FilterProvider>
      </ProductsProvider>
    </BrowserRouter>
  </React.StrictMode>
)
