import { useState } from 'react';
import { Drawer } from '../ui/Drawer';
import { CartLine } from './CartLine';
import { Icon } from '../ui/Icon';
import { ItemImage } from '../ui/ItemImage';
import { useCart } from '../../context/CartContext';
import { quickPicks } from '../../data/menu';
import { site } from '../../data/site';
import { formatPrice, makeOrderCode, toPersianDigits } from '../../lib/format';
import type { OrderType } from '../../types';

const orderTypes: { id: OrderType; label: string; emoji: string }[] = [
  { id: 'dine-in', label: 'در محل', emoji: '🪑' },
  { id: 'takeaway', label: 'بیرون‌بر', emoji: '🥡' },
];

export function OrderDrawer() {
  const {
    isOpen,
    close,
    lines,
    count,
    subtotal,
    deliveryFee,
    total,
    orderType,
    setOrderType,
    add,
    clear,
  } = useCart();

  const [note, setNote] = useState('');
  const [orderCode, setOrderCode] = useState<string | null>(null);

  const quickItems = quickPicks;

  const handleClose = () => {
    close();
    /* بعد از بسته‌شدن انیمیشن، صفحه‌ی موفقیت پاک شود */
    window.setTimeout(() => setOrderCode(null), 260);
  };

  const handleSubmit = () => {
    setOrderCode(makeOrderCode());
    clear();
    setNote('');
  };

  return (
    <Drawer open={isOpen} onClose={handleClose} labelledBy="order-drawer-title">
      <div className="drawer__head">
        <h2 className="drawer__title" id="order-drawer-title">
          <Icon name="bag" size={19} />
          ثبت سفارش
          {count > 0 && <span className="drawer__count">{toPersianDigits(count)}</span>}
        </h2>
        <button type="button" className="icon-btn" onClick={handleClose} aria-label="بستن">
          <Icon name="close" size={17} strokeWidth={2} />
        </button>
      </div>

      {orderCode ? (
        <div className="drawer__body">
          <div className="success">
            <div className="success__ring">
              <Icon name="check" size={38} strokeWidth={2.4} />
            </div>
            <h3 className="success__title">سفارش شما ثبت شد</h3>
            <p className="success__text">
              شماره‌ی پیگیری را نگه دارید. سفارش شما حدود ۱۵ دقیقه‌ی دیگر آماده
              می‌شود؛ اگر بیرون‌بر است، به‌محض آماده‌شدن تماس می‌گیریم.
            </p>
            <div className="success__code">
              شماره سفارش <strong dir="ltr">{orderCode}</strong>
            </div>
            <button type="button" className="btn btn--dark btn--block" onClick={handleClose}>
              بازگشت به منو
            </button>
          </div>
        </div>
      ) : lines.length === 0 ? (
        <div className="drawer__body">
          <div className="cart-empty">
            <div className="cart-empty__emoji" aria-hidden="true">
              ☕
            </div>
            <h3 className="cart-empty__title">سبد شما خالی است</h3>
            <p className="cart-empty__text">
              یک قهوه و چیزی شیرین انتخاب کنید؛ از همین‌جا اضافه کنید.
            </p>
          </div>

          <div className="quick-picks__label">پیشنهاد کافه</div>
          <div className="quick-picks">
            {quickItems.map((item) => (
              <button
                key={item.id}
                type="button"
                className="quick-pick"
                onClick={() => add(item.id)}
              >
                <span className="quick-pick__thumb">
                  <ItemImage src={item.image} alt={item.name} emoji={item.emoji} />
                </span>
                <span>
                  <span className="quick-pick__name">{item.name}</span>
                  <span className="quick-pick__price">{formatPrice(item.price)}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <>
          <div className="drawer__body">
            <div className="cart-lines">
              {lines.map((line) => (
                <CartLine key={line.item.id} line={line} />
              ))}
            </div>
          </div>

          <div className="drawer__foot">
            <div className="order-type" role="group" aria-label="نوع سفارش">
              {orderTypes.map((type) => (
                <button
                  key={type.id}
                  type="button"
                  className={`order-type__btn${
                    orderType === type.id ? ' order-type__btn--active' : ''
                  }`}
                  onClick={() => setOrderType(type.id)}
                  aria-pressed={orderType === type.id}
                >
                  <span aria-hidden="true">{type.emoji}</span>
                  {type.label}
                </button>
              ))}
            </div>

            <label className="note-field">
              <span className="note-field__label">یادداشت برای باریستا (اختیاری)</span>
              <textarea
                className="note-field__input"
                value={note}
                onChange={(event) => setNote(event.target.value)}
                placeholder="مثلاً: شیر بادام، بدون شکر، شات اضافه…"
              />
            </label>

            <div className="summary">
              <div className="summary__row">
                <span>جمع آیتم‌ها</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="summary__row summary__row--muted">
                <span>هزینه ارسال (بیرون‌بر)</span>
                {deliveryFee === 0 ? (
                  <span className="summary__free">
                    {orderType === 'dine-in'
                      ? 'در محل — ندارد'
                      : `رایگان بالای ${formatPrice(site.delivery.freeOver)}`}
                  </span>
                ) : (
                  <span>{formatPrice(deliveryFee)}</span>
                )}
              </div>
              <div className="summary__row summary__row--total">
                <span>مبلغ قابل پرداخت</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>

            <button type="button" className="btn btn--primary btn--block" onClick={handleSubmit}>
              <Icon name="check" size={18} />
              تأیید و ثبت سفارش
            </button>
          </div>
        </>
      )}
    </Drawer>
  );
}
