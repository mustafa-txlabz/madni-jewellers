'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Badge } from '@/components/ui/Badge';
import { ProductImage } from '@/components/ui/ProductImage';
import { useApp } from '@/context/AppContext';
import {
  ChevronRight,
  Package,
  User,
  MapPin,
  Heart,
  LogOut,
  RotateCcw,
} from 'lucide-react';

export default function MyOrdersPage() {
  const { orders, user, logout, addToCart, products, showToast } = useApp();
  const [filterTab, setFilterTab] = useState<'All' | 'Active' | 'Delivered' | 'Cancelled'>('All');

  const filteredOrders = orders.filter((o) => {
    if (filterTab === 'All') return true;
    if (filterTab === 'Active') return ['Pending', 'Processing', 'Shipped'].includes(o.orderStatus);
    if (filterTab === 'Delivered') return o.orderStatus === 'Delivered';
    if (filterTab === 'Cancelled') return o.orderStatus === 'Cancelled';
    return true;
  });

  const handleReorder = (order: typeof orders[0]) => {
    order.items.forEach((item) => {
      const prod = products.find((p) => p.id === item.productId) || products[0];
      addToCart(prod, item.quantity);
    });
    showToast(`Items from ${order.id} added to cart!`, 'success');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF6EE]">
      <Header />

      <main className="flex-1 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-1.5 text-xs text-[#6B645A] mb-8">
            <Link href="/" className="hover:text-[#0E3B2E] transition">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span>My Account</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#1C1917] font-medium">My Orders</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Sidebar: User Card & Tabs */}
            <aside className="lg:col-span-3 space-y-4">
              <div className="bg-white rounded-2xl border border-[#E7DFD0] p-6 shadow-card space-y-6">
                {/* User Info */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#0E3B2E] text-white flex items-center justify-center font-bold text-sm">
                    {user.avatarInitials}
                  </div>
                  <div className="overflow-hidden">
                    <p className="font-serif font-bold text-sm text-[#1C1917] truncate">{user.name}</p>
                    <p className="text-[11px] text-[#6B645A] truncate">{user.email}</p>
                  </div>
                </div>

                {/* Nav Links */}
                <nav className="space-y-1 text-xs">
                  <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl bg-[#FAF3E0] text-[#0E3B2E] font-semibold text-left transition">
                    <Package className="w-4 h-4 text-[#B8893B]" />
                    My Orders
                  </button>

                  <button
                    onClick={() => showToast('Profile settings simulated for prototype', 'info')}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#6B645A] hover:bg-[#FAF6EE] text-left transition"
                  >
                    <User className="w-4 h-4" />
                    Profile
                  </button>

                  <button
                    onClick={() => showToast('Saved addresses simulated for prototype', 'info')}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#6B645A] hover:bg-[#FAF6EE] text-left transition"
                  >
                    <MapPin className="w-4 h-4" />
                    Saved Addresses
                  </button>

                  <Link
                    href="/shop"
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#6B645A] hover:bg-[#FAF6EE] text-left transition"
                  >
                    <Heart className="w-4 h-4" />
                    Wishlist
                  </Link>

                  <button
                    onClick={logout}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-600 hover:bg-red-50 text-left transition pt-3 border-t border-[#E7DFD0]"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </nav>
              </div>
            </aside>

            {/* Right Main Orders List */}
            <div className="lg:col-span-9 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h1 className="font-serif text-3xl text-[#0E3B2E] font-medium">My Orders</h1>

                {/* Filter Tabs */}
                <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-[#E7DFD0] self-start">
                  {(['All', 'Active', 'Delivered', 'Cancelled'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setFilterTab(tab)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                        filterTab === tab
                          ? 'bg-[#0E3B2E] text-white shadow-sm'
                          : 'text-[#6B645A] hover:text-[#1C1917]'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Order Cards */}
              <div className="space-y-4">
                {filteredOrders.length === 0 ? (
                  <div className="bg-white rounded-2xl p-12 text-center border border-[#E7DFD0]">
                    <p className="font-serif text-lg text-[#1C1917]">No orders in this category</p>
                  </div>
                ) : (
                  filteredOrders.map((order) => (
                    <div
                      key={order.id}
                      className="bg-white rounded-2xl border border-[#E7DFD0] p-6 shadow-card hover:shadow-elevated transition duration-200 space-y-5"
                    >
                      {/* Top Header of Card */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#E7DFD0]">
                        <div>
                          <div className="flex items-center gap-3">
                            <span className="font-serif font-bold text-base text-[#1C1917]">
                              Order {order.id}
                            </span>
                            <Badge
                              variant={
                                order.paymentStatus === 'Pending verification'
                                  ? 'Awaiting payment'
                                  : order.orderStatus
                              }
                            />
                          </div>
                          <p className="text-xs text-[#6B645A] mt-0.5">
                            Placed on {order.date}
                          </p>
                        </div>
                      </div>

                      {/* Items Thumbnails & Total */}
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        {/* Thumbnails Row */}
                        <div className="flex items-center gap-3 overflow-x-auto pb-1">
                          {order.items.map((item, idx) => (
                            <div
                              key={idx}
                              className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 border border-[#E7DFD0]"
                              title={item.name}
                            >
                              <ProductImage
                                src={item.image}
                                alt={item.name}
                                bgTint={item.imageBg || 'bg-[#F4E6C9]'}
                                emblemSize={22}
                                className="w-full h-full"
                              />
                            </div>
                          ))}
                        </div>

                        {/* Price & Actions */}
                        <div className="flex items-center justify-between md:justify-end gap-6">
                          <div>
                            <span className="text-[10px] text-[#6B645A] uppercase tracking-wider block">
                              Total
                            </span>
                            <span className="font-serif font-bold text-lg text-[#0E3B2E]">
                              Rs. {order.total.toLocaleString()}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <Link
                              href={`/account/orders/${order.id}`}
                              className="px-4 py-2 bg-white border border-[#E7DFD0] hover:border-[#0E3B2E] text-[#1C1917] rounded-lg text-xs font-medium transition"
                            >
                              View Details
                            </Link>
                            <button
                              onClick={() => handleReorder(order)}
                              className="px-4 py-2 bg-[#F2ECDF] hover:bg-[#E9E1D1] text-[#1C1917] rounded-lg text-xs font-medium transition flex items-center gap-1.5"
                            >
                              <RotateCcw className="w-3 h-3 text-[#B8893B]" />
                              Reorder
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

