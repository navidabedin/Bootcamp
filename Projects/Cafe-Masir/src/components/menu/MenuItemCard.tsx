import type { MenuItem } from '../../types';
import { useCart } from '../../context/CartContext';
import { formatPrice, toPersianDigits } from '../../lib/format';
import { ItemImage } from '../ui/ItemImage';
import { Icon } from '../ui/Icon';

export function MenuItemCard({ item }: { item: MenuItem }) {
  const { add, qtyOf } = useCart();
  const qty = qtyOf(item.id);
  const added = qty > 0;

  return (
    <article className="card">
      <div className="card__media">
        <ItemImage src={item.image} alt={item.name} emoji={item.emoji} className="card__img" />
        {item.badge && (
          <span className={`card__badge${item.badge === 'گیاهی' ? ' card__badge--vegan' : ''}`}>
            {item.badge}
          </span>
        )}
      </div>

      <div className="card__body">
        <h3 className="card__title">{item.name}</h3>
        <p className="card__desc">{item.description}</p>

        <div className="card__foot">
          <span className="card__price">
            {formatPrice(item.price)}
          </span>

          <button
            type="button"
            className={`add-btn${added ? ' add-btn--added' : ''}`}
            onClick={() => add(item.id)}
            aria-label={`افزودن ${item.name} به سفارش`}
          >
            <Icon name={added ? 'check' : 'plus'} size={15} strokeWidth={2.2} />
            <span className="add-btn__label">
              {added ? toPersianDigits(qty) : 'افزودن'}
            </span>
          </button>
        </div>
      </div>
    </article>
  );
}
