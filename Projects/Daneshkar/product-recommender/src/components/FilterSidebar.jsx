import { useState } from 'react'
import { useFilters } from '../context/FilterContext'
import CategoryFilter from './CategoryFilter'
import PriceFilter from './PriceFilter'

export default function FilterSidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const { activeFilterCount, resetFilters } = useFilters()

  return (
    <aside className="lg:sticky lg:top-24 lg:self-start">
      {/* دکمه‌ی باز/بسته در موبایل */}
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 shadow-sm lg:hidden"
      >
        <span>
          Filters
          {activeFilterCount > 0 && (
            <span className="ml-2 rounded-full bg-indigo-100 px-2 py-0.5 text-xs text-indigo-700">
              {activeFilterCount}
            </span>
          )}
        </span>
        <span aria-hidden="true">{isOpen ? '▲' : '▼'}</span>
      </button>

      <div
        className={`${
          isOpen ? 'block' : 'hidden'
        } mt-3 space-y-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm lg:mt-0 lg:block`}
      >
        <CategoryFilter />
        <hr className="border-slate-100" />
        <PriceFilter />

        {activeFilterCount > 0 && (
          <button
            type="button"
            onClick={resetFilters}
            className="w-full rounded-xl border border-slate-200 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
          >
            Reset all filters
          </button>
        )}
      </div>
    </aside>
  )
}
