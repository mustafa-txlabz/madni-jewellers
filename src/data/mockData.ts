export interface Product {
  id: string;
  name: string;
  sku: string;
  category: 'Necklaces' | 'Rings' | 'Bangles' | 'Earrings' | 'Bridal Sets' | 'Chains';
  purity: '18K' | '21K' | '22K' | '24K';
  weight: number; // in grams
  price: number; // in PKR
  stock: number;
  status: 'Active' | 'Low stock' | 'Out of stock';
  badge?: 'New' | 'Bestseller' | 'Sale';
  rating: number;
  reviewCount: number;
  description: string;
  goldValue: number;
  makingCharges: number;
  image: string; // primary image from /images/designs/
  images: string[];
  bgTint: string; // for the clean luxury pastel backgrounds in Figma
  isFeatured?: boolean;
  isNewArrival?: boolean;
  allowCod?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderItem {
  productId: string;
  name: string;
  category: string;
  purity: string;
  weight: number;
  price: number;
  quantity: number;
  image: string;
  imageBg: string;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: {
    street: string;
    city: string;
    province: string;
    postalCode: string;
  };
  date: string;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  deliveryMethod: 'Insured home delivery' | 'Pick up from showroom';
  paymentMethod: 'Bank Transfer' | 'Cash on Delivery' | 'JazzCash' | 'Easypaisa' | 'Credit / Debit Card';
  paymentStatus: 'Pending verification' | 'Verified' | 'Paid' | 'Collected on delivery' | 'Rejected';
  orderStatus: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  receiptImage?: string;
  courierTracking?: string;
  internalNote?: string;
  timeline: {
    status: string;
    timestamp: string;
    description?: string;
    completed: boolean;
  }[];
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  ordersCount: number;
  totalSpent: number;
  joinedDate: string;
  status: 'Active' | 'Inactive';
}

export interface PaymentTransaction {
  id: string;
  orderId: string;
  customer: string;
  method: string;
  amount: number;
  date: string;
  status: 'Pending verification' | 'Verified' | 'Collect on delivery' | 'Rejected';
}

export interface GoldRates {
  '24K': number;
  '22K': number;
  '21K': number;
  '18K': number;
  lastUpdated: string;
}

export const initialGoldRates: GoldRates = {
  '24K': 430900,
  '22K': 395000,
  '21K': 377000,
  '18K': 323200,
  lastUpdated: '12 Nov 2026, 9:30 AM',
};

export const mockProducts: Product[] = [
  {
    id: 'prod-1',
    name: 'Noor Bridal Necklace Set',
    sku: 'MJ-NK-0142',
    category: 'Necklaces',
    purity: '22K',
    weight: 48.5,
    price: 1725000,
    stock: 4,
    status: 'Active',
    badge: 'New',
    rating: 4.8,
    reviewCount: 36,
    description: 'A statement bridal necklace set handcrafted in 22K gold with fine detailing, inspired by traditional Mughal motifs. Includes a necklace, matching earrings and tikka. Each piece is hallmarked and supplied with an authenticity certificate. Made-to-order sizing is available on request.',
    goldValue: 1642500,
    makingCharges: 82500,
    image: '/images/designs/noor-bridal-necklace-set.jpg',
    images: [
      '/images/designs/noor-bridal-necklace-set.jpg',
      '/images/designs/hero-jewellery.jpg',
      '/images/designs/gulnar-polki-choker.jpg',
      '/images/designs/ruby-bridal-tikka.jpg',
    ],
    bgTint: 'bg-[#F4E6C9]',
    isFeatured: true,
    isNewArrival: true,
    allowCod: false,
  },
  {
    id: 'prod-2',
    name: 'Mehrab Gold Ring',
    sku: 'MJ-RG-0087',
    category: 'Rings',
    purity: '22K',
    weight: 6.2,
    price: 228500,
    stock: 12,
    status: 'Active',
    rating: 4.9,
    reviewCount: 22,
    description: 'Gracefully crafted in 22K solid gold with delicate filigree arches inspired by Islamic architecture. Ideal for daily elegance or formal gatherings.',
    goldValue: 209800,
    makingCharges: 18700,
    image: '/images/designs/mehrab-gold-ring.jpg',
    images: [
      '/images/designs/mehrab-gold-ring.jpg',
      '/images/designs/aleena-solitaire-ring.jpg',
    ],
    bgTint: 'bg-[#EFE3C7]',
    isFeatured: true,
    isNewArrival: true,
    allowCod: true,
  },
  {
    id: 'prod-3',
    name: 'Zeba Diamond Earrings',
    sku: 'MJ-ER-0231',
    category: 'Earrings',
    purity: '18K',
    weight: 4.8,
    price: 196000,
    stock: 8,
    status: 'Active',
    rating: 4.7,
    reviewCount: 19,
    description: 'Modern geometric drop earrings in 18K yellow gold, studded with brilliant conflict-free laboratory-certified diamonds.',
    goldValue: 132400,
    makingCharges: 63600,
    image: '/images/designs/zeba-diamond-earrings.jpg',
    images: [
      '/images/designs/zeba-diamond-earrings.jpg',
      '/images/designs/dua-pearl-drop-tops.jpg',
    ],
    bgTint: 'bg-[#DEEBE5]',
    isFeatured: true,
    isNewArrival: true,
    allowCod: true,
  },
  {
    id: 'prod-4',
    name: 'Sitara Gold Bangles (Pair)',
    sku: 'MJ-BG-0054',
    category: 'Bangles',
    purity: '22K',
    weight: 36.0,
    price: 1284000,
    stock: 3,
    status: 'Low stock',
    badge: 'Bestseller',
    rating: 5.0,
    reviewCount: 41,
    description: 'A majestic pair of 22K gold bangles featuring handcrafted starburst engraving and a secure safety screw lock. Finished with mirror polish and satin matte borders.',
    goldValue: 1219000,
    makingCharges: 65000,
    image: '/images/designs/sitara-gold-bangles.jpg',
    images: [
      '/images/designs/sitara-gold-bangles.jpg',
      '/images/designs/shahzadi-karra.jpg',
    ],
    bgTint: 'bg-[#ECCF9F]',
    isFeatured: true,
    isNewArrival: true,
    allowCod: false,
  },
  {
    id: 'prod-5',
    name: 'Hina Pendant Set',
    sku: 'MJ-ST-0033',
    category: 'Bridal Sets',
    purity: '21K',
    weight: 14.3,
    price: 512000,
    stock: 15,
    status: 'Active',
    rating: 4.6,
    reviewCount: 14,
    description: 'Delicate floral pendant with matching tops in 21K gold. Embellished with subtle red enamel and micro-pearl dangles.',
    goldValue: 462000,
    makingCharges: 50000,
    image: '/images/designs/hina-pendant-set.jpg',
    images: [
      '/images/designs/hina-pendant-set.jpg',
    ],
    bgTint: 'bg-[#F5D8CF]',
    isFeatured: true,
    isNewArrival: false,
    allowCod: true,
  },
  {
    id: 'prod-6',
    name: 'Laiba Kundan Jhumkay',
    sku: 'MJ-ER-0199',
    category: 'Earrings',
    purity: '22K',
    weight: 11.4,
    price: 408500,
    stock: 0,
    status: 'Out of stock',
    rating: 4.9,
    reviewCount: 28,
    description: 'Traditional heavy Kundan jhumkas featuring authentic glass stone setting and hand-strung pearl drops on 22K pure gold framework.',
    goldValue: 386000,
    makingCharges: 22500,
    image: '/images/designs/laiba-kundan-jhumkay.jpg',
    images: [
      '/images/designs/laiba-kundan-jhumkay.jpg',
    ],
    bgTint: 'bg-[#EBD6A7]',
    isFeatured: false,
    isNewArrival: false,
    allowCod: true,
  },
  {
    id: 'prod-7',
    name: 'Aleena Solitaire Ring',
    sku: 'MJ-RG-0112',
    category: 'Rings',
    purity: '18K',
    weight: 3.9,
    price: 342000,
    stock: 9,
    status: 'Active',
    rating: 4.8,
    reviewCount: 11,
    description: 'Timeless 6-prong solitaire setting in 18K yellow gold holding a brilliant 0.8ct certified round brilliant diamond.',
    goldValue: 107500,
    makingCharges: 234500,
    image: '/images/designs/aleena-solitaire-ring.jpg',
    images: [
      '/images/designs/aleena-solitaire-ring.jpg',
    ],
    bgTint: 'bg-[#DDE9E2]',
    isFeatured: true,
    isNewArrival: false,
    allowCod: true,
  },
  {
    id: 'prod-8',
    name: 'Ruby Bridal Tikka',
    sku: 'MJ-BD-0021',
    category: 'Bridal Sets',
    purity: '22K',
    weight: 17.8,
    price: 642000,
    stock: 2,
    status: 'Low stock',
    rating: 4.9,
    reviewCount: 8,
    description: 'Regal bridal forehead ornament handcrafted in 22K gold crowned with natural Burmese ruby cabochon and delicate pearl fringing.',
    goldValue: 602800,
    makingCharges: 39200,
    image: '/images/designs/ruby-bridal-tikka.jpg',
    images: [
      '/images/designs/ruby-bridal-tikka.jpg',
    ],
    bgTint: 'bg-[#F3D5CE]',
    isFeatured: false,
    isNewArrival: false,
    allowCod: false,
  },
  {
    id: 'prod-9',
    name: 'Classic Gold Chain',
    sku: 'MJ-CH-0019',
    category: 'Chains',
    purity: '22K',
    weight: 12.0,
    price: 438000,
    stock: 14,
    status: 'Active',
    rating: 4.7,
    reviewCount: 31,
    description: 'Diamond-cut curb link chain in solid 22K gold. Versatile 20-inch length with a heavy lobster claw clasp.',
    goldValue: 406800,
    makingCharges: 31200,
    image: '/images/designs/classic-gold-chain.jpg',
    images: [
      '/images/designs/classic-gold-chain.jpg',
    ],
    bgTint: 'bg-[#ECD2A8]',
    isFeatured: false,
    isNewArrival: false,
    allowCod: true,
  },
];

export const mockOrders: Order[] = [
  {
    id: 'MJ-10482',
    customerName: 'Ayesha Khan',
    customerEmail: 'ayesha.khan@example.com',
    customerPhone: '+92 300 1234567',
    shippingAddress: {
      street: 'House 24, Street 7, Model Town',
      city: 'Lahore',
      province: 'Punjab',
      postalCode: '54700',
    },
    date: '18 Oct 2026',
    items: [
      {
        productId: 'prod-1',
        name: 'Noor Bridal Necklace Set',
        category: 'Necklaces',
        purity: '22K',
        weight: 48.5,
        price: 1725000,
        quantity: 1,
        image: '/images/designs/noor-bridal-necklace-set.jpg',
        imageBg: 'bg-[#F4E6C9]',
      },
      {
        productId: 'prod-2',
        name: 'Mehrab Gold Ring',
        category: 'Rings',
        purity: '22K',
        weight: 6.2,
        price: 228500,
        quantity: 1,
        image: '/images/designs/mehrab-gold-ring.jpg',
        imageBg: 'bg-[#EFE3C7]',
      },
      {
        productId: 'prod-3',
        name: 'Zeba Diamond Earrings',
        category: 'Earrings',
        purity: '18K',
        weight: 4.8,
        price: 196000,
        quantity: 1,
        image: '/images/designs/zeba-diamond-earrings.jpg',
        imageBg: 'bg-[#DEEBE5]',
      },
    ],
    subtotal: 2149500,
    deliveryFee: 0,
    total: 2149500,
    deliveryMethod: 'Insured home delivery',
    paymentMethod: 'Bank Transfer',
    paymentStatus: 'Pending verification',
    orderStatus: 'Pending',
    receiptImage: '/images/designs/payment-receipt-sample.jpg',
    courierTracking: '',
    internalNote: 'High value bridal order. Verify bank slip thoroughly before sending to workshop.',
    timeline: [
      {
        status: 'Order placed',
        timestamp: '18 Oct 2026, 2:14 PM',
        description: 'Order created by customer',
        completed: true,
      },
      {
        status: 'Payment receipt uploaded',
        timestamp: '18 Oct 2026, 2:16 PM',
        description: 'Slip submitted for Bank Transfer verification',
        completed: true,
      },
      {
        status: 'Awaiting payment verification',
        timestamp: 'Admin review required',
        description: 'Staff checking account statement',
        completed: false,
      },
      {
        status: 'Processing',
        timestamp: 'Estimated 19 Oct 2026',
        completed: false,
      },
      {
        status: 'Shipped',
        timestamp: 'Estimated 20 Oct 2026',
        completed: false,
      },
      {
        status: 'Delivered',
        timestamp: 'Estimated 22 Oct 2026',
        completed: false,
      },
    ],
  },
  {
    id: 'MJ-10391',
    customerName: 'Bilal Ahmed',
    customerEmail: 'bilal.ahmed@example.com',
    customerPhone: '+92 301 2345678',
    shippingAddress: {
      street: 'House 24, Street 7, Model Town',
      city: 'Lahore',
      province: 'Punjab',
      postalCode: '54700',
    },
    date: '16 Oct 2026',
    items: [
      {
        productId: 'prod-4',
        name: 'Sitara Gold Bangles (Pair)',
        category: 'Bangles',
        purity: '22K',
        weight: 36.0,
        price: 1284000,
        quantity: 1,
        image: '/images/designs/sitara-gold-bangles.jpg',
        imageBg: 'bg-[#ECCF9F]',
      },
      {
        productId: 'prod-5',
        name: 'Hina Pendant Set',
        category: 'Bridal Sets',
        purity: '21K',
        weight: 14.3,
        price: 512000,
        quantity: 1,
        image: '/images/designs/hina-pendant-set.jpg',
        imageBg: 'bg-[#F5D8CF]',
      },
    ],
    subtotal: 1796000,
    deliveryFee: 0,
    total: 1796000,
    deliveryMethod: 'Insured home delivery',
    paymentMethod: 'JazzCash',
    paymentStatus: 'Paid',
    orderStatus: 'Shipped',
    courierTracking: 'TRX-0000000',
    timeline: [
      {
        status: 'Order placed',
        timestamp: '9 Oct 2026, 2:14 PM',
        description: 'Customer checked out with JazzCash',
        completed: true,
      },
      {
        status: 'Payment verified',
        timestamp: '9 Oct 2026, 4:30 PM',
        description: 'JazzCash transaction confirmed',
        completed: true,
      },
      {
        status: 'Processing',
        timestamp: '10 Oct 2026',
        description: 'Inspected and packed in velvet box',
        completed: true,
      },
      {
        status: 'Shipped',
        timestamp: '11 Oct 2026 • TRX-0000000',
        description: 'Dispatched via TCS Insured Armour',
        completed: true,
      },
      {
        status: 'Delivered',
        timestamp: 'Expected 14 Oct 2026',
        description: 'Out for doorstep delivery',
        completed: false,
      },
    ],
  },
  {
    id: 'MJ-10480',
    customerName: 'Sana Malik',
    customerEmail: 'sana.malik@example.com',
    customerPhone: '+92 302 3456789',
    shippingAddress: {
      street: '15-C, Gulberg III',
      city: 'Lahore',
      province: 'Punjab',
      postalCode: '54660',
    },
    date: '17 Oct 2026',
    items: [
      {
        productId: 'prod-4',
        name: 'Sitara Gold Bangles (Pair)',
        category: 'Bangles',
        purity: '22K',
        weight: 36.0,
        price: 1284000,
        quantity: 1,
        image: '/images/designs/sitara-gold-bangles.jpg',
        imageBg: 'bg-[#ECCF9F]',
      },
    ],
    subtotal: 1284000,
    deliveryFee: 0,
    total: 1284000,
    deliveryMethod: 'Insured home delivery',
    paymentMethod: 'Cash on Delivery',
    paymentStatus: 'Paid',
    orderStatus: 'Processing',
    timeline: [
      { status: 'Order placed', timestamp: '17 Oct 2026', completed: true },
      { status: 'Confirmed', timestamp: '17 Oct 2026', completed: true },
      { status: 'Processing', timestamp: '18 Oct 2026', completed: true },
      { status: 'Shipped', timestamp: 'Pending', completed: false },
    ],
  },
  {
    id: 'MJ-10476',
    customerName: 'Usman Raza',
    customerEmail: 'usman.raza@example.com',
    customerPhone: '+92 303 4567890',
    shippingAddress: {
      street: 'Sector F-7/2, Street 19',
      city: 'Islamabad',
      province: 'Federal',
      postalCode: '44000',
    },
    date: '16 Oct 2026',
    items: [
      {
        productId: 'prod-2',
        name: 'Mehrab Gold Ring',
        category: 'Rings',
        purity: '22K',
        weight: 6.2,
        price: 228500,
        quantity: 1,
        image: '/images/designs/mehrab-gold-ring.jpg',
        imageBg: 'bg-[#EFE3C7]',
      },
    ],
    subtotal: 228500,
    deliveryFee: 0,
    total: 228500,
    deliveryMethod: 'Insured home delivery',
    paymentMethod: 'Easypaisa',
    paymentStatus: 'Paid',
    orderStatus: 'Shipped',
    timeline: [
      { status: 'Order placed', timestamp: '16 Oct 2026', completed: true },
      { status: 'Payment verified', timestamp: '16 Oct 2026', completed: true },
      { status: 'Shipped', timestamp: '17 Oct 2026', completed: true },
    ],
  },
  {
    id: 'MJ-10478',
    customerName: 'Hira Iqbal',
    customerEmail: 'hira.iqbal@example.com',
    customerPhone: '+92 304 5678901',
    shippingAddress: {
      street: 'Phase 6, DHA',
      city: 'Karachi',
      province: 'Sindh',
      postalCode: '75500',
    },
    date: '15 Oct 2026',
    items: [
      {
        productId: 'prod-8',
        name: 'Ruby Bridal Tikka',
        category: 'Bridal Sets',
        purity: '22K',
        weight: 17.8,
        price: 642000,
        quantity: 1,
        image: '/images/designs/ruby-bridal-tikka.jpg',
        imageBg: 'bg-[#F3D5CE]',
      },
    ],
    subtotal: 642000,
    deliveryFee: 0,
    total: 642000,
    deliveryMethod: 'Insured home delivery',
    paymentMethod: 'Bank Transfer',
    paymentStatus: 'Paid',
    orderStatus: 'Delivered',
    timeline: [
      { status: 'Order placed', timestamp: '15 Oct 2026', completed: true },
      { status: 'Payment verified', timestamp: '15 Oct 2026', completed: true },
      { status: 'Delivered', timestamp: '18 Oct 2026', completed: true },
    ],
  },
  {
    id: 'MJ-10477',
    customerName: 'Fatima Noor',
    customerEmail: 'fatima.noor@example.com',
    customerPhone: '+92 305 6789012',
    shippingAddress: {
      street: 'Civil Lines',
      city: 'Rawalpindi',
      province: 'Punjab',
      postalCode: '46000',
    },
    date: '14 Oct 2026',
    items: [
      {
        productId: 'prod-7',
        name: 'Aleena Solitaire Ring',
        category: 'Rings',
        purity: '18K',
        weight: 3.9,
        price: 342000,
        quantity: 1,
        image: '/images/designs/aleena-solitaire-ring.jpg',
        imageBg: 'bg-[#DDE9E2]',
      },
    ],
    subtotal: 342000,
    deliveryFee: 0,
    total: 342000,
    deliveryMethod: 'Insured home delivery',
    paymentMethod: 'Bank Transfer',
    paymentStatus: 'Rejected',
    orderStatus: 'Cancelled',
    timeline: [
      { status: 'Order placed', timestamp: '14 Oct 2026', completed: true },
      { status: 'Receipt rejected', timestamp: '15 Oct 2026', completed: true },
      { status: 'Cancelled', timestamp: '15 Oct 2026', completed: true },
    ],
  },
  {
    id: 'MJ-10475',
    customerName: 'Hamza Ali',
    customerEmail: 'hamza.ali@example.com',
    customerPhone: '+92 306 7890123',
    shippingAddress: {
      street: 'Cantt Road',
      city: 'Peshawar',
      province: 'KPK',
      postalCode: '25000',
    },
    date: '13 Oct 2026',
    items: [
      {
        productId: 'prod-9',
        name: 'Classic Gold Chain',
        category: 'Chains',
        purity: '22K',
        weight: 12.0,
        price: 438000,
        quantity: 1,
        image: '/images/designs/classic-gold-chain.jpg',
        imageBg: 'bg-[#ECD2A8]',
      },
      {
        productId: 'prod-5',
        name: 'Hina Pendant Set',
        category: 'Bridal Sets',
        purity: '21K',
        weight: 14.3,
        price: 512000,
        quantity: 1,
        image: '/images/designs/hina-pendant-set.jpg',
        imageBg: 'bg-[#F5D8CF]',
      },
    ],
    subtotal: 950000,
    deliveryFee: 4500,
    total: 954500,
    deliveryMethod: 'Insured home delivery',
    paymentMethod: 'Credit / Debit Card',
    paymentStatus: 'Paid',
    orderStatus: 'Delivered',
    timeline: [
      { status: 'Order placed', timestamp: '13 Oct 2026', completed: true },
      { status: 'Payment captured', timestamp: '13 Oct 2026', completed: true },
      { status: 'Delivered', timestamp: '16 Oct 2026', completed: true },
    ],
  },
];

export const mockCustomers: Customer[] = [
  {
    id: 'cust-1',
    name: 'Ayesha Khan',
    email: 'ayesha.khan@example.com',
    phone: '+92 300 1234567',
    ordersCount: 3,
    totalSpent: 4141500,
    joinedDate: 'Oct 2026',
    status: 'Active',
  },
  {
    id: 'cust-2',
    name: 'Bilal Ahmed',
    email: 'bilal.ahmed@example.com',
    phone: '+92 301 2345678',
    ordersCount: 2,
    totalSpent: 676000,
    joinedDate: 'Oct 2026',
    status: 'Active',
  },
  {
    id: 'cust-3',
    name: 'Sana Malik',
    email: 'sana.malik@example.com',
    phone: '+92 302 3456789',
    ordersCount: 4,
    totalSpent: 6212500,
    joinedDate: 'Aug 2026',
    status: 'Active',
  },
  {
    id: 'cust-4',
    name: 'Usman Raza',
    email: 'usman.raza@example.com',
    phone: '+92 303 4567890',
    ordersCount: 1,
    totalSpent: 228500,
    joinedDate: 'Sep 2026',
    status: 'Active',
  },
  {
    id: 'cust-5',
    name: 'Hira Iqbal',
    email: 'hira.iqbal@example.com',
    phone: '+92 304 5678901',
    ordersCount: 4,
    totalSpent: 2306000,
    joinedDate: 'Jun 2026',
    status: 'Active',
  },
  {
    id: 'cust-6',
    name: 'Fatima Noor',
    email: 'fatima.noor@example.com',
    phone: '+92 305 6789012',
    ordersCount: 1,
    totalSpent: 342000,
    joinedDate: 'Oct 2026',
    status: 'Active',
  },
  {
    id: 'cust-7',
    name: 'Hamza Ali',
    email: 'hamza.ali@example.com',
    phone: '+92 306 7890123',
    ordersCount: 2,
    totalSpent: 954500,
    joinedDate: 'Jul 2026',
    status: 'Active',
  },
];

export const mockTransactions: PaymentTransaction[] = [
  {
    id: 'TXN-5821',
    orderId: 'MJ-10482',
    customer: 'Ayesha Khan',
    method: 'Bank Transfer',
    amount: 2149500,
    date: '18 Oct 2026',
    status: 'Pending verification',
  },
  {
    id: 'TXN-5820',
    orderId: 'MJ-10481',
    customer: 'Bilal Ahmed',
    method: 'Cash on Delivery',
    amount: 438000,
    date: '18 Oct 2026',
    status: 'Collect on delivery',
  },
  {
    id: 'TXN-5819',
    orderId: 'MJ-10480',
    customer: 'Sana Malik',
    method: 'JazzCash',
    amount: 1284000,
    date: '17 Oct 2026',
    status: 'Verified',
  },
  {
    id: 'TXN-5818',
    orderId: 'MJ-10476',
    customer: 'Usman Raza',
    method: 'Easypaisa',
    amount: 228500,
    date: '16 Oct 2026',
    status: 'Verified',
  },
  {
    id: 'TXN-5817',
    orderId: 'MJ-10478',
    customer: 'Hira Iqbal',
    method: 'Bank Transfer',
    amount: 642000,
    date: '15 Oct 2026',
    status: 'Verified',
  },
  {
    id: 'TXN-5816',
    orderId: 'MJ-10477',
    customer: 'Fatima Noor',
    method: 'Bank Transfer',
    amount: 342000,
    date: '14 Oct 2026',
    status: 'Rejected',
  },
  {
    id: 'TXN-5815',
    orderId: 'MJ-10475',
    customer: 'Hamza Ali',
    method: 'Card',
    amount: 954500,
    date: '13 Oct 2026',
    status: 'Verified',
  },
];
