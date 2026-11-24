import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Icon } from '../ui/Icon';
import { useCart } from '../../context/CartContext';
import { toPersianDigits } from '../../lib/format';

const links = [
  { to: '/', label: 'منو' },
  { to: '/about', label: 'درباره ما' },
  { to: '/contact', label: 'تماس با ما' },
  { to: '/terms', label: 'قوانین و مقررات' },
];

export function Header() {
  const { count, open } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  /* سایه‌ی هدر بعد از کمی اسکرول */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* بستن شیت موبایل با تغییر مسیر */
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  /* قفل اسکرول وقتی شیت موبایل باز است */
  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  return (
    <header className={`header${scrolled ? ' header--scrolled' : ''}`}>
      <div className="container header__inner">
        <Link to="/" className="brand" aria-label={`${'کافه مسیر'} — صفحه‌ی اصلی`}>
          <span className="brand__mark">
            <img src="../pics/logo.webp" alt="logo"/>
          </span>
          <span className="brand__text">
            <span className="brand__name">کافه مسیر</span>
            <span className="brand__latin">Masir CAFÉ</span>
          </span>
        </Link>

        <nav className="nav" aria-label="ناوبری اصلی">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `nav__link${isActive ? ' nav__link--active' : ''}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="header__actions">
          <button
            type="button"
            className="order-btn"
            onClick={open}
            aria-haspopup="dialog"
          >
            <Icon name="bag" size={18} strokeWidth={1.8} />
            <span className="order-btn__label">ثبت سفارش</span>
            {count > 0 && (
              <span className="order-btn__badge" aria-label={`${toPersianDigits(count)} آیتم در سبد`}>
                {toPersianDigits(count)}
              </span>
            )}
          </button>

          <button
            type="button"
            className="burger"
            onClick={() => setMenuOpen(true)}
            aria-label="باز کردن منو"
            aria-expanded={menuOpen}
          >
            <Icon name="menu" size={20} />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="mobile-menu" role="dialog" aria-modal="true" aria-label="منوی موبایل">
          <div className="mobile-menu__scrim" onClick={() => setMenuOpen(false)} />
          <div className="mobile-menu__panel">
            <div className="brand">
              <span className="brand__mark">
                <Icon name="cup" size={20} strokeWidth={1.8} />
              </span>
              <span className="brand__text">
                <span className="brand__name">کافه مسیر</span>
                <span className="brand__latin">Masir CAFÉ</span>
              </span>
            </div>

            <div className="mobile-menu__links">
              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) => (isActive ? 'active' : '')}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </NavLink>
              ))}
            </div>

            <div className="mobile-menu__foot">
              <span>هر روز، ۸ صبح تا نیمه‌شب</span>
              <span>۰۲۱-۸۸۷۷۶۶۵۵</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
