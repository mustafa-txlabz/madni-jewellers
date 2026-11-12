'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import { useApp } from '@/context/AppContext';
import {
  Search,
  Download,
  Eye,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

export default function AdminOrdersPage() {
  const { orders, showToast } = useApp();

  const [activeTab, setActiveTab] = useState<string>('All');
  const [search, setSearch] = useState('');
  const [paymentFilter, setPaymentFilter] = useState('All');

  const filtered = orders.filter((o) => {
    if (search && !o.id.toLowerCase().includes(search.toLowerCase()) && !o.customerName.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }
    if (activeTab !== 'All' && o.orderStatus !== activeTab) return false;
    if (paymentFilter !== 'All' && o.paymentStatus !== paymentFilter) return false;
    return true;
  });

  const tabs = [
    { label: 'All', count: orders.length },
    { label: 'Pending', count: orders.filter((o) => o.orderStatus === 'Pending').length },
    { label: 'Processing', count: orders.filter((o) => o.orderStatus === 'Processing').length },
    { label: 'Shipped', count: orders.filter((o) => o.orderStatus === 'Shipped').length },
    { label: 'Delivered', count: orders.filter((o) => o.orderStatus === 'Delivered').length },
    { label: 'Cancelled', count: orders.filter((o) => o.orderStatus === 'Cancelled').length },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl text-[#0E3B2E] font-medium">Orders</h1>
          <p className="text-xs text-[#6B645A] mt-1">
            Review, process and track every customer order.
          </p>
        </div>

        <button
          onClick={() => showToast('Orders exported to CSV (orders_oct26.csv)', 'success')}
          className="px-4 py-2.5 bg-white border border-[#E7DFD0] rounded-xl text-xs font-semibold text-[#1C1917] hover:border-[#0E3B2E] transition flex items-center gap-2 self-start shadow-sm"
        >
          <Download className="w-4 h-4 text-[#B8893B]" />
          Export CSV
        </button>
      </div>

      {/* Status Tabs Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {tabs.map((tab) => (
          <button
            key={tab.label}
            onClick={() => setActiveTab(tab.label)}
            className={`px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition flex items-center gap-2 ${
              activeTab === tab.label
                ? 'bg-[#0E3B2E] text-white shadow-sm'
                : 'bg-white border border-[#E7DFD0] text-[#1C1917] hover:bg-[#FAF6EE]'
            }`}
          >
            <span>{tab.label}</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                activeTab === tab.label
                  ? 'bg-white/20 text-white'
                  : 'bg-[#F2ECDF] text-[#6B645A]'
              }`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-[#E7DFD0] shadow-card flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by order number or customer..."
            className="w-full pl-9 pr-3 py-2 bg-[#FAF6EE] border border-[#E7DFD0] rounded-xl text-xs text-[#1C1917] focus:outline-none"
          />
          <Search className="w-4 h-4 text-[#6B645A] absolute left-3 top-2.5" />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <select
            value={paymentFilter}
            onChange={(e) => setPaymentFilter(e.target.value)}
            className="px-3 py-2 bg-[#FAF6EE] border border-[#E7DFD0] rounded-xl text-xs text-[#1C1917] focus:outline-none"
          >
            <option value="All">Payment: All</option>
            <option value="Pending verification">Pending verification</option>
            <option value="Paid">Paid</option>
            <option value="Rejected">Rejected</option>
          </select>

          <select className="px-3 py-2 bg-[#FAF6EE] border border-[#E7DFD0] rounded-xl text-xs text-[#1C1917] focus:outline-none">
            <option>Date: Last 30 days</option>
            <option>Today</option>
            <option>This Week</option>
            <option>All time</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl border border-[#E7DFD0] shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF6EE] border-b border-[#E7DFD0] text-[#6B645A]">
              <tr>
                <th className="py-3 px-4 font-semibold">ORDER</th>
                <th className="py-3 px-4 font-semibold">CUSTOMER</th>
                <th className="py-3 px-4 font-semibold">DATE</th>
                <th className="py-3 px-4 font-semibold">ITEMS</th>
                <th className="py-3 px-4 font-semibold">TOTAL</th>
                <th className="py-3 px-4 font-semibold">PAYMENT</th>
                <th className="py-3 px-4 font-semibold">STATUS</th>
                <th className="py-3 px-4 font-semibold text-right">VIEW</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E7DFD0]/60">
              {filtered.map((ord) => (
                <tr key={ord.id} className="hover:bg-[#FAF6EE]/50 transition">
                  <td className="py-3 px-4 font-semibold text-[#0E3B2E]">
                    <Link href={`/admin/orders/${ord.id}`}>{ord.id}</Link>
                  </td>
                  <td className="py-3 px-4 font-medium text-[#1C1917]">{ord.customerName}</td>
                  <td className="py-3 px-4 text-[#6B645A]">{ord.date}</td>
                  <td className="py-3 px-4 text-[#6B645A]">{ord.items.length}</td>
                  <td className="py-3 px-4 font-semibold text-[#1C1917]">
                    Rs. {ord.total.toLocaleString()}
                  </td>
                  <td className="py-3 px-4">
                    <Badge variant={ord.paymentStatus} />
                  </td>
                  <td className="py-3 px-4">
                    <Badge variant={ord.orderStatus} />
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Link
                      href={`/admin/orders/${ord.id}`}
                      className="inline-flex p-1.5 hover:bg-[#FAF6EE] text-[#6B645A] hover:text-[#0E3B2E] rounded-md transition"
                      title="View order details"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer info & pagination */}
        <div className="p-4 border-t border-[#E7DFD0] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#6B645A]">
          <span>Showing 1-{filtered.length} of {orders.length} orders</span>
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

