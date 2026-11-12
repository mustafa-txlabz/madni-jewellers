'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { AdminSidebar } from '@/components/layout/AdminSidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex bg-[#FAF6EE]">
      {/* Desktop Sidebar: Sticky full-height pinned to viewport to maintain 100% height consistency */}
      <div className="hidden md:block sticky top-0 h-screen flex-shrink-0 z-30 bg-[#0E3B2E]">
        <AdminSidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Mobile Header for Admin */}
        <header className="md:hidden bg-[#0E3B2E] text-white p-4 flex items-center justify-between sticky top-0 z-20 shadow-md">
          <div className="flex items-center gap-2">
            <span className="font-serif font-bold text-base tracking-wider uppercase text-white">
              Madni
            </span>
            <span className="text-[10px] tracking-widest text-[#B8893B] uppercase font-semibold">
              Admin
            </span>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <a href="/admin" className="text-[#F3E7CC] font-medium">Dashboard</a>
            <a href="/admin/products" className="text-white/80">Products</a>
            <a href="/admin/orders" className="text-white/80">Orders</a>
          </div>
        </header>

        <main className="flex-1 p-6 sm:p-8 lg:p-10 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
