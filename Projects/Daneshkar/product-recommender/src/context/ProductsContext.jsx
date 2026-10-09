import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { fetchProducts } from '../api/products'
import { STORAGE_KEYS, readStorage, writeStorage } from '../utils/storage'

const ProductsContext = createContext(null)

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([])
  const [status, setStatus] = useState('loading') // loading | success | error
  const [error, setError] = useState(null)
  const [lastUpdated, setLastUpdated] = useState(null)
  const abortRef = useRef(null)

  /** تماس با API و ذخیره‌ی نتیجه در LocalStorage */
  const loadFromApi = useCallback(async () => {
    abortRef.current?.abort()
    const controller = new AbortController()
    abortRef.current = controller

    setStatus('loading')
    setError(null)

    try {
      const data = await fetchProducts({ signal: controller.signal })
      const now = Date.now()
      setProducts(data)
      setLastUpdated(now)
      writeStorage(STORAGE_KEYS.products, data)          // ← کش ساده
      writeStorage(STORAGE_KEYS.productsUpdatedAt, now)  // ← فقط برای نمایش
      setStatus('success')
      return data
    } catch (err) {
      if (err.name === 'AbortError') return
      setError(err.message || 'Could not load products.')
      setStatus('error')
    }
  }, [])

  /* بارگذاری اولیه: اول کش، اگر خالی بود شبکه */
  useEffect(() => {
    const cached = readStorage(STORAGE_KEYS.products, null)

    if (Array.isArray(cached) && cached.length > 0) {
      setProducts(cached)
      setLastUpdated(readStorage(STORAGE_KEYS.productsUpdatedAt, null))
      setStatus('success')
    } else {
      loadFromApi()
    }

    return () => abortRef.current?.abort()
  }, [loadFromApi])

  /* ---------- مقادیر مشتق‌شده (derived) ---------- */

  /** [{ name: "electronics", count: 6 }, ...] */
  const categories = useMemo(() => {
    const counts = new Map()
    for (const product of products) {
      if (!product?.category) continue
      counts.set(product.category, (counts.get(product.category) ?? 0) + 1)
    }
    return Array.from(counts, ([name, count]) => ({ name, count }))
      .sort((a, b) => a.name.localeCompare(b.name))
  }, [products])

  const byId = useMemo(() => {
    const map = new Map()
    for (const product of products) map.set(String(product.id), product)
    return map
  }, [products])

  /** محصول با id از URL (رشته یا عدد) */
  const getProduct = useCallback(
    (id) => (id === undefined || id === null ? null : byId.get(String(id)) ?? null),
    [byId]
  )

  /** محصولات مشابه: هم‌دسته، بدون خودِ محصول، مرتب بر اساس امتیاز */
  const getSimilar = useCallback(
    (product, limit = 3) => {
      if (!product) return []
      return products
        .filter(
          (p) => p.category === product.category && String(p.id) !== String(product.id)
        )
        .sort((a, b) => (b.rating?.rate ?? 0) - (a.rating?.rate ?? 0))
        .slice(0, limit)
    },
    [products]
  )

  const value = useMemo(
    () => ({
      products,
      status,
      error,
      isLoading: status === 'loading',
      isReady: status !== 'loading' || products.length > 0,
      categories,
      getProduct,
      getSimilar,
      refresh: loadFromApi,
      lastUpdated,
      total: products.length,
    }),
    [products, status, error, categories, getProduct, getSimilar, loadFromApi, lastUpdated]
  )

  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
}

export function useProducts() {
  const ctx = useContext(ProductsContext)
  if (!ctx) throw new Error('useProducts must be used inside <ProductsProvider>')
  return ctx
}
