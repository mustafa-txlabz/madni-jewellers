'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ScrollReveal, ScrollStagger } from '@/components/ui/ScrollReveal';
import { ProductImage } from '@/components/ui/ProductImage';
import { useApp } from '@/context/AppContext';
import {
  Check,
  Truck,
  Building2,
  Upload,
  Lock,
  FileCheck,
} from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, cartSubtotal, cartCount, user, createOrder, showToast } = useApp();

  // Form states matching Figma
  const [fullName, setFullName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone);
  const [email, setEmail] = useState(user.email);
  const [street, setStreet] = useState('House 24, Street 7, Model Town');
  const [city, setCity] = useState('Lahore');
  const [province, setProvince] = useState('Punjab');
  const [postalCode, setPostalCode] = useState('54700');

  // Delivery & Payment
  const [deliveryMethod, setDeliveryMethod] = useState<'Insured home delivery' | 'Pick up from showroom'>('Insured home delivery');
  const [paymentMethod, setPaymentMethod] = useState<'Bank Transfer' | 'Cash on Delivery' | 'JazzCash' | 'Credit / Debit Card'>('Bank Transfer');
  const [receiptUploaded, setReceiptUploaded] = useState(true);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      showToast('No items in cart to checkout', 'warning');
      router.push('/shop');
      return;
    }

    const newOrder = createOrder({
      customerName: fullName,
      customerEmail: email,
      customerPhone: phone,
      shippingAddress: {
        street,
        city,
        province,
        postalCode,
      },
      deliveryMethod,
      paymentMethod,
    });

    router.push(`/order-confirmation?orderId=${newOrder.id}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF6EE] animate-fadeIn">
      <Header />

      <main className="flex-1 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Step Progress Bar */}
          <div className="flex items-center justify-center max-w-2xl mx-auto mb-10 text-xs sm:text-sm">
            {/* Step 1 */}
            <div className="flex items-center gap-2 text-[#0E3B2E] font-medium">
              <div className="w-7 h-7 rounded-full bg-[#0E3B2E] text-white flex items-center justify-center text-xs">
                <Check className="w-4 h-4" />
              </div>
              <span>Cart</span>
            </div>

            <div className="w-12 sm:w-20 h-[2px] bg-[#0E3B2E] mx-3" />

            {/* Step 2 */}
            <div className="flex items-center gap-2 text-[#0E3B2E] font-bold">
              <div className="w-7 h-7 rounded-full bg-[#0E3B2E] text-white flex items-center justify-center text-xs">
                2
              </div>
              <span>Shipping & Payment</span>
            </div>

            <div className="w-12 sm:w-20 h-[2px] bg-[#E7DFD0] mx-3" />

            {/* Step 3 */}
            <div className="flex items-center gap-2 text-[#6B645A]">
              <div className="w-7 h-7 rounded-full bg-white border border-[#E7DFD0] flex items-center justify-center text-xs">
                3
              </div>
              <span>Confirmation</span>
            </div>
          </div>

          <form onSubmit={handlePlaceOrder}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Forms */}
              <ScrollStagger className="lg:col-span-8 space-y-6" staggerDelay={110}>
                {/* 1. Shipping Information */}
                <div className="bg-white rounded-2xl border border-[#E7DFD0] p-6 sm:p-8 shadow-card space-y-5">
                  <h3 className="font-serif text-xl font-semibold text-[#1C1917]">
                    Shipping information
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#1C1917] mb-1.5">
                        Full name
                      </label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-[#FAF6EE] border border-[#E7DFD0] rounded-xl text-xs text-[#1C1917] focus:outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#1C1917] mb-1.5">
                        Mobile number
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-[#FAF6EE] border border-[#E7DFD0] rounded-xl text-xs text-[#1C1917] focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1C1917] mb-1.5">
                      Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#FAF6EE] border border-[#E7DFD0] rounded-xl text-xs text-[#1C1917] focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1C1917] mb-1.5">
                      Street address
                    </label>
                    <input
                      type="text"
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#FAF6EE] border border-[#E7DFD0] rounded-xl text-xs text-[#1C1917] focus:outline-none"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#1C1917] mb-1.5">
                        City
                      </label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full px-3 py-2 bg-[#FAF6EE] border border-[#E7DFD0] rounded-xl text-xs text-[#1C1917] focus:outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#1C1917] mb-1.5">
                        Province
                      </label>
                      <select
                        value={province}
                        onChange={(e) => setProvince(e.target.value)}
                        className="w-full px-3 py-2 bg-[#FAF6EE] border border-[#E7DFD0] rounded-xl text-xs text-[#1C1917] focus:outline-none"
                      >
                        <option value="Punjab">Punjab</option>
                        <option value="Sindh">Sindh</option>
                        <option value="KPK">KPK</option>
                        <option value="Islamabad">Islamabad</option>
                        <option value="Balochistan">Balochistan</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#1C1917] mb-1.5">
                        Postal code
                      </label>
                      <input
                        type="text"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        className="w-full px-3 py-2 bg-[#FAF6EE] border border-[#E7DFD0] rounded-xl text-xs text-[#1C1917] focus:outline-none"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Delivery Method */}
                <div className="bg-white rounded-2xl border border-[#E7DFD0] p-6 sm:p-8 shadow-card space-y-5">
                  <h3 className="font-serif text-xl font-semibold text-[#1C1917]">
                    Delivery method
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Insured Home Delivery */}
                    <label
                      onClick={() => setDeliveryMethod('Insured home delivery')}
                      className={`p-4 rounded-xl border-2 flex items-start gap-3 cursor-pointer transition ${
                        deliveryMethod === 'Insured home delivery'
                          ? 'border-[#0E3B2E] bg-[#F0F7F4]'
                          : 'border-[#E7DFD0] hover:border-[#B8893B]'
                      }`}
                    >
                      <input
                        type="radio"
                        name="delivery"
                        checked={deliveryMethod === 'Insured home delivery'}
                        onChange={() => {}}
                        className="mt-1 accent-[#0E3B2E]"
                      />
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5 font-semibold text-xs text-[#1C1917]">
                          <Truck className="w-4 h-4 text-[#B8893B]" />
                          Insured home delivery
                        </div>
                        <p className="text-[11px] text-[#6B645A]">2~4 working days • Free</p>
                      </div>
                    </label>

                    {/* Showroom Pickup */}
                    <label
                      onClick={() => setDeliveryMethod('Pick up from showroom')}
                      className={`p-4 rounded-xl border-2 flex items-start gap-3 cursor-pointer transition ${
                        deliveryMethod === 'Pick up from showroom'
                          ? 'border-[#0E3B2E] bg-[#F0F7F4]'
                          : 'border-[#E7DFD0] hover:border-[#B8893B]'
                      }`}
                    >
                      <input
                        type="radio"
                        name="delivery"
                        checked={deliveryMethod === 'Pick up from showroom'}
                        onChange={() => {}}
                        className="mt-1 accent-[#0E3B2E]"
                      />
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5 font-semibold text-xs text-[#1C1917]">
                          <Building2 className="w-4 h-4 text-[#B8893B]" />
                          Pick up from showroom
                        </div>
                        <p className="text-[11px] text-[#6B645A]">Ready in 24 hours • Free</p>
                      </div>
                    </label>
                  </div>
                </div>

                {/* 3. Payment Method */}
                <div className="bg-white rounded-2xl border border-[#E7DFD0] p-6 sm:p-8 shadow-card space-y-4">
                  <h3 className="font-serif text-xl font-semibold text-[#1C1917]">
                    Payment method
                  </h3>

                  {/* Option: Cash on Delivery */}
                  <label
                    onClick={() => setPaymentMethod('Cash on Delivery')}
                    className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition ${
                      paymentMethod === 'Cash on Delivery'
                        ? 'border-[#0E3B2E] bg-[#F0F7F4]'
                        : 'border-[#E7DFD0] hover:border-[#B8893B]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'Cash on Delivery'}
                        onChange={() => {}}
                        className="accent-[#0E3B2E]"
                      />
                      <div>
                        <p className="text-xs font-semibold text-[#1C1917]">Cash on Delivery</p>
                        <p className="text-[11px] text-[#6B645A]">
                          Pay in cash when your order arrives
                        </p>
                      </div>
                    </div>
                  </label>

                  {/* Option: Bank Transfer (Figma Highlighted) */}
                  <div
                    className={`p-5 rounded-xl border-2 transition ${
                      paymentMethod === 'Bank Transfer'
                        ? 'border-[#0E3B2E] bg-[#FAF6EE]'
                        : 'border-[#E7DFD0]'
                    }`}
                  >
                    <label
                      onClick={() => setPaymentMethod('Bank Transfer')}
                      className="flex items-center gap-3 cursor-pointer mb-3"
                    >
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'Bank Transfer'}
                        onChange={() => {}}
                        className="accent-[#0E3B2E]"
                      />
                      <div>
                        <p className="text-xs font-semibold text-[#1C1917]">Bank Transfer</p>
                        <p className="text-[11px] text-[#6B645A]">
                          Transfer to our account and upload the receipt
                        </p>
                      </div>
                    </label>

                    {paymentMethod === 'Bank Transfer' && (
                      <div className="mt-4 pt-4 border-t border-[#E7DFD0] space-y-4 text-xs">
                        <div className="grid grid-cols-2 gap-2 bg-white p-3.5 rounded-lg border border-[#E7DFD0]">
                          <div>
                            <span className="text-[10px] text-[#6B645A] block">Account title</span>
                            <span className="font-semibold text-[#1C1917]">Madni Jeweller</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-[#6B645A] block">Bank</span>
                            <span className="font-semibold text-[#1C1917]">Sample Bank Ltd.</span>
                          </div>
                          <div className="col-span-2 pt-1 border-t border-[#E7DFD0]/60">
                            <span className="text-[10px] text-[#6B645A] block">Account / IBAN</span>
                            <span className="font-mono font-semibold text-[#0E3B2E]">
                              PK00 0000 0000 0000 0000 0000
                            </span>
                          </div>
                        </div>

                        {/* Upload Receipt Area */}
                        <div
                          onClick={() => {
                            setReceiptUploaded(!receiptUploaded);
                            showToast(
                              receiptUploaded
                                ? 'Receipt removed'
                                : 'Bank transfer slip attached (receipt_sample.png)',
                              'info'
                            );
                          }}
                          className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition ${
                            receiptUploaded
                              ? 'border-[#157F4F] bg-[#E8F5EF]/60'
                              : 'border-[#B8893B]/40 hover:border-[#B8893B] bg-white'
                          }`}
                        >
                          {receiptUploaded ? (
                            <div className="flex items-center justify-center gap-2 text-xs text-[#157F4F] font-semibold">
                              <FileCheck className="w-5 h-5 text-[#157F4F]" />
                              Receipt attached: payment_slip_oct26.jpg (Click to change)
                            </div>
                          ) : (
                            <div className="space-y-1">
                              <Upload className="w-6 h-6 text-[#B8893B] mx-auto" />
                              <p className="font-semibold text-xs text-[#1C1917]">
                                Upload payment receipt
                              </p>
                              <p className="text-[10px] text-[#6B645A]">
                                JPG, PNG or PDF • max 5 MB
                              </p>
                            </div>
                          )}
                        </div>

                        <p className="text-[11px] text-[#6B645A] italic">
                          Your order is confirmed once the jeweller verifies your payment.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Option: JazzCash / Easypaisa */}
                  <label
                    onClick={() => setPaymentMethod('JazzCash')}
                    className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition ${
                      paymentMethod === 'JazzCash'
                        ? 'border-[#0E3B2E] bg-[#F0F7F4]'
                        : 'border-[#E7DFD0] hover:border-[#B8893B]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'JazzCash'}
                        onChange={() => {}}
                        className="accent-[#0E3B2E]"
                      />
                      <div>
                        <p className="text-xs font-semibold text-[#1C1917]">JazzCash / Easypaisa</p>
                        <p className="text-[11px] text-[#6B645A]">Pay from your mobile wallet</p>
                      </div>
                    </div>
                  </label>

                  {/* Option: Card */}
                  <label
                    onClick={() => setPaymentMethod('Credit / Debit Card')}
                    className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition ${
                      paymentMethod === 'Credit / Debit Card'
                        ? 'border-[#0E3B2E] bg-[#F0F7F4]'
                        : 'border-[#E7DFD0] hover:border-[#B8893B]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'Credit / Debit Card'}
                        onChange={() => {}}
                        className="accent-[#0E3B2E]"
                      />
                      <div>
                        <p className="text-xs font-semibold text-[#1C1917]">Credit / Debit Card</p>
                        <p className="text-[11px] text-[#6B645A]">Visa, Mastercard • Secure payment</p>
                      </div>
                    </div>
                  </label>
                </div>
              </ScrollStagger>

              {/* Right Column: Order Summary */}
              <ScrollReveal animation="slide-left" className="lg:col-span-4">
                <div className="bg-white rounded-2xl border border-[#E7DFD0] p-6 shadow-card space-y-6">
                <h3 className="font-serif text-xl font-semibold text-[#1C1917]">Your order</h3>

                {/* Items Mini List */}
                <div className="divide-y divide-[#E7DFD0] max-h-64 overflow-y-auto pr-1">
                  {cart.map(({ product, quantity }) => (
                    <div key={product.id} className="py-3 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <div
                          className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 border border-[#E7DFD0]"
                        >
                          <ProductImage
                            src={product.image}
                            alt={product.name}
                            bgTint={product.bgTint}
                            emblemSize={18}
                            className="w-full h-full"
                          />
                        </div>
                        <div>
                          <p className="text-xs font-medium text-[#1C1917] line-clamp-1">
                            {product.name}
                          </p>
                          <p className="text-[10px] text-[#6B645A]">
                            {product.purity} • Qty {quantity}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-[#1C1917]">
                        Rs. {(product.price * quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="space-y-2.5 pt-4 border-t border-[#E7DFD0] text-xs">
                  <div className="flex items-center justify-between text-[#6B645A]">
                    <span>Subtotal</span>
                    <span className="font-medium text-[#1C1917]">
                      Rs. {cartSubtotal.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[#6B645A]">
                    <span>Delivery</span>
                    <span className="font-medium text-[#157F4F]">Free</span>
                  </div>
                  <div className="pt-3 border-t border-[#E7DFD0] flex items-center justify-between text-base font-bold text-[#1C1917]">
                    <span>Total</span>
                    <span className="text-[#0E3B2E]">Rs. {cartSubtotal.toLocaleString()}</span>
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#0E3B2E] text-white rounded-xl text-xs sm:text-sm font-semibold hover:bg-[#08261E] transition shadow-sm"
                >
                  Place Order
                </button>

                <div className="text-center flex items-center justify-center gap-1.5 text-[11px] text-[#6B645A]">
                  <Lock className="w-3.5 h-3.5 text-[#B8893B]" />
                  Your details are encrypted and secure
                </div>
                </div>
              </ScrollReveal>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}

