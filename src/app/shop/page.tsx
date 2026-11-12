'use client';

import React, { useState, useMemo, Suspense, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ProductCard } from '@/components/product/ProductCard';
import { ScrollStagger, ScrollReveal } from '@/components/ui/ScrollReveal';
import { useApp } from '@/context/AppContext';
import { ChevronRight, Filter, X, ChevronLeft } from 'lucide-react';

function ShopContent() {
  const { products } = useApp();
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category');

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'All');
  const [selectedPurity, setSelectedPurity] = useState<string>('All');
  const [minPrice, setMinPrice] = useState<number>(50000);
  const [maxPrice, setMaxPrice] = useState<number>(2000000);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Sync category state whenever query parameter changes (from Header menu or Shop by Category)
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) {
      setSelectedCategory(cat);
    } else {
      setSelectedCategory('All');
    }
    setCurrentPage(1);
  }, [searchParams]);

  const categories = [
    { name: 'All', count: products.length },
    { name: 'Necklaces', count: 86 },
    { name: 'Rings', count: 64 },
    { name: 'Bangles', count: 52 },
    { name: 'Earrings', count: 97 },
    { name: 'Bridal Sets', count: 28 },
    { name: 'Chains', count: 41 },
  ];

  const purities = ['All', '18K', '21K', '22K', '24K'];

  const clearAllFilters = () => {
    setSelectedCategory('All');
    setSelectedPurity('All');
    setMinPrice(50000);
    setMaxPrice(2000000);
    setInStockOnly(false);
    setSortBy('featured');
    setCurrentPage(1);
  };

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;
      if (selectedPurity !== 'All' && p.purity !== selectedPurity) return false;
      if (p.price < minPrice || p.price > maxPrice) return false;
      if (inStockOnly && p.status === 'Out of stock') return false;
      return true;
    });
  }, [products, selectedCategory, selectedPurity, minPrice, maxPrice, inStockOnly]);

  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    if (sortBy === 'price-low') return list.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-high') return list.sort((a, b) => b.price - a.price);
    if (sortBy === 'weight') return list.sort((a, b) => b.weight - a.weight);
    return list; // featured
  }, [filteredProducts, sortBy]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF6EE]">
      <Header />

      <main className="flex-1 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-[#6B645A] mb-4">
            <Link href="/" className="hover:text-[#0E3B2E] transition">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#1C1917] font-medium">Shop</span>
            {selectedCategory !== 'All' && (
              <>
                <ChevronRight className="w-3.5 h-3.5" />
                <span className="text-[#0E3B2E] font-semibold">{selectedCategory}</span>
              </>
            )}
          </nav>

          {/* Heading & Sort Bar */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 border-b border-[#E7DFD0]">
            <div>
              <h1 className="font-serif text-3xl sm:text-4xl text-[#0E3B2E] font-medium">
                {selectedCategory === 'All' ? 'All Jewellery' : selectedCategory}
              </h1>
              <p className="text-xs sm:text-sm text-[#6B645A] mt-1">
                Showing {sortedProducts.length} pieces
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* Mobile Filter Button */}
              <button
                onClick={() => setMobileFilterOpen(true)}
                className="lg:hidden px-4 py-2 bg-white border border-[#E7DFD0] rounded-lg text-xs font-medium text-[#1C1917] flex items-center gap-2"
              >
                <Filter className="w-4 h-4 text-[#B8893B]" />
                Filters
              </button>

              {/* Sort By Dropdown */}
              <div className="flex items-center gap-2 text-xs">
                <span className="text-[#6B645A] hidden sm:inline">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white border border-[#E7DFD0] rounded-lg px-3 py-2 text-xs font-medium text-[#1C1917] focus:outline-none focus:ring-1 focus:ring-[#0E3B2E]"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="weight">Heaviest First</option>
                </select>
              </div>
            </div>
          </div>

          {/* Body Content: Sidebar Filters + Products Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">
            {/* Desktop Filters Sidebar */}
            <aside className="hidden lg:block lg:col-span-3 space-y-8 pr-4">
              <div className="bg-white rounded-2xl p-6 border border-[#E7DFD0] shadow-card space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-[#E7DFD0]">
                  <h3 className="font-medium text-sm text-[#1C1917]">Filters</h3>
                  <button
                    onClick={clearAllFilters}
                    className="text-xs text-[#B8893B] hover:underline font-medium"
                  >
                    Clear all
                  </button>
                </div>

                {/* Category List */}
                <div className="space-y-3">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#6B645A]">
                    Category
                  </h4>
                  <div className="space-y-2">
                    {categories.map((c) => (
                      <label
                        key={c.name}
                        className="flex items-center justify-between text-xs text-[#1C1917] cursor-pointer hover:text-[#0E3B2E]"
                      >
                        <div className="flex items-center gap-2.5">
                          <input
                            type="radio"
                            name="category"
                            checked={selectedCategory === c.name}
                            onChange={() => setSelectedCategory(c.name)}
                            className="rounded-full text-[#0E3B2E] focus:ring-[#0E3B2E] accent-[#0E3B2E]"
                          />
                          <span
                            className={
                              selectedCategory === c.name ? 'font-semibold text-[#0E3B2E]' : ''
                            }
                          >
                            {c.name}
                          </span>
                        </div>
                        <span className="text-[#6B645A] text-[11px]">{c.count}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Gold Purity */}
                <div className="space-y-3 pt-3 border-t border-[#E7DFD0]">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#6B645A]">
                    Gold purity
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {purities.map((p) => (
                      <button
                        key={p}
                        onClick={() => setSelectedPurity(p)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                          selectedPurity === p
                            ? 'bg-[#0E3B2E] text-white shadow-sm'
                            : 'bg-[#F2ECDF] text-[#1C1917] hover:bg-[#E9E1D1]'
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="space-y-3 pt-3 border-t border-[#E7DFD0]">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#6B645A]">
                    Price range (PKR)
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] text-[#6B645A] block">Min</label>
                      <input
                        type="number"
                        value={minPrice}
                        onChange={(e) => setMinPrice(Number(e.target.value))}
                        className="w-full text-xs p-2 rounded-md border border-[#E7DFD0] bg-[#FAF6EE]"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-[#6B645A] block">Max</label>
                      <input
                        type="number"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(Number(e.target.value))}
                        className="w-full text-xs p-2 rounded-md border border-[#E7DFD0] bg-[#FAF6EE]"
                      />
                    </div>
                  </div>
                </div>

                {/* Availability */}
                <div className="space-y-3 pt-3 border-t border-[#E7DFD0]">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#6B645A]">
                    Availability
                  </h4>
                  <label className="flex items-center gap-2 text-xs text-[#1C1917] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={inStockOnly}
                      onChange={(e) => setInStockOnly(e.target.checked)}
                      className="rounded text-[#0E3B2E] focus:ring-[#0E3B2E] accent-[#0E3B2E]"
                    />
                    <span>In stock only</span>
                  </label>
                </div>
              </div>
            </aside>

            {/* Products Grid */}
            <div className="lg:col-span-9 space-y-10">
              {sortedProducts.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-2xl border border-[#E7DFD0] p-8">
                  <p className="font-serif text-xl text-[#0E3B2E] mb-2">No jewellery pieces found</p>
                  <p className="text-xs text-[#6B645A] mb-6">
                    Try adjusting your filters or search keywords.
                  </p>
                  <button
                    onClick={clearAllFilters}
                    className="px-5 py-2.5 bg-[#0E3B2E] text-white rounded-lg text-xs font-medium"
                  >
                    Clear All Filters
                  </button>
                </div>
              ) : (
                <ScrollStagger
                  key={`${selectedCategory}-${selectedPurity}-${sortBy}-${currentPage}`}
                  staggerDelay={70}
                  animation="fade-up"
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
                >
                  {sortedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </ScrollStagger>
              )}

              {/* Pagination */}
              <div className="flex items-center justify-center gap-2 pt-6">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="w-9 h-9 rounded-lg border border-[#E7DFD0] bg-white flex items-center justify-center text-[#1C1917] hover:bg-[#FAF6EE] text-xs"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button className="w-9 h-9 rounded-lg bg-[#0E3B2E] text-white flex items-center justify-center text-xs font-semibold">
                  1
                </button>
                <button className="w-9 h-9 rounded-lg border border-[#E7DFD0] bg-white flex items-center justify-center text-[#1C1917] hover:bg-[#FAF6EE] text-xs">
                  2
                </button>
                <button className="w-9 h-9 rounded-lg border border-[#E7DFD0] bg-white flex items-center justify-center text-[#1C1917] hover:bg-[#FAF6EE] text-xs">
                  3
                </button>
                <span className="text-xs text-[#6B645A] px-1">...</span>
                <button className="w-9 h-9 rounded-lg border border-[#E7DFD0] bg-white flex items-center justify-center text-[#1C1917] hover:bg-[#FAF6EE] text-xs">
                  6
                </button>
                <button
                  onClick={() => setCurrentPage((p) => p + 1)}
                  className="w-9 h-9 rounded-lg border border-[#E7DFD0] bg-white flex items-center justify-center text-[#1C1917] hover:bg-[#FAF6EE] text-xs"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Filters Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex bg-black/40 backdrop-blur-xs lg:hidden">
          <div className="ml-auto w-full max-w-xs bg-white h-full p-6 overflow-y-auto space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#E7DFD0]">
              <h3 className="font-serif text-lg font-bold text-[#1C1917]">Filters</h3>
              <button onClick={() => setMobileFilterOpen(false)}>
                <X className="w-5 h-5 text-[#6B645A]" />
              </button>
            </div>

            {/* Mobile Categories */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold uppercase text-[#6B645A]">Category</h4>
              {categories.map((c) => (
                <button
                  key={c.name}
                  onClick={() => {
                    setSelectedCategory(c.name);
                    setMobileFilterOpen(false);
                  }}
                  className={`block w-full text-left py-1 text-xs ${
                    selectedCategory === c.name
                      ? 'font-bold text-[#0E3B2E]'
                      : 'text-[#1C1917]'
                  }`}
                >
                  {c.name} ({c.count})
                </button>
              ))}
            </div>

            {/* Mobile Purity */}
            <div className="space-y-3 pt-4 border-t border-[#E7DFD0]">
              <h4 className="text-xs font-semibold uppercase text-[#6B645A]">Gold Purity</h4>
              <div className="flex flex-wrap gap-2">
                {purities.map((p) => (
                  <button
                    key={p}
                    onClick={() => {
                      setSelectedPurity(p);
                      setMobileFilterOpen(false);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs ${
                      selectedPurity === p
                        ? 'bg-[#0E3B2E] text-white'
                        : 'bg-[#F2ECDF] text-[#1C1917]'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-6">
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full py-3 bg-[#0E3B2E] text-white rounded-lg text-xs font-medium"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading catalogue...</div>}>
      <ShopContent />
    </Suspense>
  );
}

