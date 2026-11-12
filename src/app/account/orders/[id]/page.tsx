'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Badge } from '@/components/ui/Badge';
import { ProductImage } from '@/components/ui/ProductImage';
import { useApp } from '@/context/AppContext';
import {
  ChevronRight,
  Download,
  CheckCircle2,
  Clock,
  PhoneCall,
} from 'lucide-react';

export default function OrderTrackingPage() {
  const params = useParams();
  const id = params?.id as string;
  const { orders, showToast } = useApp();

  const order = orders.find((o) => o.id === id) || orders[1] || orders[0];

  const handleDownloadInvoice = () => {
    showToast(`Downloading invoice for order ${order.id}...`, 'success');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF6EE]">
      <Header />

      <main className="flex-1 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-[#6B645A] mb-6">
            <Link href="/" className="hover:text-[#0E3B2E] transition">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/account/orders" className="hover:text-[#0E3B2E] transition">
              My Orders
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#1C1917] font-medium">{order.id}</span>
          </nav>

          {/* Heading Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <h1 className="font-serif text-3xl sm:text-4xl text-[#0E3B2E] font-medium">
                Order {order.id}
              </h1>
              <Badge variant={order.orderStatus} />
            </div>

            <button
              onClick={handleDownloadInvoice}
              className="px-4 py-2.5 bg-white border border-[#E7DFD0] hover:border-[#0E3B2E] text-[#1C1917] rounded-xl text-xs font-semibold flex items-center gap-2 transition self-start shadow-sm"
            >
              <Download className="w-4 h-4 text-[#B8893B]" />
              Download Invoice
            </button>
          </div>

          {/* ORDER PROGRESS TRACKER CARD */}
          <div className="bg-white rounded-2xl border border-[#E7DFD0] p-6 sm:p-8 shadow-card mb-8">
            <h3 className="font-serif text-xl font-semibold text-[#1C1917] mb-8">
              Order progress
            </h3>

            {/* Horizontal Timeline */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 relative">
              {/* Step 1: Order Placed */}
              <div className="flex flex-col items-center text-center space-y-2 relative z-10">
                <div className="w-8 h-8 rounded-full bg-[#0E3B2E] text-white flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-white" />
                </div>
                <p className="text-xs font-semibold text-[#1C1917]">Order placed</p>
                <p className="text-[10px] text-[#6B645A]">9 Oct, 2:14 PM</p>
              </div>

              {/* Step 2: Payment Verified */}
              <div className="flex flex-col items-center text-center space-y-2 relative z-10">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    order.paymentStatus === 'Pending verification'
                      ? 'bg-[#FAF3E0] text-[#B8893B]'
                      : 'bg-[#0E3B2E] text-white'
                  }`}
                >
                  {order.paymentStatus === 'Pending verification' ? (
                    <Clock className="w-4 h-4 text-[#B8893B]" />
                  ) : (
                    <CheckCircle2 className="w-5 h-5 text-white" />
                  )}
                </div>
                <p className="text-xs font-semibold text-[#1C1917]">Payment verified</p>
                <p className="text-[10px] text-[#6B645A]">
                  {order.paymentStatus === 'Pending verification'
                    ? 'Pending Staff Review'
                    : '9 Oct, 4:30 PM'}
                </p>
              </div>

              {/* Step 3: Processing */}
              <div className="flex flex-col items-center text-center space-y-2 relative z-10">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    ['Processing', 'Shipped', 'Delivered'].includes(order.orderStatus)
                      ? 'bg-[#0E3B2E] text-white'
                      : 'bg-[#FAF6EE] text-[#6B645A] border border-[#E7DFD0]'
                  }`}
                >
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <p className="text-xs font-semibold text-[#1C1917]">Processing</p>
                <p className="text-[10px] text-[#6B645A]">10 Oct</p>
              </div>

              {/* Step 4: Shipped */}
              <div className="flex flex-col items-center text-center space-y-2 relative z-10">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    ['Shipped', 'Delivered'].includes(order.orderStatus)
                      ? 'bg-[#B8893B] text-white'
                      : 'bg-[#FAF6EE] text-[#6B645A] border border-[#E7DFD0]'
                  }`}
                >
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <p className="text-xs font-semibold text-[#1C1917]">Shipped</p>
                <p className="text-[10px] text-[#6B645A]">
                  {order.courierTracking ? `11 Oct • ${order.courierTracking}` : 'Pending'}
                </p>
              </div>

              {/* Step 5: Delivered */}
              <div className="flex flex-col items-center text-center space-y-2 relative z-10">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    order.orderStatus === 'Delivered'
                      ? 'bg-[#157F4F] text-white'
                      : 'bg-[#FAF6EE] text-[#6B645A] border border-[#E7DFD0]'
                  }`}
                >
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <p className="text-xs font-semibold text-[#1C1917]">Delivered</p>
                <p className="text-[10px] text-[#6B645A]">
                  {order.orderStatus === 'Delivered' ? 'Completed' : 'Expected 14 Oct'}
                </p>
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Items Details */}
            <div className="lg:col-span-8 bg-white rounded-2xl border border-[#E7DFD0] p-6 sm:p-8 shadow-card space-y-6">
              <h3 className="font-serif text-xl font-semibold text-[#1C1917]">Items</h3>

              <div className="divide-y divide-[#E7DFD0]">
                {order.items.map((item, idx) => (
                  <div key={idx} className="py-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div
                        className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 border border-[#E7DFD0]"
                      >
                        <ProductImage
                          src={item.image}
                          alt={item.name}
                          bgTint={item.imageBg || 'bg-[#F4E6C9]'}
                          emblemSize={26}
                          className="w-full h-full"
                        />
                      </div>
                      <div>
                        <p className="font-serif text-base font-semibold text-[#1C1917]">
                          {item.name}
                        </p>
                        <p className="text-xs text-[#6B645A]">
                          {item.purity} Gold • {item.weight} g • Qty {item.quantity}
                        </p>
                      </div>
                    </div>
                    <span className="font-serif text-sm sm:text-base font-semibold text-[#1C1917]">
                      Rs. {(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="pt-4 border-t border-[#E7DFD0] space-y-2 text-xs">
                <div className="flex items-center justify-between text-[#6B645A]">
                  <span>Subtotal</span>
                  <span className="font-medium text-[#1C1917]">
                    Rs. {order.subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[#6B645A]">
                  <span>Delivery</span>
                  <span className="font-medium text-[#157F4F]">Free</span>
                </div>
                <div className="pt-3 border-t border-[#E7DFD0] flex items-center justify-between text-base font-bold text-[#1C1917]">
                  <span>Total</span>
                  <span className="text-[#0E3B2E]">Rs. {order.total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Right Information Side */}
            <div className="lg:col-span-4 space-y-6">
              {/* Delivery Address */}
              <div className="bg-white rounded-2xl border border-[#E7DFD0] p-6 shadow-card space-y-3">
                <h4 className="font-serif text-base font-semibold text-[#1C1917]">
                  Delivery address
                </h4>
                <div className="text-xs text-[#6B645A] space-y-1">
                  <p className="font-semibold text-[#1C1917]">{order.customerName}</p>
                  <p>{order.shippingAddress.street}</p>
                  <p>
                    {order.shippingAddress.city}, {order.shippingAddress.province}{' '}
                    {order.shippingAddress.postalCode}
                  </p>
                  <p className="text-[#1C1917] pt-1">{order.customerPhone}</p>
                </div>
              </div>

              {/* Payment Info */}
              <div className="bg-white rounded-2xl border border-[#E7DFD0] p-6 shadow-card space-y-3">
                <h4 className="font-serif text-base font-semibold text-[#1C1917]">Payment</h4>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#6B645A]">Method</span>
                  <span className="font-semibold text-[#1C1917]">{order.paymentMethod}</span>
                </div>
                <div className="flex items-center justify-between text-xs pt-1 border-t border-[#E7DFD0]">
                  <span className="text-[#6B645A]">Status</span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#E8F5EF] text-[#157F4F]">
                    {order.paymentStatus}
                  </span>
                </div>
              </div>

              {/* Need Help Card */}
              <div className="bg-white rounded-2xl border border-[#E7DFD0] p-6 shadow-card space-y-4">
                <h4 className="font-serif text-base font-semibold text-[#1C1917]">Need help?</h4>
                <p className="text-xs text-[#6B645A] leading-relaxed">
                  Questions about this order? Call us on +92 300 0000000 or message us.
                </p>
                <button
                  onClick={() => showToast('Connecting to Madni Jeweller VIP Concierge...', 'info')}
                  className="w-full py-2.5 bg-[#F2ECDF] hover:bg-[#E9E1D1] text-[#1C1917] rounded-xl text-xs font-medium transition flex items-center justify-center gap-2"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-[#B8893B]" />
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

