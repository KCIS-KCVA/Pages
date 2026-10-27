// One catalog source for the homepage, shop and product pages.
// Keep confirmed prices here so every shop surface stays in sync.
export const products = [
  {
    slug: 'training-long-sleeve',
    name: 'KCVA TRAINING LONG SLEEVE',
    nameZh: 'KCVA 训练长袖',
    kind: 'Long sleeve',
    description: 'White crewneck training top with black collar and cuffs, three shoulder stripes, KCVA wordmark and a tonal volleyball pattern.',
    descriptionZh: '白色圆领训练上衣，黑色领口与袖口、肩部三条黑线、KCVA 字标及浅色排球暗纹。',
    priceCny: 119.9,
    images: [
      { src: '/assets/products/long-sleeve-both.webp', alt: 'KCVA training long sleeve, front and back' },
      { src: '/assets/products/long-sleeve-front.webp', alt: 'KCVA training long sleeve front' },
      { src: '/assets/products/long-sleeve-back.webp', alt: 'KCVA training long sleeve back' },
      { src: '/assets/products/long-sleeve-detail.webp', alt: 'KCVA training long sleeve collar and shoulder detail' }
    ]
  },
  {
    slug: 'pearl-white-short-sleeve',
    name: 'KCVA PEARL WHITE SHORT SLEEVE',
    nameZh: 'KCVA 珍珠白短袖球衣',
    kind: 'Short sleeve',
    description: 'Pearl-white volleyball jersey with a black crewneck, three shoulder stripes, KCVA wordmark and a tonal volleyball pattern.',
    descriptionZh: '珍珠白排球短袖球衣，黑色圆领、肩部三条黑线、KCVA 字标及浅色排球暗纹。',
    priceCny: 99.9,
    images: [
      { src: '/assets/products/short-sleeve-both.webp', alt: 'KCVA pearl white short sleeve, front and back' },
      { src: '/assets/products/short-sleeve-front.webp', alt: 'KCVA pearl white short sleeve front' },
      { src: '/assets/products/short-sleeve-back.webp', alt: 'KCVA pearl white short sleeve back' },
      { src: '/assets/products/short-sleeve-detail.webp', alt: 'KCVA pearl white short sleeve collar and shoulder detail' }
    ]
  },
  {
    slug: 'frisbee-white-long-sleeve',
    name: 'KCVA FRISBEE LONG SLEEVE — WHITE',
    nameZh: 'KCVA 飞盘长袖 — 白色',
    kind: 'Long sleeve',
    description: 'White crewneck frisbee training top with black collar and cuffs, printed sleeve stripes, KCVA wordmark and tonal disc pattern. Front and back shown in the supplied design.',
    descriptionZh: '白色圆领飞盘训练长袖，黑色领口及袖口、文字袖臂条纹、KCVA 字标和浅色飞盘暗纹。图片展示所提供设计的正反面。',
    priceCny: null,
    images: [
      { src: '/assets/products/frisbee-white-both.png', alt: 'KCVA white frisbee long sleeve design, front and back' }
    ]
  },
  {
    slug: 'frisbee-black-long-sleeve',
    name: 'KCVA FRISBEE LONG SLEEVE — BLACK',
    nameZh: 'KCVA 飞盘长袖 — 黑色',
    kind: 'Long sleeve',
    description: 'Black crewneck frisbee training top with white KCVA wordmark, printed sleeve stripes and tonal disc pattern. Front and back shown in the supplied design.',
    descriptionZh: '黑色圆领飞盘训练长袖，白色 KCVA 字标、文字袖臂条纹和炭灰飞盘暗纹。图片展示所提供设计的正反面。',
    priceCny: null,
    images: [
      { src: '/assets/products/frisbee-black-both.png', alt: 'KCVA black frisbee long sleeve design, front and back' }
    ]
  }
];

export const productPrice = (product, lang = 'en') =>
  product.priceCny == null
    ? (lang === 'zh' ? 'Price to be announced / 价格待公布' : 'Price to be announced / 价格待公布')
    : `¥${Number(product.priceCny).toFixed(1)}`;
