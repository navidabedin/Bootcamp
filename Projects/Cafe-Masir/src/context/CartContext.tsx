import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { menuItems } from '../data/menu';
import { site } from '../data/site';
import { useBodyScrollLock, useLocalStorage } from '../hooks';
import type { CartItems, CartLine, OrderType } from '../types';

interface CartContextValue {
  items: CartItems;
  lines: CartLine[];
  count: number;
  subtotal: number;
  deliveryFee: number;
  total: number;
  orderType: OrderType;
  setOrderType: (type: OrderType) => void;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  add: (id: string) => void;
  remove: (id: string) => void;
  increment: (id: string) => void;
  decrement: (id: string) => void;
  clear: () => void;
  qtyOf: (id: string) => number;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useLocalStorage<CartItems>('noon-cart', {});
  const [orderType, setOrderType] = useLocalStorage<OrderType>(
    'noon-order-type',
    'dine-in',
  );
  const [isOpen, setIsOpen] = useState(false);

  useBodyScrollLock(isOpen);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const add = useCallback(
    (id: string) =>
      setItems((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 })),
    [setItems],
  );

  const increment = add;

  const decrement = useCallback(
    (id: string) =>
      setItems((prev) => {
        const next = { ...prev };
        const qty = (next[id] ?? 0) - 1;
        if (qty <= 0) delete next[id];
        else next[id] = qty;
        return next;
      }),
    [setItems],
  );

  const remove = useCallback(
    (id: string) =>
      setItems((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      }),
    [setItems],
  );

  const clear = useCallback(() => setItems({}), [setItems]);

  const qtyOf = useCallback((id: string) => items[id] ?? 0, [items]);

  const lines = useMemo<CartLine[]>(
    () =>
      Object.entries(items)
        .map(([id, qty]) => {
          const item = menuItems.find((menuItem) => menuItem.id === id);
          if (!item) return null;
          return { item, qty, lineTotal: item.price * qty };
        })
        .filter((line): line is CartLine => line !== null),
    [items],
  );

  const count = useMemo(
    () => lines.reduce((sum, line) => sum + line.qty, 0),
    [lines],
  );

  const subtotal = useMemo(
    () => lines.reduce((sum, line) => sum + line.lineTotal, 0),
    [lines],
  );

  const deliveryFee =
    orderType === 'takeaway' && subtotal > 0 && subtotal < site.delivery.freeOver
      ? site.delivery.fee
      : 0;

  const value: CartContextValue = {
    items,
    lines,
    count,
    subtotal,
    deliveryFee,
    total: subtotal + deliveryFee,
    orderType,
    setOrderType,
    isOpen,
    open,
    close,
    add,
    remove,
    increment,
    decrement,
    clear,
    qtyOf,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart باید داخل CartProvider استفاده شود.');
  return ctx;
}
