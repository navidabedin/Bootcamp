import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../utils/format'
import QuantityStepper from '../components/QuantityStepper'

export default function CartPage() {
  const {
    items,
    count,
    subtotal,
    shipping,
    total,
    removeItem,
    setQuantity,
    clearCart,
  } = useCart()

  if (items.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-16 text-center">
        <p className="text-5xl" aria-hidden="true">🛒</p>
        <h1 className="mt-4 text-xl font-bold text-slate-900">Your cart is empty</h1>
        <p className="mt-2 text-sm text-slate-500">
          Add some products and they will stay here even after a refresh.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-600"
        >
          Browse products
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-slate-900">
          Shopping cart <span className="text-slate-400">({count})</span>
        </h1>
        <button
          type="button"
          onClick={clearCart}
          className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-rose-600 transition hover:bg-rose-50"
        >
          Clear cart
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        {/* لیست آیتم‌ها */}
        <div className="space-y-3">
          {items.map((item) => (
            <article
              key={item.id}
              className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center"
            >
              <Link
                to={`/product/${item.id}`}
                className="grid h-24 w-24 shrink-0 place-items-center rounded-xl bg-slate-50 p-3"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="max-h-full max-w-full object-contain"
                />
              </Link>

              <div className="min-w-0 flex-1">
                <Link
                  to={`/product/${item.id}`}
                  className="line-clamp-2 text-sm font-semibold text-slate-800 hover:text-indigo-600"
                >
                  {item.title}
                </Link>
                <p className="mt-1 text-xs text-slate-500">
                  Unit price: {formatPrice(item.price)}
                </p>
              </div>

              <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
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
                aria-label={`Remove ${item.title}`}
                className="self-start rounded-lg px-2 py-1 text-xs font-medium text-rose-600 transition hover:bg-rose-50 sm:self-center"
              >
                Remove
              </button>
            </article>
          ))}
        </div>

        {/* خلاصه‌ی سفارش */}
        <aside className="h-fit space-y-4 rounded-2xl border border-slate-200 bg-white p-5 lg:sticky lg:top-24">
          <h2 className="text-base font-semibold text-slate-900">Order summary</h2>

          <div className="space-y-2 text-sm text-slate-600">
            <div className="flex justify-between">
              <span>Items</span>
              <span className="tabular-nums">{count}</span>
            </div>
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="tabular-nums">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="tabular-nums">
                {shipping === 0 ? 'Free' : formatPrice(shipping)}
              </span>
            </div>
          </div>

          <div className="flex justify-between border-t border-dashed border-slate-200 pt-3 text-base font-bold text-slate-900">
            <span>Total</span>
            <span className="tabular-nums">{formatPrice(total)}</span>
          </div>

          <button
            type="button"
            onClick={() => window.alert('Checkout is a demo in this project 🙂')}
            className="w-full rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            Proceed to checkout
          </button>

          <Link
            to="/"
            className="block text-center text-sm font-medium text-slate-500 hover:text-indigo-600"
          >
            Continue shopping
          </Link>
        </aside>
      </div>
    </div>
  )
}
