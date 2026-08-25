export const arabicaVariants = [
  { id: 'eth', name: 'اتیوپی', origin: 'اتیوپیایی', flag: '🇪🇹', pricePerKg: 1200000, desc: 'میوه‌ای، گل‌دار، اسیدیته بالا' , image: "img/ethiopia.webp", flagpic: "img/et.webp"},
  { id: 'col', name: 'کلمبیا', origin: 'کلمبیایی', flag: '🇨🇴', pricePerKg: 1000000, desc: 'کارامل، آجیل، متعادل' , image: "img/colombia.webp", flagpic: "img/co.webp"},
  { id: 'bra', name: 'برزیل', origin: 'برزیلی', flag: '🇧🇷', pricePerKg: 1100000, desc: 'شکلاتی، کره‌ای، ملایم' , image: "img/brazil.webp", flagpic: "img/br.webp"},
];

export const robustaVariants = [
  { id: 'viet', name: 'ویتنام', origin: 'ویتنامی', flag: '🇻🇳', pricePerKg: 650000, desc: 'قوی، تلخ، کرما بالا' , image: "img/vietnam.webp", flagpic: "img/vn.webp"},
  { id: 'ind',  name: 'هند',    origin: 'هندی',    flag: '🇮🇳', pricePerKg: 550000, desc: 'خاکی، ادویه‌ای' , image: "img/india.webp", flagpic: "img/in.webp"},
  { id: 'uga',  name: 'اوگاندا', origin: 'اوگاندایی', flag: '🇺🇬', pricePerKg: 500000, desc: 'دودی، تند، غنی' , image: "img/uganda.webp", flagpic: "img/ug.webp"},
];

export const blendRatios = [
  { label: '100/0',  arabicaPct: 100, robustaPct: 0   },
  { label: '70/30',  arabicaPct: 70,  robustaPct: 30  },
  { label: '50/50',  arabicaPct: 50,  robustaPct: 50  },
  { label: '30/70',  arabicaPct: 30,  robustaPct: 70  },
  { label: '0/100',  arabicaPct: 0,   robustaPct: 100 },
];

export const weightOptions = [
  { label: '250gr', value: 0.25 },
  { label: '500gr', value: 0.5  },
  { label: '1kg',  value: 1    },
  { label: '2kg',  value: 2    },
];
