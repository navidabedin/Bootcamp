import { termsSections } from '../data/site';

/** ساخت شناسه‌ی لاتین برای لینک‌های فهرست */
const sectionId = (index: number) => `term-${index + 1}`;

export function TermsPage() {
  return (
    <div className="container">
      <header className="page-head">
        <span className="page-head__eyebrow">قوانین و مقررات</span>
        <h1 className="page-head__title">چیزهایی که خوب است راجع به قوانین مسیر بدانید...</h1>
        <p className="page-head__text">
          آخرین
          به‌روزرسانی: آبان ۱۴۰۵
        </p>
      </header>

      <div className="terms">
        <nav className="terms__toc" aria-label="فهرست بخش‌ها">
          {termsSections.map((section, index) => (
            <a key={section.title} href={`#${sectionId(index)}`}>
              {section.title}
            </a>
          ))}
        </nav>

        <div className="terms__body">
          {termsSections.map((section, index) => (
            <section
              className="terms__section"
              id={sectionId(index)}
              key={section.title}
              aria-labelledby={`${sectionId(index)}-title`}
            >
              <h2 className="terms__section-title" id={`${sectionId(index)}-title`}>
                {section.title}
              </h2>
              {section.body.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </section>
          ))}

          <p className="terms__note">
            اگر بخشی از این قوانین برایتان روشن نیست، پیش از سفارش با شماره‌ی
            ۰۹۳۰۲۸۲۸۴۷۵ تماس بگیرید. خوشحال می‌شویم توضیح بدهیم.
          </p>
        </div>
      </div>
    </div>
  );
}
