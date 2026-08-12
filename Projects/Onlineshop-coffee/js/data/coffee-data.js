export const arabicaVariants = [
  { id: 'eth', name: 'اتیوپی', origin: 'اتیوپی', flag: '🇪🇹', pricePerKg: 980000, desc: 'میوه‌ای، گل‌دار، اسیدیته بالا' },
  { id: 'col', name: 'کلمبیا', origin: 'کلمبیا', flag: '🇨🇴', pricePerKg: 920000, desc: 'کارامل، آجیل، متعادل' },
  { id: 'bra', name: 'برزیل', origin: 'برزیل', flag: '🇧🇷', pricePerKg: 840000, desc: 'شکلاتی، کره‌ای، ملایم' },
];

export const robustaVariants = [
  { id: 'viet', name: 'ویتنام', origin: 'ویتنام', flag: '🇻🇳', pricePerKg: 560000, desc: 'قوی، تلخ، کرما بالا' },
  { id: 'ind',  name: 'هند',    origin: 'هند',    flag: '🇮🇳', pricePerKg: 520000, desc: 'خاکی، ادویه‌ای' },
  { id: 'uga',  name: 'اوگاندا', origin: 'اوگاندا', flag: '🇺🇬', pricePerKg: 490000, desc: 'دودی، تند، غنی' },
];

export const blendRatios = [
  { label: '۱۰۰/۰',  arabicaPct: 100, robustaPct: 0   },
  { label: '۷۰/۳۰',  arabicaPct: 70,  robustaPct: 30  },
  { label: '۵۰/۵۰',  arabicaPct: 50,  robustaPct: 50  },
  { label: '۳۰/۷۰',  arabicaPct: 30,  robustaPct: 70  },
  { label: '۰/۱۰۰',  arabicaPct: 0,   robustaPct: 100 },
];

export const weightOptions = [
  { label: '۲۵۰ گرم', value: 0.25 },
  { label: '۵۰۰ گرم', value: 0.5  },
  { label: '۱ کیلو',  value: 1    },
  { label: '۲ کیلو',  value: 2    },
];
