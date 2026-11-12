'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Badge } from '@/components/ui/Badge';
import { ProductImage } from '@/components/ui/ProductImage';
import { useApp } from '@/context/AppContext';
import {
  ChevronLeft,
  Printer,
  XCircle,
  CheckCircle,
  FileText,
  Clock,
  ExternalLink,
} from 'lucide-react';

export default function AdminOrderDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const { orders, updateOrderStatus, updatePaymentStatus, showToast } = useApp();

  const order = orders.find((o) => o.id === id) || orders[0];

  const [currentStatus, setCurrentStatus] = useState(order.orderStatus);
  const [trackingNumber, setTrackingNumber] = useState(order.courierTracking || '');
  const [internalNote, setInternalNote] = useState(order.internalNote || '');

  const handleVerify = () => {
    updatePaymentStatus(order.id, 'Verified');
    updateOrderStatus(order.id, 'Processing');
    showToast(`Payment verified for order ${order.id}`, 'success');
  };

  const handleReject = () => {
    updatePaymentStatus(order.id, 'Rejected');
    updateOrderStatus(order.id, 'Cancelled');
    showToast(`Payment rejected for order ${order.id}`, 'error');
  };

  const handleSaveOrderUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    updateOrderStatus(order.id, currentStatus, trackingNumber, internalNote);
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Top Navigation & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E7DFD0]">
        <div>
          <Link
            href="/admin/orders"
            className="text-xs text-[#6B645A] hover:text-[#0E3B2E] flex items-center gap-1 mb-1 font-medium"
          >
            <ChevronLeft className="w-3.5 h-3.5" /> Back to Orders
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="font-serif text-3xl text-[#0E3B2E] font-medium">
              Order {order.id}
            </h1>
            <Badge variant={order.orderStatus} />
            <Badge variant={order.paymentStatus} />
          </div>
          <p className="text-xs text-[#6B645A] mt-1">
            Placed on {order.date} by {order.customerName}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => showToast(`Printing invoice for ${order.id}...`, 'info')}
            className="px-3.5 py-2 bg-white border border-[#E7DFD0] rounded-xl text-xs font-medium text-[#1C1917] hover:bg-[#FAF6EE] transition flex items-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5 text-[#B8893B]" />
            Print Invoice
          </button>
          <button
            onClick={handleReject}
            className="px-3.5 py-2 border border-red-200 text-red-600 rounded-xl text-xs font-medium hover:bg-red-50 transition flex items-center gap-1.5"
          >
            <XCircle className="w-3.5 h-3.5" />
            Cancel Order
          </button>
          <button
            onClick={() => updateOrderStatus(order.id, 'Processing')}
            className="px-4 py-2 bg-[#0E3B2E] text-white rounded-xl text-xs font-semibold hover:bg-[#08261E] transition shadow-sm"
          >
            Mark as Processing
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Items & Order History */}
        <div className="lg:col-span-8 space-y-6">
          {/* Items Card */}
          <div className="bg-white rounded-2xl border border-[#E7DFD0] p-6 shadow-card space-y-5">
            <h3 className="font-serif text-lg font-semibold text-[#1C1917]">
              Items ({order.items.length})
            </h3>

            <div className="divide-y divide-[#E7DFD0]">
              {order.items.map((item, idx) => (
                <div key={idx} className="py-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div
                      className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 border border-[#E7DFD0]"
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
                      <p className="font-serif font-semibold text-sm text-[#1C1917]">
                        {item.name}
                      </p>
                      <p className="text-xs text-[#6B645A]">
                        {item.purity} Gold • {item.weight} g
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-xs text-[#6B645A]">Qty {item.quantity}</p>
                    <p className="font-semibold text-sm text-[#1C1917]">
                      Rs. {(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="pt-4 border-t border-[#E7DFD0] space-y-2 text-xs">
              <div className="flex items-center justify-between text-[#6B645A]">
                <span>Subtotal</span>
                <span className="font-semibold text-[#1C1917]">
                  Rs. {order.subtotal.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between text-[#6B645A]">
                <span>Delivery</span>
                <span className="font-semibold text-[#157F4F]">Free</span>
              </div>
              <div className="pt-2 border-t border-[#E7DFD0] flex items-center justify-between text-base font-bold text-[#0E3B2E]">
                <span>Total</span>
                <span>Rs. {order.total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Order History Timeline */}
          <div className="bg-white rounded-2xl border border-[#E7DFD0] p-6 shadow-card space-y-4">
            <h3 className="font-serif text-lg font-semibold text-[#1C1917]">
              Order history
            </h3>

            <div className="space-y-4 text-xs">
              {order.timeline.map((step, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      step.completed
                        ? 'bg-[#E8F5EF] text-[#157F4F]'
                        : 'bg-[#FAF6EE] text-[#6B645A] border border-[#E7DFD0]'
                    }`}
                  >
                    {step.completed ? (
                      <CheckCircle className="w-3.5 h-3.5" />
                    ) : (
                      <Clock className="w-3.5 h-3.5" />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-[#1C1917]">{step.status}</p>
                    <p className="text-[11px] text-[#6B645A]">{step.timestamp}</p>
                    {step.description && (
                      <p className="text-[11px] text-[#6B645A] mt-0.5">{step.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Payment Verification, Update Order, Customer Info */}
        <div className="lg:col-span-4 space-y-6">
          {/* Payment Verification Card */}
          <div className="bg-white rounded-2xl border border-[#E7DFD0] p-6 shadow-card space-y-4">
            <h3 className="font-serif text-lg font-semibold text-[#1C1917]">
              Payment verification
            </h3>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[#6B645A]">Method</span>
                <span className="font-semibold text-[#1C1917]">{order.paymentMethod}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#6B645A]">Amount due</span>
                <span className="font-bold text-[#0E3B2E]">Rs. {order.total.toLocaleString()}</span>
              </div>
            </div>

            {/* Receipt Preview */}
            <div className="border border-[#E7DFD0] rounded-xl p-3 bg-[#FAF6EE] space-y-2">
              <div className="flex items-center justify-between text-[11px] font-semibold text-[#6B645A]">
                <span>PAYMENT RECEIPT</span>
                <span className="text-[#157F4F] flex items-center gap-1 cursor-pointer hover:underline">
                  <ExternalLink className="w-3 h-3" /> View full
                </span>
              </div>
              <div className="h-28 rounded-lg overflow-hidden border border-[#E7DFD0] relative">
                <ProductImage
                  src={order.receiptImage || '/images/designs/payment-receipt-sample.jpg'}
                  alt="Customer Bank Transfer Slip"
                  bgTint="bg-white"
                  className="w-full h-full"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition p-2 text-center">
                  <span className="text-white text-xs font-semibold">Click to inspect bank slip</span>
                </div>
              </div>
            </div>

            {/* Verify / Reject buttons */}
            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                onClick={handleVerify}
                className="py-2.5 bg-[#157F4F] text-white rounded-xl text-xs font-semibold hover:bg-[#126b42] transition flex items-center justify-center gap-1.5 shadow-sm"
              >
                <CheckCircle className="w-3.5 h-3.5" />
                Verify Payment
              </button>
              <button
                onClick={handleReject}
                className="py-2.5 border border-red-300 text-red-600 rounded-xl text-xs font-semibold hover:bg-red-50 transition flex items-center justify-center gap-1.5"
              >
                <XCircle className="w-3.5 h-3.5" />
                Reject
              </button>
            </div>
          </div>

          {/* Update Order Status Card */}
          <form
            onSubmit={handleSaveOrderUpdate}
            className="bg-white rounded-2xl border border-[#E7DFD0] p-6 shadow-card space-y-4"
          >
            <h3 className="font-serif text-lg font-semibold text-[#1C1917]">
              Update order
            </h3>

            <div>
              <label className="block text-xs font-semibold text-[#1C1917] mb-1.5">
                Order status
              </label>
              <select
                value={currentStatus}
                onChange={(e) => setCurrentStatus(e.target.value as any)}
                className="w-full px-3 py-2 bg-[#FAF6EE] border border-[#E7DFD0] rounded-xl text-xs text-[#1C1917] focus:outline-none"
              >
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1C1917] mb-1.5">
                Courier tracking number
              </label>
              <input
                type="text"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                placeholder="Add when shipped"
                className="w-full px-3 py-2 bg-[#FAF6EE] border border-[#E7DFD0] rounded-xl text-xs text-[#1C1917] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1C1917] mb-1.5">
                Internal note
              </label>
              <textarea
                rows={2}
                value={internalNote}
                onChange={(e) => setInternalNote(e.target.value)}
                placeholder="Visible to staff only"
                className="w-full px-3 py-2 bg-[#FAF6EE] border border-[#E7DFD0] rounded-xl text-xs text-[#1C1917] focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-[#F2ECDF] hover:bg-[#E9E1D1] text-[#1C1917] rounded-xl text-xs font-semibold transition"
            >
              Save Changes
            </button>
          </form>

          {/* Customer & Delivery Card */}
          <div className="bg-white rounded-2xl border border-[#E7DFD0] p-6 shadow-card space-y-3">
            <h3 className="font-serif text-lg font-semibold text-[#1C1917]">
              Customer & delivery
            </h3>
            <div className="text-xs text-[#6B645A] space-y-1">
              <p className="font-semibold text-[#1C1917]">{order.customerName}</p>
              <p>{order.customerEmail}</p>
              <p>{order.customerPhone}</p>
              <div className="pt-2 border-t border-[#E7DFD0]">
                <p>{order.shippingAddress.street}</p>
                <p>
                  {order.shippingAddress.city}, {order.shippingAddress.province}{' '}
                  {order.shippingAddress.postalCode}
                </p>
                <p className="text-[#0E3B2E] font-medium pt-1">{order.deliveryMethod}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

