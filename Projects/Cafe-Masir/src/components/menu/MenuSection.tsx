import type { Category, MenuItem } from '../../types';
import { MenuItemCard } from './MenuItemCard';
import { toPersianDigits } from '../../lib/format';

interface MenuSectionProps {
  category: Category;
  items: MenuItem[];
}

export function MenuSection({ category, items }: MenuSectionProps) {
  if (!items.length) return null;

  return (
    <section id={category.id} className="menu-section" aria-labelledby={`${category.id}-title`}>
      <div className="menu-section__head">
        <div>
          <h2 className="menu-section__title" id={`${category.id}-title`}>
            <span className="menu-section__emoji" aria-hidden="true">
              {category.emoji}
            </span>
            {category.title}
          </h2>
          <p className="menu-section__subtitle">{category.subtitle}</p>
        </div>
        <span className="menu-section__count">
          {toPersianDigits(items.length)} آیتم
        </span>
      </div>

      <div className="menu-grid">
        {items.map((item) => (
          <MenuItemCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
