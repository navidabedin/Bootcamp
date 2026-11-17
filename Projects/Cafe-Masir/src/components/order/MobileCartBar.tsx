import { useCart } from '../../context/CartContext';
import { formatPrice, toPersianDigits } from '../../lib/format';
import { Icon } from '../ui/Icon';

/** نوار پایین صفحه در موبایل — فقط وقتی سبد پر است */
export function MobileCartBar() {
  const { count, total, open, isOpen } = useCart();

  if (count === 0 || isOpen) return null;

  return (
    <div className="mobile-cart-bar">
      <div className="mobile-cart-bar__info">
        <span className="mobile-cart-bar__count">
          {toPersianDigits(count)} آیتم در سبد
        </span>
        <span className="mobile-cart-bar__total">{formatPrice(total)}</span>
      </div>
      <button type="button" className="mobile-cart-bar__btn" onClick={open}>
        <Icon name="bag" size={17} />
        ثبت سفارش
      </button>
    </div>
  );
}
