export default function EmptyState({ onReset }) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
      <p className="text-3xl" aria-hidden="true">🔍</p>
      <h3 className="mt-3 text-base font-semibold text-slate-900">
        No products match your filters
      </h3>
      <p className="mt-1 text-sm text-slate-500">
        Try widening the price range or clearing the search.
      </p>
      {onReset && (
        <button
          type="button"
          onClick={onReset}
          className="mt-4 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-600"
        >
          Clear all filters
        </button>
      )}
    </div>
  )
}
