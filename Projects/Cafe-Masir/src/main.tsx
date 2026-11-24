import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { CartProvider } from './context/CartContext';

   import '@fontsource/vazirmatn/300.css';
   import '@fontsource/vazirmatn/400.css';
   import '@fontsource/vazirmatn/500.css';
   import '@fontsource/vazirmatn/600.css';
   import '@fontsource/vazirmatn/700.css';
   import '@fontsource/vazirmatn/800.css';
   import '@fontsource/playfair-display/500.css';
   import '@fontsource/playfair-display/600.css';
   import '@fontsource/playfair-display/500-italic.css';


/* ترتیب مهم است: توکن‌ها، پایه، سپس هر بخش */
import './styles/tokens.css';
import './styles/base.css';
import './styles/layout.css';
import './styles/menu.css';
import './styles/order.css';
import './styles/pages.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <CartProvider>
        <App />
      </CartProvider>
    </BrowserRouter>
  </StrictMode>,
);
