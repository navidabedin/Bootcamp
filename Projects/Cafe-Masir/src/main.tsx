import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { CartProvider } from './context/CartContext';

/* ترتیب مهم است: توکن‌ها، پایه، سپس هر بخش */
import './styles/tokens.css';
import './styles/base.css';
import './styles/layout.css';
import './styles/menu.css';
import './styles/order.css';
import './styles/pages.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <CartProvider>
        <App />
      </CartProvider>
    </BrowserRouter>
  </StrictMode>,
);
