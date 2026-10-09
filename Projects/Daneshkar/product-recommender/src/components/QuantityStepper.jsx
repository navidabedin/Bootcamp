export default function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 99,
  size = 'md',
}) {
  const dimensions = size === 'sm' ? 'h-7 w-7 text-sm' : 'h-9 w-9 text-base'
  const baseButton = `grid ${dimensions} place-items-center rounded-lg font-semibold transition disabled:cursor-not-allowed disabled:opacity-40`

  return (
    <div className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white p-1">
      <button
        type="button"
        aria-label="Decrease quantity"
        disabled={value <= min}
        onClick={() => onChange(value - 1)}
        className={`${baseButton} text-slate-600 hover:bg-slate-100`}
      >
        −
      </button>

      <span className="w-9 text-center text-sm font-semibold tabular-nums text-slate-800">
        {value}
      </span>

      <button
        type="button"
        aria-label="Increase quantity"
        disabled={value >= max}
        onClick={() => onChange(value + 1)}
        className={`${baseButton} text-slate-600 hover:bg-slate-100`}
      >
        +
      </button>
    </div>
  )
}
