import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../utils/format'
import QuantityStepper from './QuantityStepper'

export default function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    setQuantity,
    clearCart,
    subtotal,
    shipping,
    total,
    count,
  } = useCart()

  /* Escape برای بستن + قفل اسکرول پس‌زمینه */
  useEffect(() => {
    if (!isOpen) return undefined

    const onKeyDown = (event) => {
      if (event.key === 'Escape') closeCart()
    }
    document.addEventListener('keydown', onKeyDown)

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen, closeCart])

  return (
    <div
      className={`fixed inset-0 z-50 ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
      aria-hidden={!isOpen}
    >
      {/* Overlay */}
      <div
        onClick={closeCart}
        className={`absolute inset-0 bg-slate-900/40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Panel */}
      <aside
        role="dialog"
        aria-label="Shopping cart"
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <header className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <h2 className="text-base font-semibold text-slate-900">
            Your cart {count > 0 && <span className="text-slate-400">({count})</span>}
          </h2>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Close cart"
            className="grid h-8 w-8 place-items-center rounded-lg text-slate-500 transition hover:bg-slate-100"
          >
            ✕
          </button>
        </header>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <span className="text-4xl" aria-hidden="true">🛒</span>
            <p className="text-sm text-slate-500">Your cart is empty.</p>
            <button
              type="button"
              onClick={closeCart}
              className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-600"
            >
              Continue shopping
            </button>
          </div>
        ) : (
          <>
            <div className="scrollbar-slim flex-1 space-y-3 overflow-y-auto px-5 py-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 rounded-2xl border border-slate-100 p-3"
                >
                  <Link
                    to={`/product/${item.id}`}
                    onClick={closeCart}
                    className="grid h-16 w-16 shrink-0 place-items-center rounded-xl bg-slate-50 p-2"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="max-h-full max-w-full object-contain"
                    />
                  </Link>

                  <div className="flex min-w-0 flex-1 flex-col">
                    <Link
                      to={`/product/${item.id}`}
                      onClick={closeCart}
                      className="line-clamp-2 text-sm font-medium text-slate-800 hover:text-indigo-600"
                    >
                      {item.title}
                    </Link>

                    <div className="mt-2 flex items-center justify-between gap-2">
                      <QuantityStepper
                        value={item.quantity}
                        onChange={(next) => setQuantity(item.id, next)}
                        size="sm"
                      />
                      <span className="text-sm font-bold tabular-nums text-slate-900">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="mt-2 self-start text-xs font-medium text-rose-600 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={clearCart}
                className="w-full rounded-xl border border-slate-200 py-2 text-xs font-medium text-slate-500 transition hover:bg-slate-50"
              >
                Clear cart
              </button>
            </div>

            <footer className="space-y-3 border-t border-slate-100 px-5 py-4">
              <div className="flex justify-between text-sm text-slate-600">
                <span>Subtotal</span>
                <span className="tabular-nums">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm text-slate-600">
                <span>Shipping</span>
                <span className="tabular-nums">
                  {shipping === 0 ? 'Free' : formatPrice(shipping)}
                </span>
              </div>
              <div className="flex justify-between border-t border-dashed border-slate-200 pt-3 text-base font-bold text-slate-900">
                <span>Total</span>
                <span className="tabular-nums">{formatPrice(total)}</span>
              </div>

              <Link
                to="/cart"
                onClick={closeCart}
                className="block rounded-xl bg-indigo-600 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-indigo-700"
              >
                Go to checkout
              </Link>
            </footer>
          </>
        )}
      </aside>
    </div>
  )
}
