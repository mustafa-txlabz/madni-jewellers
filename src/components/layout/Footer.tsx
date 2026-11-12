import React from 'react';
import Link from 'next/link';
import { BrandLogo } from '@/components/ui/DiamondLogo';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0E3B2E] text-white pt-16 pb-8 border-t border-[#08261E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <BrandLogo variant="light" />
            <p className="text-sm text-[#F3E7CC]/80 leading-relaxed max-w-sm font-light">
              Fine gold and diamond jewellery, crafted with care and priced transparently. Order online, pay your way.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-xs font-semibold tracking-wider uppercase text-[#F3E7CC] mb-4">
              Shop
            </h4>
            <ul className="space-y-2.5 text-xs text-white/80 font-normal">
              <li>
                <Link href="/shop?category=Necklaces" className="hover:text-[#F3E7CC] transition">
                  Necklaces
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Rings" className="hover:text-[#F3E7CC] transition">
                  Rings
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Bangles" className="hover:text-[#F3E7CC] transition">
                  Bangles
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Earrings" className="hover:text-[#F3E7CC] transition">
                  Earrings
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Bridal+Sets" className="hover:text-[#F3E7CC] transition">
                  Bridal Sets
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="text-xs font-semibold tracking-wider uppercase text-[#F3E7CC] mb-4">
              Customer Care
            </h4>
            <ul className="space-y-2.5 text-xs text-white/80 font-normal">
              <li>
                <Link href="/account/orders" className="hover:text-[#F3E7CC] transition">
                  My Orders
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-[#F3E7CC] transition">
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-[#F3E7CC] transition">
                  Returns & Exchange
                </Link>
              </li>
              <li>
                <span className="text-[#F3E7CC] cursor-default">
                  Gold Rate (Daily Live)
                </span>
              </li>
              <li>
                <Link href="/shop" className="hover:text-[#F3E7CC] transition">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Visit Us */}
          <div>
            <h4 className="text-xs font-semibold tracking-wider uppercase text-[#F3E7CC] mb-4">
              Visit Us
            </h4>
            <ul className="space-y-2.5 text-xs text-white/80 font-light">
              <li className="text-white font-normal">Sarafa Bazaar, Lahore</li>
              <li>+92 300 0000000</li>
              <li>info@madnijeweller.pk</li>
              <li className="text-[#F3E7CC]/70 pt-1">Mon – Sat, 11am – 9pm</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <p>© 2026 Madni Jeweller. All rights reserved.</p>
          <p className="tracking-wide">
            Cash on Delivery • Bank Transfer • JazzCash • Easypaisa • Cards
          </p>
        </div>
      </div>
    </footer>
  );
};

