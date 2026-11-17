import { categories } from '../../data/menu';
import { useScrollToSection } from '../../hooks';
import { Icon } from '../ui/Icon';

interface CategoryBarProps {
  activeId: string;
  query: string;
  onQueryChange: (value: string) => void;
}

/** نوار چسبان دسته‌ها + کادر جست‌وجو */
export function CategoryBar({ activeId, query, onQueryChange }: CategoryBarProps) {
  const scrollTo = useScrollToSection();

  return (
    <div className="category-bar">
      <div className="container category-bar__inner">
        <div className="category-bar__scroll" role="tablist" aria-label="دسته‌بندی منو">
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              role="tab"
              aria-selected={activeId === category.id}
              className={`chip${activeId === category.id ? ' chip--active' : ''}`}
              onClick={() => scrollTo(category.id)}
            >
              <span aria-hidden="true">{category.emoji}</span>
              {category.title}
            </button>
          ))}
        </div>

        <div className="search">
          <span className="search__icon">
            <Icon name="search" size={16} />
          </span>
          <input
            type="search"
            className="search__input"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="جست‌وجو در منو…"
            aria-label="جست‌وجو در منو"
          />
          {query && (
            <button
              type="button"
              className="search__clear"
              onClick={() => onQueryChange('')}
              aria-label="پاک کردن جست‌وجو"
            >
              <Icon name="close" size={14} strokeWidth={2} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
