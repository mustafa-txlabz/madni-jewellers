'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { DiamondEmblem } from '@/components/ui/DiamondLogo';
import { ProductImage } from '@/components/ui/ProductImage';
import { useApp } from '@/context/AppContext';
import { Upload, ChevronLeft } from 'lucide-react';

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const { products, updateProduct, goldRates, showToast } = useApp();

  const product = products.find((p) => p.id === id) || products[0];

  const [name, setName] = useState(product?.name || '');
  const [category, setCategory] = useState(product?.category || 'Necklaces');
  const [sku, setSku] = useState(product?.sku || '');
  const [description, setDescription] = useState(product?.description || '');
  const [purity, setPurity] = useState(product?.purity || '22K');
  const [weight, setWeight] = useState(product?.weight || 45.0);
  const [stone, setStone] = useState('Diamond');
  const [makingCharges, setMakingCharges] = useState(product?.makingCharges || 82500);
  const [stock, setStock] = useState(product?.stock || 4);
  const [lowStockAlert, setLowStockAlert] = useState(2);
  const [autoCalc, setAutoCalc] = useState(true);

  const [status, setStatus] = useState(product?.status || 'Active');
  const [isFeatured, setIsFeatured] = useState(product?.isFeatured ?? true);
  const [isNewArrival, setIsNewArrival] = useState(product?.isNewArrival ?? true);
  const [allowCod, setAllowCod] = useState(product?.allowCod ?? false);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setCategory(product.category);
      setSku(product.sku);
      setDescription(product.description);
      setPurity(product.purity);
      setWeight(product.weight);
      setMakingCharges(product.makingCharges);
      setStock(product.stock);
      setStatus(product.status);
      setIsFeatured(product.isFeatured ?? true);
      setIsNewArrival(product.isNewArrival ?? true);
      setAllowCod(product.allowCod ?? false);
    }
  }, [product]);

  const ratePerGram = goldRates[purity] / 11.664;
  const calculatedGoldValue = Math.round(weight * ratePerGram);
  const sellingPrice = calculatedGoldValue + makingCharges;

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    updateProduct(product.id, {
      name,
      category: category as any,
      sku,
      description,
      purity: purity as any,
      weight,
      makingCharges,
      price: sellingPrice,
      goldValue: calculatedGoldValue,
      stock,
      status: status as any,
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
          <h1 className="font-serif text-3xl text-[#0E3B2E] font-medium">Edit Product</h1>
          <p className="text-xs text-[#6B645A]">Updating {product?.name}</p>
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
            onClick={handleUpdate}
            className="px-5 py-2 bg-[#0E3B2E] text-white rounded-xl text-xs font-semibold hover:bg-[#08261E] transition shadow-sm"
          >
            Save Changes
          </button>
        </div>
      </div>

      <form onSubmit={handleUpdate} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Column */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-2xl border border-[#E7DFD0] p-6 shadow-card space-y-4">
            <h3 className="font-serif text-lg font-semibold text-[#1C1917]">Basic information</h3>
            <div>
              <label className="block text-xs font-semibold text-[#1C1917] mb-1.5">Product name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#FAF6EE] border border-[#E7DFD0] rounded-xl text-xs text-[#1C1917] focus:outline-none"
                required
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#1C1917] mb-1.5">Category</label>
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
                <label className="block text-xs font-semibold text-[#1C1917] mb-1.5">SKU</label>
                <input
                  type="text"
                  value={sku}
                  onChange={(e) => setSku(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#FAF6EE] border border-[#E7DFD0] rounded-xl text-xs text-[#1C1917] focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#1C1917] mb-1.5">Description</label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#FAF6EE] border border-[#E7DFD0] rounded-xl text-xs text-[#1C1917] focus:outline-none"
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[#E7DFD0] p-6 shadow-card space-y-4">
            <h3 className="font-serif text-lg font-semibold text-[#1C1917]">Jewellery details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#1C1917] mb-1.5">Gold purity</label>
                <select
                  value={purity}
                  onChange={(e) => setPurity(e.target.value as any)}
                  className="w-full px-3 py-2.5 bg-[#FAF6EE] border border-[#E7DFD0] rounded-xl text-xs text-[#1C1917] focus:outline-none"
                >
                  <option value="24K">24K</option>
                  <option value="22K">22K</option>
                  <option value="21K">21K</option>
                  <option value="18K">18K</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#1C1917] mb-1.5">Weight (g)</label>
                <input
                  type="number"
                  step="0.1"
                  value={weight}
                  onChange={(e) => setWeight(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 bg-[#FAF6EE] border border-[#E7DFD0] rounded-xl text-xs text-[#1C1917] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#1C1917] mb-1.5">Stone / gem</label>
                <input
                  type="text"
                  value={stone}
                  onChange={(e) => setStone(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#FAF6EE] border border-[#E7DFD0] rounded-xl text-xs text-[#1C1917] focus:outline-none"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-[#1C1917] mb-1.5">Making charges (PKR)</label>
                <input
                  type="number"
                  value={makingCharges}
                  onChange={(e) => setMakingCharges(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 bg-[#FAF6EE] border border-[#E7DFD0] rounded-xl text-xs text-[#1C1917] focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[#E7DFD0] p-6 shadow-card space-y-4">
            <h3 className="font-serif text-lg font-semibold text-[#1C1917]">Pricing & inventory</h3>
            <div className="p-4 rounded-xl bg-[#FAF6EE] border border-[#E7DFD0] space-y-2 text-xs">
              <div className="flex items-center justify-between text-[#6B645A]">
                <span>Gold value ({weight} g @ {purity})</span>
                <span className="font-semibold text-[#1C1917]">Rs. {calculatedGoldValue.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-[#6B645A]">
                <span>Making charges</span>
                <span className="font-semibold text-[#1C1917]">Rs. {makingCharges.toLocaleString()}</span>
              </div>
              <div className="pt-2 border-t border-[#E7DFD0] flex items-center justify-between text-base font-bold text-[#0E3B2E]">
                <span>Selling price</span>
                <span>Rs. {sellingPrice.toLocaleString()}</span>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-[#1C1917] mb-1.5">Stock quantity</label>
                <input
                  type="number"
                  value={stock}
                  onChange={(e) => setStock(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 bg-[#FAF6EE] border border-[#E7DFD0] rounded-xl text-xs text-[#1C1917] focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar Column */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-2xl border border-[#E7DFD0] p-6 shadow-card space-y-4">
            <h3 className="font-serif text-lg font-semibold text-[#1C1917]">Product images</h3>
            <div
              onClick={() => showToast('Image replaced via Cloudinary mock', 'info')}
              className="border-2 border-dashed border-[#B8893B]/40 hover:border-[#0E3B2E] rounded-2xl p-4 text-center cursor-pointer transition bg-[#FAF6EE]/50 space-y-2"
            >
              <div className="w-24 h-24 mx-auto rounded-xl overflow-hidden border border-[#E7DFD0]">
                <ProductImage
                  src={product.image}
                  alt={product.name}
                  bgTint={product.bgTint}
                  emblemSize={36}
                  className="w-full h-full"
                />
              </div>
              <p className="text-xs font-semibold text-[#1C1917]">Click to change image</p>
              <p className="text-[10px] text-[#6B645A]">Cloudinary integration ready</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[#E7DFD0] p-6 shadow-card space-y-4">
            <h3 className="font-serif text-lg font-semibold text-[#1C1917]">Visibility</h3>
            <div>
              <label className="block text-xs font-semibold text-[#1C1917] mb-1.5">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full px-3 py-2 bg-[#FAF6EE] border border-[#E7DFD0] rounded-xl text-xs text-[#1C1917]"
              >
                <option value="Active">Active</option>
                <option value="Low stock">Low stock</option>
                <option value="Out of stock">Out of stock</option>
              </select>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

