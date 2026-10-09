import { useProducts } from '../context/ProductsContext'
import { titleCase } from '../utils/format'
import ProductGrid from './ProductGrid'

export default function SimilarProducts({ product, limit = 3 }) {
  const { getSimilar } = useProducts()
  const similar = getSimilar(product, limit)

  if (!similar.length) {
    return (
      <p className="rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-center text-sm text-slate-500">
        No similar products in the “{titleCase(product?.category)}” category yet.
      </p>
    )
  }

  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-lg font-semibold text-slate-900">Similar products</h2>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500">
          same category: {titleCase(product.category)}
        </span>
      </div>
      <ProductGrid products={similar} />
    </section>
  )
}
