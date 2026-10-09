import { useFilters } from '../context/FilterContext'
import { useProducts } from '../context/ProductsContext'
import { titleCase } from '../utils/format'

export default function CategoryFilter() {
  const { categories, total } = useProducts()
  const { category: activeCategory, setCategory } = useFilters()

  const buttonClass = (isActive) =>
    `flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-left text-sm transition ${
      isActive
        ? 'bg-indigo-50 font-semibold text-indigo-700'
        : 'text-slate-600 hover:bg-slate-50'
    }`

  return (
    <div>
      <h3 className="mb-3 text-sm font-semibold text-slate-900">Category</h3>
      <ul className="space-y-1">
        <li>
          <button
            type="button"
            onClick={() => setCategory('all')}
            className={buttonClass(activeCategory === 'all')}
          >
            <span>All products</span>
            <span className="text-xs text-slate-400">{total}</span>
          </button>
        </li>

        {categories.map(({ name, count }) => (
          <li key={name}>
            <button
              type="button"
              onClick={() => setCategory(name)}
              className={buttonClass(activeCategory === name)}
            >
              <span className="truncate">{titleCase(name)}</span>
              <span className="text-xs text-slate-400">{count}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
