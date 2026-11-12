'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BrandLogo } from '@/components/ui/DiamondLogo';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  CreditCard,
  Users,
  Store,
  LogOut,
} from 'lucide-react';

export const AdminSidebar: React.FC = () => {
  const pathname = usePathname();

  const navItems = [
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'Products', href: '/admin/products', icon: Package },
    { label: 'Orders', href: '/admin/orders', icon: ShoppingBag },
    { label: 'Payments', href: '/admin/payments', icon: CreditCard },
    { label: 'Customers', href: '/admin/customers', icon: Users },
  ];

  return (
    <aside className="w-64 bg-[#0E3B2E] text-white flex flex-col justify-between p-6 flex-shrink-0 h-full overflow-y-auto border-r border-[#08261E]">
      <div className="space-y-8">
        {/* Brand */}
        <div className="space-y-1">
          <BrandLogo variant="light" />
          <span className="text-[10px] uppercase tracking-widest text-[#F3E7CC]/70 font-semibold pl-9 block">
            Admin Panel
          </span>
        </div>

        {/* Navigation */}
        <nav className="space-y-1.5 text-xs font-medium">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === '/admin'
                ? pathname === '/admin'
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition ${
                  isActive
                    ? 'bg-[#155240] text-[#F3E7CC] font-semibold shadow-sm'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#B8893B]' : 'text-white/60'}`} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom User Card & Storefront link */}
      <div className="pt-6 border-t border-white/10 space-y-3">
        <Link
          href="/"
          className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-[#F3E7CC] hover:bg-white/10 transition"
        >
          <Store className="w-4 h-4 text-[#B8893B]" />
          <span>View Public Storefront</span>
        </Link>

        <div className="flex items-center justify-between p-2.5 rounded-xl bg-black/20 border border-white/5">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-7 h-7 rounded-full bg-[#B8893B] text-[#1C1917] flex items-center justify-center font-bold text-xs flex-shrink-0">
              M
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-semibold text-white truncate">Madni</p>
              <p className="text-[10px] text-white/60 truncate">Admin | Owner</p>
            </div>
          </div>
          <Link href="/admin/login" className="text-white/50 hover:text-white p-1" title="Sign Out">
            <LogOut className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </aside>
  );
};
