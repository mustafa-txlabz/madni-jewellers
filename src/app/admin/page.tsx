'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import { useApp } from '@/context/AppContext';
import {
  TrendingUp,
  ShoppingBag,
  Clock,
  AlertTriangle,
  ArrowUpRight,
  Sparkles,
  RefreshCw,
  X,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const { orders, goldRates, updateGoldRates, showToast } = useApp();

  const [goldRateModalOpen, setGoldRateModalOpen] = useState(false);
  const [rate24, setRate24] = useState(goldRates['24K']);
  const [rate22, setRate22] = useState(goldRates['22K']);
  const [rate21, setRate21] = useState(goldRates['21K']);
  const [rate18, setRate18] = useState(goldRates['18K']);

  const handleSaveRates = (e: React.FormEvent) => {
    e.preventDefault();
    updateGoldRates({
      '24K': rate24,
      '22K': rate22,
      '21K': rate21,
      '18K': rate18,
    });
    setGoldRateModalOpen(false);
  };

  const salesBars = [
    { day: 'Mon', height: '40%', val: 'Rs. 310k' },
    { day: 'Tue', height: '65%', val: 'Rs. 480k' },
    { day: 'Wed', height: '55%', val: 'Rs. 410k' },
    { day: 'Thu', height: '80%', val: 'Rs. 620k' },
    { day: 'Fri', height: '45%', val: 'Rs. 340k' },
    { day: 'Sat', height: '95%', val: 'Rs. 790k', active: true },
    { day: 'Sun', height: '60%', val: 'Rs. 486k' },
  ];

  const recentOrders = orders.slice(0, 5);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl text-[#0E3B2E] font-medium">Dashboard</h1>
          <p className="text-xs text-[#6B645A] mt-1">
            Welcome back — here’s what’s happening at Madni Jeweller today.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select className="bg-white border border-[#E7DFD0] rounded-xl px-3.5 py-2 text-xs font-medium text-[#1C1917] focus:outline-none shadow-sm">
            <option>Last 7 days</option>
            <option>This Month</option>
            <option>This Quarter</option>
            <option>All Time</option>
          </select>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Metric 1 */}
        <div className="bg-white rounded-2xl p-6 border border-[#E7DFD0] shadow-card">
          <div className="flex items-center justify-between text-xs text-[#6B645A] mb-2 font-medium">
            <span>Today&apos;s sales</span>
            <span className="text-[#157F4F] flex items-center text-[11px] font-semibold bg-[#E8F5EF] px-2 py-0.5 rounded-full">
              <TrendingUp className="w-3 h-3 mr-0.5" /> +12.4%
            </span>
          </div>
          <p className="font-serif font-bold text-2xl text-[#0E3B2E]">Rs. 486,500</p>
          <p className="text-[11px] text-[#6B645A] mt-1">vs. yesterday Rs. 432,000</p>
        </div>

        {/* Metric 2 */}
        <div className="bg-white rounded-2xl p-6 border border-[#E7DFD0] shadow-card">
          <div className="flex items-center justify-between text-xs text-[#6B645A] mb-2 font-medium">
            <span>New orders</span>
            <ShoppingBag className="w-4 h-4 text-[#B8893B]" />
          </div>
          <p className="font-serif font-bold text-2xl text-[#1C1917]">14</p>
          <p className="text-[11px] text-[#1D5FBF] mt-1 font-medium">3 need processing</p>
        </div>

        {/* Metric 3 */}
        <div className="bg-white rounded-2xl p-6 border border-[#E7DFD0] shadow-card">
          <div className="flex items-center justify-between text-xs text-[#6B645A] mb-2 font-medium">
            <span>Pending payments</span>
            <Clock className="w-4 h-4 text-[#B54708]" />
          </div>
          <p className="font-serif font-bold text-2xl text-[#1C1917]">6</p>
          <p className="text-[11px] text-[#B54708] mt-1 font-medium">
            Rs. 2,125,000 to verify
          </p>
        </div>

        {/* Metric 4 */}
        <div className="bg-white rounded-2xl p-6 border border-[#E7DFD0] shadow-card">
          <div className="flex items-center justify-between text-xs text-[#6B645A] mb-2 font-medium">
            <span>Low stock items</span>
            <AlertTriangle className="w-4 h-4 text-[#B42318]" />
          </div>
          <p className="font-serif font-bold text-2xl text-[#1C1917]">5</p>
          <p className="text-[11px] text-[#B42318] mt-1 font-medium">Requires re-order</p>
        </div>
      </div>

      {/* Middle Row: Sales Chart + Gold Rate Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sales Overview Bar Chart */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-[#E7DFD0] shadow-card space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[#E7DFD0]">
            <div>
              <h3 className="font-serif text-lg font-semibold text-[#1C1917]">Sales overview</h3>
              <p className="text-[11px] text-[#6B645A]">Revenue for the last 7 days (PKR)</p>
            </div>
            <span className="text-xs font-semibold text-[#0E3B2E] bg-[#FAF6EE] px-3 py-1.5 rounded-lg border border-[#E7DFD0]">
              Weekly
            </span>
          </div>

          {/* Bar Chart Visual */}
          <div className="h-56 flex items-end justify-between gap-3 pt-6 pb-2 px-2">
            {salesBars.map((bar) => (
              <div key={bar.day} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                <div
                  className={`w-full rounded-t-lg transition-all duration-300 relative ${
                    bar.active ? 'bg-[#0E3B2E]' : 'bg-[#E7DFD0] group-hover:bg-[#B8893B]'
                  }`}
                  style={{ height: bar.height }}
                >
                  <span className="opacity-0 group-hover:opacity-100 transition absolute -top-7 left-1/2 -translate-x-1/2 bg-[#1C1917] text-white text-[10px] px-1.5 py-0.5 rounded whitespace-nowrap z-10 pointer-events-none">
                    {bar.val}
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-[#6B645A]">{bar.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Today's Gold Rate Card */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-[#E7DFD0] shadow-card space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-[#E7DFD0]">
            <div>
              <h3 className="font-serif text-lg font-semibold text-[#1C1917] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#B8893B]" />
                Today&apos;s gold rate
              </h3>
              <p className="text-[11px] text-[#6B645A]">Per tola · updated {goldRates.lastUpdated}</p>
            </div>
          </div>

          {/* Rates List */}
          <div className="space-y-2.5 text-xs">
            <div className="flex items-center justify-between p-3 rounded-xl bg-[#FAF6EE] border border-[#E7DFD0]">
              <span className="font-semibold text-[#1C1917]">24K Gold</span>
              <span className="font-serif font-bold text-[#0E3B2E] text-sm">
                Rs. {goldRates['24K'].toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-[#FAF3E0] border border-[#B8893B]/30">
              <span className="font-bold text-[#0E3B2E]">22K Gold (Standard)</span>
              <span className="font-serif font-bold text-[#0E3B2E] text-base">
                Rs. {goldRates['22K'].toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-[#FAF6EE] border border-[#E7DFD0]">
              <span className="font-semibold text-[#1C1917]">21K Gold</span>
              <span className="font-serif font-bold text-[#0E3B2E] text-sm">
                Rs. {goldRates['21K'].toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-[#FAF6EE] border border-[#E7DFD0]">
              <span className="font-semibold text-[#1C1917]">18K Gold</span>
              <span className="font-serif font-bold text-[#0E3B2E] text-sm">
                Rs. {goldRates['18K'].toLocaleString()}
              </span>
            </div>
          </div>

          <button
            onClick={() => setGoldRateModalOpen(true)}
            className="w-full py-2.5 bg-[#B8893B] text-white rounded-xl text-xs font-semibold hover:bg-[#966E2B] transition flex items-center justify-center gap-2 shadow-sm"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Update Gold Rate
          </button>

          <p className="text-[11px] text-[#6B645A] leading-relaxed italic">
            Product prices recalculate automatically from weight, purity and making charges.
          </p>
        </div>
      </div>

      {/* Bottom Row: Recent Orders Table + Low Stock Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Recent Orders Table */}
        <div className="lg:col-span-8 bg-white rounded-2xl p-6 border border-[#E7DFD0] shadow-card space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E7DFD0]">
            <div>
              <h3 className="font-serif text-lg font-semibold text-[#1C1917]">Recent orders</h3>
              <p className="text-[11px] text-[#6B645A]">Latest customer orders placed</p>
            </div>
            <Link
              href="/admin/orders"
              className="text-xs text-[#0E3B2E] font-semibold hover:underline flex items-center gap-1"
            >
              View all <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#E7DFD0] text-[#6B645A]">
                  <th className="pb-3 font-semibold">ORDER</th>
                  <th className="pb-3 font-semibold">CUSTOMER</th>
                  <th className="pb-3 font-semibold">TOTAL</th>
                  <th className="pb-3 font-semibold">PAYMENT</th>
                  <th className="pb-3 font-semibold">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E7DFD0]/60">
                {recentOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-[#FAF6EE] transition">
                    <td className="py-3 font-semibold text-[#0E3B2E]">
                      <Link href={`/admin/orders/${ord.id}`}>{ord.id}</Link>
                    </td>
                    <td className="py-3 text-[#1C1917]">{ord.customerName}</td>
                    <td className="py-3 font-medium text-[#1C1917]">
                      Rs. {ord.total.toLocaleString()}
                    </td>
                    <td className="py-3">
                      <Badge variant={ord.paymentStatus} />
                    </td>
                    <td className="py-3">
                      <Badge variant={ord.orderStatus} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-6 border border-[#E7DFD0] shadow-card space-y-4">
          <div className="pb-3 border-b border-[#E7DFD0]">
            <h3 className="font-serif text-lg font-semibold text-[#1C1917]">Low stock alerts</h3>
            <p className="text-[11px] text-[#6B645A]">Restock soon</p>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-3 rounded-xl bg-[#FAF6EE] border border-[#E7DFD0]">
              <div>
                <p className="font-semibold text-[#1C1917]">Sitara Gold Bangles (Pair)</p>
                <p className="text-[11px] text-[#6B645A]">MJ-BG-0054</p>
              </div>
              <span className="text-xs font-bold text-[#B54708] bg-[#FEF3EB] px-2 py-0.5 rounded-full">
                Only 3 left
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-[#FAF6EE] border border-[#E7DFD0]">
              <div>
                <p className="font-semibold text-[#1C1917]">Laiba Kundan Jhumkay</p>
                <p className="text-[11px] text-[#6B645A]">MJ-ER-0199</p>
              </div>
              <span className="text-xs font-bold text-[#B42318] bg-[#FEE4E2] px-2 py-0.5 rounded-full">
                Out of stock
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-[#FAF6EE] border border-[#E7DFD0]">
              <div>
                <p className="font-semibold text-[#1C1917]">Noor Bridal Necklace Set</p>
                <p className="text-[11px] text-[#6B645A]">MJ-NK-0142</p>
              </div>
              <span className="text-xs font-bold text-[#B54708] bg-[#FEF3EB] px-2 py-0.5 rounded-full">
                Only 4 left
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-[#FAF6EE] border border-[#E7DFD0]">
              <div>
                <p className="font-semibold text-[#1C1917]">Ruby Bridal Tikka</p>
                <p className="text-[11px] text-[#6B645A]">MJ-BD-0021</p>
              </div>
              <span className="text-xs font-bold text-[#B54708] bg-[#FEF3EB] px-2 py-0.5 rounded-full">
                Only 2 left
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Gold Rate Update Modal */}
      {goldRateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full border border-[#E7DFD0] shadow-modal space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#E7DFD0]">
              <h3 className="font-serif text-lg font-semibold text-[#1C1917]">
                Update Today&apos;s Gold Rates
              </h3>
              <button onClick={() => setGoldRateModalOpen(false)}>
                <X className="w-5 h-5 text-[#6B645A]" />
              </button>
            </div>

            <form onSubmit={handleSaveRates} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">24K Gold (PKR / tola)</label>
                <input
                  type="number"
                  value={rate24}
                  onChange={(e) => setRate24(Number(e.target.value))}
                  className="w-full p-2.5 rounded-lg border border-[#E7DFD0] bg-[#FAF6EE]"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">22K Gold (Standard)</label>
                <input
                  type="number"
                  value={rate22}
                  onChange={(e) => setRate22(Number(e.target.value))}
                  className="w-full p-2.5 rounded-lg border border-[#E7DFD0] bg-[#FAF6EE]"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">21K Gold</label>
                <input
                  type="number"
                  value={rate21}
                  onChange={(e) => setRate21(Number(e.target.value))}
                  className="w-full p-2.5 rounded-lg border border-[#E7DFD0] bg-[#FAF6EE]"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">18K Gold</label>
                <input
                  type="number"
                  value={rate18}
                  onChange={(e) => setRate18(Number(e.target.value))}
                  className="w-full p-2.5 rounded-lg border border-[#E7DFD0] bg-[#FAF6EE]"
                />
              </div>

              <div className="pt-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => setGoldRateModalOpen(false)}
                  className="flex-1 py-2.5 border border-[#E7DFD0] rounded-lg font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#0E3B2E] text-white rounded-lg font-medium hover:bg-[#08261E]"
                >
                  Save & Apply Rates
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

