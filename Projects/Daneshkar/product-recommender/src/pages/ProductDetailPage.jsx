import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useProducts } from '../context/ProductsContext'
import { useCart } from '../context/CartContext'
import { formatPrice, titleCase } from '../utils/format'
import RatingStars from '../components/RatingStars'
import QuantityStepper from '../components/QuantityStepper'
import SimilarProducts from '../components/SimilarProducts'

function DetailSkeleton() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="grid gap-8 rounded-3xl border border-slate-200 bg-white p-6 lg:grid-cols-2">
        <div className="h-80 rounded-2xl bg-slate-100" />
        <div className="space-y-4 py-4">
          <div className="h-3 w-24 rounded bg-slate-100" />
          <div className="h-5 w-3/4 rounded bg-slate-100" />
          <div className="h-3 w-32 rounded bg-slate-100" />
          <div className="h-24 w-full rounded bg-slate-100" />
          <div className="h-8 w-24 rounded bg-slate-100" />
        </div>
      </div>
    </div>
  )
}

export default function ProductDetailPage() {
  const { id } = useParams()
  const { getProduct, status, total } = useProducts()
  const { addItem, openCart } = useCart()

  const product = getProduct(id)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    setQuantity(1)
  }, [id])

  // هنوز داده‌ای نداریم (نه کش، نه API)
  if (!product && total === 0) return <DetailSkeleton />

  // داده لود شده ولی این id وجود ندارد
  if (!product) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center">
        <p className="text-4xl" aria-hidden="true">🧐</p>
        <h1 className="mt-3 text-xl font-bold text-slate-900">Product not found</h1>
        <p className="mt-2 text-sm text-slate-500">
          The product with id “{id}” does not exist.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-600"
        >
          Back to catalog
        </Link>
      </div>
    )
  }

  const handleAdd = () => {
    addItem(product, quantity)
    openCart()
  }

  return (
    <div className="space-y-10">
      <nav className="text-sm text-slate-500">
        <Link to="/" className="hover:text-indigo-600">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-slate-700">{titleCase(product.category)}</span>
      </nav>

      <section className="grid gap-8 rounded-3xl border border-slate-200 bg-white p-6 lg:grid-cols-2 lg:p-8">
        <div className="grid place-items-center rounded-2xl bg-slate-50 p-10">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-80 w-full object-contain"
          />
        </div>

        <div className="flex flex-col">
          <span className="w-fit rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-700">
            {titleCase(product.category)}
          </span>

          <h1 className="mt-4 text-xl font-bold leading-snug text-slate-900 sm:text-2xl">
            {product.title}
          </h1>

          <div className="mt-3">
            <RatingStars rate={product.rating?.rate} count={product.rating?.count} />
          </div>

          <p className="mt-5 text-sm leading-7 text-slate-600">{product.description}</p>

          <p className="mt-6 text-3xl font-extrabold text-slate-900">
            {formatPrice(product.price)}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <QuantityStepper value={quantity} onChange={setQuantity} />
            <button
              type="button"
              onClick={handleAdd}
              className="flex-1 rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-600 active:scale-[0.99] sm:flex-none"
            >
              Add {quantity} to cart · {formatPrice(product.price * quantity)}
            </button>
          </div>

          <p className="mt-4 text-xs text-slate-400">
            Free shipping on orders over $100.
          </p>
        </div>
      </section>

      <SimilarProducts product={product} limit={3} />
    </div>
  )
}
