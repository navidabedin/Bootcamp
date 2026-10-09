export default function ErrorState({ message, onRetry }) {
  return (
    <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-center">
      <p className="text-2xl" aria-hidden="true">⚠️</p>
      <h3 className="mt-2 text-base font-semibold text-rose-900">
        Failed to load products
      </h3>
      <p className="mt-1 text-sm text-rose-700">{message || 'Please try again.'}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-4 rounded-xl bg-rose-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-700"
        >
          Try again
        </button>
      )}
    </div>
  )
}
