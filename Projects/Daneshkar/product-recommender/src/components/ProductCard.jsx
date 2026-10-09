import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { formatPrice, titleCase } from '../utils/format'
import RatingStars from './RatingStars'

export default function ProductCard({ product }) {
  const { addItem, getQuantity, flashId } = useCart()

  const quantityInCart = getQuantity(product.id)
  const justAdded = flashId === product.id

  return (
    <article className="group flex animate-fade-up flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg">
      <Link
        to={`/product/${product.id}`}
        className="flex flex-1 flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
      >
        <div className="mb-4 grid h-44 place-items-center overflow-hidden rounded-xl bg-slate-50 p-4">
          <img
            src={product.image}
            alt={product.title}
            loading="lazy"
            className="max-h-full max-w-full object-contain transition duration-300 group-hover:scale-105"
          />
        </div>

        <span className="mb-2 w-fit rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide text-slate-500">
          {titleCase(product.category)}
        </span>

        <h3
          className="mb-2 line-clamp-2 text-sm font-semibold leading-snug text-slate-800"
          title={product.title}
        >
          {product.title}
        </h3>

        <div className="mt-auto flex items-end justify-between gap-2 pt-2">
          <span className="text-base font-bold text-slate-900">
            {formatPrice(product.price)}
          </span>
          <RatingStars rate={product.rating?.rate} count={product.rating?.count} />
        </div>
      </Link>

      <button
        type="button"
        onClick={() => addItem(product, 1)}
        className={`mt-3 w-full rounded-xl px-3 py-2 text-sm font-semibold text-white transition ${
          justAdded
            ? 'bg-emerald-600'
            : 'bg-slate-900 hover:bg-indigo-600 active:scale-[0.98]'
        }`}
      >
        {justAdded
          ? '✓ Added to cart'
          : quantityInCart > 0
          ? `Add more (${quantityInCart} in cart)`
          : 'Add to cart'}
      </button>
    </article>
  )
}
