import { useFilters } from '../context/FilterContext'

export default function SearchBar() {
  const { search, setSearch, isSearchPending } = useFilters()

  return (
    <div className="relative">
      <span
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        aria-hidden="true"
      >
        🔍
      </span>

      <input
        type="search"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Search products by name…"
        aria-label="Search products by name"
        className="w-full rounded-xl border border-white/20 bg-white py-3 pl-11 pr-12 text-sm text-slate-800 shadow-sm outline-none transition focus:ring-4 focus:ring-indigo-300/60"
      />

      {isSearchPending && (
        <span
          className="absolute right-4 top-1/2 -translate-y-1/2 animate-pulse text-xs font-semibold text-indigo-600"
          title="Debouncing…"
        >
          •••
        </span>
      )}

      {!isSearchPending && search && (
        <button
          type="button"
          onClick={() => setSearch('')}
          aria-label="Clear search"
          className="absolute right-3 top-1/2 grid h-6 w-6 -translate-y-1/2 place-items-center rounded-full bg-slate-200 text-xs text-slate-600 transition hover:bg-slate-300"
        >
          ✕
        </button>
      )}
    </div>
  )
}
