'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { DiamondEmblem } from '@/components/ui/DiamondLogo';
import { ProductImage } from '@/components/ui/ProductImage';
import { useApp } from '@/context/AppContext';
import {
  Upload,
  ChevronLeft,
  Sparkles,
} from 'lucide-react';

export default function AddProductPage() {
  const router = useRouter();
  const { addProduct, goldRates, showToast } = useApp();

  // Form states
  const [name, setName] = useState('');
  const [category, setCategory] = useState<'Necklaces' | 'Rings' | 'Bangles' | 'Earrings' | 'Bridal Sets' | 'Chains'>('Necklaces');
  const [sku, setSku] = useState('MJ-NK-0145');
  const [description, setDescription] = useState('');
  const [purity, setPurity] = useState<'18K' | '21K' | '22K' | '24K'>('22K');
  const [weight, setWeight] = useState<number>(45.0);
  const [stone, setStone] = useState('None');
  const [makingCharges, setMakingCharges] = useState<number>(75000);
  const [stock, setStock] = useState<number>(5);
  const [lowStockAlert, setLowStockAlert] = useState<number>(2);
  const [autoCalc, setAutoCalc] = useState<boolean>(true);

  // Visibility toggles
  const [status, setStatus] = useState<'Active' | 'Low stock' | 'Out of stock'>('Active');
  const [isFeatured, setIsFeatured] = useState<boolean>(true);
  const [isNewArrival, setIsNewArrival] = useState<boolean>(true);
  const [allowCod, setAllowCod] = useState<boolean>(false);

  // Calculate pricing based on 22K gold rate (per tola = 11.664 grams)
  const ratePerGram = goldRates[purity] / 11.664;
  const calculatedGoldValue = Math.round(weight * ratePerGram);
  const sellingPrice = calculatedGoldValue + makingCharges;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      showToast('Please enter product name', 'warning');
      return;
    }

    addProduct({
      name,
      sku,
      category,
      purity,
      weight,
      price: sellingPrice,
      stock,
      status,
      badge: isNewArrival ? 'New' : undefined,
      rating: 5.0,
      reviewCount: 0,
      description: description || 'Handcrafted fine luxury gold jewellery piece.',
      goldValue: calculatedGoldValue,
      makingCharges,
      image: '/images/designs/noor-bridal-necklace-set.jpg',
      images: ['/images/designs/noor-bridal-necklace-set.jpg'],
      bgTint: 'bg-[#F4E6C9]',
      isFeatured,
      isNewArrival,
      allowCod,
    });

    router.push('/admin/products');
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E7DFD0]">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#6B645A] mb-1">
            <Link href="/admin/products" className="hover:text-[#0E3B2E] flex items-center gap-1">
              <ChevronLeft className="w-3.5 h-3.5" /> Back to products
            </Link>
          </div>
          <h1 className="font-serif text-3xl text-[#0E3B2E] font-medium">Add New Product</h1>
          <p className="text-xs text-[#6B645A]">
            Fill in the details below to add a piece to your catalogue
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/products"
            className="px-4 py-2 border border-[#E7DFD0] rounded-xl text-xs font-medium text-[#1C1917] hover:bg-[#FAF6EE] transition"
          >
            Cancel
          </Link>
          <button
            type="button"
            onClick={() => showToast('Saved draft to local storage', 'info')}
            className="px-4 py-2 border border-[#E7DFD0] rounded-xl text-xs font-medium text-[#1C1917] hover:bg-[#FAF6EE] transition"
          >
            Save as Draft
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-5 py-2 bg-[#0E3B2E] text-white rounded-xl text-xs font-semibold hover:bg-[#08261E] transition shadow-sm"
          >
            Publish Product
          </button>
        </div>
      </div>

      {/* Form Content */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Column */}
        <div className="lg:col-span-8 space-y-6">
          {/* Section 1: Basic Information */}
          <div className="bg-white rounded-2xl border border-[#E7DFD0] p-6 shadow-card space-y-4">
            <h3 className="font-serif text-lg font-semibold text-[#1C1917]">
              Basic information
            </h3>

            <div>
              <label className="block text-xs font-semibold text-[#1C1917] mb-1.5">
                Product name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Noor Bridal Necklace Set"
                className="w-full px-3.5 py-2.5 bg-[#FAF6EE] border border-[#E7DFD0] rounded-xl text-xs text-[#1C1917] focus:outline-none"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#1C1917] mb-1.5">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full px-3 py-2.5 bg-[#FAF6EE] border border-[#E7DFD0] rounded-xl text-xs text-[#1C1917] focus:outline-none"
                >
                  <option value="Necklaces">Necklaces</option>
                  <option value="Rings">Rings</option>
                  <option value="Bangles">Bangles</option>
                  <option value="Earrings">Earrings</option>
                  <option value="Bridal Sets">Bridal Sets</option>
                  <option value="Chains">Chains</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1C1917] mb-1.5">
                  SKU
                </label>
                <input
                  type="text"
                  value={sku}
                  onChange={(e) => setSku(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#FAF6EE] border border-[#E7DFD0] rounded-xl text-xs text-[#1C1917] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1C1917] mb-1.5">
                Description
              </label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the design, craftsmanship and what is included..."
                className="w-full px-3.5 py-2.5 bg-[#FAF6EE] border border-[#E7DFD0] rounded-xl text-xs text-[#1C1917] focus:outline-none"
              />
            </div>
          </div>

          {/* Section 2: Jewellery Details */}
          <div className="bg-white rounded-2xl border border-[#E7DFD0] p-6 shadow-card space-y-4">
            <h3 className="font-serif text-lg font-semibold text-[#1C1917]">
              Jewellery details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#1C1917] mb-1.5">
                  Gold purity (karat)
                </label>
                <select
                  value={purity}
                  onChange={(e) => setPurity(e.target.value as any)}
                  className="w-full px-3 py-2.5 bg-[#FAF6EE] border border-[#E7DFD0] rounded-xl text-xs text-[#1C1917] focus:outline-none"
                >
                  <option value="24K">24K (Pure Gold)</option>
                  <option value="22K">22K (916 Standard)</option>
                  <option value="21K">21K (Middle East)</option>
                  <option value="18K">18K (750 Diamond Setting)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1C1917] mb-1.5">
                  Weight (grams)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={weight}
                  onChange={(e) => setWeight(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 bg-[#FAF6EE] border border-[#E7DFD0] rounded-xl text-xs text-[#1C1917] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1C1917] mb-1.5">
                  Stone / gem
                </label>
                <input
                  type="text"
                  value={stone}
                  onChange={(e) => setStone(e.target.value)}
                  placeholder="e.g. Diamond, Ruby, None"
                  className="w-full px-3.5 py-2.5 bg-[#FAF6EE] border border-[#E7DFD0] rounded-xl text-xs text-[#1C1917] focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-[#1C1917] mb-1.5">
                  Making charges type
                </label>
                <select className="w-full px-3 py-2.5 bg-[#FAF6EE] border border-[#E7DFD0] rounded-xl text-xs text-[#1C1917] focus:outline-none">
                  <option>Fixed amount (PKR)</option>
                  <option>Percentage (%)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1C1917] mb-1.5">
                  Making charges (PKR)
                </label>
                <input
                  type="number"
                  value={makingCharges}
                  onChange={(e) => setMakingCharges(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 bg-[#FAF6EE] border border-[#E7DFD0] rounded-xl text-xs text-[#1C1917] focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Pricing & Inventory */}
          <div className="bg-white rounded-2xl border border-[#E7DFD0] p-6 shadow-card space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#E7DFD0]">
              <h3 className="font-serif text-lg font-semibold text-[#1C1917]">
                Pricing & inventory
              </h3>
              <label className="flex items-center gap-2 text-xs text-[#1C1917] cursor-pointer">
                <input
                  type="checkbox"
                  checked={autoCalc}
                  onChange={(e) => setAutoCalc(e.target.checked)}
                  className="rounded text-[#0E3B2E] accent-[#0E3B2E]"
                />
                <span className="font-medium">Auto-calculate price from today&apos;s gold rate</span>
              </label>
            </div>

            <div className="p-4 rounded-xl bg-[#FAF6EE] border border-[#E7DFD0] space-y-2 text-xs">
              <div className="flex items-center justify-between text-[#6B645A]">
                <span>Gold value ({weight} g @ {purity})</span>
                <span className="font-semibold text-[#1C1917]">
                  Rs. {calculatedGoldValue.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between text-[#6B645A]">
                <span>Making charges</span>
                <span className="font-semibold text-[#1C1917]">
                  Rs. {makingCharges.toLocaleString()}
                </span>
              </div>
              <div className="pt-2 border-t border-[#E7DFD0] flex items-center justify-between text-base font-bold text-[#0E3B2E]">
                <span>Selling price</span>
                <span>Rs. {sellingPrice.toLocaleString()}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-[#1C1917] mb-1.5">
                  Stock quantity
                </label>
                <input
                  type="number"
                  value={stock}
                  onChange={(e) => setStock(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 bg-[#FAF6EE] border border-[#E7DFD0] rounded-xl text-xs text-[#1C1917] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1C1917] mb-1.5">
                  Low stock alert at
                </label>
                <input
                  type="number"
                  value={lowStockAlert}
                  onChange={(e) => setLowStockAlert(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 bg-[#FAF6EE] border border-[#E7DFD0] rounded-xl text-xs text-[#1C1917] focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar Column */}
        <div className="lg:col-span-4 space-y-6">
          {/* Product Images Box */}
          <div className="bg-white rounded-2xl border border-[#E7DFD0] p-6 shadow-card space-y-4">
            <h3 className="font-serif text-lg font-semibold text-[#1C1917]">
              Product images
            </h3>
            <p className="text-[11px] text-[#6B645A]">Add up to 5 images</p>

            <div
              onClick={() => showToast('Image upload simulated for prototype (Cloudinary target ready)', 'info')}
              className="border-2 border-dashed border-[#B8893B]/40 hover:border-[#0E3B2E] rounded-2xl p-4 text-center cursor-pointer transition bg-[#FAF6EE]/50 space-y-2"
            >
              <div className="w-24 h-24 mx-auto rounded-xl overflow-hidden border border-[#E7DFD0]">
                <ProductImage
                  src="/images/designs/noor-bridal-necklace-set.jpg"
                  alt="Product preview"
                  bgTint="bg-[#F4E6C9]"
                  emblemSize={36}
                  className="w-full h-full"
                />
              </div>
              <p className="text-xs font-semibold text-[#1C1917]">
                Click to upload from Cloudinary
              </p>
              <p className="text-[10px] text-[#6B645A]">
                JPG, PNG or WEBP · 1200×1200 px
              </p>
            </div>

            {/* Thumbnail slots */}
            <div className="grid grid-cols-4 gap-2 pt-2">
              <div className="aspect-square rounded-xl overflow-hidden border border-[#E7DFD0]">
                <ProductImage
                  src="/images/designs/noor-bridal-necklace-set.jpg"
                  alt="View 1"
                  emblemSize={20}
                  className="w-full h-full"
                />
              </div>
              <div className="aspect-square rounded-xl overflow-hidden border border-[#E7DFD0]">
                <ProductImage
                  src="/images/designs/hero-jewellery.jpg"
                  alt="View 2"
                  emblemSize={20}
                  className="w-full h-full"
                />
              </div>
              <div className="aspect-square rounded-xl overflow-hidden border border-[#E7DFD0]">
                <ProductImage
                  src="/images/designs/gulnar-polki-choker.jpg"
                  alt="View 3"
                  emblemSize={20}
                  className="w-full h-full"
                />
              </div>
              <div className="aspect-square rounded-xl bg-[#FAF6EE] flex items-center justify-center border border-dashed border-[#E7DFD0]">
                <DiamondEmblem size={20} color="#6B645A" className="opacity-40" />
              </div>
            </div>
          </div>

          {/* Visibility Box */}
          <div className="bg-white rounded-2xl border border-[#E7DFD0] p-6 shadow-card space-y-5">
            <h3 className="font-serif text-lg font-semibold text-[#1C1917]">
              Visibility
            </h3>

            <div>
              <label className="block text-xs font-semibold text-[#1C1917] mb-1.5">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full px-3 py-2 bg-[#FAF6EE] border border-[#E7DFD0] rounded-xl text-xs text-[#1C1917] focus:outline-none"
              >
                <option value="Active">Active</option>
                <option value="Low stock">Low stock</option>
                <option value="Out of stock">Out of stock</option>
              </select>
            </div>

            <div className="space-y-3 pt-3 border-t border-[#E7DFD0] text-xs">
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-[#1C1917]">Featured on home page</span>
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="rounded text-[#0E3B2E] accent-[#0E3B2E]"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-[#1C1917]">Show as &quot;New arrival&quot;</span>
                <input
                  type="checkbox"
                  checked={isNewArrival}
                  onChange={(e) => setIsNewArrival(e.target.checked)}
                  className="rounded text-[#0E3B2E] accent-[#0E3B2E]"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-[#1C1917]">Allow Cash on Delivery</span>
                <input
                  type="checkbox"
                  checked={allowCod}
                  onChange={(e) => setAllowCod(e.target.checked)}
                  className="rounded text-[#0E3B2E] accent-[#0E3B2E]"
                />
              </label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

