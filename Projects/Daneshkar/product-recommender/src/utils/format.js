const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

const numberFormatter = new Intl.NumberFormat('en-US')

/** 19.99 → "$19.99" */
export function formatPrice(value) {
  const number = Number(value)
  return currencyFormatter.format(Number.isFinite(number) ? number : 0)
}

/** 12345 → "12,345" */
export function formatNumber(value) {
  const number = Number(value)
  return numberFormatter.format(Number.isFinite(number) ? number : 0)
}

/** "men's clothing" → "Men's Clothing" */
export function titleCase(value = '') {
  return String(value)
    .split(' ')
    .filter(Boolean)
    .map((word) =>
      word.length <= 2 ? word : word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(' ')
}
