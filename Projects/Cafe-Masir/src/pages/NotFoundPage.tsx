import { Link } from 'react-router-dom';
import { Icon } from '../components/ui/Icon';

export function NotFoundPage() {
  return (
    <div className="container">
      <div className="notfound">
        <div className="notfound__code" aria-hidden="true">
          ۴۰۴
        </div>
        <h1 className="notfound__title">این صفحه پیدا نشد</h1>
        <p className="notfound__text">
          شاید آدرس عوض شده باشد. منوی کافه همیشه در دسترس است.
        </p>
        <Link to="/" className="btn btn--primary">
          <Icon name="arrow-left" size={17} />
          بازگشت به منو
        </Link>
      </div>
    </div>
  );
}
