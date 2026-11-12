'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { BrandLogo } from '@/components/ui/DiamondLogo';
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  Menu,
  X,
  ChevronDown,
  LogOut,
  Package,
} from 'lucide-react';

export const Header: React.FC = () => {
  const pathname = usePathname();
  const { isLoggedIn, user, login, logout, cartCount, wishlist, goldRates } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Shop', href: '/shop' },
    { label: 'Necklaces', href: '/shop?category=Necklaces' },
    { label: 'Rings', href: '/shop?category=Rings' },
    { label: 'Bangles', href: '/shop?category=Bangles' },
    { label: 'Earrings', href: '/shop?category=Earrings' },
    { label: 'Bridal', href: '/shop?category=Bridal+Sets' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAF6EE] shadow-sm">
      {/* Top Gold Rate & Announcement Bar with Live Market Indicator */}
      <div className="bg-[#0E3B2E] text-white text-xs py-2 px-4 text-center font-normal tracking-wide flex items-center justify-center flex-wrap gap-2">
        <div className="inline-flex items-center gap-1.5 bg-[#145241] px-2.5 py-0.5 rounded-full border border-[#B8893B]/40 shadow-xs">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E5C578] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F3E7CC]"></span>
          </span>
          <span className="text-[10px] text-[#F3E7CC] font-semibold tracking-wider uppercase">Live Rate</span>
        </div>
        <span className="opacity-90">
          Today’s gold rate (22K):{' '}
          <strong className="text-[#F3E7CC] font-semibold">
            Rs. {goldRates['22K'].toLocaleString()} / tola
          </strong>
        </span>
        <span className="mx-1 opacity-40 hidden sm:inline">•</span>
        <span className="opacity-90 hidden sm:inline">Free insured delivery across Pakistan</span>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 border-b border-[#E7DFD0]">
          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B8893B] rounded-md py-1"
            title="Madni Jeweller Home"
          >
            <BrandLogo variant="dark" size="responsive" />
          </Link>

          {/* Desktop Nav Links with Expanding Gold Filament Underline */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive =
                link.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(link.href.split('?')[0]);
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`group relative text-sm font-medium transition duration-200 py-1.5 ${
                    isActive
                      ? 'text-[#0E3B2E] font-semibold'
                      : 'text-[#1C1917]/80 hover:text-[#0E3B2E]'
                  }`}
                >
                  {link.label}
                  {/* Expanding Underline */}
                  <span
                    className={`absolute bottom-0 left-0 w-full h-[2px] rounded-full transition-transform duration-300 ease-out origin-center ${
                      isActive
                        ? 'bg-[#0E3B2E] scale-x-100'
                        : 'bg-[#B8893B] scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons & Auth */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Search */}
            <Link
              href="/shop"
              className="p-2 text-[#1C1917] hover:text-[#0E3B2E] hover:bg-[#F2ECDF] rounded-full transition hover:scale-105 active:scale-95"
              title="Search jewellery"
            >
              <Search className="w-5 h-5" />
            </Link>

            {/* Wishlist */}
            <Link
              href="/shop"
              className="p-2 text-[#1C1917] hover:text-[#0E3B2E] hover:bg-[#F2ECDF] rounded-full transition relative hover:scale-105 active:scale-95"
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#B8893B] text-white text-[10px] rounded-full flex items-center justify-center font-bold animate-pulse">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart with pop bounce badge */}
            <Link
              href="/cart"
              className="p-2 text-[#1C1917] hover:text-[#0E3B2E] hover:bg-[#F2ECDF] rounded-full transition relative hover:scale-105 active:scale-95"
              title="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#B8893B] text-white text-[10px] rounded-full flex items-center justify-center font-bold shadow-xs">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Auth Buttons */}
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full border border-[#E7DFD0] hover:border-[#0E3B2E] bg-white transition text-xs font-medium text-[#1C1917]"
                >
                  <div className="w-6 h-6 rounded-full bg-[#0E3B2E] text-white flex items-center justify-center text-[10px] font-bold">
                    {user.avatarInitials}
                  </div>
                  <span className="hidden sm:inline">{user.name.split(' ')[0]}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-[#6B645A]" />
                </button>

                {/* Dropdown */}
                {userDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-lg border border-[#E7DFD0] py-2 z-50 animate-fadeIn"
                    onMouseLeave={() => setUserDropdownOpen(false)}
                  >
                    <div className="px-4 py-2 border-b border-[#E7DFD0] mb-1">
                      <p className="text-xs font-semibold text-[#1C1917]">{user.name}</p>
                      <p className="text-[11px] text-[#6B645A] truncate">{user.email}</p>
                    </div>
                    <Link
                      href="/account/orders"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-xs text-[#1C1917] hover:bg-[#FAF6EE] transition"
                    >
                      <Package className="w-4 h-4 text-[#B8893B]" />
                      My Orders
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setUserDropdownOpen(false);
                      }}
                      className="flex items-center gap-2.5 w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-red-50 transition"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link
                  href="/login"
                  className="px-4 py-2 text-xs font-medium rounded-md border border-[#E7DFD0] bg-white text-[#1C1917] hover:bg-[#FAF6EE] transition"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 text-xs font-medium rounded-md bg-[#0E3B2E] text-white hover:bg-[#08261E] transition"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#1C1917] hover:text-[#0E3B2E] rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF6EE] border-b border-[#E7DFD0] px-4 pt-3 pb-6 space-y-3">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-md text-sm font-medium text-[#1C1917] hover:bg-[#F2ECDF]"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="pt-3 border-t border-[#E7DFD0] flex flex-col gap-2">
            {isLoggedIn ? (
              <>
                <Link
                  href="/account/orders"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-[#1C1917] hover:bg-[#F2ECDF] rounded-md"
                >
                  <Package className="w-4 h-4 text-[#B8893B]" />
                  My Orders
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center py-2 text-xs font-medium rounded-md border border-[#E7DFD0] bg-white text-[#1C1917]"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center py-2 text-xs font-medium rounded-md bg-[#0E3B2E] text-white"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

