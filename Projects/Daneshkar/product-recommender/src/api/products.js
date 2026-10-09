const API_URL = 'https://fakestoreapi.com/products'

/**
 * دریافت کل محصولات. signal برای AbortController استفاده می‌شود.
 */
export async function fetchProducts({ signal } = {}) {
  const res = await fetch(API_URL, { signal })
  if (!res.ok) throw new Error(`Failed to load products (HTTP ${res.status})`)
  const data = await res.json()
  if (!Array.isArray(data)) throw new Error('Unexpected API response shape')
  return data
}

/**
 * دریافت یک محصول (برای استفاده‌ی احتمالی در آینده / رفرش مستقیم URL)
 */
export async function fetchProductById(id, { signal } = {}) {
  const res = await fetch(`${API_URL}/${id}`, { signal })
  if (!res.ok) throw new Error(`Product ${id} not found (HTTP ${res.status})`)
  return res.json()
}
