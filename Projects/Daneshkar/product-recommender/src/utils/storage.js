const PREFIX = 'shopsmart:'

export const STORAGE_KEYS = {
  products: 'products',
  productsUpdatedAt: 'products:updatedAt',
  cart: 'cart',
  filters: 'filters',
}

/** خواندن امن از localStorage (خطای JSON یا نبود مقدار → fallback) */
export function readStorage(key, fallback = null) {
  try {
    const raw = localStorage.getItem(PREFIX + key)
    if (raw === null) return fallback
    const parsed = JSON.parse(raw)
    return parsed === null || parsed === undefined ? fallback : parsed
  } catch (err) {
    console.warn(`[storage] read failed for "${key}"`, err)
    return fallback
  }
}

/** نوشتن امن در localStorage */
export function writeStorage(key, value) {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value))
    return true
  } catch (err) {
    console.warn(`[storage] write failed for "${key}"`, err)
    return false
  }
}

/** حذف کلید */
export function removeStorage(key) {
  try {
    localStorage.removeItem(PREFIX + key)
  } catch (err) {
    console.warn(`[storage] remove failed for "${key}"`, err)
  }
}

/** پاک کردن همه‌ی کلیدهای پروژه */
export function clearAppStorage() {
  try {
    Object.keys(localStorage)
      .filter((k) => k.startsWith(PREFIX))
      .forEach((k) => localStorage.removeItem(k))
  } catch (err) {
    console.warn('[storage] clear failed', err)
  }
}
