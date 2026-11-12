'use client';

import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ProductCard } from '@/components/product/ProductCard';
import { ProductImage } from '@/components/ui/ProductImage';
import { useApp } from '@/context/AppContext';
import { ScrollReveal, ScrollStagger } from '@/components/ui/ScrollReveal';
import {
  ShieldCheck,
  Truck,
  CreditCard,
  Lock,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export default function HomePage() {
  const { products } = useApp();

  const categories = [
    {
      name: 'Necklaces',
      count: '86 designs',
      href: '/shop?category=Necklaces',
      image: '/images/designs/cat-necklaces.jpg',
      bg: 'bg-[#F5E8D0]',
    },
    {
      name: 'Rings',
      count: '64 designs',
      href: '/shop?category=Rings',
      image: '/images/designs/cat-rings.jpg',
      bg: 'bg-[#EFE2C6]',
    },
    {
      name: 'Bangles',
      count: '52 designs',
      href: '/shop?category=Bangles',
      image: '/images/designs/cat-bangles.jpg',
      bg: 'bg-[#ECCF9F]',
    },
    {
      name: 'Earrings',
      count: '97 designs',
      href: '/shop?category=Earrings',
      image: '/images/designs/cat-earrings.jpg',
      bg: 'bg-[#DCEAE4]',
    },
    {
      name: 'Bridal Sets',
      count: '28 designs',
      href: '/shop?category=Bridal+Sets',
      image: '/images/designs/cat-bridal.jpg',
      bg: 'bg-[#F6D9D1]',
    },
  ];

  const newArrivals = products.slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF6EE]">
      <Header />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden pt-8 pb-16 sm:py-20 border-b border-[#E7DFD0]/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Content */}
              <ScrollReveal animation="fade-up" duration={750} className="lg:col-span-7 space-y-6">
                <span className="text-xs font-semibold tracking-[0.2em] text-[#B8893B] uppercase">
                  Handcrafted Gold & Diamond Jewellery
                </span>

                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#0E3B2E] font-medium leading-[1.15]">
                  Timeless jewellery <br />
                  for life’s most <br />
                  precious moments
                </h1>

                <p className="text-sm sm:text-base text-[#6B645A] max-w-xl leading-relaxed">
                  Discover certified gold, diamond and bridal collections with transparent pricing,
                  insured delivery and flexible payment options.
                </p>

                {/* CTAs */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Link
                    href="/shop"
                    className="px-6 py-3.5 bg-[#0E3B2E] text-white text-sm font-medium rounded-lg hover:bg-[#08261E] transition inline-flex items-center gap-2 shadow-sm hover:-translate-y-0.5"
                  >
                    Shop Collection
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    href="/shop?category=Bridal+Sets"
                    className="px-6 py-3.5 border border-[#E7DFD0] bg-white text-[#1C1917] text-sm font-medium rounded-lg hover:bg-[#FAF6EE] transition hover:-translate-y-0.5 shadow-xs"
                  >
                    Explore Bridal
                  </Link>
                </div>

                {/* Trust Badges */}
                <div className="pt-6 grid grid-cols-3 gap-4 border-t border-[#E7DFD0]/80">
                  <div className="flex items-center gap-2 text-xs text-[#6B645A]">
                    <ShieldCheck className="w-4 h-4 text-[#B8893B] flex-shrink-0" />
                    <span>Certified purity</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#6B645A]">
                    <Truck className="w-4 h-4 text-[#B8893B] flex-shrink-0" />
                    <span>Insured delivery</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#6B645A]">
                    <Lock className="w-4 h-4 text-[#B8893B] flex-shrink-0" />
                    <span>Secure payment</span>
                  </div>
                </div>
              </ScrollReveal>

              {/* Right Hero Arch Visual */}
              <ScrollReveal animation="zoom-in" delay={150} duration={850} className="lg:col-span-5 flex justify-center">
                <div className="relative w-full max-w-[380px] aspect-[4/5] rounded-t-full rounded-b-2xl shadow-elevated overflow-hidden border border-[#E7DFD0] group">
                  {/* Diagonal White Light Sweep on Hover */}
                  <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden rounded-t-full rounded-b-2xl">
                    <div className="absolute -inset-full w-[250%] h-[250%] bg-gradient-to-tr from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                  </div>

                  <ProductImage
                    src="/images/designs/hero-jewellery.jpg"
                    alt="Madni Jeweller Handcrafted Bridal Gold Set"
                    bgTint="bg-[#F5E6CC]"
                    emblemSize={90}
                    className="w-full h-full"
                    priority={true}
                  />

                  {/* Floating Gold Rate Pill with Micro Live Pulse */}
                  <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md rounded-xl p-3.5 shadow-lg border border-[#E7DFD0] flex items-center justify-between text-xs z-10 transition-transform duration-300 hover:scale-[1.02]">
                    <div>
                      <p className="text-[10px] text-[#6B645A] uppercase tracking-wider font-semibold flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping inline-block" />
                        Today’s 22K Rate
                      </p>
                      <p className="font-serif font-bold text-[#0E3B2E] text-base">
                        Rs. 395,000
                      </p>
                    </div>
                    <span className="px-2.5 py-1 bg-[#E8F5EF] text-[#157F4F] text-[11px] font-semibold rounded-full border border-emerald-200">
                      Live Verified
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* SHOP BY CATEGORY */}
        <section className="py-16 sm:py-20 border-b border-[#E7DFD0]/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal animation="fade-up" className="mb-10">
              <span className="text-xs font-semibold tracking-[0.2em] text-[#B8893B] uppercase">
                Collections
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#0E3B2E] font-medium mt-1">
                Shop by category
              </h2>
            </ScrollReveal>

            <ScrollStagger
              staggerDelay={90}
              animation="fade-up"
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 sm:gap-8"
            >
              {categories.map((cat) => (
                <Link
                  key={cat.name}
                  href={cat.href}
                  className="group flex flex-col items-center text-center transition"
                >
                  <div
                    className={`w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden ${cat.bg} shadow-sm group-hover:scale-105 transition duration-300 relative border-2 border-[#E7DFD0] group-hover:border-[#B8893B]`}
                  >
                    {/* Diagonal White Light Sweep across Category Image on Hover */}
                    <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden rounded-full">
                      <div className="absolute -inset-full w-[250%] h-[250%] bg-gradient-to-tr from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                    </div>

                    <ProductImage
                      src={cat.image}
                      alt={cat.name}
                      bgTint={cat.bg}
                      emblemSize={44}
                      className="w-full h-full"
                    />
                  </div>
                  <h3 className="font-serif text-base sm:text-lg font-medium text-[#1C1917] mt-3.5 group-hover:text-[#0E3B2E] transition">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-[#6B645A]">{cat.count}</p>
                </Link>
              ))}
            </ScrollStagger>
          </div>
        </section>

        {/* NEW ARRIVALS */}
        <section className="py-16 sm:py-20 border-b border-[#E7DFD0]/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal animation="fade-up" className="flex items-end justify-between mb-10">
              <div>
                <span className="text-xs font-semibold tracking-[0.2em] text-[#B8893B] uppercase">
                  Just In
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl text-[#0E3B2E] font-medium mt-1">
                  New arrivals
                </h2>
              </div>
              <Link
                href="/shop"
                className="text-xs sm:text-sm font-medium text-[#0E3B2E] hover:text-[#B8893B] transition inline-flex items-center gap-1"
              >
                View all
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </ScrollReveal>

            <ScrollStagger
              staggerDelay={120}
              animation="fade-up"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
            >
              {newArrivals.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </ScrollStagger>
          </div>
        </section>

        {/* BRIDAL & CUSTOM ORDERS BANNER */}
        <section className="py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal animation="fade-up" duration={800}>
              <div className="bg-[#0E3B2E] text-white rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-elevated">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                  <div className="lg:col-span-8 space-y-4">
                    <span className="text-xs font-semibold tracking-[0.2em] text-[#F3E7CC] uppercase flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#B8893B]" />
                      Bridal & Custom Orders
                    </span>
                    <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium leading-tight text-white">
                      Designing something <br />
                      truly special?
                    </h3>
                    <p className="text-sm sm:text-base text-white/80 max-w-lg leading-relaxed font-light">
                      Share your design idea and our master craftsmen will quote and create it for you.
                      Bridal sets, custom rings and more.
                    </p>
                    <div className="pt-2">
                      <Link
                        href="/shop?category=Bridal+Sets"
                        className="px-6 py-3.5 bg-[#B8893B] text-white text-sm font-medium rounded-lg hover:bg-[#966E2B] transition inline-flex items-center gap-2 shadow-sm hover:-translate-y-0.5"
                      >
                        Request a Custom Design
                      </Link>
                    </div>
                  </div>

                  <div className="lg:col-span-4 flex justify-center lg:justify-end">
                    <div className="w-48 h-48 sm:w-60 sm:h-60 rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl relative group">
                      {/* Diagonal White Light Sweep on Image Hover */}
                      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden rounded-2xl">
                        <div className="absolute -inset-full w-[250%] h-[250%] bg-gradient-to-tr from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                      </div>

                      <ProductImage
                        src="/images/designs/custom-design-banner.jpg"
                        alt="Madni Custom Jewellery Workshop"
                        bgTint="bg-[#13493A]"
                        emblemSize={70}
                        className="w-full h-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* WHY SHOP WITH MADNI JEWELLER */}
        <section className="py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <ScrollReveal animation="fade-up">
              <h2 className="font-serif text-3xl sm:text-4xl text-[#0E3B2E] font-medium mb-12">
                Why shop with Madni Jeweller
              </h2>
            </ScrollReveal>

            <ScrollStagger
              staggerDelay={100}
              animation="fade-up"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {/* Feature 1 */}
              <div className="bg-white rounded-2xl p-7 text-center border border-[#E7DFD0] shadow-card hover:shadow-elevated transition duration-300 hover:-translate-y-1">
                <div className="w-14 h-14 rounded-full bg-[#FAF3E0] mx-auto flex items-center justify-center mb-5">
                  <ShieldCheck className="w-6 h-6 text-[#B8893B]" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-[#1C1917] mb-2">
                  Certified Purity
                </h3>
                <p className="text-xs sm:text-sm text-[#6B645A] leading-relaxed">
                  Every piece is hallmarked and comes with an authenticity certificate.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-white rounded-2xl p-7 text-center border border-[#E7DFD0] shadow-card hover:shadow-elevated transition duration-300 hover:-translate-y-1">
                <div className="w-14 h-14 rounded-full bg-[#FAF3E0] mx-auto flex items-center justify-center mb-5">
                  <CreditCard className="w-6 h-6 text-[#B8893B]" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-[#1C1917] mb-2">
                  Transparent Pricing
                </h3>
                <p className="text-xs sm:text-sm text-[#6B645A] leading-relaxed">
                  Price shown as gold value + making charges, based on today’s rate.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-white rounded-2xl p-7 text-center border border-[#E7DFD0] shadow-card hover:shadow-elevated transition duration-300 hover:-translate-y-1">
                <div className="w-14 h-14 rounded-full bg-[#FAF3E0] mx-auto flex items-center justify-center mb-5">
                  <Lock className="w-6 h-6 text-[#B8893B]" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-[#1C1917] mb-2">
                  Flexible Payments
                </h3>
                <p className="text-xs sm:text-sm text-[#6B645A] leading-relaxed">
                  Cash on Delivery, bank transfer, JazzCash, Easypaisa and cards.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="bg-white rounded-2xl p-7 text-center border border-[#E7DFD0] shadow-card hover:shadow-elevated transition duration-300 hover:-translate-y-1">
                <div className="w-14 h-14 rounded-full bg-[#FAF3E0] mx-auto flex items-center justify-center mb-5">
                  <Truck className="w-6 h-6 text-[#B8893B]" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-[#1C1917] mb-2">
                  Insured Delivery
                </h3>
                <p className="text-xs sm:text-sm text-[#6B645A] leading-relaxed">
                  Fully insured doorstep delivery across Pakistan.
                </p>
              </div>
            </ScrollStagger>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
