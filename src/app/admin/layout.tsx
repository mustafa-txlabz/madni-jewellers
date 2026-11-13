'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AdminSidebar, adminNavItems } from '@/components/layout/AdminSidebar';
import { Menu, X, Store } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex bg-[#FAF6EE]">
      {/* Desktop Sidebar: Sticky full-height pinned to viewport so its height
          always matches the screen — consistent on every admin page, whether
          the content is short (dashboard) or very tall (order detail). */}
      <div className="hidden md:block sticky top-0 h-screen flex-shrink-0 z-30 bg-[#0E3B2E]">
        <AdminSidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Mobile Header for Admin — hamburger drawer with ALL sections */}
        <header className="md:hidden bg-[#0E3B2E] text-white sticky top-0 z-20 shadow-md">
          <div className="p-4 flex items-center justify-between">
            <Link href="/admin" className="flex items-center gap-2" onClick={() => setMobileNavOpen(false)}>
              <span className="font-serif font-bold text-base tracking-wider uppercase text-white">
                Madni
              </span>
              <span className="text-[10px] tracking-widest text-[#B8893B] uppercase font-semibold">
                Admin
              </span>
            </Link>
            <button
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              className="p-2 rounded-lg text-white hover:bg-white/10 transition"
              aria-label={mobileNavOpen ? 'Close navigation' : 'Open navigation'}
              aria-expanded={mobileNavOpen}
            >
              {mobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {mobileNavOpen && (
            <nav className="border-t border-white/10 px-4 py-3 space-y-1 animate-fadeIn">
              {adminNavItems.map((item) => {
                const Icon = item.icon;
                const isActive =
                  item.href === '/admin'
                    ? pathname === '/admin'
                    : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileNavOpen(false)}
                    className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition ${
                      isActive
                        ? 'bg-[#155240] text-[#F3E7CC] font-semibold'
                        : 'text-white/70 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#B8893B]' : 'text-white/60'}`} />
                    {item.label}
                  </Link>
                );
              })}

              <Link
                href="/"
                onClick={() => setMobileNavOpen(false)}
                className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium text-[#F3E7CC] hover:bg-white/10 transition border-t border-white/10 mt-2 pt-3"
              >
                <Store className="w-4 h-4 text-[#B8893B]" />
                View Public Storefront
              </Link>
            </nav>
          )}
        </header>

        <main className="flex-1 p-6 sm:p-8 lg:p-10 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
