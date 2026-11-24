import { useCart } from '../../context/CartContext';
import { useScrollToSection } from '../../hooks';
import { menuItems } from '../../data/menu';
import { toPersianDigits } from '../../lib/format';
import { ItemImage } from '../ui/ItemImage';
import { Icon } from '../ui/Icon';

export function Hero() {
  const { open } = useCart();
  const scrollTo = useScrollToSection();

  return (
    <section className="hero">
      <div className="container hero__inner">
        <div>
          <span className="hero__eyebrow">
            <Icon name="cup" size={14} strokeWidth={2} />
          هر مسیر، جایی برای مکث دارد
          </span>

          <h1 className="hero__title">
         مسیر را
            <br />
          قبل رسیدن<br/> به مقصد <em>زیبا کنیم... </em>
          </h1>

          <div className="hero__actions">
            <button type="button" className="btn btn--primary" onClick={open}>
              <Icon name="bag" size={18} />
              ثبت سفارش
            </button>
            <button
              type="button"
              className="btn btn--ghost"
              onClick={() => scrollTo('hot-coffee')}
            >
              دیدن منو
              <Icon name="arrow-left" size={17} />
            </button>
          </div>

          <div className="hero__meta">
            <div className="hero__meta-item">
              <span className="hero__meta-value">{toPersianDigits(menuItems.length)}+</span>
              <span className="hero__meta-label">آیتم در منو</span>
            </div>
            <div className="hero__meta-item">
              <span className="hero__meta-value">۸</span>
              <span className="hero__meta-label">دسته‌بندی</span>
            </div>
            <div className="hero__meta-item">
              <span className="hero__meta-value">۱۵-۲۵</span>
              <span className="hero__meta-label">دقیقه میانگین آماده‌سازی</span>
            </div>
          </div>
        </div>

        <div className="hero__art">
          <div className="hero__art-main">
            <ItemImage
              src="../pics/palfredo.webp"
              alt="پاستا آلفردو نمای نزدیک"
              emoji=""
              loading="eager"
            />
          </div>
          <div className="hero__art-small">
            <ItemImage
              src="../pics/OIP.webp"
              alt="فنجان لاته با لاته‌آرت روی میز چوبی"
              emoji="☕"
              loading="eager"
            />
          </div>
          <div className="hero__stamp" aria-hidden="true">
            <ItemImage
              src="../pics/cake.webp"
              alt="کیک تازه"
              emoji=""
              loading="eager"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
