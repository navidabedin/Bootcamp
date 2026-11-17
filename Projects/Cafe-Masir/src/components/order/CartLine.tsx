import type { CartLine as CartLineType } from '../../types';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../lib/format';
import { QuantityStepper } from '../ui/QuantityStepper';
import { ItemImage } from '../ui/ItemImage';
import { Icon } from '../ui/Icon';

export function CartLine({ line }: { line: CartLineType }) {
  const { increment, decrement, remove } = useCart();
  const { item, qty, lineTotal } = line;

  return (
    <div className="cart-line">
      <div className="cart-line__thumb">
        <ItemImage src={item.image} alt={item.name} emoji={item.emoji} />
      </div>

      <div className="cart-line__main">
        <div className="cart-line__top">
          <div>
            <div className="cart-line__name">{item.name}</div>
            <div className="cart-line__unit">{formatPrice(item.price)}</div>
          </div>
          <button
            type="button"
            className="cart-line__remove"
            onClick={() => remove(item.id)}
            aria-label={`حذف ${item.name} از سفارش`}
          >
            <Icon name="trash" size={15} />
          </button>
        </div>

        <div className="cart-line__bottom">
          <QuantityStepper
            value={qty}
            label={item.name}
            onIncrement={() => increment(item.id)}
            onDecrement={() => decrement(item.id)}
          />
          <span className="cart-line__total">{formatPrice(lineTotal)}</span>
        </div>
      </div>
    </div>
  );
}
