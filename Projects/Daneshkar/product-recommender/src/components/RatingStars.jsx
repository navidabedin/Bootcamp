export default function RatingStars({ rate = 0, count, className = '' }) {
  const filled = Math.max(0, Math.min(5, Math.round(Number(rate) || 0)))
  return (
    <span
      className={`inline-flex items-center gap-1 text-xs text-slate-500 ${className}`}
      title={`${Number(rate || 0).toFixed(1)} out of 5`}
    >
      <span className="tracking-tight text-amber-500" aria-hidden="true">
        {'★'.repeat(filled)}
        <span className="text-slate-300">{'★'.repeat(5 - filled)}</span>
      </span>
      {count !== undefined && (
        <span className="tabular-nums">({count})</span>
      )}
    </span>
  )
}
