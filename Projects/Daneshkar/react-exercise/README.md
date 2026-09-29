# تمرین ریکت — سه بخش (Props، State و Fragment)
این پروژه شامل سه تمرین و هر تمرین رو در فایلهای مخصوص خودش قرار دادم.

## ساختار پروژه
- src/part1-products/ — بخش اول: لیست محصولات با props
  - ProductList.jsx — کامپوننت پدر؛ آرایه محصولات (نام، قیمت، توضیحات) اینجاست و با props به کارت پاس داده میشود.
  - ProductCard.jsx — کامپوننت فرزند؛ اطلاعات هر محصول را از props میگیرد و نمایش میدهد.
- src/part2-input/ — بخش دوم: نمایش مقدار input در کنسول
  - InputToConsole.jsx
- src/part3-users/ — بخش سوم: لیست کاربران با props و Fragment
  - UserList.jsx — آرایه کاربران (نام، سن، شهر) در App.jsx تعریف شده و با props به این کامپوننت داده میشود.

## اجرا
npm.cmd install
npm.cmd run dev
سپس آدرس http://localhost:5173 را در مرورگر باز کنید.