/** ابزارهای قالب‌بندی — توابع خالص، بدون وابستگی به React */

const numberFa = new Intl.NumberFormat('fa-IR');

const PERSIAN_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

/** ۱۲۵۰۰۰ → «۱۲۵٬۰۰۰» */
export function formatNumber(value: number): string {
  return numberFa.format(value);
}

/** ۱۲۵۰۰۰ → «۱۲۵٬۰۰۰ تومان» */
export function formatPrice(value: number): string {
  return `${numberFa.format(value)} تومان`;
}

/** هر رقمی در رشته را به رقم فارسی تبدیل می‌کند */
export function toPersianDigits(input: string | number): string {
  return String(input).replace(/[0-9]/g, (d) => PERSIAN_DIGITS[Number(d)]);
}

/** کد سفارش کوتاه و خوانا */
export function makeOrderCode(): string {
  const n = Math.floor(1000 + Math.random() * 9000);
  return `NN-${n}`;
}
