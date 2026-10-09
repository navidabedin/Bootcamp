import ProductCard from './ProductCard'

export default function ProductGrid({ products = [], columns = 'xl:grid-cols-3' }) {
  if (!products.length) return null

  return (
    <div className={`grid gap-4 sm:grid-cols-2 ${columns}`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
