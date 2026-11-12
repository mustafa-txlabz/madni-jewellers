# Madni Jeweller — Next.js Frontend Prototype

> **Live Local URL:** [http://localhost:3000](http://localhost:3000)  
> **Tech Stack:** Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, Lucide React

A high-fidelity, interactive e-commerce and administrative web application for **Madni Jeweller**, handcrafted to match the exact specifications, layout, colour palette, and typography of the Figma design.

---

## 💎 Features & Highlights

### 1. Public Storefront (No Forced Login)
- **Announcement Bar:** Real-time daily gold rate indicator (`Rs. 395,000 / tola` for 22K) & free insured delivery notice.
- **Home Page (`/`):** Hero section with Mughal-inspired arched showcase, "Shop by Category" circular collections, "New Arrivals" showcase, "Bridal & Custom Orders" emerald banner, and 4 trust cards.
- **Product Catalog (`/shop`):** Multi-faceted sidebar filtering (category with item counts, 18K/21K/22K/24K gold purity pills, price slider, in-stock toggle), sort dropdown, and mobile filter drawer.
- **Product Detail (`/product/[id]`):** Multi-angle photo gallery, transparent price breakdown formula (Live Gold Value + Handcrafting charges), hallmarked purity badges, and related recommendations.
- **Zero-Friction Authentication:** 
  - Clicking **Log In** on `/login` instantly signs in as `Ayesha Khan` with notification toasts.
  - Clicking **Sign Up** on `/signup` notifies with a welcoming message and logs in.
- **Login-Required Modal (`b1_c3_s2`):** When a guest user attempts to buy or checkout, this modal pops up to prompt authentication or account creation without disrupting navigation.

### 2. Customer Order Flow
- **Shopping Cart (`/cart`):** Itemized list with quantity counters, trash delete actions, promo code validation simulation, and order summary.
- **Checkout (`/checkout`):** 3-stage progress indicator, delivery selector (Home Delivery vs. Showroom Pickup), and payment selector with Bank Transfer details and file receipt upload simulator.
- **Order Confirmation (`/order-confirmation`):** Thank-you page with verification notice, delivery address, and tracking CTA.
- **My Orders (`/account/orders`):** Customer portal with order history cards, status badges, and 1-click reorder action.
- **Order Tracking (`/account/orders/[id]`):** 5-step visual tracking progress bar (Order placed → Payment verified → Processing → Shipped with tracking code → Delivered) with invoice download button.

### 3. Jeweller Admin Panel
- **Admin Login (`/admin/login`):** Restricted portal access screen.
- **Dashboard (`/admin`):** 4 metric cards (Today's sales, New orders, Pending payments, Low stock), weekly revenue bar chart, recent orders, low stock alerts, and **Today's Gold Rate widget** with an interactive modal to update daily market rates.
- **Products Management (`/admin/products`):** Full catalogue table with search, category/purity/stock filters, and edit/delete actions.
- **Add / Edit Product (`/admin/products/new` & `.../edit`):** Product creation and editing with automatic selling price calculation from weight and karat rate, image upload preview, and visibility switches.
- **Orders Management (`/admin/orders`):** Filter by order state (All, Pending, Processing, Shipped, Delivered, Cancelled) and CSV export.
- **Order Fulfillment (`/admin/orders/[id]`):** Payment bank slip verification (Verify / Reject), status updating, and courier tracking number assignment.
- **Payments Ledger (`/admin/payments`):** Reconciliation dashboard with approval/rejection actions for customer payment slips.
- **Customer CRM (`/admin/customers`):** Customer profiles with order counts, total spend analytics, and joined dates.

### 4. Client Prototype Navigator Bar
A floating button at the bottom-left of every screen allows the client or evaluator to:
- Jump directly to any of the 18 storefront and admin routes.
- Switch between **Guest Mode** and **Customer Logged In** with 1 click to test checkout authentication gates.

---

## 🎨 Design System & Tokens

Defined in [`tailwind.config.ts`](./tailwind.config.ts) directly from the Figma style guide:

```ts
colors: {
  emerald: { DEFAULT: '#0E3B2E', dark: '#08261E', light: '#175643' },
  gold:    { DEFAULT: '#B8893B', dark: '#966E2B', light: '#F3E7CC', soft: '#FAF3E0' },
  ivory:   { DEFAULT: '#FAF6EE' },
  sand:    { DEFAULT: '#F2ECDF', border: '#E7DFD0' },
  ink:     { DEFAULT: '#1C1917', muted: '#6B645A' },
  status:  {
    success: '#157F4F', 'success-bg': '#E8F5EF',
    warning: '#B54708', 'warning-bg': '#FEF3EB',
    error:   '#B42318', 'error-bg':   '#FEE4E2',
    info:    '#1D5FBF', 'info-bg':    '#EFF8FF',
  }
}
```

### Typography
- **Headings / Serif:** `Playfair Display`
- **Body & Controls / Sans:** `Inter`

---

## 🖼️ Image Pipeline & Cloudinary Readiness

All design images are located in:
```
frontend/public/images/designs/
```

- Each product card, detail gallery, cart item, and admin order inspects its image via [`ProductImage.tsx`](./src/components/ui/ProductImage.tsx).
- **Graceful Fallback:** If any image fails to load or if an admin does not upload an image, it seamlessly renders the signature gold vector **Diamond Emblem** on a pastel background.
- **Phase 2 Migration:** In the upcoming backend phase, these images will be hosted on Cloudinary (`res.cloudinary.com`), which is already permitted in [`next.config.mjs`](./next.config.mjs).

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
```bash
npm run build
npm run start
```

---

## 📁 Source Code Organization

```
src/
├── app/                  # Next.js App Router routes
│   ├── (Storefront)      # /, /shop, /product/[id], /login, /signup
│   ├── (Customer Flow)   # /cart, /checkout, /order-confirmation, /account/orders
│   └── admin/            # /admin, /admin/products, /admin/orders, /admin/payments, etc.
├── components/
│   ├── layout/           # Header, Footer, AdminSidebar, PrototypeBar
│   ├── product/          # ProductCard
│   └── ui/               # Badge, DiamondLogo, ProductImage, Toast, LoginPromptModal
├── context/
│   └── AppContext.tsx    # Reactive state store for cart, auth, orders, and products
└── data/
    └── mockData.ts       # Products, orders, transactions, customer seed data
```

