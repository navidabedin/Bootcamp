import { useState, type FormEvent } from 'react';
import { site } from '../data/site';
import { Icon } from '../components/ui/Icon';

export function ContactPage() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
    event.currentTarget.reset();
  };

  return (
    <div className="container">
      <header className="page-head">
        <span className="page-head__eyebrow">تماس با ما</span>
        <h1 className="page-head__title">حرفی، پیشنهادی، یا سفارشی برای جمع؟</h1>
        <p className="page-head__text">
          تلفن را بردارید یا فرم را پر کنید؛ معمولاً در همان روز پاسخ می‌دهیم.
        </p>
      </header>

      <div className="contact-grid">
        <div className="contact-cards">
          <div className="contact-card">
            <span className="contact-card__icon">
              <Icon name="phone" size={19} />
            </span>
            <div>
              <div className="contact-card__label">تلفن</div>
              <div className="contact-card__value">
                <a href={site.phoneHref} dir="ltr">
                  {site.phone}
                </a>
              </div>
            </div>
          </div>

          <div className="contact-card">
            <span className="contact-card__icon">
              <Icon name="pin" size={19} />
            </span>
            <div>
              <div className="contact-card__label">نشانی</div>
              <div className="contact-card__value">{site.address}</div>
            </div>
          </div>

          <div className="contact-card">
            <span className="contact-card__icon">
              <Icon name="clock" size={19} />
            </span>
            <div>
              <div className="contact-card__label">ساعات کار</div>
              <div className="hours-list">
                {site.hours.map((row) => (
                  <div className="hours-list__row" key={row.days}>
                    <span>{row.days}</span>
                    <span>{row.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="contact-card">
            <span className="contact-card__icon">
              <Icon name="instagram" size={19} />
            </span>
            <div>
              <div className="contact-card__label">آدرس پیج اینستاگرام</div>
              <div className="contact-card__value">
                {site.socials.map((social) => (
                  <div key={social.label}>
                    <a href={social.href} target="_blank" rel="noreferrer" dir="ltr">
                      {social.handle}
                    </a>{' '}
          
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <form className="form" onSubmit={handleSubmit}>
          <h2 className="form__title">پیام بفرستید</h2>
          <p className="form__hint">
            برای سفارش‌های گروهی یا رزرو میز، حداقل یک روز قبل اطلاع بدهید.
          </p>

          <label className="field">
            <span className="field__label">نام و نام خانوادگی</span>
            <input className="field__input" name="name" required placeholder="مثلاً سارا محمدی" />
          </label>

          <label className="field">
            <span className="field__label">شماره تماس</span>
            <input
              className="field__input"
              name="phone"
              type="tel"
              required
              dir="ltr"
              placeholder="0912 000 0000"
            />
          </label>

          <label className="field">
            <span className="field__label">پیام</span>
            <textarea
              className="field__textarea"
              name="message"
              required
              placeholder="موضوع پیام را بنویسید…"
            />
          </label>

          <button type="submit" className="btn btn--primary btn--block">
            <Icon name="mail" size={17} />
            ارسال پیام
          </button>

          {sent && (
            <p className="form__success" role="status">
              پیام شما ثبت شد. به‌زودی تماس می‌گیریم. ☕
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
