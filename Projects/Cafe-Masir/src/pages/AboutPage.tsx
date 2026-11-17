import { aboutParagraphs, aboutValues, site } from '../data/site';
import { ItemImage } from '../components/ui/ItemImage';

export function AboutPage() {
  return (
    <div className="container">
      <header className="page-head">
        <span className="page-head__eyebrow">درباره ما</span>
        <h1 className="page-head__title">کافه دنج ما حوالی مرکز شهر</h1>
        <p className="page-head__text">{site.tagline}</p>
      </header>

      <div className="about-grid">
        <div className="prose">
          {aboutParagraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
        </div>

        <div className="about-art">
          <ItemImage
            src="../src/pics/masiir.webp"
            alt="فضای داخلی کافه با میزهای چوبی"
            emoji="🪑"
          />
          <div className="about-art__caption">
           -- سالن اصلی کافه مسیر --
          </div>
        </div>
      </div>

      <div className="values">
        {aboutValues.map((value) => (
          <div className="value-card" key={value.title}>
            <span className="value-card__emoji" aria-hidden="true">
              {value.emoji}
            </span>
            <h2 className="value-card__title">{value.title}</h2>
            <p className="value-card__text">{value.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
