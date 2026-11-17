import { useMemo, useState } from 'react';
import { Hero } from '../components/menu/Hero';
import { CategoryBar } from '../components/menu/CategoryBar';
import { MenuSection } from '../components/menu/MenuSection';
import { MenuItemCard } from '../components/menu/MenuItemCard';
import { categories, itemsByCategory, searchItems } from '../data/menu';
import { useScrollSpy } from '../hooks';

export function HomePage() {
  const [query, setQuery] = useState('');
  const ids = useMemo(() => categories.map((category) => category.id), []);
  const activeId = useScrollSpy(ids);

  const trimmed = query.trim();
  const searching = trimmed.length > 0;
  const results = useMemo(() => (searching ? searchItems(trimmed) : []), [searching, trimmed]);

  return (
    <>
      <Hero />

      <CategoryBar activeId={activeId} query={query} onQueryChange={setQuery} />

      <div className="container">
        {searching ? (
          results.length > 0 ? (
            <section className="menu-section" aria-label="نتایج جست‌وجو">
              <div className="menu-section__head">
                <div>
                  <h2 className="menu-section__title">
                    <span className="menu-section__emoji" aria-hidden="true">
                      🔍
                    </span>
                    نتایج «{trimmed}»
                  </h2>
                  <p className="menu-section__subtitle">
                    هرچه پیدا شد، همین‌جاست. برای دیدن همه‌ی منو جست‌وجو را پاک کنید.
                  </p>
                </div>
              </div>
              <div className="menu-grid">
                {results.map((item) => (
                  <MenuItemCard key={item.id} item={item} />
                ))}
              </div>
            </section>
          ) : (
            <div className="empty-state">
              <div className="empty-state__emoji" aria-hidden="true">
                🔍
              </div>
              <h2 className="empty-state__title">چیزی پیدا نشد</h2>
              <p className="menu-section__subtitle">
                با واژه‌ی دیگری امتحان کنید؛ مثلاً «لاته»، «کیک» یا «صبحانه».
              </p>
            </div>
          )
        ) : (
          categories.map((category) => (
            <MenuSection
              key={category.id}
              category={category}
              items={itemsByCategory(category.id)}
            />
          ))
        )}
      </div>
    </>
  );
}
