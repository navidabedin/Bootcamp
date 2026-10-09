import { useFilters } from '../context/FilterContext'
import { useProducts } from '../context/ProductsContext'
import SearchBar from '../components/SearchBar'
import SortSelect from '../components/SortSelect'
import FilterSidebar from '../components/FilterSidebar'
import ProductGrid from '../components/ProductGrid'
import SkeletonCard from '../components/SkeletonCard'
import ErrorState from '../components/ErrorState'
import EmptyState from '../components/EmptyState'

export default function HomePage() {
  const { status, error, refresh, total, lastUpdated } = useProducts()
  const { filteredProducts, activeFilterCount, resetFilters, debouncedSearch } =
    useFilters()

  const showSkeleton = status === 'loading' && total === 0
  const showError = status === 'error' && total === 0

  return (
    <div className="space-y-6">
      {/* Hero + جستجو */}
      <section className="rounded-3xl bg-linear-to-r from-indigo-600 to-violet-600 p-6 text-white sm:p-10">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70">
          Fake Store API
        </p>
        <h1 className="mt-2 text-2xl font-bold sm:text-4xl">
          Smart Product Recommender
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-white/80 sm:text-base">
          Browse the catalog, filter by price, search instantly with debounce and
          discover similar products from the same category.
        </p>
        <div className="mt-6 max-w-xl">
          <SearchBar />
        </div>
        {lastUpdated && (
          <p className="mt-3 text-xs text-white/60">
            Loaded from {total} cached/remote products ·{' '}
            {new Date(lastUpdated).toLocaleString('en-US')}
          </p>
        )}
      </section>

      <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
        <FilterSidebar />

        <section className="space-y-4">
          {/* نوار بالای لیست */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-slate-600">
              {showSkeleton ? (
                'Loading products…'
              ) : (
                <>
                  <span className="font-semibold text-slate-900">
                    {filteredProducts.length}
                  </span>{' '}
                  of {total} products
                  {debouncedSearch && (
                    <>
                      {' '}
                      matching “<span className="font-medium">{debouncedSearch}</span>”
                    </>
                  )}
                </>
              )}
            </p>

            <div className="flex items-center gap-2">
              {activeFilterCount > 0 && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
                >
                  Clear filters
                  <span className="ml-1.5 rounded-full bg-indigo-100 px-2 py-0.5 text-xs text-indigo-700">
                    {activeFilterCount}
                  </span>
                </button>
              )}
              <SortSelect />
            </div>
          </div>

          {showError && <ErrorState message={error} onRetry={refresh} />}

          {!showError && showSkeleton && (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))}
            </div>
          )}

          {!showError && !showSkeleton && filteredProducts.length === 0 && (
            <EmptyState onReset={resetFilters} />
          )}

          {!showError && !showSkeleton && filteredProducts.length > 0 && (
            <ProductGrid products={filteredProducts} />
          )}
        </section>
      </div>
    </div>
  )
}
