/** تایپ‌های مشترک کل پروژه */

export type CategoryId =
  | 'hot-coffee'
  | 'cold-coffee'
  | 'hot-drinks'
  | 'cold-drinks'
  | 'tea'
  | 'dessert'
  /* | 'breakfast' */
  | 'food'
  | 'fries';

export interface Category {
  id: CategoryId;
  title: string;
  /** توضیح کوتاه زیر عنوان دسته */
  subtitle: string;
  /** ایموجی برای حالت جایگزین تصویر / تزئین */
  emoji: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  /** قیمت به تومان */
  price: number;
  categoryId: CategoryId;
  image: string;
  /** ایموجی جایگزین در صورت لود نشدن تصویر */
  emoji: string;
  /** برچسب کوچک روی کارت */
  badge?: 'پرفروش' | 'جدید' | 'ویژه' | 'گیاهی';
  /** مواد اصلی، برای نمایش در دراور */
  notes?: string;
}

/** نوع سفارش */
export type OrderType = 'dine-in' | 'takeaway';

/** سبد خرید: شناسه آیتم → تعداد */
export type CartItems = Record<string, number>;

export interface CartLine {
  item: MenuItem;
  qty: number;
  lineTotal: number;
}
