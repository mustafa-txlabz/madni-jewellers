'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { Layers, ChevronUp, ChevronDown, UserCheck, UserX, Shield, ExternalLink } from 'lucide-react';

export const PrototypeBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { isLoggedIn, login, logout, openLoginPrompt } = useApp();

  const publicPages = [
    { name: '1. Home', path: '/' },
    { name: '2. Shop / Catalog', path: '/shop' },
    { name: '3. Product Detail', path: '/product/prod-1' },
    { name: '4. Login', path: '/login' },
    { name: '5. Sign Up', path: '/signup' },
  ];

  const customerPages = [
    { name: '6. Cart', path: '/cart' },
    { name: '7. Checkout', path: '/checkout' },
    { name: '8. Order Confirmed', path: '/order-confirmation' },
    { name: '9. My Orders', path: '/account/orders' },
    { name: '10. Order Tracking', path: '/account/orders/MJ-10391' },
  ];

  const adminPages = [
    { name: 'Admin Dashboard', path: '/admin' },
    { name: 'Products Catalog', path: '/admin/products' },
    { name: 'Add Product', path: '/admin/products/new' },
    { name: 'Orders Management', path: '/admin/orders' },
    { name: 'Order Processing', path: '/admin/orders/MJ-10482' },
    { name: 'Payment Receipts', path: '/admin/payments' },
    { name: 'Customers CRM', path: '/admin/customers' },
    { name: 'Admin Login', path: '/admin/login' },
  ];

  return (
    <div className="fixed bottom-4 left-4 z-50 select-none">
      {isOpen ? (
        <div className="bg-[#1C1917] text-white rounded-2xl shadow-2xl p-5 border border-[#3E3832] w-[340px] sm:w-[420px] max-h-[85vh] overflow-y-auto animate-fadeIn">
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#B8893B] animate-pulse" />
              <h4 className="font-semibold text-xs tracking-wider uppercase text-[#F3E7CC]">
                Client Prototype Navigator
              </h4>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-white/10 rounded-md text-white/70"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* Mode Switcher */}
          <div className="py-3 border-b border-white/10">
            <span className="text-[11px] text-white/60 block mb-2 font-medium">
              Simulation State:
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={login}
                className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition ${
                  isLoggedIn
                    ? 'bg-[#0E3B2E] text-white ring-1 ring-[#157F4F]'
                    : 'bg-white/5 hover:bg-white/10 text-white/70'
                }`}
              >
                <UserCheck className="w-3.5 h-3.5 text-[#157F4F]" />
                Customer Logged In
              </button>
              <button
                onClick={logout}
                className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition ${
                  !isLoggedIn
                    ? 'bg-[#B54708]/30 text-white ring-1 ring-[#B54708]'
                    : 'bg-white/5 hover:bg-white/10 text-white/70'
                }`}
              >
                <UserX className="w-3.5 h-3.5 text-[#B54708]" />
                Guest Mode
              </button>
            </div>
            <button
              onClick={openLoginPrompt}
              className="mt-2 w-full py-1 text-[11px] text-[#F3E7CC] bg-white/5 hover:bg-white/10 rounded border border-white/10 transition"
            >
              Test &quot;Login Required Prompt&quot; Modal
            </button>
          </div>

          {/* Quick Page Links */}
          <div className="pt-3 space-y-4 text-xs">
            <div>
              <p className="text-[11px] font-semibold text-[#B8893B] uppercase tracking-wider mb-1.5">
                Storefront (Public)
              </p>
              <div className="grid grid-cols-2 gap-1.5">
                {publicPages.map((p) => (
                  <Link
                    key={p.path}
                    href={p.path}
                    className={`px-2.5 py-1.5 rounded-md truncate transition ${
                      pathname === p.path
                        ? 'bg-[#0E3B2E] text-[#F3E7CC] font-semibold'
                        : 'text-white/80 hover:bg-white/10'
                    }`}
                  >
                    {p.name}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[11px] font-semibold text-[#B8893B] uppercase tracking-wider mb-1.5">
                Customer Flow
              </p>
              <div className="grid grid-cols-2 gap-1.5">
                {customerPages.map((p) => (
                  <Link
                    key={p.path}
                    href={p.path}
                    className={`px-2.5 py-1.5 rounded-md truncate transition ${
                      pathname === p.path
                        ? 'bg-[#0E3B2E] text-[#F3E7CC] font-semibold'
                        : 'text-white/80 hover:bg-white/10'
                    }`}
                  >
                    {p.name}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <p className="text-[11px] font-semibold text-[#B8893B] uppercase tracking-wider flex items-center gap-1">
                  <Shield className="w-3 h-3 text-[#B8893B]" />
                  Admin Jeweller Panel
                </p>
                <Link
                  href="/admin"
                  className="text-[10px] text-[#F3E7CC] hover:underline flex items-center gap-0.5"
                >
                  Open <ExternalLink className="w-2.5 h-2.5" />
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {adminPages.map((p) => (
                  <Link
                    key={p.path}
                    href={p.path}
                    className={`px-2.5 py-1.5 rounded-md truncate transition ${
                      pathname === p.path
                        ? 'bg-[#0E3B2E] text-[#F3E7CC] font-semibold'
                        : 'text-white/80 hover:bg-white/10'
                    }`}
                  >
                    {p.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 bg-[#1C1917] hover:bg-[#2A2623] text-white px-3.5 py-2.5 rounded-full shadow-xl border border-[#3E3832] transition group"
        >
          <Layers className="w-4 h-4 text-[#B8893B] group-hover:rotate-12 transition-transform" />
          <span className="text-xs font-medium text-[#F3E7CC]">Prototype Pages</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <ChevronUp className="w-3.5 h-3.5 text-white/60" />
        </button>
      )}
    </div>
  );
};

