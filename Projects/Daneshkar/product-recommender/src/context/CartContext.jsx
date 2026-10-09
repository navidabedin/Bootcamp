import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { STORAGE_KEYS } from '../utils/storage'

const CartContext = createContext(null)

const MAX_QTY = 99

export function CartProvider({ children }) {
  // items در LocalStorage ذخیره می‌شود → با رفرش از بین نمی‌رود
  const [items, setItems] = useLocalStorage(STORAGE_KEYS.cart, [])
  const [isOpen, setIsOpen] = useState(false)
  const [flashId, setFlashId] = useState(null)
  const flashTimer = useRef(null)

  useEffect(() => () => clearTimeout(flashTimer.current), [])

  const flash = useCallback((id) => {
    setFlashId(id)
    clearTimeout(flashTimer.current)
    flashTimer.current = setTimeout(() => setFlashId(null), 1600)
  }, [])

  const openCart = useCallback(() => setIsOpen(true), [])
  const closeCart = useCallback(() => setIsOpen(false), [])
  const toggleCart = useCallback(() => setIsOpen((v) => !v), [])

  /** افزودن محصول (اگر بود، تعداد زیاد می‌شود) */
  const addItem = useCallback(
    (product, quantity = 1) => {
      if (!product?.id) return
      const qty = Math.max(1, Math.min(MAX_QTY, Number(quantity) || 1))

      setItems((prev) => {
        const existing = prev.find((item) => item.id === product.id)
        if (existing) {
          return prev.map((item) =>
            item.id === product.id
              ? { ...item, quantity: Math.min(MAX_QTY, item.quantity + qty) }
              : item
          )
        }
        return [
          ...prev,
          {
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            category: product.category,
            quantity: qty,
          },
        ]
      })
      flash(product.id)
    },
    [setItems, flash]
  )

  const removeItem = useCallback(
    (id) => setItems((prev) => prev.filter((item) => item.id !== id)),
    [setItems]
  )

  const increment = useCallback(
    (id) =>
      setItems((prev) =>
        prev.map((item) =>
          item.id === id
            ? { ...item, quantity: Math.min(MAX_QTY, item.quantity + 1) }
            : item
        )
      ),
    [setItems]
  )

  /** کم کردن؛ اگر به صفر رسید از سبد حذف می‌شود */
  const decrement = useCallback(
    (id) =>
      setItems((prev) =>
        prev
          .map((item) =>
            item.id === id ? { ...item, quantity: item.quantity - 1 } : item
          )
          .filter((item) => item.quantity > 0)
      ),
    [setItems]
  )

  const setQuantity = useCallback(
    (id, quantity) => {
      const qty = Number(quantity)
      if (!Number.isFinite(qty) || qty <= 0) return removeItem(id)
      const safe = Math.min(MAX_QTY, Math.max(1, Math.round(qty)))
      setItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, quantity: safe } : item))
      )
    },
    [setItems, removeItem]
  )

  const clearCart = useCallback(() => setItems([]), [setItems])

  const totals = useMemo(() => {
    const count = items.reduce((sum, item) => sum + item.quantity, 0)
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    return {
      count,
      subtotal,
      shipping: subtotal === 0 || subtotal >= 100 ? 0 : 5, // نمونه‌ی سیاست ارسال
      total: subtotal + (subtotal === 0 || subtotal >= 100 ? 0 : 5),
    }
  }, [items])

  const getQuantity = useCallback(
    (id) => items.find((item) => item.id === id)?.quantity ?? 0,
    [items]
  )

  const value = useMemo(
    () => ({
      items,
      isOpen,
      flashId,
      addItem,
      removeItem,
      increment,
      decrement,
      setQuantity,
      clearCart,
      getQuantity,
      openCart,
      closeCart,
      toggleCart,
      ...totals,
    }),
    [
      items,
      isOpen,
      flashId,
      addItem,
      removeItem,
      increment,
      decrement,
      setQuantity,
      clearCart,
      getQuantity,
      openCart,
      closeCart,
      toggleCart,
      totals,
    ]
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>')
  return ctx
}
