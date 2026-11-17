import { Link } from 'react-router-dom';
import { site } from '../../data/site';

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <div className="brand">
              <span className="brand__mark">
                <img src="../src/pics/logo.webp" alt="logo"/>
              </span>
              <span className="brand__text">
                <span className="brand__name">{site.name}</span>
                <span className="brand__latin">{site.latin}</span>
              </span>
            </div>
            <p className="footer__about">{site.intro}</p>
          </div>

          <div>
            <h3 className="footer__title">دسترسی سریع</h3>
            <div className="footer__list">
              <Link to="/">منو</Link>
              <Link to="/about">درباره ما</Link>
              <Link to="/contact">تماس با ما</Link>
              <Link to="/terms">قوانین و مقررات</Link>
            </div>
          </div>

          <div>
            <h3 className="footer__title">تماس</h3>
            <div className="footer__list">
              <a href={site.phoneHref} dir="ltr" style={{ textAlign: 'start' }}>
                {site.phone}
              </a>
              <span>{site.address}</span>
              {site.hours.map((row) => (
                <span key={row.days}>
                  {row.days} — {row.time}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <span>© ۱۴۰۵ تمامی حقوق برای کافه مسیر محفوظ است.</span>
        </div>
      </div>
    </footer>
  );
}
