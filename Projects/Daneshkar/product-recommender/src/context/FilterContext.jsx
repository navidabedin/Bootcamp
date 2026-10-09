import { createContext, useCallback, useContext, useMemo } from 'react'
import { useDebounce } from '../hooks/useDebounce'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { STORAGE_KEYS } from '../utils/storage'
import { useProducts } from './ProductsContext'

const FilterContext = createContext(null)

const DEFAULT_FILTERS = {
  search: '',
  category: 'all',
  price: null, // null → یعنی «کل بازه» بر اساس محصولات لود شده
  sort: 'default',
}

export function FilterProvider({ children }) {
  const { products } = useProducts()
  const [storedFilters, setStoredFilters] = useLocalStorage(
    STORAGE_KEYS.filters,
    DEFAULT_FILTERS
  )

  // ادغام با پیش‌فرض‌ها تا اگر کلید جدیدی اضافه شد، مقدار قدیمی در استوریج مشکل نسازد
  const filters = useMemo(
    () => ({ ...DEFAULT_FILTERS, ...storedFilters }),
    [storedFilters]
  )

  /* ---------- بازه‌ی واقعی قیمت‌ها از داده ---------- */
  const priceBounds = useMemo(() => {
    if (!products.length) return { min: 0, max: 1000 }
    const prices = products.map((p) => Number(p.price) || 0)
    return {
      min: Math.floor(Math.min(...prices)),
      max: Math.ceil(Math.max(...prices)),
    }
  }, [products])

  /* قیمت نهایی، clampe شده داخل بازه */
  const price = useMemo(() => {
    const raw = filters.price
    if (!raw || typeof raw !== 'object') return priceBounds
    const min = Math.max(priceBounds.min, Number(raw.min ?? priceBounds.min))
    const max = Math.min(priceBounds.max, Number(raw.max ?? priceBounds.max))
    return min <= max ? { min, max } : { min: max, max: min }
  }, [filters.price, priceBounds])

  /* ---------- Debounce جستجو ---------- */
  const debouncedSearch = useDebounce(filters.search, 400)
  const isSearchPending = filters.search.trim() !== debouncedSearch.trim()

  /* ---------- اکشن‌ها ---------- */
  const patchFilters = useCallback(
    (partial) => {
      setStoredFilters((prev) => ({ ...DEFAULT_FILTERS, ...prev, ...partial }))
    },
    [setStoredFilters]
  )

  const setSearch = useCallback((search) => patchFilters({ search }), [patchFilters])
  const setCategory = useCallback((category) => patchFilters({ category }), [patchFilters])
  const setSort = useCallback((sort) => patchFilters({ sort }), [patchFilters])

  /** setPrice می‌تواند مقدار یا تابع (prev) => next بگیرد */
  const setPrice = useCallback(
    (next) => {
      setStoredFilters((prev) => {
        const merged = { ...DEFAULT_FILTERS, ...prev }
        const current = merged.price ?? priceBounds
        const value = typeof next === 'function' ? next(current) : next
        return { ...merged, price: { min: Number(value.min), max: Number(value.max) } }
      })
    },
    [setStoredFilters, priceBounds]
  )

  const resetFilters = useCallback(() => {
    setStoredFilters({ ...DEFAULT_FILTERS })
  }, [setStoredFilters])

  /* ---------- لیست نهایی محصولات ---------- */
  const filteredProducts = useMemo(() => {
    const query = debouncedSearch.trim().toLowerCase()
    let list = products

    if (filters.category !== 'all') {
      list = list.filter((p) => p.category === filters.category)
    }
    if (query) {
      list = list.filter((p) => p.title?.toLowerCase().includes(query))
    }
    list = list.filter((p) => p.price >= price.min && p.price <= price.max)

    const sorted = [...list]
    switch (filters.sort) {
      case 'price-asc':
        sorted.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        sorted.sort((a, b) => b.price - a.price)
        break
      case 'rating-desc':
        sorted.sort((a, b) => (b.rating?.rate ?? 0) - (a.rating?.rate ?? 0))
        break
      case 'title-asc':
        sorted.sort((a, b) => a.title.localeCompare(b.title))
        break
      default:
        break
    }
    return sorted
  }, [products, debouncedSearch, filters.category, filters.sort, price])

  /* ---------- تعداد فیلترهای فعال (برای بج و دکمه‌ی ریست) ---------- */
  const activeFilterCount = useMemo(() => {
    let count = 0
    if (filters.search.trim()) count += 1
    if (filters.category !== 'all') count += 1
    if (price.min > priceBounds.min || price.max < priceBounds.max) count += 1
    if (filters.sort !== 'default') count += 1
    return count
  }, [filters.search, filters.category, filters.sort, price, priceBounds])

  const value = useMemo(
    () => ({
      search: filters.search,
      debouncedSearch,
      isSearchPending,
      category: filters.category,
      sort: filters.sort,
      price,
      priceBounds,
      filteredProducts,
      activeFilterCount,
      setSearch,
      setCategory,
      setSort,
      setPrice,
      resetFilters,
    }),
    [
      filters.search,
      filters.category,
      filters.sort,
      debouncedSearch,
      isSearchPending,
      price,
      priceBounds,
      filteredProducts,
      activeFilterCount,
      setSearch,
      setCategory,
      setSort,
      setPrice,
      resetFilters,
    ]
  )

  return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
}

export function useFilters() {
  const ctx = useContext(FilterContext)
  if (!ctx) throw new Error('useFilters must be used inside <FilterProvider>')
  return ctx
}
