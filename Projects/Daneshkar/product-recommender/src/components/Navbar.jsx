import { Link, NavLink } from 'react-router-dom'
import { useCart } from '../context/CartContext'

function NavItem({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `rounded-xl px-3 py-2 text-sm font-medium transition ${
          isActive
            ? 'bg-slate-100 text-slate-900'
            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
        }`
      }
    >
      {children}
    </NavLink>
  )
}

export default function Navbar() {
  const { count, openCart } = useCart()

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/85 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 font-bold text-slate-900">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-indigo-600 text-white">
            🛍
          </span>
          <span className="hidden sm:inline">ShopSmart</span>
        </Link>

        <div className="ml-auto flex items-center gap-1">
          <NavItem to="/">Home</NavItem>
          <NavItem to="/cart">Cart page</NavItem>

          <button
            type="button"
            onClick={openCart}
            className="relative ml-1 flex items-center gap-2 rounded-xl bg-slate-900 px-3 py-2 text-sm font-medium text-white transition hover:bg-indigo-600"
          >
            🛒
            <span className="hidden sm:inline">Cart</span>
            {count > 0 && (
              <span className="absolute -right-1.5 -top-1.5 grid h-5 -w-[1.25rem] place-items-center rounded-full bg-indigo-600 px-1 text-[11px] font-bold text-white">
                {count}
              </span>
            )}
          </button>
        </div>
      </nav>
    </header>
  )
}
