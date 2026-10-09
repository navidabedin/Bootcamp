import { useFilters } from '../context/FilterContext'

export default function PriceFilter() {
  const { price, priceBounds, setPrice } = useFilters()
  const { min, max } = price
  const step = 5

  const isActive = min > priceBounds.min || max < priceBounds.max

  const presets = [
    { label: `Under $50`, value: { min: priceBounds.min, max: 50 } },
    { label: '$50 – $150', value: { min: 50, max: 150 } },
    { label: '$150 and up', value: { min: 150, max: priceBounds.max } },
  ]

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-900">Price</h3>
        {isActive && (
          <button
            type="button"
            onClick={() => setPrice(priceBounds)}
            className="text-xs font-medium text-indigo-600 hover:underline"
          >
            Reset
          </button>
        )}
      </div>

      {/* نمایش بازه‌ی فعلی */}
      <div className="mb-4 rounded-xl bg-slate-50 px-3 py-2 text-center text-sm font-semibold tabular-nums text-slate-700">
        ${min} – ${max}
      </div>

      {/* اسلایدر حد پایین */}
      <label className="block text-xs font-medium text-slate-500" htmlFor="price-min">
        Min price
      </label>
      <input
        id="price-min"
        type="range"
        min={priceBounds.min}
        max={priceBounds.max}
        step={step}
        value={min}
        onChange={(event) =>
          setPrice((prev) => ({
            ...prev,
            min: Math.min(Number(event.target.value), prev.max - step),
          }))
        }
        className="mt-1 w-full accent-indigo-600"
      />

      {/* اسلایدر حد بالا */}
      <label
        className="mt-3 block text-xs font-medium text-slate-500"
        htmlFor="price-max"
      >
        Max price
      </label>
      <input
        id="price-max"
        type="range"
        min={priceBounds.min}
        max={priceBounds.max}
        step={step}
        value={max}
        onChange={(event) =>
          setPrice((prev) => ({
            ...prev,
            max: Math.max(Number(event.target.value), prev.min + step),
          }))
        }
        className="mt-1 w-full accent-indigo-600"
      />

      {/* پریست‌های سریع */}
      <div className="mt-4 flex flex-wrap gap-2">
        {presets.map((preset) => {
          const isSelected =
            min === preset.value.min && max === preset.value.max
          return (
            <button
              key={preset.label}
              type="button"
              onClick={() => setPrice(preset.value)}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
                isSelected
                  ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                  : 'border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              {preset.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
