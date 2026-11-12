'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ProductImage } from '@/components/ui/ProductImage';
import { useApp } from '@/context/AppContext';
import {
  Check,
  Building,
  ArrowRight,
  ShoppingBag,
} from 'lucide-react';

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId') || 'MJ-10482';
  const { orders, user } = useApp();

  const order = orders.find((o) => o.id === orderId) || orders[0];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF6EE]">
      <Header />

      <main className="flex-1 py-10 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Step Progress Bar */}
          <div className="flex items-center justify-center max-w-xl mx-auto mb-12 text-xs sm:text-sm">
            <div className="flex items-center gap-2 text-[#0E3B2E] font-medium">
              <div className="w-7 h-7 rounded-full bg-[#0E3B2E] text-white flex items-center justify-center text-xs">
                <Check className="w-4 h-4" />
              </div>
              <span>Cart</span>
            </div>
            <div className="w-12 sm:w-16 h-[2px] bg-[#0E3B2E] mx-3" />
            <div className="flex items-center gap-2 text-[#0E3B2E] font-medium">
              <div className="w-7 h-7 rounded-full bg-[#0E3B2E] text-white flex items-center justify-center text-xs">
                <Check className="w-4 h-4" />
              </div>
              <span>Shipping & Payment</span>
            </div>
            <div className="w-12 sm:w-16 h-[2px] bg-[#0E3B2E] mx-3" />
            <div className="flex items-center gap-2 text-[#0E3B2E] font-bold">
              <div className="w-7 h-7 rounded-full bg-[#0E3B2E] text-white flex items-center justify-center text-xs">
                3
              </div>
              <span>Confirmation</span>
            </div>
          </div>

          {/* Success Banner */}
          <div className="text-center space-y-4 mb-10">
            <div className="w-20 h-20 rounded-full bg-[#E8F5EF] mx-auto flex items-center justify-center shadow-sm">
              <Check className="w-10 h-10 text-[#157F4F]" strokeWidth={2.5} />
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl text-[#0E3B2E] font-medium">
              Thank you, {order.customerName ? order.customerName.split(' ')[0] : user.name.split(' ')[0]}!
            </h1>
            <p className="text-xs sm:text-sm text-[#6B645A]">
              Your order <strong className="text-[#1C1917] font-semibold">{order.id}</strong> has been placed on {order.date}.
            </p>
          </div>

          {/* Verification Warning Alert */}
          {order.paymentMethod === 'Bank Transfer' && (
            <div className="bg-[#FEF3EB] border border-[#B54708]/20 rounded-2xl p-4 sm:p-5 flex items-center gap-3.5 mb-8 text-xs sm:text-sm text-[#B54708]">
              <Building className="w-5 h-5 flex-shrink-0" />
              <span>
                Awaiting payment verification. We&apos;ll confirm your order as soon as the jeweller verifies your bank transfer receipt.
              </span>
            </div>
          )}

          {/* 3 Summary Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {/* Delivery Address */}
            <div className="bg-white rounded-2xl p-5 border border-[#E7DFD0] shadow-card space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#B8893B]">
                Delivery Address
              </span>
              <p className="text-xs font-semibold text-[#1C1917]">{order.customerName}</p>
              <p className="text-xs text-[#6B645A] leading-relaxed">
                {order.shippingAddress.street} <br />
                {order.shippingAddress.city}, {order.shippingAddress.province} {order.shippingAddress.postalCode}
              </p>
            </div>

            {/* Payment */}
            <div className="bg-white rounded-2xl p-5 border border-[#E7DFD0] shadow-card space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#B8893B]">
                Payment
              </span>
              <p className="text-xs font-semibold text-[#1C1917]">{order.paymentMethod}</p>
              <p className="text-xs text-[#6B645A]">Receipt uploaded</p>
              <span className="inline-block text-[11px] px-2.5 py-0.5 rounded-full bg-[#FEF3EB] text-[#B54708] font-medium border border-[#B54708]/20">
                Status: {order.paymentStatus}
              </span>
            </div>

            {/* Estimated Delivery */}
            <div className="bg-white rounded-2xl p-5 border border-[#E7DFD0] shadow-card space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#B8893B]">
                Estimated Delivery
              </span>
              <p className="text-xs font-semibold text-[#1C1917]">
                2~4 working days after verification
              </p>
              <p className="text-xs text-[#6B645A]">{order.deliveryMethod}</p>
            </div>
          </div>

          {/* Order Summary Card */}
          <div className="bg-white rounded-2xl border border-[#E7DFD0] p-6 sm:p-8 shadow-card space-y-6 mb-8">
            <h3 className="font-serif text-xl font-semibold text-[#1C1917]">
              Order summary
            </h3>

            <div className="divide-y divide-[#E7DFD0]">
              {order.items.map((item, idx) => (
                <div key={idx} className="py-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 border border-[#E7DFD0]"
                    >
                      <ProductImage
                        src={item.image}
                        alt={item.name}
                        bgTint={item.imageBg || 'bg-[#F4E6C9]'}
                        emblemSize={22}
                        className="w-full h-full"
                      />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-semibold text-[#1C1917]">
                        {item.name} ×{item.quantity}
                      </p>
                      <p className="text-[11px] text-[#6B645A]">{item.purity}</p>
                    </div>
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-[#1C1917]">
                    Rs. {(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-[#E7DFD0] flex items-center justify-between text-base font-bold text-[#1C1917]">
              <span>Total</span>
              <span className="text-[#0E3B2E]">Rs. {order.total.toLocaleString()}</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={`/account/orders/${order.id}`}
              className="w-full sm:w-auto px-8 py-3.5 bg-[#0E3B2E] text-white rounded-xl text-xs sm:text-sm font-semibold hover:bg-[#08261E] transition flex items-center justify-center gap-2 shadow-sm"
            >
              Track My Order
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/shop"
              className="w-full sm:w-auto px-8 py-3.5 border border-[#E7DFD0] bg-white text-[#1C1917] rounded-xl text-xs sm:text-sm font-semibold hover:bg-[#FAF6EE] transition flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4 text-[#B8893B]" />
              Continue Shopping
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading confirmation...</div>}>
      <ConfirmationContent />
    </Suspense>
  );
}

