/* import type { Category, MenuItem } from '../types'; */

/* ────────────────────────────────────────────────────────────
   تصاویر محلی
   همه‌ی فایل‌های src/pics یک‌جا خوانده می‌شوند؛ نیازی به import تک‌تک نیست.
   اسم فایل را بده (با یا بدون پسوند):  pic('palfredo')
   ──────────────────────────────────────────────────────────── */
/* const picFiles = import.meta.glob('../pics/*.{webp,jpg,jpeg,png,avif,gif}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;
 */
/** «اسم فایل بدون پسوند» → «آدرس نهایی تصویر» */
/* const pics: Record<string, string> = Object.fromEntries(
  Object.entries(picFiles).map(([path, url]) => [
    path.split('/').pop()!.replace(/\.[^.]+$/, ''),
    url,
  ]),
);

const pic = (name: string): string => {
  const key = name.replace(/\.[^.]+$/, '');
  const url = pics[key];
  if (!url && import.meta.env.DEV) {
    console.warn(`[menu.ts] عکسی با نام «${key}» در src/pics پیدا نشد.`);
  }
  return url ?? '';
};
 */


import type { Category, MenuItem } from '../types';

const pic = (name: string): string =>
  `${import.meta.env.BASE_URL}pics/${name}.webp`;







export const categories: Category[] = [
  {
    id: 'hot-coffee',
    title: 'قهوه‌ی گرم',
    subtitle: 'اسپرسو و آیتم‌های دارای شیر',
    emoji: '☕',
  },
  {
    id: 'cold-coffee',
    title: 'قهوه‌ی سرد',
    subtitle: 'اسپرسو و آیتم‌های دارای شیر',
    emoji: '🧊',
  },
  {
    id: 'hot-drinks',
    title:'نوشیدنی گرم',
    subtitle: 'برای روزهای سرد',
    emoji: '☕',
  },
  {
    id: 'cold-drinks',
    title: 'نوشیدنی سرد',
    subtitle: 'برای روز‌های گرم',
    emoji: '🍹',
  },
  {
    id: 'tea',
    title: 'دمنوش و چای',
    subtitle: 'آرام و کم‌کافئین',
    emoji: '🍵',
  },
  {
    id: 'dessert',
    title: 'کیک',
    subtitle: 'شیرینیِ روز',
    emoji: '🍰',
  },
  /* {
    id: 'breakfast',
    title: 'صبحانه',
    subtitle: 'تا ساعت ۱۳ سرو می‌شود',
    emoji: '🍳',
  }, */
  {
    id: 'food',
    title: 'پاستا و پنینی',
    subtitle: 'امضای کار',
    emoji: '🥪',
  },
  {
    id: 'fries',
    title: 'سیب‌زمینی',
    subtitle: 'پیش‌ غذا',
    emoji: '🍟',
  },
];

export const menuItems: MenuItem[] = [
  /* ─────────────── قهوه‌ی گرم ─────────────── */
  {
    id: 'espresso-double',
    name: 'دبل اسپرسو',
    description: 'دبل اسپرسو + کوکی',
    price: 225000,
    categoryId: 'hot-coffee',
    image: pic('espresso'),
    emoji: '☕',
    notes: '۳۰ میلی‌لیتر، بلند ۶۰ میلی‌لیتر',
  },
  {
    id: 'espresso single',
    name: 'سینگل اسپرسو',
    description: 'سینگل اسپرسو + کوکی',
    price: 205000,
    categoryId: 'hot-coffee',
    image: pic('espresso'),
    emoji: '☕',
    notes: '۳۰ میلی‌لیتر، بلند ۶۰ میلی‌لیتر',
  },
  {
    id: 'americano',
    name: 'آمریکانو',
    description: 'دبل اسپرسو با آب جوش + کوکی',
    price: 230000,
    categoryId: 'hot-coffee',
    image: pic('americano'),
    emoji: '☕',
  },
  {
    id: 'latte',
    name: 'لاته',
    description: 'دبل اسپرسو + فوم شیر',
    price: 330000,
    categoryId: 'hot-coffee',
    image: pic('latte'),
    emoji: '🥛',
    badge: 'پرفروش',
  },
  {
    id: 'cappuccino',
    name: 'کاپوچینو',
    description: 'دبل اسپرسو + فوم زیاد شیر',
    price: 330000,
    categoryId: 'hot-coffee',
    image: pic('cappuccino'),
    emoji: '☕',
  },
  {
    id: 'mocha',
    name: 'موکا',
    description: 'دبل اسپرسو + سس شکلات + فوم شیر',
    price: 390000,
    categoryId: 'hot-coffee',
    image: pic('mocha'),
    emoji: '🍫',
  },
  {
    id: 'coconut-latte',
    name: 'کوکونات لاته',
    description: 'دبل اسپرسو + نارگیل + فوم شیر',
    price: 390000,
    categoryId: 'hot-coffee',
    image: pic('coconut-latte'),
    emoji: '☕',
  },
  {
    id: 'vanil-latte',
    name: 'وانیلا لاته',
    description: 'دبل اسپرسو + وانیل + فوم شیر',
    price: 385000,
    categoryId: 'hot-coffee',
    image: pic('coconut-latte'),
    emoji: '☕',
  },
  {
    id: 'caramel-maciato',
    name: 'کارامل ماکیاتو',
    description: 'دبل اسپرسو + کارامل + فوم شیر',
    price: 375000,
    categoryId: 'hot-coffee',
    image: pic('caramel maciato'),
    emoji: '☕',
    badge: 'ویژه',
    notes: 'دانه‌ی هفته را از باریستا بپرسید',
  },
  {
    id: 'cortado',
    name:'کورتادو',
    description: 'دبل اسپرسو + فوم شیر(برابر حجم اسپرسو)',
    price: 290000,
    categoryId: 'hot-coffee',
    image: pic('cortado'),
    emoji: '☕',
    badge: 'ویژه',
    notes: 'دانه‌ی هفته را از باریستا بپرسید',
  },
  {
    id: 'masala espresso',
    name:'ماسالا اسپرسو',
    description: 'دبل اسپرسو + شیر + ماسالا',
    price: 390000,
    categoryId: 'hot-coffee',
    image: pic('masala espresso'),
    emoji: '☕',
    badge: 'ویژه',
    notes: 'دانه‌ی هفته را از باریستا بپرسید',
  },

  /* ─────────────── قهوه‌ی سرد ─────────────── */
  {
    id: 'ice americano',
    name: 'آیس آمریکانو',
    description: 'دبل اسپرسو + آب + یخ',
    price: 235000,
    categoryId: 'cold-coffee',
    image: pic('ice americano'),
    emoji: '🧊',
  },
  {
    id: 'ice latte',
    name: 'آیس لاته',
    description: 'دبل اسپرسو + شیر + یخ',
    price: 335000,
    categoryId: 'cold-coffee',
    image: pic('ice latte'),
    emoji: '🧊',
    badge: 'پرفروش',
  },
  {
    id: 'ice mocha',
    name: 'آیس موکا',
    description: 'دبل اسپرسو + شکلات + شیر + یخ',
    price: 390000,
    categoryId: 'cold-coffee',
    image: pic('ice moca'),
    emoji: '🧊',
    badge: 'پرفروش',
  },
  {
    id: 'ice caramel-maciato',
    name: 'آیس کارامل ماکیاتو',
    description: 'دبل اسپرسو + کارامل + وانیل + شیر + یخ',
    price: 385000,
    categoryId: 'cold-coffee',
    image: pic('ice caramel-maciato'),
    emoji: '🧊',
    badge: 'پرفروش',
  },
  {
    id: 'afogato',
    name: 'آفوگاتو',
    description: 'دبل اسپرسو + بستنی وانیلی',
    price: 290000,
    categoryId: 'cold-coffee',
    image: pic('afogato'),
    emoji: '🧊',
    badge: 'پرفروش',
  },
  {
    id: 'ice irish americano',
    name: 'آیس آیریش آمریکانو',
    description: 'دبل اسپرسو + آیریش + آب + یخ',
    price: 295000,
    categoryId: 'cold-coffee',
    image: pic('irish americano'),
    emoji: '🧊',
  },

  /* ─────────────── نوشیدنی گرم─────────────── */

  {
    id: 'shir asal darchin',
    name:'شیر عسل دارچین',
    description: 'شیر + عسل + پودر دارچین',
    price: 340000,
    categoryId: 'hot-drinks',
    image: pic('shir asal'),
    emoji: '☕',
    badge: 'ویژه',
    notes: 'دانه‌ی هفته را از باریستا بپرسید',
  },
  {
    id: 'chai masala',
    name:'چای ماسالا',
    description: 'شیر + ماسالا',
    price: 340000,
    categoryId: 'hot-drinks',
    image: pic('chai masala'),
    emoji: '☕',
    badge: 'ویژه',
    notes: 'دانه‌ی هفته را از باریستا بپرسید',
  },
  {
    id: 'hot chocolate',
    name:'هات چاکلت',
    description: 'شیر + شکلات تخته‌ای + دارک چاکلت',
    price: 350000,
    categoryId: 'hot-drinks',
    image: pic('hot chocolate'),
    emoji: '☕',
    badge: 'ویژه',
    notes: 'دانه‌ی هفته را از باریستا بپرسید',
  },
  {
    id: 'hot chocolate peanut',
    name:'هات چاکلت پینات',
    description: 'شیر + شکلات تخته‌ای + دارک چاکلت + کره بادام‌زمینی',
    price: 370000,
    categoryId: 'hot-drinks',
    image: pic('hot chocolate'),
    emoji: '☕',
    badge: 'ویژه',
    notes: 'دانه‌ی هفته را از باریستا بپرسید',
  },


  /* ─────────────── نوشیدنی سرد ─────────────── */
  {
    id: 'lemonade',
    name: 'لیموناد',
    description: 'لیموی تازه + آب‌لیمو طبیعی + یخ خرد‌شده + سودا',
    price: 280000,
    categoryId: 'cold-drinks',
    image: pic('lemonad'),
    emoji: '🍋',
  },
  {
    id: 'mojito',
    name: 'موهیتو',
    description: 'نعناع تازه + آب‌لیمو طبیعی + یخ خرد‌شده + سودا',
    price: 295000,
    categoryId: 'cold-drinks',
    image: pic('mohito'),
    emoji: '🌿',
    badge: 'گیاهی',
  },
  {
    id: 'majidieh',
    name: 'آبجو مجیدیه',
    description: 'آبجو مجیدیه + لیمو + لیوان یخ',
    price: 240000,
    categoryId: 'cold-drinks',
    image: pic('majidieh'),
    emoji: '🌿',
    badge: 'گیاهی',
  },
  {
    id: 'irish bomb',
    name: 'آیریش بمب',
    description: 'سینگل اسپرسو + آیریش + آبلیمو طبیعی + سودا',
    price: 390000,
    categoryId: 'cold-drinks',
    image: pic('irish bomb'),
    emoji: '🌿',
    badge: 'گیاهی',
  },
  {
    id: 'masir sharbat',
    name: 'شربت مسیر',
    description: 'تخم شربتی + خاکشیر + عرق چهارگل + زعفران',
    price: 385000,
    categoryId: 'cold-drinks',
    image: pic('masirsharbat'),
    emoji: '🌿',
    badge: 'گیاهی',
  },
  {
    id: 'golabzaferoon',
    name: 'شربت گلاب و زعفران',
    description: 'عرق گلاب + زعفران + شکر + آب',
    price: 290000,
    categoryId: 'cold-drinks',
    image: pic('golabzaferoon'),
    emoji: '🌿',
    badge: 'گیاهی',
  },
  {
    id: 'milkshake',
    name: 'شیک وانیل',
    description: 'بستنی وانیلی + سیروپ وانیل',
    price: 325000,
    categoryId: 'cold-drinks',
    image: pic('vanilla shake'),
    emoji: '🥛',
  },
  {
    id: 'chocolate shake',
    name: 'شیک شکلات',
    description: 'بستنی وانیلی + شکلات تخته‌ای + سس شکلات',
    price: 380000,
    categoryId: 'cold-drinks',
    image: pic('chocolate shake'),
    emoji: '🥛',
  },
  {
    id: 'coffee shake',
    name: 'شیک قهوه',
    description: 'بستنی وانیلی + سینگل اسپرسو',
    price: 330000,
    categoryId: 'cold-drinks',
    image: pic('coffee shake'),
    emoji: '🥛',
  },
  {
    id: 'peanut shake',
    name: 'شیک بادام‌زمینی',
    description: 'بستنی وانیلی + کره بادام‌زمینی',
    price: 400000,
    categoryId: 'cold-drinks',
    image: pic('peanut shake'),
    emoji: '🥛',
  },
  {
    id: 'mint shake',
    name: 'شیک نعناع',
    description: 'بستنی وانیلی + نعناع',
    price: 320000,
    categoryId: 'cold-drinks',
    image: pic('mint shake'),
    emoji: '🥬',
  },

  /* ─────────────── دمنوش و چای ─────────────── */
  {
    id: 'black-tea',
    name: 'چای دمی',
    description: 'چای + نبات زعفرانی + گل‌محمدی',
    price: 150000,
    categoryId: 'tea',
    image: pic('tea'),
    emoji: '🫖',
  },
  {
    id: 'green-tea',
    name: 'چای سبز',
    description: 'چای سبز + نبات زعفرانی',
    price: 170000,
    categoryId: 'tea',
    image: pic('green tea'),
    emoji: '🍃',
  },
  {
    id: 'relax herbel tea',
    name: 'دمنوش آرامش',
    description: '',
    price: 265000,
    categoryId: 'tea',
    image: pic('aramesh'),
    emoji: '🍵',
    badge: 'جدید',
  },
  {
    id: 'energy herbel tea',
    name: 'دمنوش انرژی',
    description: '',
    price: 275000,
    categoryId: 'tea',
    image: pic('energy'),
    emoji: '🍵',
    badge: 'جدید',
  },
  {
    id: 'jana herbel tea',
    name: 'دمنوش جانا',
    description: '',
    price: 295000,
    categoryId: 'tea',
    image: pic('jana'),
    emoji: '🍵',
    badge: 'جدید',
  },

  /* ─────────────── کیک ─────────────── */
  
  {
    id: 'brookie',
    name: 'بروکی',
    description: 'ترکیبی از براونی و کوکی',
    price: 315000,
    categoryId: 'dessert',
    image: pic('bk'),
    emoji: '🍫',
  },
  {
    id: 'chocolate cake',
    name: 'کیک فاج شکلاتی',
    description: 'کیک شکلاتی با تکه‌های کاکائو',
    price: 300000,
    categoryId: 'dessert',
    image: pic('faj chocolate'),
    emoji: '🍮',
  },
  
  /* ─────────────── صبحانه ─────────────── */
  /* {
    id: 'pancake',
    name: 'پنکیک',
    description: 'سه لایه، با شربت افرا و کره',
    price: 175000,
    categoryId: 'breakfast',
    image: pic('1567620905732-2d1ec7ab7445'),
    emoji: '🥞',
    badge: 'پرفروش',
  },
  {
    id: 'french-toast',
    name: 'فرنچ تست',
    description: 'نان بریوش، دارچین و میوه‌ی فصل',
    price: 165000,
    categoryId: 'breakfast',
    image: pic('1484723091739-30a097e8f929'),
    emoji: '🍞',
  },
  {
    id: 'omelette',
    name: 'املت',
    description: 'سه تخم‌مرغ، پنیر و سبزی تازه',
    price: 145000,
    categoryId: 'breakfast',
    image: pic('1510693206972-df098062cb71'),
    emoji: '🍳',
  },
  {
    id: 'avocado-toast',
    name: 'تست آووکادو',
    description: 'نان ترش، آووکادو و تخم‌مرغ آب‌پز',
    price: 185000,
    categoryId: 'breakfast',
    image: pic('1541519227354-08fa5d50c44d'),
    emoji: '🥑',
    badge: 'گیاهی',
  }, */

  /* ─────────────── پنینی و پاستا─────────────── */

  {
    id: 'pasta',
    name: 'پاستا آلفردو',
    description: '',
    price: 710000,
    categoryId: 'food',
    image: pic('Pasta-alfredo'),
    emoji: '🍝',
  },
  {
    id: 'penini-alfredo',
    name: 'پنینی چیکن آلفردو',
    description: '',
    price: 670000,
    categoryId: 'food',
    image: pic('penini chicken alfredo'),
    emoji: '🍔',
    badge: 'پرفروش',
  },
  {
    id: 'penini-garlic',
    name: 'پنینی گارلیک',
    description: '',
    price: 640000,
    categoryId: 'food',
    image: pic('penini chicken alfredo'),
    emoji: '🍔',
    badge: 'پرفروش',
  },
  {
    id: 'penini-chivez',
    name: 'پنینی چایوز',
    description: '',
    price: 610000,
    categoryId: 'food',
    image: pic('penini chivez'),
    emoji: '🍔',
    badge: 'پرفروش',
  },

  /* ─────────────── سیب‌زمینی─────────────── */
  
  {
    id: 'fries-default',
    name: 'سیب‌زمینی ساده',
    description: '',
    price: 390000,
    categoryId: 'fries',
    image: pic('sibzamini'),
    emoji: '🍟',
  },
  {
    id: 'fries-gharch',
    name: 'سیب‌زمینی با سس قارچ',
    description: '',
    price: 460000,
    categoryId: 'fries',
    image: pic('sibzamini ba sos gharch'),
    emoji: '🍟',
  },
];

/** آیتم‌های یک دسته، به ترتیب تعریف در منو */
export function itemsByCategory(categoryId: string): MenuItem[] {
  return menuItems.filter((item) => item.categoryId === categoryId);
}

/** جست‌وجوی ساده در نام و توضیح */
export function searchItems(query: string): MenuItem[] {
  const q = query.trim();
  if (!q) return menuItems;
  return menuItems.filter(
    (item) => item.name.includes(q) || item.description.includes(q),
  );
}

/** آیتم‌های پیشنهادی برای سبد خالی */
export const quickPicks = ['latte', 'cheesecake', 'croissant', 'iced-latte']
  .map((id) => menuItems.find((item) => item.id === id))
  .filter((item): item is MenuItem => Boolean(item));
