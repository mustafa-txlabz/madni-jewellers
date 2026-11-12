'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import { ProductImage } from '@/components/ui/ProductImage';
import { useApp } from '@/context/AppContext';
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

export default function AdminProductsPage() {
  const { products, deleteProduct } = useApp();

  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [purityFilter, setPurityFilter] = useState('All');
  const [stockFilter, setStockFilter] = useState('All');

  const filtered = products.filter((p) => {
    if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.sku.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }
    if (categoryFilter !== 'All' && p.category !== categoryFilter) return false;
    if (purityFilter !== 'All' && p.purity !== purityFilter) return false;
    if (stockFilter !== 'All' && p.status !== stockFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl text-[#0E3B2E] font-medium">Products</h1>
          <p className="text-xs text-[#6B645A] mt-1">
            Manage your jewellery catalogue, pricing and stock
          </p>
        </div>

        <Link
          href="/admin/products/new"
          className="px-4 py-2.5 bg-[#0E3B2E] text-white rounded-xl text-xs font-semibold hover:bg-[#08261E] transition flex items-center gap-2 self-start shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-[#E7DFD0] shadow-card flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or SKU..."
            className="w-full pl-9 pr-3 py-2 bg-[#FAF6EE] border border-[#E7DFD0] rounded-xl text-xs text-[#1C1917] focus:outline-none"
          />
          <Search className="w-4 h-4 text-[#6B645A] absolute left-3 top-2.5" />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 bg-[#FAF6EE] border border-[#E7DFD0] rounded-xl text-xs text-[#1C1917] focus:outline-none"
          >
            <option value="All">Category: All</option>
            <option value="Necklaces">Necklaces</option>
            <option value="Rings">Rings</option>
            <option value="Bangles">Bangles</option>
            <option value="Earrings">Earrings</option>
            <option value="Bridal Sets">Bridal Sets</option>
            <option value="Chains">Chains</option>
          </select>

          {/* Purity Filter */}
          <select
            value={purityFilter}
            onChange={(e) => setPurityFilter(e.target.value)}
            className="px-3 py-2 bg-[#FAF6EE] border border-[#E7DFD0] rounded-xl text-xs text-[#1C1917] focus:outline-none"
          >
            <option value="All">Purity: All</option>
            <option value="24K">24K</option>
            <option value="22K">22K</option>
            <option value="21K">21K</option>
            <option value="18K">18K</option>
          </select>

          {/* Status Filter */}
          <select
            value={stockFilter}
            onChange={(e) => setStockFilter(e.target.value)}
            className="px-3 py-2 bg-[#FAF6EE] border border-[#E7DFD0] rounded-xl text-xs text-[#1C1917] focus:outline-none"
          >
            <option value="All">Status: All</option>
            <option value="Active">Active</option>
            <option value="Low stock">Low stock</option>
            <option value="Out of stock">Out of stock</option>
          </select>
        </div>
      </div>

      {/* Products Table Card */}
      <div className="bg-white rounded-2xl border border-[#E7DFD0] shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF6EE] border-b border-[#E7DFD0] text-[#6B645A]">
              <tr>
                <th className="py-3 px-4 font-semibold">PRODUCT</th>
                <th className="py-3 px-4 font-semibold">CATEGORY</th>
                <th className="py-3 px-4 font-semibold">PURITY</th>
                <th className="py-3 px-4 font-semibold">WEIGHT</th>
                <th className="py-3 px-4 font-semibold">PRICE</th>
                <th className="py-3 px-4 font-semibold">STOCK</th>
                <th className="py-3 px-4 font-semibold">STATUS</th>
                <th className="py-3 px-4 font-semibold text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E7DFD0]/60">
              {filtered.map((prod) => (
                <tr key={prod.id} className="hover:bg-[#FAF6EE]/50 transition">
                  {/* Product thumbnail & name */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 border border-[#E7DFD0]"
                      >
                        <ProductImage
                          src={prod.image}
                          alt={prod.name}
                          bgTint={prod.bgTint}
                          emblemSize={18}
                          className="w-full h-full"
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-[#1C1917] line-clamp-1">{prod.name}</p>
                        <p className="text-[11px] text-[#6B645A]">{prod.sku}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-[#6B645A]">{prod.category}</td>
                  <td className="py-3 px-4 font-medium text-[#1C1917]">{prod.purity}</td>
                  <td className="py-3 px-4 text-[#6B645A]">{prod.weight} g</td>
                  <td className="py-3 px-4 font-semibold text-[#0E3B2E]">
                    Rs. {prod.price.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 font-medium text-[#1C1917]">{prod.stock} pcs</td>
                  <td className="py-3 px-4">
                    <Badge variant={prod.status} />
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/products/${prod.id}/edit`}
                        className="p-1.5 hover:bg-[#FAF6EE] text-[#6B645A] hover:text-[#0E3B2E] rounded-md transition"
                        title="Edit product"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </Link>
                      <button
                        onClick={() => deleteProduct(prod.id)}
                        className="p-1.5 hover:bg-red-50 text-[#6B645A] hover:text-red-600 rounded-md transition"
                        title="Delete product"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer info & pagination */}
        <div className="p-4 border-t border-[#E7DFD0] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#6B645A]">
          <span>Showing 1-{filtered.length} of {products.length} products</span>
          <div className="flex items-center gap-1">
            <button className="w-7 h-7 rounded border border-[#E7DFD0] flex items-center justify-center hover:bg-[#FAF6EE]">
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button className="w-7 h-7 rounded bg-[#0E3B2E] text-white flex items-center justify-center font-bold">
              1
            </button>
            <button className="w-7 h-7 rounded border border-[#E7DFD0] flex items-center justify-center hover:bg-[#FAF6EE]">
              2
            </button>
            <button className="w-7 h-7 rounded border border-[#E7DFD0] flex items-center justify-center hover:bg-[#FAF6EE]">
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

