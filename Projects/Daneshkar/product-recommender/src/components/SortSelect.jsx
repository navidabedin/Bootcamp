import { useFilters } from '../context/FilterContext'

const OPTIONS = [
  { value: 'default', label: 'Recommended' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
  { value: 'rating-desc', label: 'Top rated' },
  { value: 'title-asc', label: 'Name: A – Z' },
]

export default function SortSelect() {
  const { sort, setSort } = useFilters()

  return (
    <label className="flex items-center gap-2 text-sm text-slate-500">
      <span className="hidden sm:inline">Sort</span>
      <select
        value={sort}
        onChange={(event) => setSort(event.target.value)}
        className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
      >
        {OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  )
}
