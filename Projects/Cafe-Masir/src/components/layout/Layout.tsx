import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { OrderDrawer } from '../order/OrderDrawer';
import { MobileCartBar } from '../order/MobileCartBar';

/** قالب مشترک همه‌ی صفحه‌ها: هدر + محتوا + فوتر + دراور سفارش */
export function Layout() {
  const { pathname } = useLocation();

  /* با هر تغییر مسیر، به بالای صفحه برگرد */
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);

  return (
    <div className="app">
      <Header />
      <main className="app__main">
        <Outlet />
      </main>
      <Footer />
      <OrderDrawer />
      <MobileCartBar />
    </div>
  );
}
