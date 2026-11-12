'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ProductImage } from '@/components/ui/ProductImage';
import { useApp } from '@/context/AppContext';
import {
  ChevronRight,
  Trash2,
  Minus,
  Plus,
  ArrowRight,
  Lock,
  ShoppingBag,
} from 'lucide-react';

export default function CartPage() {
  const router = useRouter();
  const {
    cart,
    updateCartQuantity,
    removeFromCart,
    cartSubtotal,
    cartCount,
    isLoggedIn,
    openLoginPrompt,
    showToast,
  } = useApp();

  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoCode.trim()) return;
    setPromoApplied(true);
    showToast('Promo code applied: 5% prototype discount!', 'success');
  };

  const discount = promoApplied ? Math.round(cartSubtotal * 0.05) : 0;
  const total = cartSubtotal - discount;

  const handleCheckout = () => {
    if (cart.length === 0) {
      showToast('Your cart is empty', 'warning');
      return;
    }
    if (!isLoggedIn) {
      openLoginPrompt();
    } else {
      router.push('/checkout');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF6EE]">
      <Header />

      <main className="flex-1 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-[#6B645A] mb-4">
            <Link href="/" className="hover:text-[#0E3B2E] transition">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#1C1917] font-medium">Shopping Cart</span>
          </nav>

          <h1 className="font-serif text-3xl sm:text-4xl text-[#0E3B2E] font-medium mb-8">
            Shopping Cart
          </h1>

          {cart.length === 0 ? (
            <div className="bg-white rounded-2xl border border-[#E7DFD0] p-12 text-center max-w-xl mx-auto shadow-card space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#FAF3E0] mx-auto flex items-center justify-center">
                <ShoppingBag className="w-7 h-7 text-[#B8893B]" />
              </div>
              <h2 className="font-serif text-2xl text-[#1C1917]">Your cart is empty</h2>
              <p className="text-xs text-[#6B645A]">
                Explore our fine handcrafted gold and bridal collection.
              </p>
              <Link
                href="/shop"
                className="inline-flex px-6 py-3 bg-[#0E3B2E] text-white rounded-xl text-xs font-medium hover:bg-[#08261E] transition"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Items Column */}
              <div className="lg:col-span-8 bg-white rounded-2xl border border-[#E7DFD0] p-6 shadow-card space-y-6">
                <div className="pb-4 border-b border-[#E7DFD0]">
                  <span className="text-xs font-semibold text-[#1C1917]">
                    {cartCount} {cartCount === 1 ? 'item' : 'items'} in your cart
                  </span>
                </div>

                <div className="divide-y divide-[#E7DFD0]">
                  {cart.map(({ product, quantity }) => (
                    <div
                      key={product.id}
                      className="py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      {/* Product Thumbnail & Meta */}
                      <div className="flex items-center gap-4">
                        <div
                          className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 border border-[#E7DFD0]"
                        >
                          <ProductImage
                            src={product.image}
                            alt={product.name}
                            bgTint={product.bgTint}
                            emblemSize={32}
                            className="w-full h-full"
                          />
                        </div>
                        <div className="space-y-1">
                          <h3 className="font-serif text-base font-semibold text-[#1C1917] hover:text-[#0E3B2E] transition">
                            <Link href={`/product/${product.id}`}>{product.name}</Link>
                          </h3>
                          <p className="text-xs text-[#6B645A]">
                            {product.purity} Gold • {product.weight} g • SKU: {product.sku}
                          </p>
                          <span className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-[#E8F5EF] text-[#157F4F]">
                            In stock
                          </span>
                        </div>
                      </div>

                      {/* Quantity Controls & Price */}
                      <div className="flex items-center justify-between sm:justify-end gap-6 sm:gap-8">
                        {/* Quantity Counter */}
                        <div className="flex items-center border border-[#E7DFD0] rounded-lg bg-[#FAF6EE] px-2 py-1">
                          <button
                            onClick={() => updateCartQuantity(product.id, quantity - 1)}
                            className="p-1 text-[#6B645A] hover:text-[#1C1917]"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-7 text-center text-xs font-semibold text-[#1C1917]">
                            {quantity}
                          </span>
                          <button
                            onClick={() => updateCartQuantity(product.id, quantity + 1)}
                            className="p-1 text-[#6B645A] hover:text-[#1C1917]"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right min-w-[110px]">
                          <p className="text-sm sm:text-base font-semibold text-[#1C1917]">
                            Rs. {(product.price * quantity).toLocaleString()}
                          </p>
                        </div>

                        {/* Remove */}
                        <button
                          onClick={() => removeFromCart(product.id)}
                          className="text-[#6B645A] hover:text-red-600 transition p-1.5"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Order Summary Column */}
              <div className="lg:col-span-4 bg-white rounded-2xl border border-[#E7DFD0] p-6 shadow-card space-y-5">
                <h3 className="font-serif text-xl font-semibold text-[#1C1917]">
                  Order Summary
                </h3>

                {/* Promo Code Form */}
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Promo code"
                    className="flex-1 px-3 py-2 bg-[#FAF6EE] border border-[#E7DFD0] rounded-lg text-xs text-[#1C1917] focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#F2ECDF] text-[#1C1917] hover:bg-[#E9E1D1] rounded-lg text-xs font-medium transition"
                  >
                    Apply
                  </button>
                </form>

                {/* Pricing Line Items */}
                <div className="space-y-3 pt-3 border-t border-[#E7DFD0] text-xs">
                  <div className="flex items-center justify-between text-[#6B645A]">
                    <span>Subtotal ({cartCount} items)</span>
                    <span className="font-medium text-[#1C1917]">
                      Rs. {cartSubtotal.toLocaleString()}
                    </span>
                  </div>

                  {discount > 0 && (
                    <div className="flex items-center justify-between text-[#157F4F]">
                      <span>Discount (5%)</span>
                      <span>- Rs. {discount.toLocaleString()}</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-[#6B645A]">
                    <span>Delivery</span>
                    <span className="font-medium text-[#157F4F]">Free</span>
                  </div>

                  <div className="flex items-center justify-between text-[#6B645A]">
                    <span>Insurance</span>
                    <span className="font-medium text-[#157F4F]">Included</span>
                  </div>

                  <div className="pt-3 border-t border-[#E7DFD0] flex items-center justify-between text-base font-bold text-[#1C1917]">
                    <span>Total</span>
                    <span className="text-[#0E3B2E]">Rs. {total.toLocaleString()}</span>
                  </div>
                </div>

                {/* Proceed Button */}
                <button
                  onClick={handleCheckout}
                  className="w-full py-3.5 bg-[#0E3B2E] text-white rounded-xl text-xs sm:text-sm font-semibold hover:bg-[#08261E] transition flex items-center justify-center gap-2 shadow-sm"
                >
                  Proceed to Checkout
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* Continue Shopping */}
                <div className="text-center">
                  <Link
                    href="/shop"
                    className="text-xs text-[#6B645A] hover:text-[#0E3B2E] font-medium"
                  >
                    Continue Shopping
                  </Link>
                </div>

                {/* Trust Footer */}
                <div className="pt-2 text-center flex items-center justify-center gap-1.5 text-[11px] text-[#6B645A]">
                  <Lock className="w-3.5 h-3.5 text-[#B8893B]" />
                  Secure checkout • Insured delivery
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

