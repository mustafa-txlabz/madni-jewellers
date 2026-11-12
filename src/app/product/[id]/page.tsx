'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ProductCard } from '@/components/product/ProductCard';
import { ProductImage } from '@/components/ui/ProductImage';
import { DiamondEmblem } from '@/components/ui/DiamondLogo';
import { useApp } from '@/context/AppContext';
import {
  ChevronRight,
  Star,
  ShoppingBag,
  Heart,
  Lock,
  ShieldCheck,
  Truck,
  RotateCcw,
  Minus,
  Plus,
} from 'lucide-react';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { products, addToCart, wishlist, toggleWishlist, isLoggedIn, openLoginPrompt, goldRates } = useApp();

  const id = params?.id as string;
  const product = products.find((p) => p.id === id) || products[0];

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'delivery'>('desc');
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const isWishlisted = wishlist.includes(product.id);

  // Recommendations
  const relatedProducts = products.filter((p) => p.id !== product.id).slice(0, 4);

  const handleBuyNow = () => {
    addToCart(product, quantity);
    if (!isLoggedIn) {
      openLoginPrompt();
    } else {
      router.push('/checkout');
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const thumbnails = [
    { bg: product.bgTint },
    { bg: 'bg-[#EFE3C7]' },
    { bg: 'bg-[#ECD2A8]' },
    { bg: 'bg-[#F5D8CF]' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF6EE]">
      <Header />

      <main className="flex-1 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-[#6B645A] mb-8">
            <Link href="/" className="hover:text-[#0E3B2E] transition">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/shop" className="hover:text-[#0E3B2E] transition">
              {product.category}
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#1C1917] font-medium truncate">{product.name}</span>
          </nav>

          {/* Product Hero Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            {/* Gallery Column */}
            <div className="lg:col-span-7 space-y-4">
              {/* Main Image Frame */}
              <div
                className={`relative aspect-square rounded-3xl ${product.bgTint} overflow-hidden border border-[#E7DFD0] shadow-card`}
              >
                <ProductImage
                  src={product.images?.[activeImageIndex] || product.image}
                  alt={product.name}
                  bgTint={product.bgTint}
                  emblemSize={130}
                  className="w-full h-full"
                  priority={true}
                />
              </div>

              {/* Thumbnails Row */}
              <div className="grid grid-cols-4 gap-4">
                {(product.images && product.images.length > 0
                  ? product.images
                  : [product.image, product.image, product.image, product.image]
                ).map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`aspect-square rounded-2xl overflow-hidden border-2 transition ${
                      activeImageIndex === idx
                        ? 'border-[#0E3B2E] ring-2 ring-[#0E3B2E]/20'
                        : 'border-[#E7DFD0] hover:border-[#B8893B]'
                    }`}
                  >
                    <ProductImage
                      src={imgUrl}
                      alt={`${product.name} view ${idx + 1}`}
                      bgTint={product.bgTint}
                      emblemSize={32}
                      className="w-full h-full"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Details Column */}
            <div className="lg:col-span-5 space-y-6">
              {/* Badges */}
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#E8F5EF] text-[#157F4F] border border-[#157F4F]/20">
                  In stock
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#F2ECDF] text-[#1C1917] border border-[#E7DFD0]">
                  {product.purity} Gold
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#F2ECDF] text-[#1C1917] border border-[#E7DFD0]">
                  {product.category}
                </span>
              </div>

              {/* Title */}
              <div>
                <h1 className="font-serif text-3xl sm:text-4xl text-[#0E3B2E] font-medium leading-tight">
                  {product.name}
                </h1>
                {/* Reviews */}
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex text-[#B8893B]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#B8893B] text-[#B8893B]" />
                    ))}
                  </div>
                  <span className="text-xs text-[#6B645A] font-medium">
                    {product.rating} • {product.reviewCount} reviews
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="text-3xl sm:text-4xl font-serif font-bold text-[#1C1917]">
                Rs. {product.price.toLocaleString()}
              </div>

              {/* Transparent Price Breakdown Card */}
              <div className="bg-[#F2ECDF]/70 rounded-2xl p-5 border border-[#E7DFD0] space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B645A]">
                  Price Breakdown
                </span>
                <div className="flex items-center justify-between text-xs text-[#1C1917]">
                  <span className="text-[#6B645A]">
                    Gold value ({product.weight} g @ Rs. {goldRates['22K'].toLocaleString()} / tola, {product.purity})
                  </span>
                  <span className="font-medium">Rs. {product.goldValue.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-[#1C1917]">
                  <span className="text-[#6B645A]">Making charges</span>
                  <span className="font-medium">Rs. {product.makingCharges.toLocaleString()}</span>
                </div>
                <div className="pt-2 border-t border-[#E7DFD0] flex items-center justify-between text-sm font-semibold text-[#0E3B2E]">
                  <span>Total</span>
                  <span>Rs. {product.price.toLocaleString()}</span>
                </div>
              </div>

              {/* Specs Table */}
              <div className="grid grid-cols-2 gap-y-2.5 text-xs py-2 border-y border-[#E7DFD0]">
                <div>
                  <span className="text-[#6B645A]">Purity:</span>{' '}
                  <span className="font-semibold text-[#1C1917]">{product.purity} (916)</span>
                </div>
                <div>
                  <span className="text-[#6B645A]">Weight:</span>{' '}
                  <span className="font-semibold text-[#1C1917]">{product.weight} g</span>
                </div>
                <div>
                  <span className="text-[#6B645A]">Category:</span>{' '}
                  <span className="font-semibold text-[#1C1917]">{product.category}</span>
                </div>
                <div>
                  <span className="text-[#6B645A]">SKU:</span>{' '}
                  <span className="font-semibold text-[#1C1917]">{product.sku}</span>
                </div>
              </div>

              {/* Quantity & Add to Cart */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  {/* Quantity Counter */}
                  <div className="flex items-center border border-[#E7DFD0] rounded-xl bg-white px-2 py-1">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="p-1.5 text-[#6B645A] hover:text-[#1C1917]"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-8 text-center text-xs font-semibold text-[#1C1917]">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="p-1.5 text-[#6B645A] hover:text-[#1C1917]"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 py-3 bg-[#0E3B2E] text-white rounded-xl text-xs sm:text-sm font-medium hover:bg-[#08261E] transition flex items-center justify-center gap-2 shadow-sm"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Add to Cart
                  </button>

                  {/* Wishlist Button */}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="p-3 rounded-xl border border-[#E7DFD0] bg-white hover:bg-[#FAF6EE] text-[#1C1917] transition"
                    title="Save to wishlist"
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        isWishlisted ? 'fill-red-500 text-red-500' : 'text-[#6B645A]'
                      }`}
                    />
                  </button>
                </div>

                {/* Buy Now Button */}
                <button
                  onClick={handleBuyNow}
                  className="w-full py-3 border-2 border-[#0E3B2E] text-[#0E3B2E] bg-transparent hover:bg-[#0E3B2E] hover:text-white rounded-xl text-xs sm:text-sm font-semibold transition"
                >
                  Buy Now
                </button>
              </div>

              {/* Guest Checkout Notice */}
              <div className="bg-[#FAF3E0] rounded-xl p-3.5 border border-[#B8893B]/20 flex items-start gap-2.5 text-xs text-[#6B645A]">
                <Lock className="w-4 h-4 text-[#B8893B] flex-shrink-0 mt-0.5" />
                <p>
                  Browsing is open to everyone. You’ll be asked to log in or sign up when you check out.
                </p>
              </div>

              {/* Assurance Badges */}
              <div className="flex items-center justify-between text-[11px] text-[#6B645A] pt-2">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#B8893B]" /> Hallmarked
                </span>
                <span className="flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-[#B8893B]" /> Insured delivery
                </span>
                <span className="flex items-center gap-1.5">
                  <RotateCcw className="w-4 h-4 text-[#B8893B]" /> COD available
                </span>
              </div>
            </div>
          </div>

          {/* Description & Specifications Tabs */}
          <div className="mt-16 pt-10 border-t border-[#E7DFD0]">
            <div className="flex items-center gap-8 border-b border-[#E7DFD0] pb-3 text-sm">
              <button
                onClick={() => setActiveTab('desc')}
                className={`font-medium transition pb-3 -mb-3 ${
                  activeTab === 'desc'
                    ? 'text-[#0E3B2E] border-b-2 border-[#0E3B2E] font-semibold'
                    : 'text-[#6B645A] hover:text-[#1C1917]'
                }`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab('specs')}
                className={`font-medium transition pb-3 -mb-3 ${
                  activeTab === 'specs'
                    ? 'text-[#0E3B2E] border-b-2 border-[#0E3B2E] font-semibold'
                    : 'text-[#6B645A] hover:text-[#1C1917]'
                }`}
              >
                Specifications
              </button>
              <button
                onClick={() => setActiveTab('delivery')}
                className={`font-medium transition pb-3 -mb-3 ${
                  activeTab === 'delivery'
                    ? 'text-[#0E3B2E] border-b-2 border-[#0E3B2E] font-semibold'
                    : 'text-[#6B645A] hover:text-[#1C1917]'
                }`}
              >
                Delivery & Returns
              </button>
            </div>

            <div className="pt-6 text-xs sm:text-sm text-[#6B645A] leading-relaxed max-w-3xl">
              {activeTab === 'desc' && (
                <p>{product.description}</p>
              )}
              {activeTab === 'specs' && (
                <ul className="space-y-2 list-disc pl-5">
                  <li>Metal: Guaranteed {product.purity} Gold</li>
                  <li>Net Gold Weight: {product.weight} grams</li>
                  <li>Hallmark: 916 Laser Certified Govt. Standard</li>
                  <li>SKU Reference: {product.sku}</li>
                </ul>
              )}
              {activeTab === 'delivery' && (
                <p>
                  Free insured home delivery across Pakistan within 2 to 4 working days via specialized armored courier services. Showroom pickup available at Sarafa Bazaar, Lahore.
                </p>
              )}
            </div>
          </div>

          {/* You May Also Like */}
          <section className="mt-20 pt-12 border-t border-[#E7DFD0]">
            <h2 className="font-serif text-2xl sm:text-3xl text-[#0E3B2E] font-medium mb-8">
              You may also like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

