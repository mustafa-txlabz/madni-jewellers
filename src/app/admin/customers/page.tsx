'use client';

import React, { useState } from 'react';
import { Badge } from '@/components/ui/Badge';
import { useApp } from '@/context/AppContext';
import {
  Search,
  Download,
  Eye,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

export default function AdminCustomersPage() {
  const { customers, showToast } = useApp();
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState('Newest');

  const filtered = customers.filter((c) => {
    if (
      search &&
      !c.name.toLowerCase().includes(search.toLowerCase()) &&
      !c.email.toLowerCase().includes(search.toLowerCase()) &&
      !c.phone.includes(search)
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl text-[#0E3B2E] font-medium">Customers</h1>
          <p className="text-xs text-[#6B645A] mt-1">
            People who have registered and ordered from Madni Jeweller.
          </p>
        </div>

        <button
          onClick={() => showToast('Customer database exported to CSV', 'success')}
          className="px-4 py-2.5 bg-white border border-[#E7DFD0] rounded-xl text-xs font-semibold text-[#1C1917] hover:border-[#0E3B2E] transition flex items-center gap-2 self-start shadow-sm"
        >
          <Download className="w-4 h-4 text-[#B8893B]" />
          Export CSV
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-[#E7DFD0] shadow-card flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email or phone..."
            className="w-full pl-9 pr-3 py-2 bg-[#FAF6EE] border border-[#E7DFD0] rounded-xl text-xs text-[#1C1917] focus:outline-none"
          />
          <Search className="w-4 h-4 text-[#6B645A] absolute left-3 top-2.5" />
        </div>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="px-3 py-2 bg-[#FAF6EE] border border-[#E7DFD0] rounded-xl text-xs text-[#1C1917] focus:outline-none self-end sm:self-auto"
        >
          <option>Sort: Newest</option>
          <option>Sort: Most Spent</option>
          <option>Sort: Most Orders</option>
        </select>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-2xl border border-[#E7DFD0] shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF6EE] border-b border-[#E7DFD0] text-[#6B645A]">
              <tr>
                <th className="py-3 px-4 font-semibold">CUSTOMER</th>
                <th className="py-3 px-4 font-semibold">PHONE</th>
                <th className="py-3 px-4 font-semibold">ORDERS</th>
                <th className="py-3 px-4 font-semibold">TOTAL SPENT</th>
                <th className="py-3 px-4 font-semibold">JOINED</th>
                <th className="py-3 px-4 font-semibold">STATUS</th>
                <th className="py-3 px-4 font-semibold text-right">VIEW</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E7DFD0]/60">
              {filtered.map((cust) => {
                const initials = cust.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('');

                return (
                  <tr key={cust.id} className="hover:bg-[#FAF6EE]/50 transition">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#FAF3E0] text-[#B8893B] font-bold flex items-center justify-center text-xs flex-shrink-0 border border-[#B8893B]/30">
                          {initials}
                        </div>
                        <div>
                          <p className="font-semibold text-[#1C1917]">{cust.name}</p>
                          <p className="text-[11px] text-[#6B645A]">{cust.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-[#6B645A]">{cust.phone}</td>
                    <td className="py-3.5 px-4 font-medium text-[#1C1917]">{cust.ordersCount}</td>
                    <td className="py-3.5 px-4 font-semibold text-[#0E3B2E]">
                      Rs. {cust.totalSpent.toLocaleString()}
                    </td>
                    <td className="py-3.5 px-4 text-[#6B645A]">{cust.joinedDate}</td>
                    <td className="py-3.5 px-4">
                      <Badge variant={cust.status} />
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => showToast(`Customer details for ${cust.name}`, 'info')}
                        className="p-1.5 hover:bg-[#FAF6EE] text-[#6B645A] hover:text-[#0E3B2E] rounded-md transition"
                        title="View profile"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer info & pagination */}
        <div className="p-4 border-t border-[#E7DFD0] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#6B645A]">
          <span>Showing 1-{filtered.length} of {customers.length} customers</span>
          <div className="flex items-center gap-1">
            <button className="w-7 h-7 rounded border border-[#E7DFD0] flex items-center justify-center hover:bg-[#FAF6EE]">
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button className="w-7 h-7 rounded bg-[#0E3B2E] text-white flex items-center justify-center font-bold">
              1
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

